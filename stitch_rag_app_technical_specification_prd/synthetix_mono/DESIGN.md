# Design System Specification: The Architectural Intelligence (AI) Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Precision Curator"**

In the realm of RAG (Retrieval-Augmented Generation) and technical AI, the interface must act as a transparent window into complex data. We are moving away from the "clunky dashboard" aesthetic toward an editorial, high-fidelity experience. The "Precision Curator" avoids the clutter of traditional grids by using **intentional white space, tonal layering, and typographic authority.**

This system breaks the "template" look by treating the UI as a series of high-precision instruments. We leverage asymmetric layouts—where the sidebar might be a heavy `surface-container-high` and the main canvas a breathable `surface-container-lowest`—to guide the eye without the need for aggressive structural lines.

---

## 2. Colors & Surface Architecture
The palette is rooted in deep slates and technical blues, designed to feel both authoritative and computationally efficient.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid, high-contrast borders for sectioning. 
Structure must be defined through:
1.  **Background Color Shifts:** A `surface-container-low` component sitting on a `surface` background.
2.  **Tonal Transitions:** Using the spacing scale to let the background "breathe" around content.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers. 
- **Base Layer:** `surface` (#faf8ff) or `surface-bright`.
- **Secondary Workspace:** `surface-container` (#eaedff).
- **Interactive Elements:** `surface-container-highest` (#dae2fd) for active states.
- **Nesting Logic:** Instead of a flat grid, nest a `surface-container-lowest` card inside a `surface-container-low` section. This "recessed" look creates depth without adding visual noise.

### The "Glass & Gradient" Rule
To elevate the "technical" feel, use **Glassmorphism** for floating elements (like command palettes or hover-state tooltips). 
- **Token:** `surface-container-low` at 80% opacity + 12px Backdrop Blur.
- **Signature Texture:** Use a subtle linear gradient on primary CTAs: `primary` (#003ec7) to `primary-container` (#0052ff). This adds a "lithographic" polish that feels premium rather than flat.

---

## 3. Typography
We utilize a dual-font strategy to balance technical rigor with editorial clarity.

- **Display & Headlines (Manrope):** The wider aperture and geometric construction of Manrope provide a modern, high-end feel. Use `display-lg` (3.5rem) for hero moments and `headline-sm` (1.5rem) for section starts.
- **Body & Labels (Inter):** Inter is the workhorse. Its high x-height ensures readability for dense AI-generated logs and RAG citations.
- **The Hierarchy Rule:** Always pair a `label-sm` (All Caps, 0.05em tracking) with a `title-lg` to create a "Developer-Luxury" contrast.

---

## 4. Elevation & Depth
Depth is a functional tool, not a decoration. We use **Tonal Layering** to define importance.

- **The Layering Principle:** Avoid shadows for static cards. Instead, use a `surface-container-low` card on a `surface` background. The slight shift in saturation provides enough "lift."
- **Ambient Shadows:** For floating modals, use a "Cloud Shadow":
  - `box-shadow: 0 16px 40px rgba(19, 27, 46, 0.06);` (Using a tinted `on-surface` color).
- **The "Ghost Border":** If accessibility requires a boundary, use a 1px border with `outline-variant` (#c3c5d9) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Primary Actions (Buttons)
- **Primary:** Gradient fill (`primary` to `primary-container`), `md` (0.375rem) roundedness. No border.
- **Secondary:** `surface-container-highest` fill with `primary` text.
- **State:** On hover, increase the gradient intensity; never use a black overlay.

### RAG Citation Chips
- Use `secondary-container` (#d5e3fc) with `on-secondary-container` (#57657a) text.
- Shape: `sm` (0.125rem) roundedness to maintain a "technical" sharp edge.

### Input Fields & Search
- **Container:** `surface-container-low` with a `Ghost Border`.
- **Focus State:** Transition the border to 100% `primary` opacity and add a subtle `primary-fixed` (2px) outer glow.
- **Text:** Always use `body-md` (0.875rem) for input text to maintain a professional density.

### Data Cards & Lists
- **Rule:** **Strictly forbid 1px dividers.** 
- **Separation:** Use `spacing-6` (1.3rem) of vertical white space or a subtle background toggle between `surface-container-lowest` and `surface-container-low`.

### Technical Tooltips
- Use `inverse-surface` (#283044) with `inverse-on-surface` (#eef0ff) text.
- Apply a 4px `backdrop-blur` to the layer behind the tooltip to focus the user’s eye on the technical data.

---

## 6. Do's and Don'ts

### Do
- **Do** use `spacing-10` and `spacing-12` for section margins to create an "expensive" editorial feel.
- **Do** use `tertiary` (#952200) sparingly for critical warnings or "Live" AI processing indicators.
- **Do** align all icons to a strict 24px bounding box to maintain the technical grid.

### Don't
- **Don't** use pure black (#000000) for text. Use `on-surface` (#131b2e) to maintain tonal harmony with the deep slates.
- **Don't** use "Extra Bold" weights. Rely on the `display` scale and color shifts to create emphasis.
- **Don't** use standard 4px "Card Shadows." If the layer isn't floating (like a menu), it doesn't need a shadow; use a surface shift instead.