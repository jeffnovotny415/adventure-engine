import Capacitor
import UIKit

@objc(ReaderPurchasesPlugin)
public class ReaderPurchasesPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ReaderPurchasesPlugin"
    public let jsName = "ReaderPurchases"
    public var pluginMethods: [CAPPluginMethod] {
        var methods = ["getAccess", "getOffer", "purchase", "restore"]
        #if DEBUG
        methods.append("setAuthorAccess")
        #endif
        return methods.map { CAPPluginMethod(name: $0, returnType: CAPPluginReturnPromise) }
    }
    private let library = LibraryStore()
    private var foregroundObserver: NSObjectProtocol?

    public override func load() {
        Task {
            await library.observe { [weak self] access in
                DispatchQueue.main.async { self?.notifyListeners("accessChanged", data: access.dictionary) }
            }
            await library.refresh()
        }
        foregroundObserver = NotificationCenter.default.addObserver(forName: UIApplication.didBecomeActiveNotification,
            object: nil, queue: .main) { [weak self] _ in
                guard let self else { return }
                Task { await self.library.refresh() }
            }
    }
    deinit {
        if let foregroundObserver { NotificationCenter.default.removeObserver(foregroundObserver) }
        let store = library
        Task { await store.stopObserving() }
    }
    @objc func getAccess(_ call: CAPPluginCall) {
        Task { call.resolve(await library.refresh().dictionary) }
    }
    @objc func getOffer(_ call: CAPPluginCall) {
        Task {
            do { call.resolve(try await library.offer()) }
            catch { call.reject("The App Store is unavailable.", "STORE_UNAVAILABLE") }
        }
    }
    @objc func purchase(_ call: CAPPluginCall) {
        Task {
            do {
                let (outcome, access) = try await library.purchase()
                call.resolve(["outcome": outcome, "access": access.dictionary])
            } catch { call.reject("Purchase could not be completed.", "PURCHASE_FAILED") }
        }
    }
    @objc func restore(_ call: CAPPluginCall) {
        Task {
            do {
                let (outcome, access) = try await library.restore()
                call.resolve(["outcome": outcome, "access": access.dictionary])
            } catch { call.reject("Restore could not be completed.", "RESTORE_FAILED") }
        }
    }
    #if DEBUG
    @objc func setAuthorAccess(_ call: CAPPluginCall) {
        Task { call.resolve(await library.setAuthorAccess(call.getBool("enabled") == true).dictionary) }
    }
    #endif
}
