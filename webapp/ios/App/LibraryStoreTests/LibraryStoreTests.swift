import XCTest
import StoreKit
import StoreKitTest
@testable import App

final class LibraryStoreTests: XCTestCase {
    private var session: SKTestSession!
    override func setUp() async throws {
        let url = try XCTUnwrap(Bundle(for: Self.self).url(forResource: "Purchases", withExtension: "storekit"))
        session = try SKTestSession(contentsOf: url)
        session.resetToDefaultState()
        session.clearTransactions()
        session.disableDialogs = true
        guard session.disableDialogs else {
            XCTFail("Local StoreKit test service rejected its settings; no purchase was attempted.")
            throw NSError(domain: "StoreKitTestSetup", code: 2)
        }
        // Fail before purchase/restore if the simulator did not activate local StoreKit.
        // Some iOS 26.5 runtimes report SKInternalErrorDomain 3 and otherwise fall
        // through to the real App Store's account prompt. Do not do that in tests.
        let products = try await Product.products(for: [LibraryStore.productID])
        guard !products.isEmpty else {
            XCTFail("Local StoreKit configuration did not load. Check simulator StoreKitTest support; no purchase was attempted.")
            throw NSError(domain: "StoreKitTestSetup", code: 1)
        }
    }
    override func tearDownWithError() throws {
        session.clearTransactions()
        session.resetToDefaultState()
    }

    func testPurchaseRestoreRelaunchAndRefund() async throws {
        let store = LibraryStore()
        let initial = await store.refresh()
        XCTAssertFalse(initial.owned)
        let offer = try await store.offer()
        XCTAssertEqual(offer["price"] as? String, "$4.99")
        XCTAssertEqual(offer["familyShareable"] as? Bool, true)
        let (outcome, bought) = try await store.purchase()
        XCTAssertEqual(outcome, "unlocked")
        XCTAssertTrue(bought.owned)
        let reloaded = await LibraryStore().refresh()
        XCTAssertTrue(reloaded.owned, "Entitlement survives without an app-maintained cache")
        let (_, restored) = try await store.restore()
        XCTAssertTrue(restored.owned)
        let transaction = try XCTUnwrap(session.allTransactions().first)
        try session.refundTransaction(identifier: transaction.identifier)
        let refunded = await store.refresh()
        XCTAssertFalse(refunded.owned)
    }

    func testPendingApprovalArrivesThroughUpdates() async throws {
        session.askToBuyEnabled = true
        let store = LibraryStore()
        let approved = expectation(description: "Approval updates an already-running reader")
        approved.assertForOverFulfill = false
        await store.observe { access in if access.owned { approved.fulfill() } }
        let (outcome, pending) = try await store.purchase()
        XCTAssertEqual(outcome, "pending")
        XCTAssertFalse(pending.owned)
        let transaction = try XCTUnwrap(session.allTransactions().first)
        try session.approveAskToBuyTransaction(identifier: transaction.identifier)
        await fulfillment(of: [approved], timeout: 15)
        await store.stopObserving()
    }

    func testCancelledPurchaseNeverUnlocks() async throws {
        try await session.setSimulatedError(.generic(.userCancelled), forAPI: .purchase)
        let store = LibraryStore()
        let (outcome, access) = try await store.purchase()
        XCTAssertEqual(outcome, "cancelled")
        XCTAssertFalse(access.owned)
    }

    func testUnavailableProductsDoNotRemoveVerifiedAccess() async throws {
        let store = LibraryStore()
        _ = try await store.purchase()
        try await session.setSimulatedError(.generic(.networkError(URLError(.notConnectedToInternet))), forAPI: .loadProducts)
        do { _ = try await store.offer(); XCTFail("Expected a product request failure") } catch { }
        let access = await store.refresh()
        XCTAssertTrue(access.owned)
    }

    func testAuthorAccessIsSessionOnlyAndNotAPurchase() async {
        let store = LibraryStore()
        let author = await store.setAuthorAccess(true)
        XCTAssertTrue(author.authorAccess)
        XCTAssertFalse(author.owned)
        let fresh = await LibraryStore().refresh()
        XCTAssertFalse(fresh.authorAccess)
        XCTAssertFalse(fresh.owned)
    }
}
