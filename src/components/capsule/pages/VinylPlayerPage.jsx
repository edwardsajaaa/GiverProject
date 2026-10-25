import React, { useState, useEffect } from 'react';
import { capsuleAudio } from '../audio/capsuleAudio';
import { EditTrackModal } from '../EditTrackModal';
import { AudioStorage } from '../../../utils/audioStorage';
import {
  TornScrap,
  WashiTape,
  BlackTape,
  EditorialButton,
  CircleArrowButton,
} from '../TornPaper';

export const VINYL_COLLECTION = [
  {
    id: 1,
    title: 'Congratulations',
    album: 'The Divine Feminine',
    artist: 'Mac Miller ft. Bilal',
    cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop',
    labelColor: '#9b1b2f',
    lyrics: (
      <>
        “ The <strong>Sun don't shine</strong> when <strong>I'm alone</strong><br />
        I <strong>lose my mind</strong> and I <strong>lose control</strong><br />
        I see <strong>your eyes</strong> look through <strong>my soul</strong><br />
        Don't be <strong>surprised</strong>, this is all I know ”
      </>
    ),
  },
  {
    id: 2,
    title: 'Seasons',
    album: '0.1 Flaws and All',
    artist: 'Wave to Earth',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    labelColor: '#3d4d38',
    lyrics: (
      <>
        I can't be <strong>your love</strong>, 'cause I'm <strong>afraid</strong><br />
        I might <strong>have you hurt</strong> again...<br />
        Yet <strong>every season</strong> still reminds me of <strong>your smile</strong>.
      </>
    ),
  },
  {
    id: 3,
    title: 'Best Part',
    album: 'Freudian',
    artist: 'Daniel Caesar ft. H.E.R.',
    cover: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop',
    labelColor: '#8a4f20',
    lyrics: (
      <>
        You're the <strong>coffee that I need</strong> in the morning,<br />
        You're my <strong>sunshine</strong> in the rain.<br />
        If <strong>life is a movie</strong>, oh, you're the <strong>best part</strong>.
      </>
    ),
  },
  {
    id: 4,
    title: 'From the Start',
    album: 'Bewitched',
    artist: 'Laufey',
    cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    labelColor: '#b83b5e',
    lyrics: (
      <>
        Don't you see me <strong>blushing</strong> whenever you're around?<br />
        I've been in <strong>love with you</strong> right <strong>from the start</strong>...<br />
        You make my <strong>quiet heart</strong> dance.
      </>
    ),
  },
  {
    id: 5,
    title: 'Lover',
    album: 'Lover',
    artist: 'Taylor Swift',
    cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
    labelColor: '#d65b7a',
    lyrics: (
      <>
        Can I go <strong>where you go</strong>?<br />
        Can we <strong>always be this close</strong> forever and ever?<br />
        And ah, take me out, and <strong>take me home</strong>, you're my <strong>lover</strong>.
      </>
    ),
  },
  {
    id: 6,
    title: 'Pluto Projector',
    album: 'Pony',
    artist: 'Rex Orange County',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
    labelColor: '#2b3a4a',
    lyrics: (
      <>
        The <strong>greatest thing</strong> I'll ever learn<br />
        Is just to <strong>love</strong> and be <strong>loved in return</strong>.<br />
        You're <strong>everything</strong> I've ever wished for.
      </>
    ),
  },
];

export function VinylPlayerPage({ onPrev, onEnter3DWorld }) {
  // State: Tracks loaded from localStorage or default
  const [tracks, setTracks] = useState(() => {
    try {
      const saved = localStorage.getItem('giver_capsule_vinyls_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved vinyls:', e);
    }
    return VINYL_COLLECTION;
  });

  // State: Currently loaded track ID (1-6)
  const [loadedTrackId, setLoadedTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [isEjecting, setIsEjecting] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedTrackId, setDraggedTrackId] = useState(null);
  const [editingTrack, setEditingTrack] = useState(null);

  const activeTrack = tracks.find((t) => t.id === loadedTrackId) || tracks[0];

  // Restore any persistent local audio files from IndexedDB on mount
  useEffect(() => {
    let isMounted = true;
    AudioStorage.getAllTrackAudios().then((audioMap) => {
      if (!isMounted || !audioMap || Object.keys(audioMap).length === 0) return;
      setTracks((prevTracks) =>
        prevTracks.map((t) => {
          if (audioMap[t.id]) {
            return {
              ...t,
              audioUrl: audioMap[t.id].blobUrl,
              isLocalStored: true,
              localFileName: audioMap[t.id].fileName,
            };
          }
          return t;
        })
      );
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Save tracks to localStorage on change
  const handleSaveTrack = (updatedTrack) => {
    const updated = tracks.map((t) => (t.id === updatedTrack.id ? updatedTrack : t));
    setTracks(updated);
    try {
      localStorage.setItem('giver_capsule_vinyls_v3', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save vinyls to localStorage:', e);
    }

    // If currently playing the track that was modified, replay with the new audio URL
    if (loadedTrackId === updatedTrack.id && isPlaying) {
      capsuleAudio.playTrack(updatedTrack.id, updatedTrack.audioUrl);
    }
  };

  // Plug & Play Track Switch Handler with Motion Animation
  const handlePlugTrack = (newTrackId) => {
    const targetTrack = tracks.find((t) => t.id === newTrackId) || tracks[0];
    if (newTrackId === loadedTrackId) {
      // Toggle Play/Pause on current track
      togglePlayPause();
      return;
    }

    // Sequence: Eject current -> Insert new track -> Play
    setIsPlaying(false);
    setIsEjecting(true);
    capsuleAudio.stopMusic();

    setTimeout(() => {
      setIsEjecting(false);
      setLoadedTrackId(newTrackId);
      setIsInserting(true);

      setTimeout(() => {
        setIsInserting(false);
        setIsPlaying(true);
        capsuleAudio.playTrack(newTrackId, targetTrack.audioUrl);
      }, 700);
    }, 450);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      capsuleAudio.stopMusic();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      capsuleAudio.playTrack(loadedTrackId, activeTrack.audioUrl);
    }
  };

  const handleEject = () => {
    if (isPlaying) {
      capsuleAudio.stopMusic();
      setIsPlaying(false);
    }
    setIsEjecting(true);
    setTimeout(() => {
      setIsEjecting(false);
    }, 500);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      capsuleAudio.stopMusic();
    };
  }, []);

  return (
    <div 
      className="vinyl-player-page"
      style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px 30px 36px 30px',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        color: '#121212',
      }}
    >
      {/* Top Headline on Torn Paper Header */}
      <div 
        className="vinyl-player-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '8px',
          gap: '8px',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <p style={{
            margin: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#121212',
          }}>
            ✦ VINTAGE HI-FI VINYL STATION
          </p>
          <span style={{
            fontSize: '18px',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: '#333',
          }}>
            Songs that remind me of you...
          </span>
        </div>
      </div>

      {/* Main Turntable Stage (Left: Realistic Turntable, Right: Current Lyric Scrap) */}
      <div 
        className="vinyl-stage-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '24px',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        {/* The Single Dedicated Turntable Player Chassis with Drag & Drop Zone */}
        <div 
          className="vinyl-turntable-chassis"
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            if (!isDraggingOver) setIsDraggingOver(true);
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsDraggingOver(false);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            const data = e.dataTransfer.getData('text/plain');
            const trackId = parseInt(data, 10) || draggedTrackId;
            if (trackId) {
              handlePlugTrack(trackId);
            }
          }}
          style={{
            position: 'relative',
            backgroundColor: '#1c1c1e',
            borderRadius: '4px',
            padding: '18px 22px',
            boxShadow: isDraggingOver
              ? '0 0 35px rgba(200, 16, 46, 0.6), 0 16px 36px rgba(0,0,0,0.5)'
              : '0 16px 36px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)',
            border: isDraggingOver ? '2px dashed #a61324' : '1.5px solid #2a2a2c',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '220px',
            justifyContent: 'center',
            backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
            transition: 'border 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          {/* Wood Veneer Trim Edge on Bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #5c2c16 0%, #8a4823 50%, #5c2c16 100%)',
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }} />

          {/* Turntable Platter Deck */}
          <div style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: '#2b2b2e',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.4)',
            border: '3px solid #3d3d42',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Spindle Pin */}
            <div style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#e5e5e5',
              boxShadow: '0 0 4px #fff',
              zIndex: 15,
            }} />

            {/* Drop Zone Glow Indicator when dragging a vinyl over turntable */}
            {isDraggingOver && (
              <div style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                backgroundColor: 'rgba(166, 19, 36, 0.88)',
                border: '2px dashed #ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 35,
                color: '#fff',
                boxShadow: '0 0 28px #c8102e',
                animation: 'pulse 0.8s infinite alternate',
                pointerEvents: 'none',
              }}>
                <span style={{ fontSize: '24px', lineHeight: 1 }}>⬇</span>
                <span style={{ fontSize: '9px', fontWeight: 800, fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>
                  DROP VINYL HERE
                </span>
              </div>
            )}

            {/* The Vinyl Disc on the Platter with Motion Animations */}
            <div
              onClick={togglePlayPause}
              style={{
                position: 'absolute',
                width: '172px',
                height: '172px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #242424 0%, #111111 55%, #050505 100%)',
                boxShadow: isPlaying 
                  ? '0 8px 24px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)' 
                  : '0 4px 14px rgba(0,0,0,0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                animation: isEjecting
                  ? 'vinylDiscFloatOut 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  : isInserting
                    ? 'vinylDiscFloatIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    : isPlaying
                      ? 'spinVinylSmooth 2.8s linear infinite'
                      : 'none',
              }}
              title="Click to Play / Pause"
            >
              {/* Vinyl Groove Rings */}
              <div style={{
                position: 'absolute',
                inset: '12px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: `
                  inset 0 0 0 6px #1c1c1c,
                  inset 0 0 0 14px #121212,
                  inset 0 0 0 22px #1f1f1f,
                  inset 0 0 0 30px #0d0d0d,
                  inset 0 0 0 38px #1a1a1a
                `,
              }} />

              {/* Shimmer Light Reflection on Vinyl (Rotates with dynamic iridescent sweep) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.11) 45deg, transparent 90deg, rgba(255,255,255,0.11) 225deg, transparent 270deg)',
                pointerEvents: 'none',
                animation: isPlaying && !isInserting && !isEjecting ? 'spinDiscShimmer 4s ease-in-out infinite alternate' : 'none',
              }} />

              {/* Center Record Label with Album Art */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: activeTrack.labelColor,
                border: '2px solid rgba(255,255,255,0.9)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
              }}>
                <img
                  src={activeTrack.cover}
                  alt={activeTrack.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(115%)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.25)',
                }} />
                <div style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  border: '1px solid #fff',
                }} />
              </div>
            </div>
          </div>

          {/* Mechanical Tonearm (Jarum Turntable) with Pivoting Motion Animation */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '28px',
            width: '28px',
            height: '130px',
            transformOrigin: 'top center',
            // When playing: swings smoothly over vinyl; when paused: rests outside
            transform: isPlaying && !isInserting && !isEjecting ? 'rotate(24.5deg)' : 'rotate(-2deg)',
            transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 20,
            pointerEvents: 'none',
          }}>
            {/* Pivot Base Socket */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#38383a',
              border: '2px solid #555',
              boxShadow: '0 2px 8px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.2)',
              margin: '0 auto',
            }} />
            {/* Metal Arm Shaft */}
            <div style={{
              width: '3.5px',
              height: '95px',
              backgroundColor: '#d1d1d1',
              margin: '-2px auto 0',
              boxShadow: '1px 1px 4px rgba(0,0,0,0.6)',
              backgroundImage: 'linear-gradient(to right, #888, #fff, #777)',
              transition: 'transform 0.3s ease',
              transform: isPlaying ? 'translateY(0)' : 'translateY(-2px)',
            }} />
            {/* Cartridge & Needle Head with Active Ruby Glow */}
            <div style={{
              width: '10px',
              height: '18px',
              backgroundColor: isPlaying ? '#c8102e' : '#a61324',
              borderRadius: '2px',
              margin: '0 auto',
              boxShadow: isPlaying 
                ? '0 0 10px rgba(225, 29, 72, 0.9), 0 2px 4px rgba(0,0,0,0.6)' 
                : '0 2px 4px rgba(0,0,0,0.6)',
              transform: 'rotate(10deg)',
              border: '1px solid #ffffff',
              transition: 'all 0.3s ease',
            }}>
              {/* Needle Tip Indicator */}
              <div style={{
                width: '2px',
                height: '3px',
                backgroundColor: isPlaying ? '#ffffff' : '#ffd700',
                margin: '12px auto 0',
                borderRadius: '50%',
                boxShadow: isPlaying ? '0 0 4px #fff' : 'none',
              }} />
            </div>
          </div>

          {/* Controls Bar on Front of Turntable */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '12px',
            zIndex: 10,
          }}>
            <button
              onClick={togglePlayPause}
              style={{
                backgroundColor: isPlaying ? '#a61324' : '#2b2b2e',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '5px 14px',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                letterSpacing: '1px',
                cursor: 'pointer',
                borderRadius: '2px',
                boxShadow: isPlaying ? '0 0 12px rgba(166, 19, 36, 0.5)' : '0 2px 6px rgba(0,0,0,0.4)',
                transition: 'all 0.25s ease',
              }}
            >
              {isPlaying ? '❚❚ PAUSE' : '▶ START'}
            </button>

            {/* Dynamic Analog VU EQ Visualizer Bars & RPM Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                color: isPlaying ? '#ffccd5' : '#888',
                letterSpacing: '1px',
                transition: 'color 0.3s',
              }}>
                33 ⅓ RPM • HI-FI
              </span>

              {isPlaying && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
                  <div style={{ width: '2px', height: '10px', backgroundColor: '#a61324', borderRadius: '1px', animation: 'vuBar1 0.45s ease-in-out infinite alternate' }} />
                  <div style={{ width: '2px', height: '14px', backgroundColor: '#e11d48', borderRadius: '1px', animation: 'vuBar2 0.35s ease-in-out infinite alternate' }} />
                  <div style={{ width: '2px', height: '7px', backgroundColor: '#f43f5e', borderRadius: '1px', animation: 'vuBar3 0.5s ease-in-out infinite alternate' }} />
                  <div style={{ width: '2px', height: '11px', backgroundColor: '#fb7185', borderRadius: '1px', animation: 'vuBar4 0.4s ease-in-out infinite alternate' }} />
                </div>
              )}
            </div>

            <button
              onClick={handleEject}
              style={{
                backgroundColor: '#2b2b2e',
                color: '#ccc',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '5px 12px',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.2s ease',
              }}
              title="Eject Vinyl"
            >
              ⏏ EJECT
            </button>
          </div>
        </div>

        {/* Right: Dynamic Lyric Clipping Card on Torn Paper Scrap with Page Flip Transition */}
        <div 
          className="vinyl-lyrics-note"
          key={loadedTrackId}
          style={{
            position: 'relative',
            animation: 'lyricCardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <WashiTape top="-10px" left="20px" width="70px" rotate={-2} color="rgba(255, 235, 205, 0.85)" />
          <BlackTape top="-8px" right="20px" width="60px" rotate={3} />

          <TornScrap
            rotate={0.6}
            bgColor="#fffdfa"
            style={{
              padding: '18px 22px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.14)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              borderBottom: '1px solid #121212',
              paddingBottom: '6px',
              marginBottom: '10px',
            }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#a61324',
              }}>
                TRACK {activeTrack.id} OF 6
              </span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                color: '#666',
              }}>
                {activeTrack.artist}
              </span>
            </div>

            <h3 style={{
              margin: '0 0 6px',
              fontSize: '20px',
              fontFamily: "'Playfair Display', serif",
              color: '#121212',
              fontWeight: 700,
            }}>
              {activeTrack.title}
            </h3>

            <div style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#333',
              fontFamily: "'Montserrat', sans-serif",
              fontStyle: 'italic',
              margin: '10px 0',
              whiteSpace: typeof activeTrack.lyrics === 'string' ? 'pre-line' : 'normal',
            }}>
              {activeTrack.lyrics}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '12px',
              paddingTop: '8px',
              borderTop: '1px dashed rgba(0,0,0,0.15)',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              <span style={{
                fontSize: '9px',
                fontFamily: "'Montserrat', sans-serif",
                color: '#888',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                ✦ SOUNDTRACK FOR OUR MOMENTS
              </span>

              <button
                type="button"
                onClick={() => setEditingTrack(activeTrack)}
                style={{
                  background: '#121212',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '9px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '1px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'background-color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a61324'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#121212'}
                title="Ganti URL streaming MP3 atau ubah lagu ini"
              >
                <span>✎ GANTI / EDIT LAGU INI</span>
              </button>
            </div>
          </TornScrap>
        </div>
      </div>

      {/* The 6 Vinyl Record Albums Collection Shelf (Plug & Play Selector) */}
      <div style={{
        backgroundColor: 'rgba(18, 18, 18, 0.04)',
        borderTop: '1px dashed #121212',
        borderBottom: '1px dashed #121212',
        padding: '10px 14px',
        margin: '4px 0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <span style={{
            fontSize: '10px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#121212',
          }}>
            ✦ YOUR VINYL CRATE (6 EXCLUSIVE ALBUMS — DRAG & DROP OR CLICK)
          </span>
        </div>

        {/* 6 Album Jackets in a row on desktop, 3 columns on mobile */}
        <div 
          className="vinyl-crate-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
          }}
        >
          {tracks.map((item) => {
            const isLoaded = loadedTrackId === item.id;
            const isBeingDragged = draggedTrackId === item.id;

            return (
              <div
                key={item.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', item.id.toString());
                  e.dataTransfer.effectAllowed = 'copy';
                  setDraggedTrackId(item.id);
                }}
                onDragEnd={() => {
                  setDraggedTrackId(null);
                  setIsDraggingOver(false);
                }}
                onClick={() => handlePlugTrack(item.id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'grab',
                  opacity: isBeingDragged ? 0.45 : 1,
                  transform: isLoaded 
                    ? 'perspective(600px) rotateY(-6deg) rotateX(3deg) translateY(-8px) scale(1.06)' 
                    : 'perspective(600px) translateY(0) scale(1)',
                  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isLoaded && !isBeingDragged) {
                    e.currentTarget.style.transform = 'perspective(600px) translateY(-6px) scale(1.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoaded && !isBeingDragged) {
                    e.currentTarget.style.transform = 'perspective(600px) translateY(0) scale(1)';
                  }
                }}
              >
                {/* Album Cover Sleeve with Sliding Vinyl Peak Effect */}
                <div style={{
                  position: 'relative',
                  width: '74px',
                  height: '74px',
                  borderRadius: '2px',
                  overflow: 'visible',
                  boxShadow: isLoaded
                    ? '0 12px 26px rgba(166, 19, 36, 0.45), 0 0 0 2px #a61324'
                    : '0 4px 10px rgba(0,0,0,0.25)',
                  backgroundColor: '#121212',
                  transition: 'box-shadow 0.3s ease',
                }}>
                  {/* Peeking Vinyl Disc Behind Jacket */}
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: isLoaded ? '-22px' : '-8px',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#111',
                    zIndex: 0,
                    boxShadow: isLoaded ? '0 6px 14px rgba(0,0,0,0.7)' : '0 2px 6px rgba(0,0,0,0.5)',
                    transition: 'right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: isLoaded && isPlaying ? 'spinVinylSmooth 2.8s linear infinite' : 'none',
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: item.labelColor,
                      border: '1px solid #fff',
                    }} />
                  </div>

                  {/* Album Cover Artwork */}
                  <img
                    src={item.cover}
                    alt={item.title}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '2px',
                      filter: isLoaded ? 'contrast(115%)' : 'grayscale(15%)',
                    }}
                  />

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '2px',
                    zIndex: 5,
                    backgroundColor: isLoaded ? (isPlaying ? '#a61324' : '#121212') : 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    fontSize: '8px',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    padding: '1px 4px',
                    borderRadius: '1px',
                    letterSpacing: '0.5px',
                  }}>
                    {isLoaded ? (isPlaying ? 'SPINNING ♫' : 'READY') : 'PLUG IN'}
                  </div>
                </div>

                {/* Album Title Below */}
                <div style={{
                  marginTop: '5px',
                  fontSize: '10px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: isLoaded ? 800 : 600,
                  color: isLoaded ? '#a61324' : '#121212',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '78px',
                }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Footer Navigation Bar */}
      <div 
        className="vinyl-player-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1.5px solid #121212',
          paddingTop: '10px',
        }}
      >
        {/* Left: Circular Arrow Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CircleArrowButton
            direction="prev"
            onClick={onPrev}
            size={28}
          />
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '2px',
          }}>
            BACK
          </span>
        </div>

        {/* Center: Chapter Stamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#121212',
          }}>
            03 / 03
          </span>
          <span 
            className="vinyl-chapter-sub"
            style={{
              fontSize: '10px',
              color: '#666',
              fontFamily: "'Montserrat', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            • CHAPTER THREE
          </span>
        </div>

        {/* Right: Enter 3D World */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <EditorialButton
            variant="black"
            onClick={onEnter3DWorld}
            style={{ padding: '5px 12px', fontSize: '10px' }}
          >
            ENTER 3D WORLD →
          </EditorialButton>
        </div>
      </div>

      {/* Vinyl Rotation Keyframes Animation & Smartphone Media Queries */}
      <style>{`
        @keyframes spinVinylSmooth {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        @keyframes spinDiscShimmer {
          0% { transform: rotate(0deg); opacity: 0.7; }
          50% { opacity: 0.95; }
          100% { transform: rotate(360deg); opacity: 0.7; }
        }

        @keyframes vinylDiscFloatIn {
          0% {
            opacity: 0;
            transform: translateY(70px) scale(0.6) perspective(800px) rotateX(30deg) rotate(-35deg);
          }
          65% {
            opacity: 1;
            transform: translateY(-8px) scale(1.03) perspective(800px) rotateX(4deg) rotate(4deg);
          }
          85% {
            transform: translateY(2px) scale(0.99) perspective(800px) rotateX(-1deg) rotate(-1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) perspective(800px) rotateX(0deg) rotate(0deg);
          }
        }

        @keyframes vinylDiscFloatOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          30% {
            opacity: 0.95;
            transform: translateY(-16px) scale(1.04) rotate(-10deg);
          }
          100% {
            opacity: 0;
            transform: translateY(90px) scale(0.55) rotate(45deg);
          }
        }

        @keyframes lyricCardReveal {
          0% {
            opacity: 0;
            transform: translateY(14px) rotate(1.8deg) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0.6deg) scale(1);
          }
        }

        @keyframes vuBar1 { 0% { height: 3px; } 100% { height: 13px; } }
        @keyframes vuBar2 { 0% { height: 5px; } 100% { height: 15px; } }
        @keyframes vuBar3 { 0% { height: 2px; } 100% { height: 9px; } }
        @keyframes vuBar4 { 0% { height: 4px; } 100% { height: 12px; } }

        @media (max-width: 768px) {
          .vinyl-player-page {
            padding: 14px 12px 20px 12px !important;
          }
          .vinyl-player-header {
            padding-bottom: 6px !important;
          }
          .vinyl-status-stamp {
            padding: 4px 8px !important;
            font-size: 8px !important;
          }
          .vinyl-stage-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            margin: 6px 0 !important;
          }
          .vinyl-turntable-chassis {
            width: 100% !important;
            max-width: 290px !important;
            min-height: auto !important;
            padding: 14px 10px !important;
            margin: 0 auto !important;
          }
          .vinyl-lyrics-note {
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
          }
          .vinyl-crate-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px 6px !important;
            justify-items: center !important;
          }
          .vinyl-3d-banner {
            flex-direction: column !important;
            text-align: center !important;
            gap: 8px !important;
            padding: 10px 12px !important;
          }
          .vinyl-chapter-sub {
            display: none !important;
          }
          .vinyl-player-footer {
            padding-top: 8px !important;
          }
        }
      `}</style>

      {/* Edit Track Modal for Internet Audio Stream & Song Metadata */}
      <EditTrackModal
        isOpen={Boolean(editingTrack)}
        onClose={() => setEditingTrack(null)}
        track={editingTrack}
        onSaveTrack={handleSaveTrack}
      />
    </div>
  );
}
