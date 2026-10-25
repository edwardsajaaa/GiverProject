// Procedural Web Audio API sound engine for Love Capsule
// Zero external assets required, instant and authentic audio feedback!

class CapsuleAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.currentTrackId = null;
    this.crackleNode = null;
    this.musicTimer = null;
    this.gainNode = null;
    this.volume = 0.6;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sound Effect: Wax Seal Crack & Envelope Opening
  playSealCrack() {
    this.init();
    if (!this.ctx || this.muted) return;

    const t = this.ctx.currentTime;
    
    // 1. Crisp wax snap / click
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(320, t);
    snapOsc.frequency.exponentialRampToValueAtTime(40, t + 0.08);
    snapGain.gain.setValueAtTime(0.5 * this.volume, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);
    snapOsc.start(t);
    snapOsc.stop(t + 0.09);

    // 2. Soft paper rustle / whoosh
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t + 0.05);
    filter.frequency.exponentialRampToValueAtTime(450, t + 0.4);
    filter.Q.value = 2.0;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, t);
    noiseGain.gain.linearRampToValueAtTime(0.35 * this.volume, t + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(t + 0.04);
  }

  // Sound Effect: Soft Page Turn
  playPageTurn() {
    this.init();
    if (!this.ctx || this.muted) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.2 * this.volume, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);
  }

  // Sound Effect: Vinyl Needle Drop
  playNeedleDrop() {
    this.init();
    if (!this.ctx || this.muted) return;

    const t = this.ctx.currentTime;
    // Thump
    const thump = this.ctx.createOscillator();
    const thumpGain = this.ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(95, t);
    thump.frequency.exponentialRampToValueAtTime(30, t + 0.12);
    thumpGain.gain.setValueAtTime(0.4 * this.volume, t);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    thump.connect(thumpGain);
    thumpGain.connect(this.ctx.destination);
    thump.start(t);
    thump.stop(t + 0.13);
  }

  // Start Vinyl Ambient Crackle Loop
  startVinylCrackle() {
    if (this.crackleNode || !this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Periodic clicks and continuous soft hiss
      const isPop = Math.random() < 0.0018;
      const popAmp = isPop ? (Math.random() * 0.6 - 0.3) : 0;
      const hiss = (Math.random() * 2 - 1) * 0.015;
      data[i] = popAmp + hiss;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 500;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.15 * this.volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(0);

    this.crackleNode = { source: noise, gain };
  }

  stopVinylCrackle() {
    if (this.crackleNode) {
      try {
        this.crackleNode.source.stop();
        this.crackleNode.source.disconnect();
      } catch (e) {
        // ignore
      }
      this.crackleNode = null;
    }
  }

  // Play Romantic Chords for the Vinyl Player
  playTrack(trackId) {
    this.init();
    if (!this.ctx) return;

    if (this.isPlayingMusic && this.currentTrackId === trackId) {
      // Toggle off
      this.stopMusic();
      return;
    }

    this.stopMusic();
    this.playNeedleDrop();
    this.startVinylCrackle();
    this.isPlayingMusic = true;
    this.currentTrackId = trackId;

    // Track progression templates (Hz frequencies for warm romantic chords)
    const chordProgressions = {
      1: [ // Congratulations / The Divine Feminine (Mac Miller) - Warm Jazz Neo-Soul
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ],
      2: [ // Seasons (Wave to Earth) - Dreamy Indie Lo-fi
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [164.81, 207.65, 246.94, 311.13], // E7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [196.00, 246.94, 293.66, 349.23], // G7
      ],
      3: [ // Best Part (Daniel Caesar ft. H.E.R.) - Acoustic Soul
        [293.66, 369.99, 440.00, 554.37], // Dmaj7
        [246.94, 293.66, 369.99, 440.00], // Bm7
        [196.00, 246.94, 293.66, 369.99], // Gmaj7
        [220.00, 277.18, 329.63, 392.00], // A7
      ],
      4: [ // Valentine / From the Start (Laufey) - Vintage Bossa Jazz
        [293.66, 349.23, 440.00, 523.25], // Dm7
        [196.00, 246.94, 293.66, 349.23], // G7
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 277.18, 329.63, 392.00], // A7
      ],
      5: [ // Lover (Taylor Swift) - Warm Romantic Acoustic
        [196.00, 246.94, 293.66, 392.00], // G
        [146.83, 220.00, 293.66, 369.99], // D
        [130.81, 164.81, 196.00, 261.63], // C
        [196.00, 246.94, 293.66, 392.00], // G
      ],
      6: [ // Pluto Projector (Rex Orange County) - Dreamy Bedroom Pop
        [155.56, 196.00, 233.08, 293.66], // Ebmaj7
        [130.81, 196.00, 233.08, 261.63], // Cm7
        [174.61, 207.65, 261.63, 311.13], // Fm7
        [233.08, 293.66, 349.23, 415.30], // Bb7
      ]
    };

    const chords = chordProgressions[trackId] || chordProgressions[1];
    let step = 0;

    const playChord = () => {
      if (!this.isPlayingMusic || !this.ctx || this.muted) return;
      const currentChord = chords[step % chords.length];
      const now = this.ctx.currentTime;

      currentChord.forEach((freq, idx) => {
        // Slight arpeggiation delay
        const noteTime = now + (idx * 0.06);
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        
        // Rhodes / electric piano tone using soft sine/triangle blend
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        // Soft envelope
        noteGain.gain.setValueAtTime(0.0001, noteTime);
        noteGain.gain.linearRampToValueAtTime(0.18 * this.volume, noteTime + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.8);

        osc.connect(noteGain);
        noteGain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 3.0);
      });

      step++;
      this.musicTimer = setTimeout(playChord, 2600);
    };

    // Begin chord cycle after brief needle set
    setTimeout(() => {
      if (this.isPlayingMusic) {
        playChord();
      }
    }, 400);
  }

  stopMusic() {
    this.isPlayingMusic = false;
    this.currentTrackId = null;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    this.stopVinylCrackle();
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopMusic();
    }
    return this.muted;
  }
}

export const capsuleAudio = new CapsuleAudioEngine();
