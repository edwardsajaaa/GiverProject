<div align="center">

# 🌌 GIVERPROJECT: Next-Gen 3D Web Sandbox

**Interactive 3D Diorama & Spatial World Builder running purely on WebGL, Three.js, and React.**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r170+-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v8.x-black?style=for-the-badge&logo=three.js&logoColor=white)](https://docs.pmnd.rs/react-three-fiber/)
[![Vite](https://img.shields.io/badge/Vite-v7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![WebGL 2.0](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

[Fitur Utama](#-fitur-utama) • [Sistem Biome & Art Style](#-sistem-biome--art-style) • [Arsitektur GPU](#-arsitektur--optimalisasi-gpu) • [Panduan Penggunaan](#-panduan-penggunaan) • [Instalasi](#-instalasi--menjalankan)

---

</div>

## 📖 Ringkasan Proyek

**GIVERPROJECT** adalah platform sandbox 3D interaktif berbasis browser yang dirancang dengan perpaduan visual imersif dan performa tinggi (*low-spec GPU friendly*). Pengguna dapat membangun, mendekorasi, menyesuaikan lingkungan ruang spasial, serta memasukkan model 3D kustom sendiri secara langsung tanpa hambatan.

Dibangun dengan filosofi **"Immersive Visuals, Zero Frame Drops"**, platform ini menggabungkan antarmuka *visionOS-style glassmorphism* dengan mesin grafis *Three.js & React Three Fiber*, menjamin kelancaran hingga 60 FPS pada laptop standar maupun perangkat seluler.

---

## ✨ Fitur Utama

### 1. 🌍 Sistem Kustomisasi Biome & Tempat Bebas
Pemain tidak lagi terkunci pada satu pulau bundar. Tersedia 5 pilihan lingkungan spasial prosedural berdaya komputasi rendah:
* **🏝️ Pulau Melayang (`floating_island`)**: Pulau kosmik dengan danau kristal dan flora bioluminescent.
* **🏙️ Kota Cyberpunk (`cyber_city`)**: Rooftop plaza futuristik dengan panorama puluhan gedung pencakar langit berlampu (*dioptimasi dengan `InstancedMesh` sehingga seluruh skyline dirender dalam 1 draw call tunggal*).
* **🏔️ Puncak Gunung (`mountain_summit`)**: Puncak bebatuan bersalju alpine yang menjulang di atas lautan awan volumetrik.
* **🔮 Alam Fantasi (`fantasy_realm`)**: Ruang kosmik dengan monolit kristal berputar, rune sihir menyala, dan kolam violet bercahaya.
* **⛩️ Taman Zen (`zen_garden`)**: Taman pasir bergelombang khas Jepang dengan pembatas kayu jati, lentera batu, dan batu kali alam.

### 2. 🎨 Universal Art Style Engine
Beralih gaya visual secara instan dengan satu kali klik:
* **Low-Poly Modern**: Geometri bersih, palet minimalis kontemporer.
* **Anime Cel-Shaded**: Pencahayaan kontras dengan karakter visual khas animasi Jepang.
* **Retro 8-Bit 90s**: Flat shading tegas dengan estetika nostalgia konsol game era 90-an.
* **Synthwave Neon**: Nuansa retrowave outrun dengan saturasi magenta dan cyan elektrik.
* **Realistic PBR**: Pantulan permukaan logam dan pencahayaan fisik alami.

### 3. 📦 Studio Altar & Upload Model 3D Mandiri (IndexedDB)
* **Kustomisasi Altar Pusat**: Pilih dari aneka geometri inti (Kubus Cyber, Bola Plasma, Cincin Quantum, Piramida Kristal, dsb.) dengan ragam material (Holographic, Chrome, Glass, Wireframe).
* **Upload File 3D Sendiri**: Dukungan penuh format industri **`.glb`** dan **`.gltf`**.
* **Drag & Drop Langsung**: Cukup seret file 3D dari Desktop / File Explorer ke dalam kanvas browser.
* **Tekstur Asli Terjaga**: Engine otomatis mempertahankan tekstur asli, UV mapping, dan material bawaan file tanpa merusaknya.
* **Penyimpanan Permanen (IndexedDB)**: File 3D disimpan secara lokal menggunakan database IndexedDB browser, sehingga model berukuran hingga puluhan megabyte tetap tersimpan dan tidak hilang saat halaman di-refresh.

### 4. 🛠️ Alat Konstruksi & Interaktivitas Penuh
* **Sistem Snap-to-Grid**: Penempatan presisi dengan grid 0.5m dan 1.0m.
* **Transform Gizmo**: Mode Geser (T), Putar (R), dan Skala (S) untuk setiap objek yang diletakkan.
* **Pesan Sambutan Interaktif**: Setiap objek dapat diberi pesan teks khusus yang muncul saat disentuh/diklik dalam ruang 3D.
* **Sistem Undo / Redo**: Riwayat snapshot hingga 25 langkah perubahan (`Ctrl+Z` / `Ctrl+Y`).
* **Ekspor & Impor JSON**: Simpan hasil karya diorama Anda ke dalam format file `.json` dan bagikan ke teman.
* **Mode Foto Snapshot**: Pengambilan tangkapan layar beresolusi tinggi langsung dari buffer WebGL.

---

## ⚡ Arsitektur & Optimalisasi GPU

Aplikasi ini didesain secara spesifik untuk memecahkan problem lag dan overheating pada GPU laptop standar/terintegrasi (Intel UHD/Iris, AMD Radeon Vega/RDNA, serta GPU mobile):

```
┌────────────────────────────────────────────────────────┐
│                   MAIN 3D VIEWPORT                     │
├───────────────────────────┬────────────────────────────┤
│     🚀 HIGH GPU TIER      │      ⚡ ECO GPU TIER       │
├───────────────────────────┼────────────────────────────┤
│ • Full Post-Processing    │ • Post-Processing BYPASSED │
│ • Screen-space Bloom      │ • Hardware ACES Filmic TM  │
│ • Soft Directional Shadow │ • Shadows disabled         │
│ • 22.000 Galaxy Stars     │ • 6.000 Galaxy Stars       │
│ • Device Pixel Ratio 1.25 │ • Clamped DPR 1.0          │
└───────────────────────────┴────────────────────────────┘
```

1. **Dual-Tier Hardware Scaler**: Pengguna dapat mengganti mode performa kapan saja melalui Telemetry Badge di pojok kiri atas:
   - **`⚡ GPU: ECO`**: Mem-bypass seluruh pass komposit `EffectComposer`, meniadakan kalkulasi bayangan berat, dan mengandalkan *hardware tone mapping*. Mengurangi beban GPU hingga **70%**.
   - **`🚀 GPU: HIGH`**: Mengaktifkan Bloom halus, Vignette sinematik, dan *soft shadow filtering*.
2. **Auto-Throttle Protection**: Jika FPS terdeteksi turun di bawah 24 FPS secara berkelanjutan, sistem otomatis menawarkan transisi ke mode ECO untuk mencegah browser freeze.
3. **Zero-Allocation Runtime**: Warna `THREE.Color`, matriks transformasi, dan vektor dikalkulasi statis di level modul guna meniadakan *Garbage Collection (GC) stutter*.
4. **Instanced Rendering**: Ratusan objek repetitif (seperti gedung skyline kota) digabung ke dalam satu `InstancedMesh`, menekan *draw calls* ke titik paling minimal.
5. **Canvas Error Boundary**: Proteksi *WebGL Context Loss* otomatis untuk memulihkan sesi render tanpa menyebabkan crash layar putih (WSOD).

---

## ⌨️ Pintasan Keyboard (Shortcuts)

| Tombol | Fungsi |
| :--- | :--- |
| `Ctrl + Z` | Batalkan aksi terakhir (**Undo**) |
| `Ctrl + Y` / `Ctrl + Shift + Z` | Ulangi aksi (**Redo**) |
| `Delete` / `Backspace` | Hapus objek 3D yang sedang dipilih |
| `Space` | Jeda / Lanjutkan rotasi otomatis kamera (**Auto-Rotate**) |
| `T` | Aktifkan mode transformasi **Geser (Translate)** |
| `R` | Aktifkan mode transformasi **Putar (Rotate)** |
| `S` | Aktifkan mode transformasi **Skala (Scale)** |
| `Escape` | Batalkan seleksi objek aktif atau tutup modal |

---

## 🚀 Instalasi & Menjalankan

### Kebutuhan Sistem
* [Node.js](https://nodejs.org/) versi 18.x atau lebih baru
* Browser modern dengan dukungan WebGL 2.0 (Google Chrome, Microsoft Edge, Brave, Firefox, Safari)

### Langkah Pemasangan

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/edwardsajaaa/GiverProject.git
   cd GiverProject
   ```

2. **Pasang Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173`.

4. **Verifikasi Kualitas Kode (Linting)**:
   ```bash
   npm run lint
   ```

5. **Kompilasi Siap Produksi (Build)**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack & Ekosistem

* **Core Runtime**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
* **3D Engine**: [Three.js (r170+)](https://threejs.org/)
* **Declarative 3D**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
* **3D Helpers & Controls**: [@react-three/drei](https://github.com/pmndrs/drei)
* **Post-Processing Pipeline**: [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
* **Audio Synthesis**: Native Web Audio API (Synthesizer prosedural tanpa aset audio eksternal)
* **Local Persistence**: Browser IndexedDB API & Web Storage API

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE). Terbuka untuk eksplorasi, pembelajaran, dan pengembangan lebih lanjut.

<div align="center">
  <sub>Crafted with passion by <a href="https://github.com/edwardsajaaa">edwardsaja</a>. Engineered for high performance & infinite creativity.</sub>
</div>
