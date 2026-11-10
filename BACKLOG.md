# Project Backlog: GIVERSOURCE / LoveCapsule

Daftar prioritas peningkatan dan optimasi mandiri untuk proyek Web 3D Sandbox & Spatial Diorama Builder. Disusun berdasarkan hasil audit statis, analisis arsitektur, dan evaluasi pengalaman pengguna.

---

## 🎨 UI/UX & Responsivitas

- [x] **Shortcut Helper Modal & Hotkey Guide (`?` / `/`)** *(Selesai: 2026-11-10)*: Menambahkan overlay panduan tombol keyboard (T, R, S, D, Del, Space, Ctrl+Z, Ctrl+Y, Esc, ?) lengkap dengan badge tombol interaktif dan hotkey listener di `useSandboxState.js` & `OnboardingModal.jsx`.
- [x] **Modal Safe-Area & Scrollable Container** *(Selesai: 2026-11-10)*: Menerapkan batas tinggi aman (`max-height: 88vh`) dan `overflow-y: auto` pada `OnboardingModal.jsx` agar konten panduan tidak terpotong di layar kecil/lanskap.
- [ ] **Optimasi Tata Letak Mobile Toolbar & Telemetry Badge**: Sesuaikan posisi `HeaderToolbar`, `TelemetryBadge`, dan `TransformToolbar` pada layar ponsel ($\le 390\text{px}$) agar tidak saling tumpang-tindih dan ramah satu tangan (*thumb-friendly*).
- [ ] **Indikator Visual Status Undo/Redo**: Berikan visual feedback (*opacity* rendah, `cursor: not-allowed`) pada tombol Undo dan Redo di `HeaderToolbar` ketika `historyPast` atau `historyFuture` dalam keadaan kosong.
- [ ] **Aksesibilitas (A11y) & ARIA Labels**: Tambahkan atribut `aria-label`, `role="button"`, dan status fokus yang jelas pada seluruh tombol ikon di `HeaderToolbar`, `InventoryBar`, dan kontrol modal.
- [ ] **Ukur Target Sentuh (Touch Target Size)**: Pastikan semua tombol aksi dan tab navigasi kapsul memiliki area sentuh minimal $44 \times 44\text{px}$ untuk mempermudah navigasi pada perangkat layar sentuh.
- [ ] **Konsistensi Kontras Teks Mode Siang/Malam**: Tinjau ulang kontras warna font (*Cormorant Garamond* & *Montserrat*) di atas latar belakang dinamis (`isNight`) agar selalu memenuhi rasio kontras WCAG AA (minimal 4.5:1).

---

## ⚡ Performa & Kualitas Kode

- [x] **Perbaikan Kritis Pelanggaran Rules of Hooks di `ShareCapsuleModal.jsx`** *(Selesai: 2026-11-10)*: Memindahkan pemanggilan seluruh hook `useState` ke baris paling atas sebelum kondisi `if (!isOpen) return null;` untuk mencegah error fatal React crash.
- [x] **Pembersihan 69 Masalah ESLint (Linter Clean-Up 100% Bebas Error)** *(Selesai: 2026-11-10)*:
  - Membersihkan variabel tak terpakai di `FloatingIsland.jsx`, `InteractiveObjects.jsx`, `MainCanvas.jsx`, `HeaderToolbar.jsx`, `VeniceBiome.jsx`, `ZenBiome.jsx`, dan `capsuleAudio.js`.
  - Merefaktor seluruh fungsi render tidak murni (`Math.random()` di dalam `useMemo`) pada 4 biome (`KyotoBiome.jsx`, `LondonBiome.jsx`, `ParisBiome.jsx`, `ZenBiome.jsx`) menjadi fungsi deterministik murni (*pure mathematical waves*).
- [x] **Refaktor Fast Refresh & Ekstraksi Modul Data** *(Selesai: 2026-11-10)*:
  - Memisahkan `VINYL_COLLECTION` dari `VinylPlayerPage.jsx` ke `src/constants/vinylPresets.jsx`.
  - Memisahkan `LoveLockManager` dari `LoveLockModal.jsx` ke `src/utils/loveLockManager.js`.
- [x] **Eliminasi Synchronous setState di useEffect** *(Selesai: 2026-11-10)*: Merefaktor sinkronisasi state di `VinylPlayerPage.jsx`, `EditTrackModal.jsx`, dan `LoveLockModal.jsx` mengikuti pola standar React 19 tanpa cascading renders.
- [x] **Optimalisasi Bundle Size & Rollup Chunks di `vite.config.js`** *(Selesai: 2026-11-10)*: Memecah chunk vendor Three.js dan R3F, berhasil mereduksi ukuran bundle awal `index-*.js` sebesar **82.5%** (dari $1.29\text{ MB}$ menjadi $227\text{ kB}$).
- [ ] **WebGL Resource Disposal & Memory Leak Prevention**: Pastikan pembersihan material, tekstur, dan geometri Three.js dieksekusi secara rapi saat komponen biome berganti atau objek 3D dihapus.

---

## 🌐 3D Environment, Detail & Imersivitas

- [x] **Transformasi Lanskap Jepang: Pagoda Merah Chureito & Vista Gunung Fuji Bersalju** *(Selesai: 2026-11-10)*:
  - Merekonstruksi pagoda 5 tingkat menjadi Pagoda Merah Chureito autentik (pilar & pagar vermilion red, dinding putih shoji, atap lengkung teal/cyan gelap, lonceng angin emas fūtaku, dan finial perunggu Sōrin 9 cincin).
  - Merancang Gunung Fuji bermahkota salju abadi dengan guratan salju radial (*snow furrows*) dan bukit hijau pinus di kaki gunung.
  - Menghiasi pelataran dan lereng dengan pepohonan maple musim gugur (*momiji*) berdaun emas-amber dan jingga kemerahan sesuai foto referensi pengguna.
- [x] **Ekspansi 10 Dunia Biome 3D Lengkap** *(Selesai: 2026-11-10)*:
  - Menghubungkan seluruh 10 dunia diorama 3D di `WorldEnvironment.jsx`, `worldPresets.js`, dan `WorldStyleModal.jsx` (Paris, Kyoto/Fujiyoshida, Miniature Tokyo, Origami Floating Sanctuary, London, Venice, Cyber Neon Metropolis, Fantasy Crystal Island, Mountain Sanctuary, Zen Garden).
  - Merancang set ikon SVG vektor emblem presisi untuk masing-masing biome di `WorldStyleModal.jsx`.
- [x] **Pencahayaan Sinematik & Interactive Object Light Emitters (`DynamicLights.jsx`)** *(Selesai: 2026-11-10)*:
  - Menambahkan directional moonlight rim light (cahaya tepi siluet rembulan) di mode malam dan warm GI bounce light di mode siang.
  - Menjadikan objek diorama (Lampu jalan, Api unggun dengan animasi nyala api berkedip/flicker, Kristal kosmik, Air mancur aquamarine, dan Piramida emas) sebagai pemancar cahaya titik (*point light emitters*) yang dinamis dan hidup.
- [ ] **Enhancement Screenshot Exporter (Polaroid / Aesthetic Frame)**: Perkaya `screenshotHelper.js` dengan opsi pemberian bingkai estetis ala foto polaroid instan, tanggal diorama, atau kutipan kapsul saat diunduh.
- [ ] **Pengatur Volume Halus & Audio Crossfade**: Tambahkan slider kontrol volume di header atau capsule journal serta transisi *crossfade* saat berpindah track piringan hitam (*vinyl*).
- [ ] **Haptic Feedback untuk Interaksi Mobile**: Implementasikan getaran ringan (`navigator.vibrate`) ketika pengguna meletakkan objek 3D di pulau terapung atau mengunci Love Lock pada layar sentuh yang mendukung.
