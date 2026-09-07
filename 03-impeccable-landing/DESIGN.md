# Design System: Chronicle Editorial Precision

## Thesis
Chronicle owns the physical authority of precision laboratory instruments and Swiss technical publications. It refuses the ubiquitous SaaS rut: rounded card mosaics, decorative gradient text, and kicker badges above headings. Every visual mark serves spatial orientation, legibility, and measurement fidelity.

## Color System (Committed Industrial Field)
- Base Ground: `#0C0D10` (Deep obsidian slate)
- Instrument Plate: `#14171C` (Tactile machined chassis surface)
- Structural Hairline: `#232834` (Crisp 1px boundary grid)
- Primary Text: `#F1F4F7` (High-contrast scientific readout)
- Secondary Muted: `#8D96A5` (Calibrated WCAG AA ratio $\ge 5.4:1$)
- Instrumental Accent: `#E07A5F` (Precision copper for live signal trigger)
- Phosphor Green: `#10B981` (Nominal stream status)

## Typography & Measurement Hierarchy
- Primary Technical Display & Numerals: `JetBrains Mono` with tabular features enabled (`font-feature-settings: 'tnum' 1, 'zero' 1`).
- Editorial Prose & Headings: `Plus Jakarta Sans` / `IBM Plex Sans` with tight proportional balance and 68ch maximum line measure.

## Refuse List (Impeccable Craft Floor)
1. No kicker or eyebrow labels above headings. Headings speak directly with deliberate scale and weight.
2. No gradient text. Contrast and hierarchy stem from scale and optical weight.
3. No repeating card mosaics with icons. Layout utilizes fluid broadsheet columns and structured data dividers.
4. No zero-offset colored halos or decorative glassmorphism.
5. No monospace as costume. Monospace is reserved exclusively for signal vectors, timestamps, and memory coordinates.

## Browser Surfaces
- Selection: `::selection { background: rgba(224, 122, 95, 0.25); color: #F1F4F7; }`
- Caret: `caret-color: #E07A5F;`
- Focus Rings: Visible 2px outline with 2px offset (`outline: 2px solid #E07A5F`).
- Tabular Numerals: Enforced across all streaming metrics.
