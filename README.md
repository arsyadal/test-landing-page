# Test Landing Page & UI Craft Suite

Repository eksperimen UI/UX modern berbasis **React 19**, **Vite**, **Tailwind CSS v4**, dan **Bun**, dirancang menggunakan standar **UI/UX Pro Max**, komponen taktil terinspirasi **21st.dev**, mematuhi filosofi **Anti-Slop**, serta dioptimasi untuk pengujian dengan **Impeccable** (v4.2.2).

Repository ini terdiri dari 2 folder proyek terpisah:

```
test-landing-page/
├── 01-auraedge-landing/    # Landing Page Utuh (AuraEdge Distributed Edge Runtime)
├── 02-kroma-studio/        # Component & Neural Shader Playground (Kroma Lab)
├── .gitignore
└── README.md
```

---

## 📁 1. `01-auraedge-landing/` — Full Tech Landing Page
Landing page produk SaaS / Developer Tool yang utuh dan fungsional:
* **Global PoP Edge Simulator**: Pilihan 5 region (Tokyo, Frankfurt, Silicon Valley, Singapore, London) dengan visualisasi hop propagasi dan perintah cURL.
* **Interactive Stream Sandbox**: Pengujian kompresi JSON, injeksi header geolokasi, dan redaksi token DLP dengan metrik reduksi byte real-time.
* **Architecture Showcase**: Komparasi benchmark isolat V8 dan dua kartu *magnetic spotlight* ala 21st.dev.
* **Dynamic Pricing Calculator**: Slider volume request bulanan & durasi komputasi dengan kalkulasi biaya dan estimasi penghematan cloud.
* **Technical FAQ**: Accordion teknis dengan navigasi keyboard (`Enter`/`Space`).
* **Developer Onboarding Form**: Form interaktif dengan validasi format email, spinner loading, dan selebrasi confetti.
* **Dual Theme**: Dark Mode (OLED) & Light Mode dengan kontras WCAG AA.

### Menjalankan `01-auraedge-landing`:
```bash
cd 01-auraedge-landing
bun install
bun dev --port 5174
```

---

## 📁 2. `02-kroma-studio/` — Neural Shader & Component Studio
Studio eksplorasi visual dan komponen mikro taktil:
* **Procedural Canvas Shader Engine**: 3 mode matematika real-time (Plasma Waves, Particle Swarm, Voronoi Cells) dengan slider frekuensi, velocity, dan matriks titik.
* **Tactile 21st.dev Component Deck**:
  * 01 // Magnetic 3D Euler Tilt Card dengan radial cursor light beam
  * 02 // Kinetic Spring Sliding Tabs dengan keyboard navigation
  * 03 // Multi-State Morphing Action Button dengan progress simulation & confetti
  * 04 // Tactile Numeric Grid Stepper
* **Interface State Machine Simulator**: State active, loading shimmer, empty repository, dan error recovery boundary.
* **Production Code Exporter**: Modal pengekspor kode komponen React mandiri dengan salin ke clipboard.

### Menjalankan `02-kroma-studio`:
```bash
cd 02-kroma-studio
bun install
bun dev --port 5173
```

---

## 🔍 Cara Menguji dengan Impeccable

### 1. Deteksi Otomatis Anti-Pattern (CLI Detector)
Jalankan detektor 61 aturan kualitas desain Impeccable langsung dari root repository:

```bash
# Uji folder 01 (AuraEdge Landing Page)
npx impeccable detect 01-auraedge-landing/src

# Uji folder 02 (Kroma Component Studio)
npx impeccable detect 02-kroma-studio/src
```

### 2. Perintah Prompt Impeccable di AI Agent (OMP / Claude)
Gunakan perintah Impeccable untuk mengevaluasi dan memoles desain:

| Perintah | Deskripsi | Contoh Pemakaian |
|---|---|---|
| `/audit [target]` | Evaluasi teknis: aksesibilitas, kontras, responsivitas, dan performa | `/audit 01-auraedge-landing` |
| `/critique [target]` | Tinjauan desain UX mendalam dengan heuristic scoring | `/critique 01-auraedge-landing` |
| `/polish [target]` | Poles kualitas akhir antarmuka sebelum siap rilis | `/polish 01-auraedge-landing` |
| `/bolder [target]` | Tingkatkan visual jika antarmuka terasa terlalu aman atau datar | `/bolder 02-kroma-studio` |
| `/quieter [target]` | Redam elemen jika visual terlalu mencolok atau ramai | `/quieter 01-auraedge-landing` |
| `/distill [target]` | Sederhanakan antarmuka, hapus elemen yang tidak esensial | `/distill 01-auraedge-landing` |
| `/harden [target]` | Uji ketahanan produksi (edge cases, error boundary, i18n) | `/harden 01-auraedge-landing` |
