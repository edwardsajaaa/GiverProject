<div align="center">

# GIVERPROJECT: Next-Gen 3D Web Sandbox

**Interactive 3D Diorama and Spatial World Builder running purely on WebGL, Three.js, and React.**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r170+-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v8.x-black?style=for-the-badge&logo=three.js&logoColor=white)](https://docs.pmnd.rs/react-three-fiber/)
[![Vite](https://img.shields.io/badge/Vite-v7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![WebGL 2.0](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

[Fitur Utama](#fitur-utama) | [Sistem Biome](#1-sistem-kustomisasi-biome-dan-ruang-spasial) | [Art Style Engine](#2-universal-art-style-engine) | [Arsitektur GPU](#arsitektur-dan-optimalisasi-gpu) | [Pintasan Keyboard](#pintasan-keyboard-shortcuts) | [Instalasi](#instalasi-dan-menjalankan)

---

</div>

## Ringkasan Proyek

GIVERPROJECT adalah platform sandbox 3D interaktif berbasis peramban web yang dirancang dengan perpaduan visual imersif dan performa tinggi (low-spec GPU friendly). Pengguna dapat membangun, mendekorasi, menyesuaikan lingkungan spasial, serta memasukkan model 3D kustom secara langsung tanpa hambatan.

Dibangun dengan prinsip efisiensi komputasi visual, platform ini menggabungkan antarmuka bertingkat kaca (visionOS-style glassmorphism) dengan mesin grafis Three.js dan React Three Fiber, menjamin kelancaran hingga 60 FPS pada laptop standar maupun perangkat seluler.

---

## Fitur Utama

### 1. Sistem Kustomisasi Biome dan Ruang Spasial
Lingkungan spasial tidak terkunci pada satu bentuk dasar. Tersedia 5 pilihan lingkungan prosedural dengan alokasi memori efisien:
* **Pulau Melayang (`floating_island`)**: Formasi bebatuan melayang di angkasa kosmik dengan danau kristal dan flora bioluminescent.
* **Kota Cyberpunk (`cyber_city`)**: Rooftop plaza futuristik dengan panorama puluhan gedung pencakar langit berlampu (dioptimasi menggunakan `InstancedMesh` sehingga seluruh skyline dirender dalam 1 draw call tunggal).
* **Puncak Gunung (`mountain_summit`)**: Puncak bebatuan bersalju alpine yang menjulang di atas lautan awan volumetrik.
* **Alam Fantasi (`fantasy_realm`)**: Ruang kosmik dengan monolit kristal berputar, rune mistis, dan kolam violet bercahaya.
* **Taman Zen (`zen_garden`)**: Taman pasir bergelombang khas Jepang dengan pembatas kayu jati, lentera batu, dan batu kali alam.

### 2. Universal Art Style Engine
Perubahan gaya visual dapat dilakukan secara instan:
* **Low-Poly Modern**: Geometri bersih dengan palet minimalis kontemporer.
* **Anime Cel-Shaded**: Pencahayaan kontras dengan karakter visual animasi Jepang.
* **Retro 8-Bit 90s**: Shading datar tegas (flat shading) dengan estetika konsol game klasik era 90-an.
* **Synthwave Neon**: Nuansa retrowave outrun dengan saturasi magenta dan cyan elektrik.
* **Realistic PBR**: Pantulan permukaan logam dan pencahayaan fisik alami.

### 3. Studio Altar dan Penyimpanan Model 3D Mandiri (IndexedDB)
* **Kustomisasi Altar Pusat**: Pilihan geometri inti (Kubus Cyber, Bola Plasma, Cincin Quantum, Piramida Kristal, dan lainnya) dengan aneka material (Holographic, Chrome, Glass, Wireframe).
* **Upload File 3D Mandiri**: Dukungan format standar industri `.glb` dan `.gltf`.
* **Drag and Drop Langsung**: Pengguna dapat menarik file 3D langsung dari Desktop atau File Explorer ke kanvas browser.
* **Preservasi Tekstur dan Material**: Mesin render mempertahankan tekstur asli, UV mapping, dan material bawaan model tanpa proses penimpaan destruktif.
* **Penyimpanan Lokal Permanen**: File 3D disimpan secara lokal ke dalam IndexedDB browser, memungkinkan model berukuran puluhan megabyte tetap tersimpan saat halaman dimuat ulang.

### 4. Alat Konstruksi dan Interaktivitas
* **Sistem Snap-to-Grid**: Penataan presisi dengan resolusi grid 0.5 meter dan 1.0 meter.
* **Transform Gizmo**: Mode Geser (T), Putar (R), dan Skala (S) untuk setiap objek yang diletakkan.
* **Papan Pesan Interaktif**: Setiap objek dapat disematkan pesan teks yang muncul saat objek disentuh atau diklik dalam ruang 3D.
* **Sistem Undo / Redo**: Riwayat snapshot hingga 25 langkah perubahan (Ctrl+Z dan Ctrl+Y).
* **Ekspor dan Impor JSON**: Penyimpanan dan pemuatan kembali seluruh susunan diorama dalam format file JSON portabel.
* **Mode Foto Resolusi Tinggi**: Pengambilan gambar kanvas 3D langsung dari buffer WebGL.

---

## Arsitektur dan Optimalisasi GPU

Aplikasi ini dirancang untuk mengatasi kendala performa dan panas berlebih pada unit pemroses grafis terintegrasi (Intel UHD/Iris, AMD Radeon Vega/RDNA, serta GPU mobile):

```
+--------------------------------------------------------+
|                   MAIN 3D VIEWPORT                     |
+---------------------------+----------------------------+
|      HIGH GPU TIER        |       ECO GPU TIER         |
+---------------------------+----------------------------+
| * Full Post-Processing    | * Post-Processing BYPASSED |
| * Screen-space Bloom      | * Hardware ACES Filmic TM  |
| * Soft Directional Shadow | * Shadows disabled         |
| * 22.000 Galaxy Stars     | * 6.000 Galaxy Stars       |
| * Device Pixel Ratio 1.25 | * Clamped DPR 1.0          |
+---------------------------+----------------------------+
```

1. **Dual-Tier Hardware Scaler**: Pengguna dapat mengubah mode performa melalui Telemetry Badge di pojok kiri atas:
   - **GPU: ECO**: Mem-bypass seluruh pass komposit EffectComposer, meniadakan kalkulasi bayangan berat, dan mengandalkan hardware tone mapping. Mengurangi beban komputasi GPU hingga 70%.
   - **GPU: HIGH**: Mengaktifkan Bloom halus, Vignette sinematik, dan penyaringan bayangan lembut.
2. **Auto-Throttle Protection**: Apabila FPS terdeteksi berada di bawah ambang batas 24 FPS secara berkelanjutan, sistem otomatis menurunkan beban komputasi ke tier ECO.
3. **Zero-Allocation Runtime**: Objek Three.Color, matriks transformasi, dan vektor dikalkulasi secara statis pada level modul guna mencegah lonjakan Garbage Collection (GC stutter).
4. **Instanced Rendering**: Puluhan hingga ratusan objek geometris sejenis digabungkan ke dalam satu InstancedMesh untuk menekan jumlah draw call.
5. **Canvas Error Boundary**: Proteksi WebGL Context Loss otomatis untuk memulihkan sesi render tanpa menyebabkan crash layar putih (WSOD).

---

## Pintasan Keyboard (Shortcuts)

| Tombol | Fungsi |
| :--- | :--- |
| `Ctrl + Z` | Batalkan aksi terakhir (Undo) |
| `Ctrl + Y` / `Ctrl + Shift + Z` | Ulangi aksi (Redo) |
| `Delete` / `Backspace` | Hapus objek 3D yang sedang dipilih |
| `Space` | Jeda atau lanjutkan rotasi otomatis kamera (Auto-Rotate) |
| `T` | Aktifkan mode transformasi Geser (Translate) |
| `R` | Aktifkan mode transformasi Putar (Rotate) |
| `S` | Aktifkan mode transformasi Skala (Scale) |
| `Escape` | Batalkan seleksi objek aktif atau tutup jendela modal |

---

## Instalasi dan Menjalankan

### Kebutuhan Sistem
* Node.js versi 18.x atau lebih baru
* Peramban modern dengan dukungan WebGL 2.0 (Google Chrome, Microsoft Edge, Brave, Firefox, Safari)

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
   Buka peramban di alamat `http://localhost:5173`.

4. **Verifikasi Kualitas Kode (Linting)**:
   ```bash
   npm run lint
   ```

5. **Kompilasi Produksi (Build)**:
   ```bash
   npm run build
   ```

---

## Tech Stack dan Ekosistem

* **Core Runtime**: React 18, Vite
* **3D Engine**: Three.js (r170+)
* **Declarative 3D**: @react-three/fiber
* **3D Helpers dan Controls**: @react-three/drei
* **Post-Processing Pipeline**: @react-three/postprocessing
* **Audio Synthesis**: Native Web Audio API (Synthesizer prosedural tanpa dependensi aset file suara)
* **Local Persistence**: Browser IndexedDB API dan Web Storage API

---

## Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE). Terbuka untuk eksplorasi, pembelajaran, dan pengembangan perangkat lunak visual 3D berbasis web.
