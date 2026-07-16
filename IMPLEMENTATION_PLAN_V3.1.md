# Rencana Implementasi: Refactoring Modular & Peningkatan Kualitas Visual 3D Premium (GiverSource Sandbox)

> **Catatan untuk Antigravity di IDE (VS Code / JetBrains):**
> File ini adalah panduan arsitektur dan peningkatan visual yang telah disetujui oleh pengguna (`IMPLEMENTATION_PLAN_V3.1.md`). Tolong ikuti langkah-langkah di bawah ini secara bertahap saat melakukan refactoring pada `src/App.jsx`.

---

## 1. Tujuan & Scope Peningkatan

### A. Refactoring Arsitektur (*Clean Code & Modularity*)
Mengubah *single-file monolith* `src/App.jsx` (~1.895 baris / 85 KB) menjadi arsitektur modular berskala besar yang bersih, mudah dirawat, dan cepat di-compile oleh Vite.

### B. Peningkatan Kualitas Visual 3D (*Visual Excellence & Dynamic Rendering*)
1. **Pencahayaan Nyata Lokal (*Local Dynamic Point & Emissive Lighting*):**
   - Memasangkan sumber cahaya nyata (`<pointLight />`) pada **Api Unggun (`Campfire3D`)** dan **Lampu (`Lamp3D`)** saat mode malam (`night`). Cahaya kuning keemasan/oranye akan menerangi tanah, batu, dan pepohonan di sekitarnya dengan gradasi yang realistis.
2. **Material PBR (*Physically Based Rendering*) & *Emissive Glow*:**
   - Mengganti material polos/flat menjadi material berkelas dengan properti *roughness*, *metalness*, dan *emissive glow* (khususnya untuk **Kristal**, **Monumen**, **Air Mancur**, dan **Batu**), sehingga memantulkan cahaya matahari (`Day`) dan cahaya bulan (`Night`) dengan indah.
3. **Penyempurnaan Kontur Pulau Melayang (*Floating Cosmic Island Terrain*):**
   - Mengubah bidang datar tanah tipis saat ini menjadi **Pulau 3D Melayang Nyata (*Floating Island Geometry*)** dengan lapisan permukaan rumput/tanah di atas, bibir pantai/bebatuan di samping, serta lapisan tebing batu (`cliff`) gantung di bagian bawah pulau yang melayang di atas galaksi Andromeda.
4. **Animasi Mikro & Efek Partikel:**
   - Menambahkan kilauan partikel halus pada air mancur dan denyut cahaya (*pulsing glow*) pada kristal kosmik.

### C. Peningkatan Fitur Presisi & Interaktivitas UI
1. **Fitur *Snap to Grid* (Presisi Arsitektur):**
   - Menambahkan *toggle switch* **"📐 Snap Grid"** di UI agar penempatan dan pergeseran objek otomatis mengunci pada kelipatan $1.0\text{ meter}$ atau $0.5\text{ meter}$, memudahkan penataan kota/taman yang presisi dan lurus.
2. **Fitur *Photo / Screenshot Mode* (`[📸 Ambil Foto]`):**
   - Tombol baru di header untuk mengambil *snapshot* HD dari Canvas 3D tanpa elemen UI (*clean rendering export*), langsung mengunduh gambar berformat PNG beresolusi tinggi.
3. **Polesan UI Glassmorphism Premium:**
   - Menyempurnakan tampilan panel *Telemetry Badge*, *Inventory Bar*, dan *Transform Floating Toolbar* dengan desain *glassmorphism* modern (*backdrop-blur-md*, border neon transparan, dan tipografi bersih).

---

## 2. Target Struktur Folder Modular Baru

Pecah `src/App.jsx` ke dalam struktur berikut:

```text
src/
├── components/
│   ├── icons/
│   │   └── SvgIcons.jsx               # Kumpulan 13+ ikon vector custom (IconFlower, IconTree, IconSun, IconGalaxy, dll.)
│   ├── objects/
│   │   ├── PlacedObjectWrapper.jsx    # Pembungkus interaktif objek (selection, bounce animation, shadow preview)
│   │   ├── NatureObjects.jsx          # Flower3D, Tree3D, Rock3D, Cactus3D, Mushroom3D dengan PBR materials
│   │   ├── StructureObjects.jsx       # Tower3D, Pyramid3D, Monument3D, Fountain3D (animasi air)
│   │   └── LightObjects.jsx           # Lamp3D, Campfire3D, Crystal3D (lengkap dengan pointLight & emissive glow)
│   ├── world/
│   │   ├── FloatingIsland.jsx         # Kontur pulau melayang berlapis (tanah atas & tebing bawah berbatu)
│   │   ├── AtmosphericEnvironment.jsx # Pengatur cahaya matahari, bulan, fog, dan mode langit
│   │   ├── GalaxySky.jsx              # Galaksi Andromeda 42k partikel, bintang, meteor, & komet
│   │   └── DaySky.jsx                 # Langit siang hari, awan melayang, & matahari hangat
│   └── ui/
│       ├── HeaderToolbar.jsx          # Navigasi atas: Undo/Redo, Audio, Time Mode, Snap Grid, & Photo Mode
│       ├── TelemetryBadge.jsx         # Panel analitik FPS & status sistem bergaya glassmorphism
│       ├── InventoryBar.jsx           # Panel bawah daftar 12 objek siap taruh
│       ├── TransformToolbar.jsx       # Floating glass toolbar untuk putar, skala, & hapus objek terpilih
│       └── OnboardingModal.jsx        # Tutorial interaktif untuk pengguna baru & modal pemulihan WebGL
├── utils/
│   ├── SoundEngine.js                 # Mesin Web Audio API (playPop, playDelete, playClick, setAmbient)
│   ├── storageEngine.js               # Pengelola localStorage autosave, export/import JSON
│   └── screenshotHelper.js            # Utilitas eksport foto canvas HD transparan 1-klik
├── hooks/
│   └── useSandboxState.js             # Custom hook pengelola state utama, 25-step history stack, & snap grid
└── App.jsx                            # File utama yang bersih (< 200 baris) menghubungkan Canvas 3D & UI
```

---

## 3. Instruksi Spesifik untuk Antigravity (IDE)

1. **Langkah 1: Buat Utilities & Hooks**
   - Buat `src/utils/SoundEngine.js`, `src/utils/storageEngine.js`, dan `src/utils/screenshotHelper.js` dengan memindahkan logika dari `App.jsx`.
   - Buat `src/hooks/useSandboxState.js` untuk merapikan state management & undo/redo.
2. **Langkah 2: Buat Komponen Ikon & UI**
   - Pindahkan seluruh fungsi `Icon*` ke `src/components/icons/SvgIcons.jsx`.
   - Pisahkan komponen UI (`HeaderToolbar`, `InventoryBar`, `TransformToolbar`, `TelemetryBadge`, `OnboardingModal`) ke `src/components/ui/`.
3. **Langkah 3: Buat Komponen Dunia 3D & Pulau Melayang**
   - Buat `src/components/world/FloatingIsland.jsx` (dengan tambahan tebing bawah `#1e293b`).
   - Pindahkan `GalaxySky`, `DaySky`, dan `AtmosphericEnvironment` ke `src/components/world/`.
4. **Langkah 4: Buat Komponen Objek 3D dengan PBR & PointLight**
   - Pisahkan ke `NatureObjects.jsx`, `StructureObjects.jsx`, dan `LightObjects.jsx`.
   - Pastikan `Campfire3D` dan `Lamp3D` menyalakan `<pointLight />` saat `timeMode === 'night'`.
5. **Langkah 5: Bersihkan `App.jsx`**
   - Hubungkan semua modul di atas ke `App.jsx` sehingga `App.jsx` menjadi sangat ringkas, bersih, dan rapi.
