# Free openings and the full library unlock

One non-consumable purchase opens every path and ending in the three current books, including future updates to those books. No subscription; no promise about future books or V2. The proposed US price is $4.99. The app displays the actual localized StoreKit price, never a hardcoded selling price.

Product identifier: `com.jeffnovotny.pathsofwonder.full_library`.
App bundle: `com.jeffnovotny.pathsofwonder`.

## Editorial boundaries

Free access is an explicit set of scene IDs in `src/content/previewAccess.js`, separate from the unchanged authored files. It is not a read counter, scene-number cutoff, or screen/page count. Rereading, changing type size, undoing choices, and exploring alternate free branches do not consume anything.

| Book | Free opening and stopping point | First locked destination | Chapters along a single route |
| --- | --- | --- | --- |
| The Can Opener | Meet Asher, build/use the Can Opener, explore the shield/scrap branches, and build the Wrist Wrock-It. Target Practice is also free. Stops before the Load-Bot confrontation. | `scene_024` — Load-Bot in the Loading Zone | 10–15 |
| The Summoned Mage | Meet Elliana, learn why you were summoned, choose/cast the first spell, and leave the cave. The attempted return teleport is included so that little detour finishes freely. Stops before the journey through the valley/forest. | `scene_019` — Trail to Town; `scene_023` — Mountains; `scene_025` — Forest | 10–11 |
| The Space Walker | Arrive, meet the crew, try the rescue approaches, save the Genesis passengers and crew, and read Everyone Aboard. Stops at the question about the lost planets, before Aster/Trace explain the World-Eater. | `scene_024` — The Captain Tells It; `scene_025` — Trace Tells It | 11–13 |

The Can Opener has 23 free scenes across all alternate routes, Mage 19, Space Walker 23. The remaining arcs/endings require the unlock. Automated graph checks enumerate every opening route, verify all free scenes exist/reach the reviewed boundary, and ensure no ending is free. Revisit this manifest after future story imports; do not silently change scene identities to fit it.

## Reader behavior

- A choice leading out of the preview opens a dismissible parchment purchase sheet. It does not modify the bookmark/history.
- A successful purchase or restore continues the still-open choice exactly once through the existing save transaction. Closing the sheet cancels that pending navigation, even if Ask to Buy is approved later.
- Old paid bookmarks remain intact. Their content is withheld until access is verified; closing returns to the bookshelf.
- Saved passages use the same access rule, including their excerpts. The saved material is retained, not deleted.
- Free openings remain readable during store outages. Product-loading failure never removes a verified entitlement. StoreKit's signed local transaction records support offline ownership checks without an editable web-storage flag.
- The app observes StoreKit transaction updates and refreshes on foreground, including refunds/revocations and delayed approvals. All native query responses carry monotonic revisions so old results cannot replace newer access.
- Restore is available from the bookshelf's library sheet and at the boundary, even when buying is restricted/unavailable. Only an explicit Restore tap calls `AppStore.sync()`.
- All content is still bundled locally. This is app-level paid access, not encrypted-content DRM or a server delivery system.

## Development and local testing

`Purchases.storekit` defines a fake $4.99 non-consumable, with Family Sharing enabled for local tests. This does **not** create or change anything in App Store Connect.

Two shared Xcode schemes:

- **App:** normal run/archive. No StoreKit testing configuration attached.
- **Purchases:** Debug run with the local `.storekit` configuration; the test action runs `LibraryStoreTests` with a test-bundle copy of that configuration. The StoreKit file is not an App target resource and must not appear in a release app.

The native **Debug** build and Vite development server expose a session-only **Author access (development only)** checkbox on the bookshelf. It allows author review without a purchase and does not create an entitlement. Turn it off to exercise the real preview boundary. Native Release/TestFlight omit both the override method and developer capability. Browser production builds also omit developer access. Developer scene navigation obeys the access rule unless author access is enabled.

Commands (from `webapp/`):

```sh
npm run check
npm run ios:sync
npm run ios:test:purchases
npm run ios:archive
# Optional isolated WebKit regression tests; use an existing local Vite server.
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs READER_URL=http://127.0.0.1:5191 node scripts/check-purchases.mjs
```

The browser fixture under `test/browser/purchases.html` uses a synthetic store adapter and disposable local storage. Run only in an isolated test browser context. It is not part of the production Vite entry point. Its tests cover all three boundaries, localized-price rendering, purchase/cancel/error/pending/restore, late approval after dismissal, revocation, paid resume and saved passages, six phone/tablet viewports, and large system text.

The native test suite exercises the real `LibraryStore` actor and StoreKitTest: product/price, purchase, relaunch ownership, restore, refund, Ask to Buy observer delivery, cancellation, failed product loading with owned content, and session-only author access. It fails before attempting a purchase or restore when local products do not load, to avoid falling through to a real Apple Account prompt.

## Apple-side setup before TestFlight purchase testing

This remains external configuration; it has not been submitted or published by this code change.

1. Use the App Store Connect record for the existing bundle ID; create it if it does not exist. Account holder must complete any required Paid Apps agreement/tax/banking setup themselves.
2. Create **Non-Consumable**, reference name **Full Library**, product ID exactly `com.jeffnovotny.pathsofwonder.full_library`.
3. Set the US price to **$4.99**, review localized prices and availability, and add the product localization. Suggested display name: **Unlock All Three Books**. Description: **Every path and ending in The Can Opener, The Summoned Mage, and The Space Walker.**
4. Enable Family Sharing if desired. The app only advertises it when StoreKit reports the actual product as family-shareable. Enabling the local configuration does not enable the real product.
5. Supply review information and a purchase-sheet screenshot. Submit the first IAP with the app version when ready for review. Do not change the product ID after release.
6. Archive with **Release** using the **App** scheme. Upload to TestFlight when the writing/release is ready. The local author override must be absent.
7. In sandbox/TestFlight verify a fresh free account, purchase cancellation, successful purchase and restore on another device, Ask to Buy approval while app is backgrounded/closed, unavailable network/store, offline relaunch after ownership, refund/revocation, and Family Sharing if enabled. Check both phone and iPad. TestFlight purchases are free test transactions and do not carry into the public release.

## Verification record — September 24, 2026

- `npm run check`: lint, 136 tests, story diagnostics and production build pass. The existing bundled-story chunk-size warning remains.
- WebKit: 36 purchase-sheet book/device/type layouts and 11 app-level purchase flows pass, including rotation with a pending choice. The existing 54 all-book reader layout cases also pass.
- Native Debug/test build and unsigned Release archive succeed. The archive's 157 web assets match the production build; release checks confirm no native author override, developer capability, local StoreKit file or test bundle ships.
- All 236 tracked story, draft, Python and artwork files in the protected baseline remain byte-for-byte unchanged.
- Actual StoreKit transactions are **not yet verified**: this Mac's iOS 26.5 simulator reports `SKInternalErrorDomain Code=3` / “Error saving configuration file,” cannot load the local product, and falls through toward an account prompt. Both command-line (unsigned and ad-hoc signed) and Xcode test attempts reproduced the issue. No real purchase or account entry was performed. Use a working simulator runtime or complete sandbox verification on a device before calling purchases release-ready.
- This matches a [reported Apple StoreKitTest runtime problem](https://developer.apple.com/forums/thread/826971); the diagnosis is based on the matching errors here, not a claim that our unexecuted transaction tests passed.

Apple references: [StoreKit In-App Purchase](https://developer.apple.com/documentation/storekit/in-app-purchase), [current entitlements](https://developer.apple.com/documentation/storekit/transaction/currententitlements), [local StoreKit testing](https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode), [sandbox setup](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/overview-of-testing-in-sandbox), [App Store Connect purchase setup](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/overview-for-configuring-in-app-purchases).
