# Design system (Stitch + DESIGN.md)

- **Surfaces:** Prefer tonal layers (`surface`, `surface-container-low`, `surface-container`) over heavy 1px borders.
- **Ghost borders:** Use `ghost-border` utility (15% `outline-variant`) when a boundary is required for a11y.
- **Primary CTA:** `gradient-primary-cta` — lithographic gradient from `primary` to `primary-container`.
- **Citations / chips:** `secondary-container` background, `on-secondary-container` text, tight radius (`rounded-DEFAULT`).
- **Floating layers:** `shadow-cloud` only for modals, menus, and floating panels — not static cards.
- **Typography:** `font-headline` (Manrope) for display; `font-body` (Inter) for dense AI text and forms.
- **Icons:** Material Symbols Outlined, 24px optical size, loaded in root layout.
