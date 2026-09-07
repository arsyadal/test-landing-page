# Design System: Kroma Lab

## Identity & Purpose
Kroma Lab is an interactive neural shader and tactile component laboratory built for frontend developers and creative technologists. It provides real-time WebGL/Canvas shader manipulation, tactile UI components inspired by the craft of 21st.dev, and instant production-ready code extraction.

## Design Dials
- ENERGY: 2 (Balanced, tactile, restrained developer tool aesthetic)
- RHYTHM: 2 (Structured layout with focal shifts, avoiding repetitive template cards)
- MOTION: 2 (Intentional fluid canvas animation and micro-interactions, respecting reduced motion)

## Color Architecture
Following Anti-Slop R-29 (2-3 core colors plus 1 deliberate accent):

### Dark Mode (Primary Default for Creative Shader Studio)
- Background Base: `#0B0D13` (Deep graphite void that maximizes shader contrast)
- Card & Surface: `#131722` (Subtle elevated panel surface)
- Border & Separation: `#23293D` (Crisp 1px boundary lines)
- Text Foreground: `#F8FAFC` (WCAG AAA contrast on dark base)
- Text Muted: `#94A3B8` (High legibility subtext, WCAG AA compliant)
- Deliberate Accent: `#10B981` (Cyber Emerald for execution, active toggles, and confirmed states)
- Warning/Status Accent: `#F59E0B` (Warm amber for performance alerts and parameter thresholds)

### Light Mode (Clean Precision Studio)
- Background Base: `#F8FAFC` (Crisp architect paper tone)
- Card & Surface: `#FFFFFF` (Pure card surface with crisp boundary)
- Border & Separation: `#E2E8F0` (Delicate structural stroke)
- Text Foreground: `#0F172A` (Deep slate for maximum legibility)
- Text Muted: `#64748B` (Secondary text maintaining 4.8:1 contrast)
- Deliberate Accent: `#059669` (Darkened emerald maintaining WCAG AA contrast on white)

## Typography
- Code, Parameters, Headings: `JetBrains Mono`, monospace
  - Reason: Provides technical precision and exact character alignment for mathematical parameters and shader uniform values.
- UI Labels, Prose, Navigation: `IBM Plex Sans`, sans-serif
  - Reason: High x-height and distinct geometric letterforms engineered specifically for developer interfaces.

## Craftsmanship & Anti-Slop Safeguards
1. No em dash characters in any UI text or documentation (R-02).
2. No generic blue-to-purple gradient overlays or full-page orbs (R-01).
3. No fake marketing statistics or fictional testimonials (R-17, R-18, R-36). All displayed values represent real runtime metrics (canvas frame rate, particle density, memory buffer).
4. Every interactive element has functional feedback: sliders mutate canvas uniforms in real time, copy buttons write actual code to clipboard, presets switch live shader algorithms (R-26).
5. Triple UI states implemented: active playground, loading state with skeleton, and empty/error threshold state (R-27).
6. Visible keyboard focus rings on every interactable control (`focus-visible:ring-2 focus-visible:ring-emerald-500`) (R-32).
7. Full responsive adaptation across 375px, 768px, 1024px, and 1440px displays without horizontal scroll (R-03).
