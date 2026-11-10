# Autonomous Guardrails (Aturan Kerja Otonom)

Dokumen ini memuat aturan ketat dan batasan keselamatan yang **wajib** dipatuhi oleh Agent saat menjalankan optimasi mandiri pada proyek GIVERSOURCE / LoveCapsule.

---

## 🛡️ 1. Integritas Fitur & Stabilitas Proyek (Non-Negotiable)

1. **Dilarang Menghapus Fitur Utama**:
   - Dilarang menghapus atau menonaktifkan fitur inti yang sudah berjalan, seperti:
     - 3D Biome Environment (CyberCity, Fantasy, Kyoto, Tokyo, London, Paris, Venice, Zen, Mountain).
     - Spatial Diorama sandbox (placement, transform controls, undo/redo, dynamic lighting).
     - LoveCapsule features (Love Lock, Journal, Vinyl Player, Audio System, Foto Galeri, Share Link).
2. **Perlindungan Skema & Konfigurasi**:
   - Dilarang merombak skema penyimpanan data lokal (`localStorage`, `IndexedDB` di `storageEngine.js`, `audioStorage.js`, `modelStorage.js`) tanpa mekanisme backward-compatibility / migrasi data.
   - Dilarang mengubah file konfigurasi build esensial (`vite.config.js`, `package.json`, environment keys) tanpa izin eksplisit atau alasan teknis mendesak yang terjustifikasi.

---

## ⚡ 2. Standar Verifikasi & Build Sempurna

1. **Wajib Build Sukses 100%**:
   - Setiap akhir sesi pengerjaan, perintah `npm run build` **wajib** lulus tanpa error.
2. **Bebas Kesalahan Kritis**:
   - Dilarang meninggalkan pelanggaran kritis seperti:
     - Pelanggaran *Rules of Hooks* (pemanggilan hook bersyarat atau di dalam loop/setelah early return).
     - Syntax errors atau unresolved import modules.
3. **Pembersihan Resource 3D (Memory Management)**:
   - Komponen Three.js / React Three Fiber yang dibuat atau dimodifikasi harus mematuhi standar pembersihan resource (`dispose()` pada geometry, materials, dan textures) untuk mencegah kebocoran memori WebGL pada sesi jangka panjang.

---

## 🧼 3. Arsitektur Kode Bersih & Modular

1. **Pemisahan Logika & Presentasi**:
   - Logika status global tetap dikelola secara terpusat di custom hooks (seperti `useSandboxState.js`).
   - Jangan meletakkan kalkulasi berat atau fungsi murni yang tidak perlu langsung di dalam loop render komponen React.
2. **Konsistensi Gaya Bahasa & Desain**:
   - Pertahankan estetika visual yang konsisten: perpaduan *warm romantic editorial* (Cormorant Garamond, Pinyon Script, Playfair Display) dengan *minimalist dark/light mode 3D controls*.
3. **Responsivitas Multi-Device**:
   - Setiap modifikasi UI harus aman pada viewport mobile (lebar layar $\le 420\text{px}$) maupun desktop resolusi tinggi, memastikan elemen interaktif tidak terpotong atau keluar dari layar (`safe-area-inset`).

---

## 📝 4. Disiplin Audit & Dokumentasi

1. **Pencatatan Berkelanjutan**:
   - Setiap tindakan perbaikan kode harus tercatat di `PROGRESS_LOG.md`.
   - Item yang telah selesai diperbaiki harus dicentang di `BACKLOG.md`.
2. **Tidak Melakukan Asumsi Tanpa Verifikasi**:
   - Selalu uji perubahan secara riil dengan build command dan visual inspection sebelum menyatakan tugas selesai.
3. **Wajib Git Commit & Push**:
   - Setiap pembaruan atau perbaikan kode (sekecil apapun perubahannya) yang telah teruji wajib segera di-commit dan di-push ke remote repository GitHub (`origin main`).
