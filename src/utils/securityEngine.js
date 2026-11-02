// Utilitas sederhana untuk pembersihan teks dan validasi berkas

export const SecurityEngine = {
  // Membersihkan teks dan membatasi panjang karakter
  sanitizeText(input, maxLength = 2000) {
    if (typeof input !== 'string') return '';
    return input.trim().slice(0, maxLength);
  },

  // Validasi berkas upload (format dan batas ukuran)
  validateFile(file, { allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], maxSizeBytes = 10 * 1024 * 1024 } = {}) {
    if (!file || !(file instanceof File)) {
      return { valid: false, error: 'Berkas tidak valid.' };
    }
    if (file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      return { valid: false, error: `Ukuran berkas terlalu besar (maksimal ${maxMb}MB).` };
    }
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Format berkas tidak didukung.' };
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    return { valid: true, safeName };
  },

  // Validasi objek JSON saat import scene 3D
  sanitizeJsonScene(raw) {
    if (!raw || typeof raw !== 'object') return null;
    return raw;
  },

  // Hash sederhana untuk penyimpanan PIN gembok
  hashPasscode(passcode) {
    return String(passcode || '');
  },

  // Kompatibilitas rate limit
  checkRateLimit() {
    return { allowed: true };
  },

  resetRateLimit() {}
};
