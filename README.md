# Test Landing Page & UI Craft Suite

Repository eksplorasi perbandingan desain antarmuka modern menggunakan **React 19**, **Vite**, **Tailwind CSS v4**, dan **Bun**, membandingkan tiga filosofi pembuatan frontend:

```text
test-landing-page/
├── 01-auraedge-landing/    # Proyek 1: Full Tech SaaS Landing Page (AuraEdge Edge Platform)
├── 02-kroma-studio/        # Proyek 2: Neural Shader & Tactile 21st.dev Component Studio (Kroma Lab)
├── 03-impeccable-landing/  # Proyek 3: Editorial Industrial Precision (Chronicle Observability Engine)
├── .gitignore
└── README.md
```

---

## 🏛️ Perbandingan 3 Filosofi Desain

| Aspek | 01. AuraEdge (SaaS Landing) | 02. Kroma Lab (Component Studio) | 03. Chronicle (Pure Impeccable) |
|---|---|---|---|
| **Kategori / Mode** | Persuade (Tech Platform) | Operate (Interactive Playground) | Persuade & Instrument (Industrial Precision) |
| **Inspirasi Gaya** | Modern Developer Infrastructure | 21st.dev Tactile Micro-Interactions | Swiss Modernist / Dieter Rams / Braun Instruments |
| **Karakter Visual** | Dark OLED base dengan border halus | High-density canvas visualizer | Deep obsidian, copper accent, zero template cards |
| **Aturan Judul** | Standard clear title | Interactive title bar | **NO kicker / eyebrow badge** (Impeccable craft floor) |
| **Struktur Konten** | Simulator PoP + Sandbox + Pricing | Interactive Canvas + 4 Component Deck | Broadsheet schematic + Signal Scrubber + Ledger |
| **Skor Impeccable Detect** | **0 anti-patterns** | **0 anti-patterns** | **0 anti-patterns** |

---

## 📁 1. `01-auraedge-landing/` — Full Tech Landing Page
* **Global PoP Edge Simulator**: Pilihan 5 region global dengan latensi riil dan cURL command.
* **Interactive Stream Sandbox**: Minifier, Geo Headers, dan DLP Redactor dengan kalkulasi penghematan byte real-time.
* **Architecture Showcase**: Komparasi benchmark isolat V8 dan 2 kartu *magnetic spotlight* ala 21st.dev.
* **Dynamic Pricing Calculator**: Slider volume request dan durasi komputasi dengan kalkulasi biaya instan.
* **Technical FAQ**: Accordion teknis beroperasi penuh via keyboard.
* **Waitlist Form**: Siklus state lengkap (idle, loading, error validation, dan konfirmasi confetti).

```bash
cd 01-auraedge-landing
bun install
bun dev --port 5174
```

---

## 📁 2. `02-kroma-studio/` — Neural Shader & Component Studio
* **Procedural Canvas Engine**: 3 algoritma matematika (Plasma Waves, Particle Swarm, Voronoi Cells).
* **Tactile 21st.dev Component Deck**:
  * 01 // Magnetic 3D Euler Tilt Card dengan radial light spotlight
  * 02 // Kinetic Spring Sliding Tabs
  * 03 // Multi-State Morphing Action Button dengan progress simulation
  * 04 // Tactile Numeric Grid Stepper
* **Interface State Machine**: Simulasi state nominal, shimmer skeleton, empty state, dan error boundary.
* **Code Exporter**: Modal pengekspor kode komponen React mandiri.

```bash
cd 02-kroma-studio
bun install
bun dev --port 5173
```

---

## 📁 3. `03-impeccable-landing/` — Pure Impeccable Craft
Dibangun 100% mematuhi aturan ketat **Impeccable Craft Floor** (`craft-floor.md`):
* **Bebas dari Rut AI**: Judul tegas tanpa *kicker/eyebrow badge*, tanpa teks gradien, tanpa kartu-kartu kotak generik, tanpa *monospace as a costume*.
* **Live Dual-Trace Oscilloscope Canvas**: Kanvas 60 FPS merender gelombang sinyal pembawa (Channel A Copper) dan pulsa jam sinkron (Channel B Phosphor), dengan knob skala timebase (10µs - 200µs), voltage gain, dan kontrol freeze.
* **Historical Telemetry Scrubber**: Slider garis waktu temporer (-60s hingga 0s) dengan penanda anomali interaktif dan diagnosis akar masalah riil.
* **Deterministic Hardware Bus Schematic**: Skema pipa data zero-copy horizontal (AF_XDP socket, lockless ring buffer, AVX-512 SIMD, direct NVMe).
* **Engineering Pricing Ledger**: Buku besar transparan biaya node komputasi dedicated dengan slider ukuran kuorum klaster.
* **Command-Line Access Terminal**: Terminal registrasi berbasis identitas dengan validasi format dan generasi token sesi.
* **Browser Surfaces Theming**: Seleksi teks kustom (`::selection`), warna kursor caret, tabular figures (`font-feature-settings: 'tnum' 1, 'zero' 1`), dan scrollbar industri.

```bash
cd 03-impeccable-landing
bun install
bun dev --port 5175
```

---

## 🔍 Pengujian Otomatis Impeccable

Jalankan detektor 61 aturan kualitas desain Impeccable pada masing-masing folder:

```bash
# Uji Proyek 1
npx impeccable detect 01-auraedge-landing/src

# Uji Proyek 2
npx impeccable detect 02-kroma-studio/src

# Uji Proyek 3
npx impeccable detect 03-impeccable-landing/src
```
Semua proyek menghasilkan **0 anti-patterns / 0 findings**.
