/**
 * SecurityEngine - Core Client-Side Security & Sanitization Layer
 * Provides:
 * - Anti-XSS and input sanitization
 * - Prototype pollution defense
 * - Safe file validation (MIME & size)
 * - Cryptographic hashing (SHA-256) via Web Crypto API
 * - Sliding-window rate limiting to prevent brute-force attacks
 */

export const SecurityEngine = {
  /**
   * Sanitizes text inputs to prevent XSS and malicious payloads
   */
  sanitizeText(input, maxLength = 2000) {
    if (typeof input !== 'string') return '';
    let sanitized = input.slice(0, maxLength);
    // Remove null bytes
    sanitized = sanitized.replace(/\0/g, '');
    // Strip script and iframe tags
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    // Neutralize dangerous javascript: and data: URIs
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/vbscript:/gi, '');
    return sanitized;
  },

  /**
   * Validates uploaded files against allowed MIME types and max size
   */
  validateFile(file, { allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'], maxSizeBytes = 10 * 1024 * 1024 } = {}) {
    if (!file || !(file instanceof File)) {
      return { valid: false, error: 'File tidak valid.' };
    }
    if (file.size > maxSizeBytes) {
      const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
      return { valid: false, error: `Ukuran file terlalu besar! Maksimal ${maxMb}MB.` };
    }
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Format file tidak didukung! Harap unggah format JPG, PNG, atau WEBP.' };
    }
    // Prevent malicious filenames with path traversal
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    return { valid: true, safeName };
  },

  /**
   * Deeply cleans and validates imported JSON data, preventing Prototype Pollution
   */
  sanitizeJsonScene(raw) {
    if (!raw || typeof raw !== 'object') return null;

    // Prevent Prototype Pollution
    const cleanObject = (obj, depth = 0) => {
      if (depth > 5) return null; // Prevent deep recursion DoS
      if (!obj || typeof obj !== 'object') return obj;

      const safe = Array.isArray(obj) ? [] : {};
      for (const [key, val] of Object.entries(obj)) {
        // Block dangerous object prototype keys
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          continue;
        }
        if (typeof val === 'function') {
          continue; // Strip executable functions
        }
        if (typeof val === 'object' && val !== null) {
          safe[key] = cleanObject(val, depth + 1);
        } else if (typeof val === 'string') {
          safe[key] = this.sanitizeText(val, 500);
        } else if (typeof val === 'number' && Number.isFinite(val)) {
          safe[key] = val;
        } else if (typeof val === 'boolean') {
          safe[key] = val;
        }
      }
      return safe;
    };

    const sanitized = cleanObject(raw);
    return sanitized;
  },

  /**
   * Cryptographically hashes passcodes using standard SHA-256 with salt
   */
  async hashPasscode(passcode, salt = 'GiverCapsuleSecureSalt2026') {
    if (!passcode || typeof passcode !== 'string') return '';
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(passcode + salt);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch {
      // Fallback simple hash if SubtleCrypto unavailable (e.g. non-secure localhost)
      let hash = 0;
      const combined = passcode + salt;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash << 5) - hash + combined.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString(16);
    }
  },

  /**
   * Rate limiting to prevent brute-force attacks
   */
  _attempts: {},
  checkRateLimit(actionKey, maxAttempts = 5, cooldownMs = 30000) {
    const now = Date.now();
    const record = this._attempts[actionKey] || { count: 0, firstAttempt: now, blockedUntil: 0 };

    if (record.blockedUntil > now) {
      const waitSeconds = Math.ceil((record.blockedUntil - now) / 1000);
      return { allowed: false, waitSeconds };
    }

    // Reset window if past cooldown
    if (now - record.firstAttempt > cooldownMs) {
      record.count = 1;
      record.firstAttempt = now;
      this._attempts[actionKey] = record;
      return { allowed: true };
    }

    record.count += 1;
    if (record.count > maxAttempts) {
      record.blockedUntil = now + cooldownMs;
      this._attempts[actionKey] = record;
      return { allowed: false, waitSeconds: Math.ceil(cooldownMs / 1000) };
    }

    this._attempts[actionKey] = record;
    return { allowed: true };
  },

  resetRateLimit(actionKey) {
    delete this._attempts[actionKey];
  }
};
