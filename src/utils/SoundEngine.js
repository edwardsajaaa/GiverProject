// ============ WEB AUDIO SOUND ENGINE ============
export const SoundEngine = {
  ctx: null,
  osc: null,
  gain: null,
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
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
  setAmbient(active, isNight) {
    this.init();
    if (!this.ctx) return;
    try {
      if (!active) {
        if (this.osc) { this.osc.stop(); this.osc.disconnect(); this.osc = null; }
        return;
      }
      if (this.osc) return;
      this.osc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();
      this.osc.type = isNight ? 'sine' : 'triangle';
      this.osc.frequency.setValueAtTime(isNight ? 108 : 164, this.ctx.currentTime);
      this.gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.osc.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.osc.start();
    } catch { /* ignore audio blocked */ }
  }
};
