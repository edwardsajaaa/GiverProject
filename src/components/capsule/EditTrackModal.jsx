import React, { useState, useEffect } from 'react';
import { SecurityEngine } from '../../utils/securityEngine';
import { AudioStorage } from '../../utils/audioStorage';
import { WashiTape, BlackTape } from './TornPaper';

const POPULAR_PRESETS = [
  {
    title: 'Seasons',
    artist: 'Wave to Earth',
    album: '0.1 Flaws and All',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    lyrics: `I can't be your love, 'cause I'm afraid\nI might have you hurt again...\nYet every season still reminds me of your smile.`,
    audioUrl: '',
  },
  {
    title: 'Best Part',
    artist: 'Daniel Caesar ft. H.E.R.',
    album: 'Freudian',
    cover: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop',
    lyrics: `You're the coffee that I need in the morning,\nYou're my sunshine in the rain.\nIf life is a movie, oh, you're the best part.`,
    audioUrl: '',
  },
  {
    title: 'Pluto Projector',
    artist: 'Rex Orange County',
    album: 'Pony',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
    lyrics: `The greatest thing I'll ever learn\nIs just to love and be loved in return.\nYou're everything I've ever wished for.`,
    audioUrl: '',
  },
  {
    title: 'From the Start',
    artist: 'Laufey',
    album: 'Bewitched',
    cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    lyrics: `Don't you see me blushing whenever you're around?\nI've been in love with you right from the start...\nYou make my quiet heart dance.`,
    audioUrl: '',
  },
  {
    title: 'Congratulations',
    artist: 'Mac Miller ft. Bilal',
    album: 'The Divine Feminine',
    cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop',
    lyrics: `“ The Sun don't shine when I'm alone\nI lose my mind and I lose control\nI see your eyes look through my soul\nDon't be surprised, this is all I know ”`,
    audioUrl: '',
  },
];

export function EditTrackModal({ isOpen, onClose, track, onSaveTrack }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [cover, setCover] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  useEffect(() => {
    if (track) {
      setTitle(track.title || '');
      setArtist(track.artist || '');
      setAlbum(track.album || '');
      setCover(track.cover || '');
      setAudioUrl(track.audioUrl || '');
      setUploadFileName('');

      if (typeof track.lyrics === 'string') {
        setLyrics(track.lyrics);
      } else {
        setLyrics(`“ The music plays, and in every note, I hear your laugh. ”`);
      }
    }
  }, [track, isOpen]);

  if (!isOpen || !track) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = SecurityEngine.validateFile(file, {
      allowedTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/m4a'],
      maxSizeBytes: 30 * 1024 * 1024 // 30MB
    });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    try {
      const { blobUrl, fileName } = await AudioStorage.saveTrackAudio(track.id, file);
      setAudioUrl(blobUrl);
      setUploadFileName(fileName);
    } catch (err) {
      console.warn('Gagal menyimpan ke IndexedDB, menggunakan URL lokal sementara:', err);
      const fallbackUrl = URL.createObjectURL(file);
      setAudioUrl(fallbackUrl);
      setUploadFileName(file.name);
    }
  };

  const applyPreset = (preset) => {
    setTitle(preset.title);
    setArtist(preset.artist);
    setAlbum(preset.album);
    setCover(preset.cover);
    setLyrics(preset.lyrics);
    if (preset.audioUrl) {
      setAudioUrl(preset.audioUrl);
    }
  };

  const handleSave = () => {
    const sanitizedTitle = SecurityEngine.sanitizeText(title.trim(), 100);
    const sanitizedArtist = SecurityEngine.sanitizeText(artist.trim(), 100);
    const sanitizedAlbum = SecurityEngine.sanitizeText(album.trim(), 100);
    const sanitizedLyrics = SecurityEngine.sanitizeText(lyrics.trim(), 1000);

    onSaveTrack({
      ...track,
      title: sanitizedTitle || 'Untitled Track',
      artist: sanitizedArtist || 'Unknown Artist',
      album: sanitizedAlbum || 'Exclusive Single',
      cover: cover.trim() || track.cover,
      audioUrl: audioUrl.trim(),
      lyrics: sanitizedLyrics,
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(15, 2, 5, 0.85)',
      backdropFilter: 'blur(10px)',
      padding: '16px',
      fontFamily: "'Cormorant Garamond', serif",
      animation: 'fadeIn 0.25s ease',
    }}>
      {/* Torn Paper Track Editor Modal */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '88vh',
        backgroundColor: '#FAF7F2',
        border: '2px solid #121212',
        padding: '28px 26px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.85)',
        overflowY: 'auto',
        color: '#121212',
        clipPath: 'polygon(0% 4px, 1.5% 0px, 98.5% 0px, 100% 4px, 99.5% 96%, 100% 100%, 0.5% 100%, 0% 96%)',
      }}>
        {/* Tape strips */}
        <WashiTape top="-8px" left="24px" width="65px" rotate={-2} color="rgba(255, 235, 215, 0.85)" />
        <BlackTape top="-6px" right="24px" width="55px" rotate={3} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#a61324',
              color: '#ffffff',
              fontSize: '9px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '2px 8px',
              marginBottom: '6px',
            }}>
              TRACK #{track.id} • HI-FI VINYL STATION
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: '#121212',
            }}>
              Kustomisasi Lagu Vinyl
            </h2>
            <p style={{
              margin: '3px 0 0',
              fontSize: '12px',
              fontStyle: 'italic',
              color: '#666',
            }}>
              Masukkan URL streaming internet (MP3) atau berkas audio Anda sendiri.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #121212',
              width: '28px',
              height: '28px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#121212',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            ✕
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '10px',
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '1px',
            color: '#85101c',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            ✦ PILIH PRESET LAGU CEPAT:
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {POPULAR_PRESETS.map((p) => (
              <button
                key={p.title}
                type="button"
                onClick={() => applyPreset(p)}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #121212',
                  fontSize: '10px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#121212',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#121212'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#121212'; }}
              >
                {p.artist} - {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Audio URL Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '10px',
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '1px',
              color: '#85101c',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              1. URL AUDIO DARI INTERNET (DIRECT .MP3 / STREAM)
            </label>
            <input
              type="url"
              placeholder="https://domain.com/path-to-song.mp3"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12px',
                border: '1.5px solid #121212',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            <div style={{ fontSize: '10px', color: '#666', marginTop: '3px', fontStyle: 'italic' }}>
              Dapat menggunakan direct audio URL dari internet, hosting file, CDN, atau Dropbox (dl=1).
            </div>
          </div>

          {/* Atau Upload File Audio Sendiri */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '10px',
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '1px',
              color: '#85101c',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              ATAU UNGGAH BERKAS AUDIO DARI PERANGKAT (.MP3 / .WAV / .OGG)
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              border: '1.5px dashed #121212',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#85101c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span style={{ fontSize: '11px', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                  {uploadFileName ? `File Terpilih: ${uploadFileName}` : 'Pilih Lagu dari Komputer / HP'}
                </span>
              </div>
              <span style={{
                fontSize: '9px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                backgroundColor: '#121212',
                color: '#fff',
                padding: '3px 8px',
                letterSpacing: '1px',
              }}>
                BROWSE ⟶
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>

            <div style={{
              fontSize: '11px',
              backgroundColor: '#fffdf5',
              border: '1px dashed #d4af37',
              padding: '8px 12px',
              marginTop: '6px',
              lineHeight: 1.5,
              color: '#444',
            }}>
              <strong style={{ color: '#85101c', display: 'block', marginBottom: '2px', fontFamily: "'Montserrat', sans-serif", fontSize: '9px', letterSpacing: '0.8px' }}>
                ✦ CARA MENYIMPAN & MEMBAGIKAN LAGU KE GEBETAN:
              </strong>
              • <strong>Upload dari Perangkat:</strong> File otomatis tersimpan aman di memori browser perangkat ini (IndexedDB).<br />
              • <strong>Agar Terdengar di HP Gebetan Saat Web Dibagikan:</strong> Masukkan file MP3 ke folder <code>public/audio/</code> (misal: <code>/audio/lagu.mp3</code>) lalu commit & push, atau tempelkan direct audio URL internet.
            </div>
          </div>

          {/* Judul & Artis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '1px',
                color: '#121212',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                JUDUL LAGU
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Seasons"
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  border: '1.5px solid #121212',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '1px',
                color: '#121212',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                NAMA ARTIS
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Contoh: Wave to Earth"
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  border: '1.5px solid #121212',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Album & Cover Image URL */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '1px',
                color: '#121212',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                NAMA ALBUM
              </label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Nama Album"
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  border: '1.5px solid #121212',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '1px',
                color: '#121212',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                URL COVER ALBUM
              </label>
              <input
                type="url"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                placeholder="https://.../cover.jpg"
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  border: '1.5px solid #121212',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Lyrics */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '10px',
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '1px',
              color: '#121212',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              KUTIPAN LIRIK LAGU / PESAN ROMANTIS
            </label>
            <textarea
              rows={4}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Tuliskan lirik yang mengingatkanmu padanya..."
              style={{
                width: '100%',
                padding: '8px 10px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '15px',
                lineHeight: 1.5,
                border: '1.5px solid #121212',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '18px',
          borderTop: '1px solid #121212',
          paddingTop: '14px',
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '10px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#666',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              backgroundColor: '#121212',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              fontSize: '11px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a61324'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#121212'}
          >
            SIMPAN LAGU & PERBARUI VINYL ⟶
          </button>
        </div>
      </div>
    </div>
  );
}
