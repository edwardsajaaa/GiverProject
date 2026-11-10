---
name: daily-optimizer
description: Prosedur Operasi Standar (SOP) untuk Agent menjalankan siklus optimasi harian secara mandiri pada proyek GIVERSOURCE / LoveCapsule (React 19 + Three.js + Vite).
---

# Daily Autonomous Web Optimizer SOP

SOP ini memandu AI Agent dalam menjalankan siklus optimasi web harian secara mandiri, aman, dan konsisten pada proyek web 3D sandbox dan spatial diorama ini.

---

## 🔄 Alur Siklus Otonom (5 Tahapan)

```
[Tahap 1: Memori] ➔ [Tahap 2: Audit] ➔ [Tahap 3: Perencanaan] ➔ [Tahap 4: Eksekusi] ➔ [Tahap 5: Pencatatan]
```

---

### Tahap 1: Memori & Konteks Kerja
Tujuan: Memastikan agent memahami riwayat pekerjaan sebelumnya dan tidak mengulang pekerjaan yang sama atau membatalkan perbaikan sebelumnya.

1. **Baca Catatan Riwayat**:
   - Buka dan baca `PROGRESS_LOG.md` untuk mengetahui optimasi terakhir yang telah dilakukan, tantangan yang dihadapi, dan file yang baru saja diubah.
2. **Baca Daftar Rencana**:
   - Buka dan baca `BACKLOG.md` untuk melihat daftar prioritas backlog yang belum terselesaikan (`- [ ]`).
3. **Pemeriksaan Git & Workspace**:
   - Jalankan `git status` melalui terminal untuk memastikan working tree bersih sebelum memulai perubahan baru.

---

### Tahap 2: Audit Teknis & Visual
Tujuan: Mengidentifikasi masalah nyata, celah performa, kesalahan kode, dan isu UI/UX.

1. **Audit Statis (Lint & Type-Check)**:
   - Jalankan perintah linting:
     ```bash
     npm run lint
     ```
   - Catat error kritis (seperti pelanggaran *Rules of Hooks*, variabel tak terpakai, fungsi tidak murni dalam render).
2. **Dev Server & Audit Visual**:
   - Jalankan local dev server jika belum aktif:
     ```bash
     npm run dev
     ```
   - Gunakan peramban / browser tooling untuk mengakses `http://localhost:5173` (atau port yang aktif).
   - Periksa dua mode viewport utama:
     - **Desktop** (1920x1080 atau 1440x900)
     - **Mobile** (375x812 / 390x844 - iPhone / Android)
   - Evaluasi:
     - *Console Errors & Warnings* di browser runtime (terutama error WebGL, shader compilation, atau context loss).
     - *UI/UX & Touch/Click Target*: Apakah tombol toolbar saling bertumpuk di mobile? Apakah modal dapat ditutup dengan mulus?
     - *Aksesibilitas (A11y)*: Kontras teks di mode siang vs malam (`isNight`), atribut ARIA pada modal dan tombol kontrol.
     - *Performa (FPS)*: Periksa pembacaan `TelemetryBadge` (target konsisten 60 FPS di desktop, minimal 30 FPS di high-density 3D).

---

### Tahap 3: Perencanaan & Prioritas
Tujuan: Membatasi ruang lingkup harian agar perubahan terukur, stabil, dan berdampak tinggi.

1. **Pilih 1 - 3 Peningkatan Terfokus**:
   - Prioritaskan perbaikan bug/stabilitas kode terlebih dahulu (contoh: hook violations, memory leaks).
   - Diikuti oleh peningkatan UI/UX responsif atau performa rendering 3D.
2. **Susun Rencana Implementasi Singkat**:
   - Tentukan file spesifik yang akan diedit.
   - Tetapkan batasan agar tidak menyentuh fitur di luar fokus hari ini.
   - Pastikan rencana mematuhi `.agent/rules/autonomous-guardrails.md`.

---

### Tahap 4: Eksekusi & Self-Healing
Tujuan: Mengimplementasikan perubahan secara bersih dan memverifikasi hingga bebas error.

1. **Modifikasi Kode**:
   - Lakukan pengeditan kode yang modular dan terisolasi.
   - Selalu pertahankan pola React 19 dan React Three Fiber (R3F) yang benar (disposal geometry/materials, menghindari setState sinkron di body effect).
2. **Verifikasi Visual Ulang**:
   - Muat ulang halaman di browser agent untuk memvalidasi bahwa tampilan dan interaktivitas berjalan sesuai ekspektasi.
3. **Siklus Self-Healing (Build & Lint Check)**:
   - Jalankan build produksi:
     ```bash
     npm run build
     ```
   - Jalankan lint check:
     ```bash
     npm run lint
     ```
   - Jika terdapat kegagalan build atau linter error baru, **perbaiki seketika** (self-healing loop) hingga kedua perintah menghasilkan status sukses 100%.

---

### Tahap 5: Pencatatan & Siklus Lanjutan
Tujuan: Menyimpan jejak rekam transparan dan menyiapkan backlog untuk siklus berikutnya.

1. **Perbarui `BACKLOG.md`**:
   - Berikan tanda centang (`- [x]`) pada item yang telah berhasil diselesaikan beserta tanggal penyelesaian.
   - Tambahkan temuan baru (jika ada) ke kategori yang sesuai untuk ditangani pada siklus berikutnya.
2. **Perbarui `PROGRESS_LOG.md`**:
   - Tambahkan entri baru dengan format standar (Tanggal, Kategori, Ringkasan Perubahan, File yang Dimodifikasi, Status Build, Rencana Selanjutnya).
3. **Git Commit & Push Otomatis**:
   - Selalu lakukan stage, commit, dan push untuk setiap perubahan yang telah lulus verifikasi:
     ```bash
     git add .
     git commit -m "<tipe>: <ringkasan perubahan deskriptif>"
     git push origin main
     ```
   - **Wajib**: Setiap update sekecil apapun harus segera di-commit dan di-push agar sinkron dengan remote repository.
4. **Konfirmasi Final**:
   - Pastikan working tree bersih (`git status` menampilkan *working tree clean*) dan repo dalam keadaan stabil.
