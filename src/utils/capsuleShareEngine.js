import { SecurityEngine } from './securityEngine';

const STORAGE_KEY = 'giver_capsule_data_v2';

export const DEFAULT_CAPSULE_DATA = {
  sender: 'Alex',
  recipient: 'Sarah',
  envelopeTitle: 'Will You Be My Valentine?',
  letterHeading: "Girl, I'm so in love with You",
  letterText: `Every moment since the day we met has felt like finding a rare constellation in a quiet sky.\n\nYou bring warmth into ordinary days, and in your laugh, I've found my favorite melody. I built this little capsule so that whenever the world feels loud, you can return here and remember how deeply, endlessly, and tenderly you are cherished.\n\nThank you for being my peace, my adventure, and my love.`,
  letterSignature: 'Forever Yours, Alex',
  photos: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop',
      caption: 'Every sweet moment with you',
      rotate: -1.8,
      tapeType: 'black',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
      caption: 'My favorite person in every universe',
      tagLeft: "alex's gallery",
      tagRight: "my pretty girl",
      rotate: 1.2,
      tapeType: 'washi',
      hasCrown: true,
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop',
      caption: 'In your eyes, I found my home',
      rotate: -1.2,
      tapeType: 'black',
    }
  ],
  dedicatedTrackId: 1,
  dedicatedTrack: null,
  biome: 'paris_romantique',
  pin: '',
};

function toUrlSafeBase64(str) {
  try {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    console.error('toUrlSafeBase64 failed:', e);
    return '';
  }
}

function fromUrlSafeBase64(base64) {
  try {
    let std = base64.replace(/-/g, '+').replace(/_/g, '/');
    while (std.length % 4) {
      std += '=';
    }
    const binary = atob(std);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    console.error('fromUrlSafeBase64 failed:', e);
    return null;
  }
}

export const CapsuleShareEngine = {
  /**
   * Mengambil data awal saat web dibuka:
   * Mendeteksi apakah user adalah Penerima (melalui URL query ?c= atau ?to=&from=)
   * atau Pengirim (default / local storage)
   */
  getInitialState() {
    if (typeof window === 'undefined') {
      return { isReceiver: false, data: { ...DEFAULT_CAPSULE_DATA } };
    }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      let payload = urlParams.get('c') || urlParams.get('capsule');

      // Cek juga di hash URL (#c=...)
      if (!payload && window.location.hash.includes('c=')) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#\/?/, ''));
        payload = hashParams.get('c') || hashParams.get('capsule');
      }

      if (payload) {
        const jsonStr = fromUrlSafeBase64(payload);
        if (jsonStr) {
          const parsed = JSON.parse(jsonStr);
          const sanitized = this.sanitizeCapsuleData(parsed);
          return {
            isReceiver: true,
            data: sanitized,
          };
        }
      }

      // Dukungan format query sederhana: ?to=Sarah&from=Alex&track=2
      const toParam = urlParams.get('to');
      const fromParam = urlParams.get('from');
      const trackParam = urlParams.get('track') || urlParams.get('trackId') || urlParams.get('song');
      if (toParam || fromParam) {
        const customData = {
          ...DEFAULT_CAPSULE_DATA,
          recipient: toParam ? SecurityEngine.sanitizeText(toParam, 40) : DEFAULT_CAPSULE_DATA.recipient,
          sender: fromParam ? SecurityEngine.sanitizeText(fromParam, 40) : DEFAULT_CAPSULE_DATA.sender,
          dedicatedTrackId: trackParam ? (parseInt(trackParam, 10) || 1) : 1,
        };
        return {
          isReceiver: true,
          data: customData,
        };
      }

      // Jika bukan penerima, muat data pengirim dari localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          isReceiver: false,
          data: this.sanitizeCapsuleData(parsed),
        };
      }
    } catch (err) {
      console.warn('CapsuleShareEngine.getInitialState error:', err);
    }

    return {
      isReceiver: false,
      data: { ...DEFAULT_CAPSULE_DATA },
    };
  },

  /**
   * Sanitasi data kapsul agar aman dari injeksi script
   */
  sanitizeCapsuleData(data) {
    if (!data || typeof data !== 'object') return { ...DEFAULT_CAPSULE_DATA };

    const sanitized = {
      ...DEFAULT_CAPSULE_DATA,
      sender: SecurityEngine.sanitizeText(data.sender || DEFAULT_CAPSULE_DATA.sender, 50),
      recipient: SecurityEngine.sanitizeText(data.recipient || DEFAULT_CAPSULE_DATA.recipient, 50),
      envelopeTitle: SecurityEngine.sanitizeText(data.envelopeTitle || DEFAULT_CAPSULE_DATA.envelopeTitle, 80),
      letterHeading: SecurityEngine.sanitizeText(data.letterHeading || DEFAULT_CAPSULE_DATA.letterHeading, 100),
      letterText: SecurityEngine.sanitizeText(data.letterText || DEFAULT_CAPSULE_DATA.letterText, 3000),
      letterSignature: SecurityEngine.sanitizeText(data.letterSignature || DEFAULT_CAPSULE_DATA.letterSignature, 60),
      dedicatedTrackId: Number(data.dedicatedTrackId) || Number(data.trackId) || 1,
      dedicatedTrack: data.dedicatedTrack ? {
        id: Number(data.dedicatedTrack.id) || 1,
        title: SecurityEngine.sanitizeText(data.dedicatedTrack.title || '', 60),
        artist: SecurityEngine.sanitizeText(data.dedicatedTrack.artist || '', 60),
        album: SecurityEngine.sanitizeText(data.dedicatedTrack.album || '', 60),
        cover: SecurityEngine.sanitizeText(data.dedicatedTrack.cover || '', 1000),
        labelColor: SecurityEngine.sanitizeText(data.dedicatedTrack.labelColor || '#85101c', 20),
        lyrics: typeof data.dedicatedTrack.lyrics === 'string' ? SecurityEngine.sanitizeText(data.dedicatedTrack.lyrics, 2000) : '',
        audioUrl: SecurityEngine.sanitizeText(data.dedicatedTrack.audioUrl || '', 1000),
      } : null,
      biome: SecurityEngine.sanitizeText(data.biome || DEFAULT_CAPSULE_DATA.biome, 40),
      pin: SecurityEngine.sanitizeText(data.pin || '', 10),
    };

    if (Array.isArray(data.photos) && data.photos.length > 0) {
      sanitized.photos = data.photos.slice(0, 3).map((p, idx) => ({
        id: p.id || idx + 1,
        url: SecurityEngine.sanitizeText(p.url || DEFAULT_CAPSULE_DATA.photos[idx]?.url, 1000),
        caption: SecurityEngine.sanitizeText(p.caption || DEFAULT_CAPSULE_DATA.photos[idx]?.caption, 120),
        tagLeft: p.tagLeft ? SecurityEngine.sanitizeText(p.tagLeft, 40) : undefined,
        tagRight: p.tagRight ? SecurityEngine.sanitizeText(p.tagRight, 40) : undefined,
        rotate: typeof p.rotate === 'number' ? p.rotate : (DEFAULT_CAPSULE_DATA.photos[idx]?.rotate || 0),
        tapeType: p.tapeType || 'washi',
        hasCrown: Boolean(p.hasCrown),
      }));
    }

    return sanitized;
  },

  /**
   * Menyimpan data pengirim ke browser localStorage
   */
  saveLocalData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  },

  /**
   * Membuat tautan (URL) shareable yang bisa langsung dikirim ke pasangan
   */
  generateShareLink(data) {
    if (typeof window === 'undefined') return '';

    // Ambil subset data penting untuk menjaga link tetap ringkas & elegan
    const compactData = {
      sender: data.sender,
      recipient: data.recipient,
      envelopeTitle: data.envelopeTitle,
      letterHeading: data.letterHeading,
      letterText: data.letterText,
      letterSignature: data.letterSignature,
      dedicatedTrackId: data.dedicatedTrackId || data.trackId || 1,
      dedicatedTrack: data.dedicatedTrack ? {
        id: data.dedicatedTrack.id,
        title: data.dedicatedTrack.title,
        artist: data.dedicatedTrack.artist,
        album: data.dedicatedTrack.album,
        cover: data.dedicatedTrack.cover,
        labelColor: data.dedicatedTrack.labelColor,
        audioUrl: data.dedicatedTrack.audioUrl || '',
        lyrics: typeof data.dedicatedTrack.lyrics === 'string' ? data.dedicatedTrack.lyrics : '',
      } : null,
      biome: data.biome,
      pin: data.pin || '',
      photos: (data.photos || []).map(p => ({
        id: p.id,
        url: p.url,
        caption: p.caption,
        tagLeft: p.tagLeft,
        tagRight: p.tagRight,
        rotate: p.rotate,
        tapeType: p.tapeType,
        hasCrown: p.hasCrown,
      })),
    };

    const json = JSON.stringify(compactData);
    const encoded = toUrlSafeBase64(json);

    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    return `${baseUrl}?c=${encoded}`;
  }
};

