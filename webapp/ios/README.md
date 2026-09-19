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

The app launched on iPhone 17 and iPad (A16) simulators. iPhone inspection verified
the bookshelf, name entry, preserved names after app replacement/relaunch, and
landscape safe-area improvement. It also exposed a single-column WebKit issue:
only the first screen of prose was visible while the footer reported 1/1. The
reader now supplies an explicit column width, but the final native check is
**pending**: Mac window controls and the browser testing connection became
unavailable before the corrected build could be inspected. Do not treat the
wrapper as ready for TestFlight until this is confirmed.

Next: install the latest build, confirm every page is reachable, exercise Next,
finger tracking and the image viewer, rotate both simulators through portrait
and landscape, test larger text and bookmark restore, and cold-launch with the
development server stopped. Then perform the physical-device checklist. The
latest build contains no temporary measurement overlay or diagnostic fixture.
