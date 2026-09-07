# Design System: AuraEdge Platform

## Brand Identity & Purpose
AuraEdge is an ultra-low-latency edge computation and stream distribution network. It compiles developer event handlers into WebAssembly and executes them at global point-of-presence (PoP) locations with sub-5ms cold starts.

## Design Dials
- ENERGY: 2 (Balanced, tactile, precise developer platform aesthetic)
- RHYTHM: 2 (Asymmetric layout structure: terminal simulator, interactive stream transformer, spotlight feature cards, dynamic pricing calculator, technical FAQ, and waitlist)
- MOTION: 2 (Subtle interactive ray traces, spring-like slider response, micro-confetti on submission, reduced-motion respected)

## Color Palette (Anti-Slop R-29: 2-3 Core Colors + 1 Deliberate Accent)
### Dark Mode (Primary Developer Environment)
- Base Background: `#090A0F` (OLED-grade deep slate)
- Card & Surface: `#11141F` (Elevated panel surface)
- Border & Stroke: `#1E2438` (Crisp 1px boundary)
- Foreground Text: `#F8FAFC` (WCAG AAA contrast)
- Muted Text: `#94A3B8` (WCAG AA compliant)
- Primary Accent: `#10B981` (Cyber Emerald for execution, active toggles, low-latency metrics)
- Status Accent: `#F59E0B` (Warm Amber for packet trace and warning indicators)

### Light Mode (Architect Precision View)
- Base Background: `#F8FAFC` (Clean architectural grey-white)
- Card & Surface: `#FFFFFF` (Crisp elevated card)
- Border & Stroke: `#E2E8F0` (Delicate structural stroke)
- Foreground Text: `#0F172A` (Deep slate for maximum legibility)
- Muted Text: `#475569` (Secondary text maintaining 5.2:1 contrast)
- Primary Accent: `#059669` (Darkened emerald for WCAG AA compliance on white)

## Typography Strategy
- Heading & Technical Metrics: `JetBrains Mono`, monospace
- UI Navigation, Copy & Body: `IBM Plex Sans`, -apple-system, sans-serif

## Anti-Slop Rules (R-01 to R-38 Compliance)
1. Absolutely no em dash characters in any UI copy (R-02).
2. No generic blue-to-purple gradients, harsh neon, or full-page blurred orbs (R-01).
3. No fake statistics or fictional testimonials (R-17, R-18, R-36). Real architecture specs and interactive user-driven calculators only.
4. No dead controls: every button, region selector, pricing slider, FAQ accordion item, and waitlist form actively responds (R-26).
5. Triple UI states implemented for all form and data displays (R-27).
6. Visible focus ring on every interactive element (R-32).
7. Mobile layout tested at 375px with zero horizontal overflow (R-03).
