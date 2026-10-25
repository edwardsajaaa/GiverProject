import React, { useState, useEffect } from 'react';
import { capsuleAudio } from '../audio/capsuleAudio';
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
  // State: Currently loaded track ID (1-6)
  const [loadedTrackId, setLoadedTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [isEjecting, setIsEjecting] = useState(false);

  const activeTrack = VINYL_COLLECTION.find((t) => t.id === loadedTrackId) || VINYL_COLLECTION[0];

  // Plug & Play Track Switch Handler with Motion Animation
  const handlePlugTrack = (newTrackId) => {
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
        capsuleAudio.playTrack(newTrackId);
      }, 700);
    }, 450);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      capsuleAudio.stopMusic();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      capsuleAudio.playTrack(loadedTrackId);
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
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 32px',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#121212',
    }}>
      {/* Top Headline on Torn Paper Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1.5px solid #121212',
        paddingBottom: '8px',
      }}>
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

        {/* Master Turntable Status Stamp */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: isPlaying ? '#a61324' : '#121212',
          color: '#fff',
          padding: '5px 12px',
          clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 2px, 98% 98%, 100% 100%, 2% 100%, 0% 98%)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
          transition: 'background-color 0.3s ease',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#4ade80' : '#888',
            display: 'inline-block',
            boxShadow: isPlaying ? '0 0 8px #4ade80' : 'none',
          }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}>
            {isPlaying ? `NOW SPINNING: ${activeTrack.title}` : 'TURNTABLE IDLE'}
          </span>
        </div>
      </div>

      {/* Main Turntable Stage (Left: Realistic Turntable, Right: Current Lyric Scrap) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: '24px',
        alignItems: 'center',
        margin: '10px 0',
      }}>
        {/* The Single Dedicated Turntable Player Chassis */}
        <div style={{
          position: 'relative',
          backgroundColor: '#1c1c1e',
          borderRadius: '4px',
          padding: '18px 22px',
          boxShadow: '0 16px 36px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)',
          border: '1.5px solid #2a2a2c',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '220px',
          justifyContent: 'center',
          backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}>
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

            {/* The Vinyl Disc on the Platter with Motion Animations */}
            <div
              onClick={togglePlayPause}
              style={{
                position: 'absolute',
                width: '172px',
                height: '172px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #242424 0%, #111111 55%, #050505 100%)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.7)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                // Motion Animation: Insertion, Ejection, and Rotation
                transform: isEjecting
                  ? 'translateX(120px) scale(0.6) rotate(90deg)'
                  : isInserting
                    ? 'translateX(-120px) scale(0.6) rotate(-90deg)'
                    : isPlaying
                      ? 'scale(1) rotate(0deg)'
                      : 'scale(1) rotate(0deg)',
                opacity: isEjecting ? 0 : 1,
                transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease',
                animation: isPlaying && !isInserting && !isEjecting ? 'spinVinylMotion 3s linear infinite' : 'none',
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

              {/* Shimmer Light Reflection on Vinyl (Rotates with vinyl) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.08) 45deg, transparent 90deg, rgba(255,255,255,0.08) 225deg, transparent 270deg)',
                pointerEvents: 'none',
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
            // When playing: swings over vinyl; when paused: rests outside
            transform: isPlaying && !isInserting && !isEjecting ? 'rotate(24deg)' : 'rotate(-2deg)',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 20,
            pointerEvents: 'none',
          }}>
            {/* Pivot Base Socket */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#404040',
              border: '2px solid #666',
              boxShadow: '0 2px 5px rgba(0,0,0,0.6)',
              margin: '0 auto',
            }} />
            {/* Metal Arm Shaft */}
            <div style={{
              width: '3.5px',
              height: '95px',
              backgroundColor: '#d1d1d1',
              margin: '-2px auto 0',
              boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              backgroundImage: 'linear-gradient(to right, #999, #eee, #888)',
            }} />
            {/* Cartridge & Needle Head */}
            <div style={{
              width: '10px',
              height: '18px',
              backgroundColor: '#a61324',
              borderRadius: '2px',
              margin: '0 auto',
              boxShadow: '0 2px 4px rgba(0,0,0,0.6)',
              transform: 'rotate(10deg)',
              border: '1px solid #ffffff',
            }} />
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
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? '❚❚ PAUSE' : '▶ START'}
            </button>

            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              color: '#888',
              letterSpacing: '1px',
            }}>
              33 ⅓ RPM • HI-FI
            </span>

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

        {/* Right: Dynamic Lyric Clipping Card on Torn Paper Scrap */}
        <div style={{ position: 'relative' }}>
          <WashiTape top="-10px" left="20px" width="70px" rotate={-2} color="rgba(255, 235, 205, 0.85)" />
          <BlackTape top="-8px" right="20px" width="60px" rotate={3} />

          <TornScrap
            rotate={0.6}
            bgColor="#fffdfa"
            style={{
              padding: '18px 22px',
              boxShadow: '0 10px 26px rgba(0,0,0,0.12)',
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
            }}>
              {activeTrack.lyrics}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              fontSize: '9px',
              fontFamily: "'Montserrat', sans-serif",
              color: '#888',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              <span>✦ SOUNDTRACK FOR OUR MOMENTS</span>
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
            ✦ YOUR VINYL CRATE (6 EXCLUSIVE ALBUMS — CLICK TO PLUG IN)
          </span>
          <span style={{
            fontSize: '10px',
            fontFamily: "'Montserrat', sans-serif",
            color: '#666',
          }}>
            Click an album to drop vinyl into player ♫
          </span>
        </div>

        {/* 6 Album Jackets in a row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
        }}>
          {VINYL_COLLECTION.map((item) => {
            const isLoaded = loadedTrackId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handlePlugTrack(item.id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transform: isLoaded ? 'scale(1.04) translateY(-3px)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isLoaded) e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  if (!isLoaded) e.currentTarget.style.transform = 'translateY(0) scale(1)';
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
                    ? '0 6px 16px rgba(166, 19, 36, 0.4), 0 0 0 2px #a61324'
                    : '0 4px 10px rgba(0,0,0,0.25)',
                  backgroundColor: '#121212',
                }}>
                  {/* Peeking Vinyl Disc Behind Jacket */}
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: isLoaded ? '-14px' : '-8px',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: '#111',
                    zIndex: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                    transition: 'right 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: isLoaded && isPlaying ? 'spinVinylMotion 3s linear infinite' : 'none',
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

      {/* Surprise Gate Banner as Torn Kraft Paper Keepsake Ticket */}
      <div style={{
        position: 'relative',
        backgroundColor: '#f4ebd9',
        border: '1px dashed #121212',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        clipPath: 'polygon(0% 4px, 2% 0px, 98% 0px, 100% 4px, 99% 96%, 100% 100%, 2% 100%, 0% 96%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transform: 'rotate(-0.2deg)',
      }}>
        <div style={{ textAlign: 'left' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            color: '#121212',
            letterSpacing: '1px',
            display: 'block',
          }}>
            ✦ A SURPRISE AWAITS IN OUR SHARED UNIVERSE ✦
          </span>
          <span style={{
            fontSize: '13px',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: '#444',
          }}>
            Enter our private 3D floating island with our memories and secret diorama.
          </span>
        </div>

        <EditorialButton
          variant="black"
          onClick={onEnter3DWorld}
          arrow
        >
          ENTER 3D WORLD
        </EditorialButton>
      </div>

      {/* Footer Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1.5px solid #121212',
        paddingTop: '10px',
      }}>
        {/* Left: Circular Arrow Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CircleArrowButton
            direction="prev"
            onClick={onPrev}
            size={30}
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
          <span style={{
            fontSize: '10px',
            color: '#666',
            fontFamily: "'Montserrat', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            • CHAPTER THREE
          </span>
        </div>

        {/* Right: Sound FX status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          color: isPlaying ? '#a61324' : '#666',
          letterSpacing: '1px',
        }}>
          <span>{isPlaying ? '♫ HI-FI AUDIO PLAYING' : 'AUDIO READY'}</span>
        </div>
      </div>

      {/* Vinyl Rotation Keyframes Animation */}
      <style>{`
        @keyframes spinVinylMotion {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
