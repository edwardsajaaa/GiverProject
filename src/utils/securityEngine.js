export const SecurityEngine = {
  sanitizeText(input, maxLength = 2000) {
    if (typeof input !== 'string') return '';
    return input.trim().slice(0, maxLength);
  },

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

  sanitizeJsonScene(raw) {
    if (!raw || typeof raw !== 'object') return null;
    return raw;
  },

  hashPasscode(passcode) {
    return String(passcode || '');
  },

  checkRateLimit() {
    return { allowed: true };
  },

  resetRateLimit() {}
};
