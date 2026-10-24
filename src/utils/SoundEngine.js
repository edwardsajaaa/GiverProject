// ============ WEB AUDIO SOUND ENGINE ============
export const SoundEngine = {
  ctx: null,
  osc: null,
  gain: null,
  ambientInterval: null,

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  },

  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(440, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
      g.gain.setValueAtTime(0.18, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.12);
    } catch { /* ignore audio blocked */ }
  },

  playDelete() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(320, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.18);
      g.gain.setValueAtTime(0.15, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.18);
    } catch { /* ignore audio blocked */ }
  },

  playClick() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(640, this.ctx.currentTime);
      g.gain.setValueAtTime(0.06, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.05);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.05);
    } catch { /* ignore audio blocked */ }
  },

  // --- Immersive Landmark Interactive Sounds ---
  playTokyoTowerBeacon() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + i * 0.08);
        g.gain.setValueAtTime(0.08, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.45);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.45);
      });
    } catch { /* ignore */ }
  },

  playSkytreeChime() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [880, 1174.66, 1760, 2349.32].forEach((freq, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + i * 0.06);
        g.gain.setValueAtTime(0.05, now + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.6);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + i * 0.06);
        o.stop(now + i * 0.06 + 0.6);
      });
    } catch { /* ignore */ }
  },

  // Japanese Train Station Departure Melody (JR East Style 5-Note Jingle)
  playShinkansenDeparture() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const melody = [
        { f: 659.25, t: 0.00, d: 0.16 }, // E5
        { f: 783.99, t: 0.16, d: 0.16 }, // G5
        { f: 987.77, t: 0.32, d: 0.18 }, // B5
        { f: 1174.66, t: 0.50, d: 0.22 }, // D6
        { f: 1318.51, t: 0.72, d: 0.50 }  // E6
      ];
      melody.forEach(n => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(n.f, now + n.t);
        g.gain.setValueAtTime(0.09, now + n.t);
        g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + n.t);
        o.stop(now + n.t + n.d);
      });
    } catch { /* ignore */ }
  },

  // Resonant Japanese Buddhist Temple Bell / Singing Bowl (Bonshō)
  playTempleGong() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const partials = [
        { f: 146.83, g: 0.15, d: 3.2 },
        { f: 293.66, g: 0.10, d: 2.6 },
        { f: 440.00, g: 0.06, d: 1.8 },
        { f: 587.33, g: 0.03, d: 1.2 }
      ];
      partials.forEach(p => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(p.f, now);
        g.gain.setValueAtTime(p.g, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + p.d);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now);
        o.stop(now + p.d);
      });
    } catch { /* ignore */ }
  },

  playAirshipHorn() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [220, 277.18, 329.63].forEach(freq => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now);
        o.stop(now + 0.85);
      });
    } catch { /* ignore */ }
  },

  // --- Rich Calming Japanese Ambient Soundscape ---
  setAmbient(active, isNight) {
    this.init();
    if (!this.ctx) return;
    try {
      if (!active) {
        if (this.osc) {
          this.osc.stop();
          this.osc.disconnect();
          this.osc = null;
        }
        if (this.ambientInterval) {
          clearInterval(this.ambientInterval);
          this.ambientInterval = null;
        }
        return;
      }

      if (!this.osc) {
        // Continuous soothing foundation drone (deep harmonic root)
        this.osc = this.ctx.createOscillator();
        this.gain = this.ctx.createGain();
        this.osc.type = isNight ? 'sine' : 'triangle';
        this.osc.frequency.setValueAtTime(isNight ? 110 : 164.81, this.ctx.currentTime);
        this.gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
        this.osc.connect(this.gain);
        this.gain.connect(this.ctx.destination);
        this.osc.start();
      }

      // Gentle recurring temple gong & wind chime pulse every 14 seconds
      if (!this.ambientInterval) {
        this.ambientInterval = setInterval(() => {
          if (Math.random() < 0.6) {
            this.playTempleGong();
          }
        }, 14000);
      }
    } catch { /* ignore audio blocked */ }
  }
};
