import UIKit
import CoreHaptics
import Capacitor

class ReaderBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(ReaderAccessibilityPlugin())
    }
}

@objc(ReaderAccessibilityPlugin)
public class ReaderAccessibilityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ReaderAccessibilityPlugin"
    public let jsName = "ReaderAccessibility"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pageTurnFeedback", returnType: CAPPluginReturnPromise)
    ]
    private var observers: [NSObjectProtocol] = []
    private var lastFeedback: TimeInterval = 0

    public override func load() {
        for name in [UIContentSizeCategory.didChangeNotification,
                     UIAccessibility.voiceOverStatusDidChangeNotification,
                     UIApplication.didBecomeActiveNotification] {
            observers.append(NotificationCenter.default.addObserver(forName: name, object: nil, queue: .main) { [weak self] _ in
                guard let self else { return }
                self.notifyListeners("settingsChanged", data: self.settings())
            })
        }
    }

    deinit {
        for observer in observers { NotificationCenter.default.removeObserver(observer) }
    }

    private var supportsFeedback: Bool {
        UIDevice.current.userInterfaceIdiom == .phone && CHHapticEngine.capabilitiesForHardware().supportsHaptics
    }

    private func settings() -> [String: Any] {
        // Use the app's current category, including per-app accessibility overrides.
        let traits = UITraitCollection(preferredContentSizeCategory: UIApplication.shared.preferredContentSizeCategory)
        let scale = UIFontMetrics(forTextStyle: .body).scaledValue(for: 17, compatibleWith: traits) / 17
        return ["textScale": scale, "voiceOver": UIAccessibility.isVoiceOverRunning,
                "hapticsAvailable": supportsFeedback]
    }

    @objc func getSettings(_ call: CAPPluginCall) {
        DispatchQueue.main.async { call.resolve(self.settings()) }
    }

    @objc func pageTurnFeedback(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let now = ProcessInfo.processInfo.systemUptime
            guard self.supportsFeedback, UIApplication.shared.applicationState == .active,
                  now - self.lastFeedback > 0.1 else {
                call.resolve(["played": false])
                return
            }
            self.lastFeedback = now
            let feedback = UIImpactFeedbackGenerator(style: .soft)
            feedback.impactOccurred(intensity: 0.35)
            call.resolve(["played": true])
        }
    }
}
