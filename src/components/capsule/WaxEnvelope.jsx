import React, { useState } from 'react';
import { capsuleAudio } from './audio/capsuleAudio';
import { LoveLockModal, LoveLockManager } from './LoveLockModal';

export function WaxEnvelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockMode, setLockMode] = useState('unlock');
  const [isLocked, setIsLocked] = useState(() => LoveLockManager.isLockEnabled());

  const proceedBreakSeal = () => {
    setIsOpening(true);

    // Audio SFX
    capsuleAudio.playSealCrack();

    // Generate burst heart/star particles
    const newParticles = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160 - 40,
      scale: Math.random() * 0.8 + 0.6,
      rotate: (Math.random() - 0.5) * 90,
      icon: ['✦', '✧', '❦', '❧', '❀'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);

    // Give time for envelope opening animation then reveal journal
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  const handleBreakSeal = (e) => {
    e.stopPropagation();
    if (isOpening) return;

    // Check if Love Lock is enabled
    if (LoveLockManager.isLockEnabled()) {
      setLockMode('unlock');
      setShowLockModal(true);
      return;
    }

    proceedBreakSeal();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 40%, #500812 0%, #2f040a 60%, #150104 100%)',
      overflow: 'hidden',
      userSelect: 'none',
      fontFamily: "'Cormorant Garamond', serif",
    }}>
      {/* Background Star Dust / Subtle Romance Particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(rgba(255, 220, 220, 0.15) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Ambient Vignette Glow */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(225, 29, 72, 0.22) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* Main Container simulating smartphone / portrait card frame on desktop, filling viewport on mobile */}
      <div 
        className="envelope-main-frame"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '440px',
          height: '92vh',
          maxHeight: '840px',
          margin: '0 auto',
          padding: '24px 20px',
          borderRadius: '42px',
          border: '3px solid rgba(255, 255, 255, 0.12)',
          background: 'linear-gradient(165deg, #42060e 0%, #290308 100%)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.85), inset 0 1px 2px rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.4s ease, opacity 0.8s ease',
          opacity: isOpening ? 0.95 : 1,
          boxSizing: 'border-box',
        }}
      >
        {/* Intro Top Title */}
        <div 
          className="envelope-title-section"
          style={{
            textAlign: 'center',
            marginTop: '16px',
            marginBottom: 'auto',
            zIndex: 5,
            padding: '0 10px',
          }}
        >
          <p style={{
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255, 215, 220, 0.65)',
            marginBottom: '6px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
          }}>
            A Lover Capsule
          </p>
          <h1 style={{
            fontSize: 'clamp(26px, 7.5vw, 34px)',
            fontWeight: 400,
            color: '#fff',
            margin: '0',
            fontFamily: "'Pinyon Script', cursive",
            textShadow: '0 2px 14px rgba(255, 100, 120, 0.4)',
            letterSpacing: '1px',
            lineHeight: 1.15,
          }}>
            Will You Be My Valentine?
          </h1>
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 225, 225, 0.7)',
            marginTop: '6px',
            fontStyle: 'italic',
          }}>
            A little universe kept inside this envelope...
          </p>
        </div>

        {/* The Wax-Sealed Red Envelope */}
        <div 
          onClick={handleBreakSeal}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="wax-envelope-body"
          style={{
            position: 'relative',
            width: 'min(290px, calc(100vw - 44px))',
            height: '190px',
            margin: 'auto 0',
            cursor: isOpening ? 'default' : 'pointer',
            perspective: '1000px',
            transform: hovered && !isOpening ? 'scale(1.03) rotate(-1deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 20,
          }}
        >
          {/* Envelope Glow */}
          <div style={{
            position: 'absolute',
            inset: '-10px',
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.35) 0%, transparent 70%)',
            borderRadius: '16px',
            filter: 'blur(12px)',
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }} />

          {/* Envelope Body / Base */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#821320',
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.2) 100%)`,
            borderRadius: '12px',
            boxShadow: '0 20px 35px rgba(0,0,0,0.65), 0 4px 10px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            {/* Envelope Pocket Geometry (Fold Lines) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 145px 110px 145px',
              borderColor: 'transparent transparent #70101b transparent',
              zIndex: 3,
            }} />

            {/* Left and Right Fold Triangles */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: 0,
              borderStyle: 'solid',
              borderWidth: '95px 0 95px 145px',
              borderColor: 'transparent transparent transparent #7a121d',
              zIndex: 2,
            }} />

            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: 0,
              borderStyle: 'solid',
              borderWidth: '95px 145px 95px 0',
              borderColor: 'transparent #690e18 transparent transparent',
              zIndex: 2,
            }} />
          </div>

          {/* The Inner Letter Card (slides up smoothly with natural spring damping) */}
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '20px',
            right: '20px',
            height: '150px',
            backgroundColor: '#fbf8f3',
            boxShadow: isOpening ? '0 20px 45px rgba(0,0,0,0.45)' : '0 4px 15px rgba(0,0,0,0.25)',
            zIndex: isOpening ? 5 : 1,
            transform: isOpening ? 'translateY(-110px) scale(1.06)' : 'translateY(0)',
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s ease',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundImage: `repeating-linear-gradient(#fbf8f3, #fbf8f3 20px, #f2ece1 21px)`,
            clipPath: 'polygon(0% 3px, 2% 0px, 98% 0px, 100% 3px, 99% 97%, 100% 100%, 0% 100%)',
            borderTop: '1px solid #fff',
          }}>
            <p style={{
              margin: 0,
              color: '#8b1523',
              fontSize: '18px',
              fontFamily: "'Pinyon Script', cursive",
            }}>
              To the love of my life...
            </p>
            <div style={{
              width: '40px',
              height: '1px',
              background: '#8b1523',
              margin: '8px auto',
              opacity: 0.4,
            }} />
            <span style={{ fontSize: '11px', color: '#666', fontFamily: "'Montserrat', sans-serif" }}>
              A memory capsule awaits
            </span>
          </div>

          {/* Top Flap (Flips open upwards with realistic 3D paper hinge motion) */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '105px 145px 0 145px',
            borderColor: '#941927 transparent transparent transparent',
            transformOrigin: 'top center',
            transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transition: 'transform 0.85s cubic-bezier(0.34, 1.25, 0.64, 1)',
            zIndex: isOpening ? 2 : 4,
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
          }} />

          {/* Authentic Embossed Wax Seal Medallion with Crack Fissure on Break */}
          <div style={{
            position: 'absolute',
            top: '90px',
            left: '50%',
            transform: `translate(-50%, -50%) ${isOpening ? 'scale(0.85) rotate(-18deg) translateY(12px)' : hovered ? 'scale(1.08)' : 'scale(1)'}`,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #e8bc80 0%, #b88648 45%, #7a501a 100%)',
            boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.5)',
            border: '2px solid #5a3810',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 6,
            opacity: isOpening ? 0 : 1,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
          }}>
            {/* Wax Edge Drips / Irregularity */}
            <div style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, transparent 65%, rgba(138, 90, 26, 0.6) 80%)',
              pointerEvents: 'none',
            }} />

            {/* Seal Monogram Heart */}
            <span style={{
              color: '#422405',
              fontSize: '22px',
              textShadow: '0 1px 1px rgba(255,255,255,0.4)',
              transform: 'translateY(-1px)',
              userSelect: 'none',
            }}>
              ❦
            </span>

            {/* Crack fissure splinter line */}
            {isOpening && (
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '3px',
                backgroundColor: '#301802',
                transform: 'translateX(-50%) rotate(22deg)',
                boxShadow: '0 0 4px #000',
              }} />
            )}
          </div>

          {/* Interactive Tap Hint below wax */}
          {!isOpening && (
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 6,
              pointerEvents: 'none',
              animation: 'pulse 1.8s infinite',
            }}>
              <span style={{
                fontSize: '11px',
                color: 'rgba(255, 235, 235, 0.85)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: "'Montserrat', sans-serif",
                textShadow: '0 1px 4px rgba(0,0,0,0.7)',
              }}>
                ✦ tap to break seal ✦
              </span>
            </div>
          )}

          {/* Burst Particles upon breaking seal */}
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                top: '90px',
                left: '50%',
                transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) rotate(${p.rotate}deg) scale(${p.scale})`,
                fontSize: '20px',
                opacity: 0,
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none',
                zIndex: 10,
                animation: 'fadeBurst 1s forwards',
              }}
            >
              {p.icon}
            </div>
          ))}
        </div>

        {/* Footer Subtitle & Security Love Lock Badge */}
        <div style={{
          textAlign: 'center',
          marginTop: 'auto',
          marginBottom: '10px',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}>
          <button
            onClick={() => {
              setLockMode('setup');
              setShowLockModal(true);
            }}
            style={{
              background: isLocked ? 'rgba(166, 19, 36, 0.45)' : 'rgba(255, 255, 255, 0.08)',
              border: isLocked ? '1px solid rgba(225, 29, 72, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              color: isLocked ? '#ffccd5' : 'rgba(255, 255, 255, 0.65)',
              fontSize: '10px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              padding: '4px 10px',
              letterSpacing: '1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{isLocked ? 'TERKUNCI PIN (AMAN)' : 'ATUR GEMBOK PIN'}</span>
          </button>

          <p style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '1px',
            fontFamily: "'Montserrat', sans-serif",
            margin: 0,
          }}>
            a special gift for someone dear
          </p>
        </div>
      </div>

      {/* Love Lock Security Modal */}
      <LoveLockModal
        isOpen={showLockModal}
        mode={lockMode}
        onClose={() => {
          setShowLockModal(false);
          setIsLocked(LoveLockManager.isLockEnabled());
        }}
        onUnlocked={() => {
          setShowLockModal(false);
          setIsLocked(LoveLockManager.isLockEnabled());
          proceedBreakSeal();
        }}
      />

      <style>{`
        @keyframes fadeBurst {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.3); }
          60% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.97); }
        }

        @media (max-width: 520px) {
          .envelope-main-frame {
            height: 100vh !important;
            max-height: 100vh !important;
            max-width: 100vw !important;
            border: none !important;
            border-radius: 0px !important;
            padding: 20px 16px !important;
            box-shadow: none !important;
          }
          .envelope-title-section {
            margin-top: 14px !important;
          }
          .wax-envelope-body {
            transform: scale(0.95);
          }
        }

        @media (max-height: 680px) and (max-width: 520px) {
          .wax-envelope-body {
            transform: scale(0.85);
            margin: 6px 0 !important;
          }
          .envelope-title-section h1 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
