import Foundation
import StoreKit

struct LibraryAccess: Sendable {
    let owned: Bool
    let revision: Int
    let authorAccess: Bool
    var dictionary: [String: Any] {
        var result: [String: Any] = ["owned": owned, "revision": revision]
        #if DEBUG
        result["developerMode"] = true
        result["authorAccess"] = authorAccess
        #endif
        return result
    }
}

// StoreKit retains signed transactions for offline use. There is intentionally no
// separate UserDefaults/web-storage entitlement cache to become stale after a refund.
actor LibraryStore {
    static let productID = "com.jeffnovotny.pathsofwonder.full_library"
    private var owned = false
    private var revision = 0
    private var refreshGeneration = 0
    private var authorAccess = false
    private var operationInProgress = false
    private var updates: Task<Void, Never>?
    private var changed: (@Sendable (LibraryAccess) -> Void)?

    private var snapshot: LibraryAccess {
        LibraryAccess(owned: owned, revision: revision, authorAccess: authorAccess)
    }

    func observe(_ onChange: @escaping @Sendable (LibraryAccess) -> Void) {
        guard updates == nil else { return }
        changed = onChange
        updates = Task { [weak self] in
            for await result in Transaction.updates {
                guard !Task.isCancelled else { break }
                guard case .verified(let transaction) = result,
                      transaction.productID == Self.productID else { continue }
                // Both new entitlements and revocations must reach a running reader.
                _ = await self?.refresh()
                await transaction.finish()
            }
        }
    }

    func stopObserving() { updates?.cancel(); updates = nil; changed = nil }

    @discardableResult func refresh() async -> LibraryAccess {
        refreshGeneration += 1
        let generation = refreshGeneration
        var entitled = false
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result,
               transaction.productID == Self.productID,
               transaction.productType == .nonConsumable,
               transaction.revocationDate == nil {
                entitled = true
            }
        }
        // Actor reentrancy must not let a slow launch query overwrite a newer refund/purchase.
        guard generation == refreshGeneration else { return snapshot }
        owned = entitled
        revision += 1
        changed?(snapshot)
        return snapshot
    }

    func offer() async throws -> [String: Any] {
        let product = try await Product.products(for: [Self.productID]).first
        var result: [String: Any] = ["canMakePayments": AppStore.canMakePayments]
        if let product, product.type == .nonConsumable {
            result["price"] = product.displayPrice
            result["familyShareable"] = product.isFamilyShareable
        }
        return result
    }

    func purchase() async throws -> (String, LibraryAccess) {
        guard !operationInProgress else { throw LibraryError.busy }
        operationInProgress = true
        defer { operationInProgress = false }
        let current = await refresh()
        if current.owned { return ("unlocked", current) }
        guard AppStore.canMakePayments else { return ("restricted", current) }
        guard let product = try await Product.products(for: [Self.productID]).first,
              product.type == .nonConsumable else { return ("unavailable", current) }
        let purchaseResult: Product.PurchaseResult
        do { purchaseResult = try await product.purchase() }
        catch StoreKitError.userCancelled { return ("cancelled", await refresh()) }
        switch purchaseResult {
        case .success(let result):
            guard case .verified(let transaction) = result,
                  transaction.productID == Self.productID,
                  transaction.revocationDate == nil else {
                return ("verification_failed", await refresh())
            }
            let access = await refresh()
            // Grant the verified entitlement before acknowledging delivery.
            await transaction.finish()
            return (access.owned ? "unlocked" : "verification_failed", access)
        case .pending: return ("pending", await refresh())
        case .userCancelled: return ("cancelled", await refresh())
        @unknown default: return ("purchase_error", await refresh())
        }
    }

    func restore() async throws -> (String, LibraryAccess) {
        guard !operationInProgress else { throw LibraryError.busy }
        operationInProgress = true
        defer { operationInProgress = false }
        // Only an explicit Restore tap may prompt for Apple Account authentication.
        try await AppStore.sync()
        return ("restored", await refresh())
    }

    #if DEBUG
    // Session-only author review. No switch or persisted override exists in Release/TestFlight.
    func setAuthorAccess(_ enabled: Bool) -> LibraryAccess {
        authorAccess = enabled
        revision += 1
        changed?(snapshot)
        return snapshot
    }
    #endif

    enum LibraryError: Error { case busy }
}
