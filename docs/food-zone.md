# Food Zone — implementation notes

## Entry points

- `/demos/food-zone` — interactive app, centered phone on desktop and edge-to-edge on narrow screens.
- `/demos/food-zone#ui-kit` — live UI kit using the same components and tokens.
- `/work/food-zone` — portfolio case and embedded demo.

## Scope

This is a local, interactive portfolio demonstration. Payments, delivery, map coordinates and courier responses are simulated. No bank details, external messages, real orders, authentication or geolocation requests are sent. State is stored under `food-zone:v1` in the current browser. No service worker is installed; offline use requires the page to have already loaded.

## User flow

Home → menu / restaurant → dish → cart → checkout → address / payment → order accepted → preparing → courier on the way → delivered → review.

Parallel flows: favorites, order history, reorder, cancellation before handover, notification links, profile editing, FAQ, preferences. Hash URLs support reload, browser Back and Forward. Unknown dishes/orders have a recovery screen.

## Data rules

- One kitchen in this demo; no multi-restaurant cart ambiguity.
- 1–20 units per available dish; zero removes an item.
- Delivery costs 49 som; free at a food subtotal of at least 1,000 som before discounts.
- FOOD30 discounts food by 30%, rounded to a whole som; delivery is not discounted.
- Each order snapshots items, quantities, prices, total, address and payment method.
- Order stages advance with explicit demo controls; no claim of real tracking.
- Orders can be cancelled before the courier stage. Reordering uses current catalog prices and replaces the basket only after confirmation if it is nonempty.
- Reviews require 1–5 stars and are editable. Messages are associated with individual orders.
- Persisted input is validated and bounded on restore. Malformed data falls back to usable defaults.

## UI and responsive behavior

Tokens are scoped to `.fz-stage`: orange `#ed9149`, cream `#fff7de`, paper `#faf8f4`, ink `#292722`. The existing Inter font is reused. CSS is isolated from the portfolio. Navigation, product cards, quantity controls, modal sheets, empty states, summary rows and maps are reusable components.

At widths up to 480px the device frame and simulated status bar disappear. The app uses `100dvh` and safe-area insets. On desktop a 402px device is centered with a height constrained to the viewport. Content scrolls inside the phone; navigation remains anchored. No transform-based screen scaling.

Sheets support Escape, focus trapping and focus restoration, with the background inert. Buttons have accessible labels, active tabs expose their state, status messages use live regions, reduced-motion preferences are honored, and form fields use 16px text on phones to avoid focus zoom.

## Design source and known fidelity gap

Source: https://www.figma.com/design/xxn9Su3GyHrbWA5nPJM3hG/Untitled?node-id=0-1

The initial screen overview was inspected visually. Both design-context and asset-download APIs return an edit-access error for the connected account. Exact measurements, type styles and original photos/icons could not be extracted. Current UI is an implementation of that visual direction plus newly designed missing states, not a claimed pixel-perfect reproduction. Existing Lucide components provide icons. The following temporary photos are downloaded locally for reliable loading; replace them with the original Figma assets after access is granted.

| Local image | Temporary source |
| --- | --- |
| biryani.jpg | https://images.unsplash.com/photo-1512058564366-18510be2db19 |
| pizza.jpg | https://images.unsplash.com/photo-1565299624946-b28f40a0ae38 |
| burger.jpg | https://images.unsplash.com/photo-1568901346375-23c9450c58cd |
| pasta.jpg | https://images.unsplash.com/photo-1473093295043-cdd812d0e601 |
| cake.jpg | https://images.unsplash.com/photo-1533134242443-d4fd215305ad |
| salad.jpg | https://images.unsplash.com/photo-1512621776951-a57141f2eefd |
| noodles.jpg | https://images.unsplash.com/photo-1569718212165-3a8278d5f624 |
| dessert.jpg | https://images.unsplash.com/photo-1578985545062-69928b1d9587 |

## Verification

Run `node --test tests/food-zone.test.mjs` with Node 22.18+ (native TypeScript stripping), `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

Browser checks cover search/no results, favorite toggling, quantity and promo validation, missing address, demo payment choice, order creation, reload persistence, delivery progress, chat, rating, cancellation, history/reorder, responsive layout and portfolio integration.

## Follow-up after Figma access

1. Inspect individual frames with design-context and extract exact tokens and asset bytes.
2. Replace the temporary images and compare each existing screen at its original size.
3. Preserve the added interactions and state screens, adjusting their visual language to the exact source.
4. If desired, document the completed User Flow and UI Kit on separate Figma pages. No Figma files have been modified by this implementation.

Production backend, actual courier tracking, payment gateways, real chat, auth and push notifications are separate integration work.
