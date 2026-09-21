# Paths of Wonder for iOS

This Capacitor project packages the authored reader for iPhone and iPad. Stories,
fonts, artwork, and the web bundle ship inside the app. There is no remote server
URL, AI service, or live-reload dependency in the native configuration.

## Build

Use Node 24, Xcode 26+, and an installed iOS simulator runtime. From `webapp/`:

```sh
npm ci
npm run check
npm run ios:build
npm run ios:open
```

`ios:build` rebuilds and syncs the web assets, then creates an unsigned Debug
simulator app in `ios/DerivedData/Build/Products/Debug-iphonesimulator/App.app`.
The public Swift packages resolve using the netrc provider to avoid unnecessary
keychain prompts. No credentials are required for these public dependencies.
Generated web assets and build output are ignored; run `npm run ios:sync` after
web changes before building from Xcode. Commit the Swift package lockfile.

- Bundle identifier: `com.jeffnovotny.pathsofwonder` (unique to this app).
- Apple team: `J29FAX7T97`, matching Jeff's Reforge project.
- Version/build: 1.0 / 1. Increment the build for each distributed archive.
- Deployment target: iOS 17.0 (modern WebKit layout baseline); iPhone and iPad device families.
- Both landscape orientations, with portrait fallback (plus upside-down on iPad).
- Warm launch screen and opaque 1024px book icon. To redraw the icon, compile
  `Branding/generate-icon.swift` using `swiftc`, then run the executable with the
  destination `App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`.

## Saves and offline behavior

The native app keeps the same validated bookmark collection in its persistent
WKWebView localStorage. Each book has separate progress, names, text size, and a
reading anchor. Force quitting and reopening should preserve it. Browser saves
are separate from native saves. There is no iCloud sync or export/import UI;
uninstalling the app or clearing its data can remove bookmarks. Local storage is
not a substitute for a backup service.

For offline verification, terminate the app, stop the development server, and
launch the installed app. Verify fonts and illustrations as well as text. Also
repeat on physical devices in airplane mode before release; simulator checks do
not certify networking, real multi-touch, VoiceOver, or system text scaling.

## Archive and TestFlight handoff

To check Release packaging while the stories are still being written:

```sh
npm run ios:archive
```

This rebuilds the web app and creates an **unsigned** device archive at
`ios/DerivedData/Archives/PathsOfWonder.xcarchive`. It needs no Apple account,
provisioning profile, or App Store Connect record. It cannot be installed or
uploaded as-is; its purpose is to catch device compilation and packaging failures
before distribution. Rerunning the command replaces this generated archive.

Both `ios:build` and `ios:archive` inspect the compiled app: every production web
asset must match the current build byte-for-byte, unexpected stale assets fail,
the native configuration must match, and local launch, pinch zoom, both device
families, supported orientations, icon resources, and launch screen are checked.
The GitHub workflow runs both commands on macOS, alongside the web checks on
Linux. It does not sign, upload, or distribute builds.

When the stories and physical-device checks are ready:

1. Run the web checks and simulator build above. Exercise landscape phone/tablet,
   portrait, large text, page turns, illustration zoom, choices, and save resume.
2. In Xcode, select the App target, Jeff's team, and automatic signing. The bundle
   ID must remain unique; do not reuse Reforge's identifier.
3. Select Any iOS Device (arm64), set the release version/build, and Product →
   Archive. Resolve any account or provisioning requirements in Xcode.
4. Review the archive in Organizer and validate before distribution. Create the
   matching App Store Connect app record if it does not exist. Supply app privacy
   answers, age rating, support/privacy URLs, screenshots, and testing details.
5. Upload to TestFlight only when Jeff is ready. This repository does not upload,
   accept Apple agreements, or publish automatically.

The app has no analytics, tracking, account service, or network storytelling.
Capacitor and Cordova include their privacy manifests. Reassess declarations if
plugins or data collection are added. The encryption key declares no non-exempt
app encryption; review again if functionality changes.

Jeff is still writing the stories. Disconnected outlines and unfinished passages
are expected authoring work, documented in `../../STORY_DIAGNOSTICS.md`; do not
rewrite or connect them as a release-engineering task.

## Verification status — September 19, 2026

Web lint, all 84 tests, story diagnostics, and production build pass. Unsigned
Debug simulator (arm64/x86_64) and Release device (arm64) builds pass with Xcode
26.6 / iOS 26.5 SDK. The simulator bundle contains byte-identical copies of all
production web assets. No server URL is configured. Dependency audit: zero
reported vulnerabilities.

After Mac testing access returned, the single-column WebKit fix was verified on
iPhone 17: the formerly clipped passage reports four normal-text pages, all
five larger-text pages are reachable, and the choice control appears on the last
page. Portrait and both landscape orientations reflow while retaining the anchored
passage. A clean reinstall/relaunch preserved page 3 and larger text with the
agent's development/preview servers stopped. Fonts and book textures loaded from
the bundle. This is a server-independent launch check, not a physical airplane-
mode certification.

On iPad (A16), verified portrait/landscape shell rotation, facing-page reading,
Next reaching the remaining passage, authored choice navigation into the
illustrated scene, illustration placement, the enlarged viewer, Actual size,
and closing the viewer. Browser checks also passed at 667×375, 1024×768, and
390×844 with large text, saved anchors, working Next, and no horizontal overflow.

Native input tooling needs care: Mac coordinate actions can be offset from the
cropped simulator screenshot. A temporary event trace confirmed that apparent
missed Next taps landed on the surrounding footer; calibrated taps reached the
button and advanced the page normally. Automated drags emitted pointerdown and
pointerup with no pointermove events, so they do not verify finger tracking or
image panning. All temporary instrumentation was removed; clean builds were
restored. Do not change gesture code solely to satisfy that tool limitation.

Before TestFlight, finish physical iPhone/iPad touch checks: finger tracking,
reverse/cancel, multi-touch/pinch, image panning, Reduce Motion, VoiceOver, and
system text sizing. Also run a physical cold launch in airplane mode and complete
signing/archive and App Store Connect setup. No upload or signed archive has
been performed.

Build-readiness follow-up: enabled native pinch zoom explicitly (Capacitor's
default disables it). The updated Debug simulator app and unsigned Release
archive both pass the bundle check with 101 identical production assets. On a
temporary copy of the archive, the check correctly rejected disabled zoom, a
remote server URL, modified index.html, and a stale extra asset. The actual
archive was not modified. All 84 web tests still pass, and protected content
matches f7a5d4e byte-for-byte.

The rebuilt iPhone app resumes larger-text reading, Previous works, and normal
portrait retains the passage. The rebuilt iPad launches with its saved bookmark;
further interaction this run was blocked by simulator window-coordinate errors.
Physical pinch verification remains outstanding; a config check does not certify
real touch behavior. The earlier iPad reading/viewer checks above still describe
the unchanged web UI. The unsigned archive is ready for packaging inspection;
signed distribution and TestFlight remain deferred until Jeff is ready.

Direct-device follow-up: a Release build of be3151e was development-signed with
Jeff's existing team and installed on his paired iPhone 16 Pro (iOS 26.6.2).
Developer Mode was already enabled. The bundle check passed with 101 identical
production assets, and strict code-signature verification passed. Apple's device
tools confirmed installation and successful launch. This is a direct development
installation, not a TestFlight upload; physical interaction and accessibility
checks still need to be exercised on the phone.

For a future direct update, connect the phone to Xcode, run `npm run ios:sync`,
select that iPhone as the destination with the existing team and automatic
signing, then build/run. Keep the bundle identifier unchanged and install over
the existing app to retain its local bookmarks. Do not uninstall as an update
step. Development signing must remain valid for the app to keep launching.

## Reading controls

- Swipe left/right to turn the paper; a short drag returns to the current page.
- Tap the left/right side of the paper to go back/forward. Tap the middle to
  show/hide controls; Aa opens Reading settings. Forward navigation after the
  final prose page opens choices; selecting a choice remains an explicit action.
- Aa → Controls → Page movement offers Animated (default) or Instant, saved per book.
  Instant retains taps and swipes, committing completed swipes on release without
  a turning leaf. Short/cancelled swipes stay on the current page. Reduce Motion
  takes precedence and disables animation even when Animated is selected.
- Choose one of seven text sizes, from 100% to 225%, using the slider or A−/A+.
  Each book retains its size. Older larger-text bookmarks map to the 128% setting.
  Reflow preserves the reading anchor, and authored choice labels scale too.
- Long presses, illustration controls, vertical scrolling and multi-touch keep
  their existing purpose. When zoomed in, the reader yields horizontal panning
  to the browser; page gestures resume after returning to normal zoom.

These controls use the bundled reader. Dynamic Type and optional iPhone haptics
are integrated as described below; a full physical VoiceOver audit remains.
Reduce Motion is already respected. The iPhone leaf fades once it crosses the
binding, and its shadows disappear with it to avoid the reported edge sliver.

### Native reading preferences

`ReaderBridgeViewController` registers the local `ReaderAccessibility` bridge.
It reports Dynamic Type scale and VoiceOver status at startup and on system
changes/foregrounding. Manual book size remains an additional per-book setting.
VoiceOver reads a continuous passage instead of offscreen page columns; standard
VoiceOver gestures are left to iOS. Paragraph/character bookmarks are shared
between continuous and paginated layouts.

On supported iPhones, **Aa → Controls → Gentle page-turn vibration** enables optional soft
feedback after completed page turns. It defaults off and is saved per book.
Unsupported devices hide the setting. No new permissions are requested.

Before release, verify spoken order, headings, illustration controls, choices,
settings and resumed reading with physical VoiceOver, and check the haptic feel
on an iPhone. Browser fixtures cover layout/event handling, not sensory feedback.

### Reading settings sections and presets

Aa groups settings into Text, Page, and Controls. Text offers Classic (100%,
serif, standard spacing, warm), Large Print (175%, bold sans serif, spacious,
clear), and Night (115%, serif, relaxed, dark). Presets save atomically per book
and preserve the reading anchor. Manual appearance changes show Custom. Page
movement, pinned controls and haptics are independent of the presets. Existing
readers retain their preferences until they choose a preset.
