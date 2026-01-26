# GIVERPROJECT

## Deskripsi Project

Project ini adalah website 3D interaktif yang dibuat menggunakan React Three Fiber (R3F). Tujuan utamanya adalah menampilkan sebuah objek 3D (misalnya kue ulang tahun atau objek 3D lain) di tengah layar, di mana user dapat mengelilingi dan memutar kamera secara bebas menggunakan mouse (OrbitControls).

### Fitur Utama
- **Canvas Fullscreen:** Tampilan 3D memenuhi seluruh layar browser.
- **Background Gelap:** Memberikan kesan modern dan fokus pada objek 3D.
- **OrbitControls:** User dapat memutar, zoom, dan mengelilingi objek 3D dengan mudah.
- **Objek 3D Placeholder:** Saat ini menggunakan kubus (BoxGeometry) sebagai placeholder, namun dapat diganti dengan objek 3D lain seperti kue ulang tahun.

### Cara Kerja
1. Website menampilkan canvas 3D dengan objek di tengah.
2. User dapat menggerakkan kamera mengelilingi objek dengan drag mouse.
3. Objek 3D dapat diganti sesuai kebutuhan (misal: kue ulang tahun, hadiah, dsb).

### Stack Teknologi
- React
- React Three Fiber (`@react-three/fiber`)
- Drei (`@react-three/drei` untuk OrbitControls)

### Cara Menjalankan
1. Clone repo ini
2. Jalankan `npm install`
3. Jalankan `npm run dev`
4. Buka browser ke alamat yang tertera (biasanya http://localhost:5173)

### Pengembangan Selanjutnya
- Ganti objek 3D dengan model lain (misal: kue ulang tahun dalam format .glb/.gltf)
- Tambahkan interaksi atau animasi pada objek
- Tambahkan fitur lain sesuai kebutuhan

---
Project ini cocok untuk showcase produk, portofolio, atau eksperimen 3D interaktif berbasis web.
