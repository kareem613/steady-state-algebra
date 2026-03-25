# Design System Documentation: The Tactile Logic Lab

## 1. Overview & Creative North Star
This design system is built for a premium educational experience where the rigor of algebra meets the fluidity of a creative sandbox. The Creative North Star is **"The Tactile Logic Lab."**

We are moving away from the "standard" educational software look (flat, bright, childish) toward an aesthetic that feels like a high-end, dark-mode IDE mixed with an editorial math journal. We achieve this through **Intentional Asymmetry**: the UI is not a rigid centered grid, but a composition of floating mathematical modules. We use overlapping layers and high-contrast typography scales to create a sense of depth, suggesting that the user is not just looking at a screen, but manipulating a physical, glowing machine of logic.

## 2. Colors & Surface Philosophy
The palette is rooted in deep slate blues and grays to reduce eye strain during long problem-solving sessions, punctuated by vibrant, "living" accents for mathematical feedback.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. In this system, **borders are prohibited for sectioning.** Boundaries must be defined solely through:
- **Background Color Shifts:** A `surface-container-low` component sitting on a `surface` background.
- **Tonal Transitions:** Using the hierarchy of container tokens to define prominence.

### Surface Hierarchy & Nesting
Think of the interface as a series of physical layers stacked on a deep workbench (`surface-dim` #040e1f).
- **The Workbench:** Use `surface-dim` for the global background.
- **The Sandbox Area:** Use `surface-container-low` to define the main workspace.
- **Interactive Blocks:** Use `surface-container-high` or `surface-container-highest` for individual algebraic units to make them "pop" toward the user.

### The Glass & Gradient Rule
Floating UI elements (like a minimalist command prompt or tool palettes) should utilize **Glassmorphism**. Apply a semi-transparent `surface-variant` with a heavy `backdrop-blur` (12px–20px).
- **Signature Textures:** For primary actions, move beyond flat fills. Use a subtle linear gradient from `primary` (#3bbffa) to `primary_container` (#22b1ec) at a 135-degree angle to give CTAs a "lit from within" professional polish.

## 3. Typography
The typographic identity relies on the tension between the modern, eccentric **Space Grotesk** and the highly legible, geometric **Manrope**.

- **Display & Headlines (Space Grotesk):** These should be used for level titles and "Big Math" moments. Space Grotesk's quirky terminals provide the "playful" aspect of the academic aesthetic. Use `display-lg` for victory states and `headline-md` for module headers.
- **Title & Body (Manrope):** Use Manrope for UI instructions and labels. It provides an authoritative, editorial feel.
- **The Math Layer (Monospace):** While the system scales use sans-serifs, all mathematical variables and command-line inputs must be set in a high-quality Monospace font (to be paired with the system). This distinguishes "System UI" from "Mathematical Data."

## 4. Elevation & Depth
In this system, elevation is conveyed through **Tonal Layering** rather than traditional drop shadows.

- **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural "recessed" look. Placing a `surface-bright` element on `surface-dim` creates a "raised" look.
- **Ambient Shadows:** When an element must "float" (like a grabbed algebraic term), use a shadow with a blur of `24px` and an opacity of `6%`. The shadow color must be a tinted version of `on-surface` (#dbe6fe), never pure black, to maintain the "glowing" atmosphere.
- **The "Ghost Border" Fallback:** If a container lacks enough contrast against its background, use a **Ghost Border**: the `outline-variant` token at 15% opacity. 100% opaque borders are strictly forbidden.

## 5. Components

### The Minimalist Command Prompt
The heart of the sandbox. It should appear as a `surface-container-lowest` bar at the bottom of the screen. No border. Use `label-md` in `primary` for the prompt symbol (`>`) and a blinking cursor.

### Algebraic "Blocks"
The units of the sandbox.
- **Shape:** Use `rounded-lg` (1rem) for a tactile, "clickable" feel.
- **States:**
- **Neutral:** `surface-container-high` background.
- **Correct/Success:** `on-secondary-container` background with `secondary` text.
- **Warning/Error:** `error_container` background with `on_error_container` text.
- **Interaction:** On hover, the block should shift from `surface-container-high` to `surface-bright`.

### Tactile Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`). `rounded-full`.
- **Secondary:** `surface-container-highest` fill with `primary` text. No border.
- **Tertiary:** Ghost style. No background, `primary` text, `rounded-sm`.

### Input Fields & Cards
- **Forbid Dividers:** Do not use horizontal lines to separate list items or card sections. Instead, use vertical white space (from the Spacing Scale, e.g., `8` or `10`) or a subtle background shift to `surface-container-low`.
- **Input:** Use `surface-container-lowest` with a `2px` bottom-only highlight in `primary` when focused.

## 6. Do's and Don'ts

### Do:
- **Use Intentional Asymmetry:** If you have three blocks, don't always center them. Offset them slightly or use varying `surface-container` shades to create a "scattered laboratory" feel.
- **Embrace Breathing Room:** Use the `20` and `24` spacing tokens to let the math "breathe." Complex algebra requires high negative space to remain approachable.
- **Layer with Glass:** Use backdrop blurs for overlaying tutorials or hint modals to keep the user grounded in their sandbox workspace.

### Don't:
- **Don't use 1px solid borders:** It breaks the high-end editorial feel and makes the app look like a generic dashboard.
- **Don't use pure black shadows:** They "dirty" the slate blue palette. Always tint your shadows with the `on-surface` color.
- **Don't crowd the UI:** If a screen feels busy, increase the spacing rather than adding more lines or boxes. Use the `0.5rem` to `1.5rem` roundedness scale to keep everything feeling soft and tactile.
