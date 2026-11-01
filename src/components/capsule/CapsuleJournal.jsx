import React, { useState } from 'react';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';
import { LoveLetterPage } from './pages/LoveLetterPage';
import { VinylPlayerPage } from './pages/VinylPlayerPage';
import { capsuleAudio } from './audio/capsuleAudio';
import { LoveLockModal, LoveLockManager } from './LoveLockModal';
import { ShareCapsuleModal } from './ShareCapsuleModal';
import { CapsuleShareEngine } from '../../utils/capsuleShareEngine';
import { TornEdgeTop, TornEdgeBottom, WashiTape, EditorialButton, CircleArrowButton, PostageStampButton } from './TornPaper';

export function CapsuleJournal({ onEnter3DWorld, initialOpened = false }) {
  const [page, setPage] = useState(1);
  const [envelopeState, setEnvelopeState] = useState(initialOpened ? 'opened' : 'sealed');
  const [hoveredSeal, setHoveredSeal] = useState(false);
  const [isLocked, setIsLocked] = useState(LoveLockManager.isLockEnabled());
  const [lockMode, setLockMode] = useState('setup');
  const [showLockModal, setShowLockModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [particles, setParticles] = useState([]);
  const totalPages = 3;

  // Load initial capsule state (detects if user is Receiver via URL query or Sender via localStorage)
  const [capsuleConfig, setCapsuleConfig] = useState(() => CapsuleShareEngine.getInitialState());
  const { isReceiver, data: capsuleData } = capsuleConfig;

  const handleUpdateConfig = (partial) => {
    const updated = {
      ...capsuleData,
      ...partial,
    };
    setCapsuleConfig(prev => ({
      ...prev,
      data: updated,
    }));
    CapsuleShareEngine.saveLocalData(updated);
  };

  const isOpened = envelopeState === 'opened';
  const isExpanding = envelopeState === 'expanding';
  const isRising = envelopeState === 'rising-paper';
  const isFlapOpen = envelopeState !== 'sealed';
  const isEnvelopeVisible = envelopeState !== 'opened';

  const goToPage = (newPage) => {
    capsuleAudio.playPageTurn();
    setPage(newPage);
  };

  const handleBreakSeal = (e) => {
    e?.stopPropagation();
    if (envelopeState !== 'sealed') return;

    if (LoveLockManager.isLockEnabled()) {
      setLockMode('unlock');
      setShowLockModal(true);
      return;
    }

    proceedOpen();
  };

  const proceedOpen = () => {
    capsuleAudio.playSealCrack();

    const newParticles = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 190,
      y: (Math.random() - 0.5) * 190 - 45,
      scale: Math.random() * 0.8 + 0.6,
      rotate: (Math.random() - 0.5) * 90,
      icon: ['✦', '✧', '❦', '❧', '❀'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);

    // 1. Top flap flips open in 3D
    setEnvelopeState('opening-flap');

    // 2. Paper smoothly glides up from the envelope pocket
    setTimeout(() => {
      setEnvelopeState('rising-paper');
    }, 450);

    // 3. Paper expands to center & envelope gently fades
    setTimeout(() => {
      setEnvelopeState('expanding');
    }, 950);

    // 4. Fully opened and interactive journal
    setTimeout(() => {
      setEnvelopeState('opened');
    }, 1750);
  };

  const handleReSeal = () => {
    if (envelopeState !== 'opened') return;
    capsuleAudio.playPageTurn();
    setPage(1);
    setEnvelopeState('closing');

    // Slide paper down and seal envelope
    setTimeout(() => {
      setEnvelopeState('sealed');
      setIsLocked(LoveLockManager.isLockEnabled());
    }, 1300);
  };

  const getSheetTransform = () => {
    switch (envelopeState) {
      case 'sealed':
      case 'opening-flap':
        return 'translate(-50%, calc(-50% + 22px)) scale(0.33)';
      case 'rising-paper':
        return 'translate(-50%, calc(-50% - 130px)) scale(0.38)';
      case 'expanding':
      case 'opened':
        return 'translate(-50%, -50%) scale(1)';
      case 'closing':
        return 'translate(-50%, calc(-50% - 130px)) scale(0.38)';
      default:
        return 'translate(-50%, -50%) scale(1)';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9998,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, #540813 0%, #30030a 60%, #150104 100%)',
      overflow: 'hidden',
      userSelect: 'none',
      fontFamily: "'Cormorant Garamond', serif",
    }}>
      {/* Background Star Texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(rgba(255, 230, 230, 0.12) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Ambient Vignette Halo Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(900px, 90vw)',
        height: 'min(900px, 90vw)',
        background: 'radial-gradient(circle, rgba(225, 29, 72, 0.24) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Intro Top Calligraphy Title (visible when envelope is sealed) */}
      <div 
        style={{
          position: 'absolute',
          top: 'clamp(20px, 6vh, 60px)',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 25,
          padding: '0 16px',
          maxWidth: '800px',
          width: '100%',
          opacity: (envelopeState === 'sealed' || envelopeState === 'opening-flap' || envelopeState === 'rising-paper') ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {isReceiver && (
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255, 215, 220, 0.15)',
            border: '1px solid rgba(255, 215, 220, 0.3)',
            borderRadius: '2px',
            padding: '4px 12px',
            marginBottom: '10px',
            fontSize: '10px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#ffd7dc',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            ✦ SPECIAL DELIVERY FOR {capsuleData.recipient.toUpperCase()} · FROM {capsuleData.sender.toUpperCase()} ✦
          </div>
        )}

        <h1 style={{
          fontSize: 'clamp(32px, 5.5vw, 56px)',
          fontWeight: 400,
          color: '#fff',
          margin: '0',
          fontFamily: "'Pinyon Script', cursive",
          textShadow: '0 2px 20px rgba(255, 100, 120, 0.5), 0 0 40px rgba(225, 29, 72, 0.3)',
          letterSpacing: '1px',
          lineHeight: 1.15,
        }}>
          {isReceiver 
            ? `Will You Be My Valentine, ${capsuleData.recipient}?`
            : (capsuleData.envelopeTitle || 'Will You Be My Valentine?')
          }
        </h1>
        <p style={{
          fontSize: 'clamp(12px, 1.3vw, 15px)',
          color: 'rgba(255, 225, 225, 0.75)',
          marginTop: '8px',
          fontStyle: 'italic',
          letterSpacing: '0.5px',
        }}>
          {isReceiver 
            ? `A little universe kept inside this envelope, crafted with love by ${capsuleData.sender}...`
            : 'A little universe kept inside this envelope...'
          }
        </p>
      </div>

      {/* Top Editorial Mixed-Media Navigation Bar (visible when opened) */}
      <div 
        className="journal-top-bar"
        style={{
          position: 'absolute',
          top: '18px',
          left: '28px',
          right: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          opacity: (isOpened || isExpanding) ? 1 : 0,
          pointerEvents: isOpened ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Left: Vintage Postage Stamp Button & Share/Reply Option */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="journal-btn-reseal">
            <PostageStampButton
              onClick={handleReSeal}
              style={{
                backgroundColor: 'rgba(250, 247, 242, 0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>RE-SEAL</span>
            </PostageStampButton>
          </div>

          {/* Receiver Mode: Reply via WhatsApp Button */}
          {isReceiver ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                backgroundColor: 'rgba(18, 18, 18, 0.65)',
                border: '1px solid rgba(255, 215, 220, 0.25)',
                padding: '6px 12px',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                color: '#ffccd5',
                letterSpacing: '1px',
                backdropFilter: 'blur(8px)',
              }}>
                FROM {capsuleData.sender.toUpperCase()} ❤️
              </div>

              <a
                href={CapsuleShareEngine.generateWhatsAppReplyUrl(capsuleData)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#fff',
                  border: 'none',
                  fontSize: '10px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '1px',
                  padding: '7px 12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                  transition: 'opacity 0.2s',
                }}
              >
                <span>BALAS WA 💬</span>
              </a>
            </div>
          ) : (
            /* Sender Mode: Share Link Button & Love Lock Option */
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => setShowShareModal(true)}
                title="Bagikan Kapsul Ini ke Pasanganmu"
                style={{
                  backgroundColor: '#85101c',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  fontSize: '10px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '1px',
                  padding: '7px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(133, 16, 28, 0.5)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a61324'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#85101c'}
              >
                <span>BAGIKAN LINK 🔗</span>
              </button>

              <button
                onClick={() => {
                  setLockMode('setup');
                  setShowLockModal(true);
                }}
                title="Kelola Gembok Kapsul (PIN)"
                style={{
                  background: 'rgba(18, 18, 18, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffd700',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Center: Inception Style Minimalist Pagination (01 / 03 with Circle Arrow Buttons) */}
        <div 
          className="journal-pagination-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(18, 18, 18, 0.65)',
            padding: '6px 14px',
            borderRadius: '0px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          }}
        >
          <CircleArrowButton
            direction="prev"
            onClick={() => goToPage(Math.max(1, page - 1))}
            size={24}
            dark
          />

          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2.5px',
            color: '#fff',
            padding: '0 2px',
          }}>
            0{page} <span style={{ opacity: 0.35, fontWeight: 300 }}>/</span> 0{totalPages}
          </span>

          <CircleArrowButton
            direction="next"
            onClick={() => goToPage(Math.min(totalPages, page + 1))}
            size={24}
            dark
          />
        </div>

        {/* Right: Streetwear / High-Fashion Editorial Block Button */}
        <div className="journal-btn-island">
          <EditorialButton
            variant="red"
            onClick={onEnter3DWorld}
            rotate={-1}
            style={{
              boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
            }}
          >
            OUR 3D ISLAND
          </EditorialButton>
        </div>
      </div>

      {/* Layer 1 Behind: Underlying Ripped Kraft Scrap Paper */}
      <div 
        className={`journal-under-sheet-1 ${isOpened ? 'is-opened' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '95%',
          maxWidth: '836px',
          height: '84vh',
          maxHeight: '668px',
          minHeight: '568px',
          backgroundColor: '#ebdccb',
          borderRadius: '3px',
          transform: (isOpened || isExpanding) 
            ? 'translate(-50%, calc(-50% + 2px)) rotate(0.9deg)' 
            : 'translate(-50%, -50%) scale(0.33)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: (isOpened || isExpanding) ? 1 : 0,
          transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
        }}
      >
        <TornEdgeTop color="#ebdccb" fiberColor="#f8f1e7" height={16} />
        <TornEdgeBottom color="#ebdccb" fiberColor="#f8f1e7" height={16} />
      </div>

      {/* Layer 2 Behind: Torn White Fiber Under-sheet */}
      <div 
        className={`journal-under-sheet-2 ${isOpened ? 'is-opened' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '94.5%',
          maxWidth: '828px',
          height: '84vh',
          maxHeight: '664px',
          minHeight: '564px',
          backgroundColor: '#ffffff',
          borderRadius: '2px',
          transform: (isOpened || isExpanding) 
            ? 'translate(-50%, -50%) rotate(-0.6deg)' 
            : 'translate(-50%, -50%) scale(0.33)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: (isOpened || isExpanding) ? 1 : 0,
          transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
        }}
      >
        <TornEdgeTop color="#ffffff" fiberColor="#f2ece1" height={14} />
        <TornEdgeBottom color="#ffffff" fiberColor="#f2ece1" height={14} />
      </div>

      {/* Main Foreground Torn Paper Journal Sheet (The Exact Sheet that emerges from the envelope!) */}
      <div 
        className={`journal-main-sheet ${isOpened ? 'is-opened' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '94%',
          maxWidth: '820px',
          height: '84vh',
          maxHeight: '660px',
          minHeight: '560px',
          backgroundColor: '#FAF7F2',
          backgroundImage: `
            linear-gradient(rgba(235, 227, 215, 0.45) 1px, transparent 1px),
            radial-gradient(#eee4d6 15%, transparent 16%)
          `,
          backgroundSize: '100% 24px, 4px 4px',
          borderRadius: '2px',
          boxShadow: isOpened
            ? '0 20px 50px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 50px rgba(133, 16, 28, 0.04)'
            : '0 6px 18px rgba(0, 0, 0, 0.35)',
          overflow: isOpened ? 'visible' : 'hidden',
          zIndex: (isOpened || isExpanding) ? 30 : (isRising ? 15 : 6),
          transform: getSheetTransform(),
          transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
          pointerEvents: isOpened ? 'auto' : 'none',
        }}
      >
        {/* Ripped Paper Top Edge */}
        <TornEdgeTop color="#FAF7F2" fiberColor="#ffffff" height={20} />

        {/* Ripped Paper Bottom Edge */}
        <TornEdgeBottom color="#FAF7F2" fiberColor="#ffffff" height={20} />

        {/* Washi Tape Accent on Top Corners */}
        <WashiTape top="-10px" left="30px" rotate={-4} width="100px" color="rgba(245, 225, 205, 0.85)" />
        <WashiTape top="-10px" left="calc(100% - 130px)" rotate={3} width="100px" color="rgba(250, 215, 215, 0.82)" />

        {/* Subtle Paper Fold Center Binding Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(133, 16, 28, 0.12), transparent)',
          pointerEvents: 'none',
          zIndex: 6,
        }} />

        {/* Content depending on current page with smooth 3D Book Paper Flip Animation */}
        <div 
          key={page}
          style={{
            width: '100%',
            height: '100%',
            animation: isOpened ? 'paperPageFlip 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
            position: 'relative',
            zIndex: 7,
            transformOrigin: 'left center',
          }}
        >
          {page === 1 && (
            <PhotoGalleryPage
              onNext={() => goToPage(2)}
              authorName={capsuleData.sender}
              recipientName={capsuleData.recipient}
              customPhotos={capsuleData.photos}
              onUpdatePhotos={(updated) => handleUpdateConfig({ photos: updated })}
              isReceiver={isReceiver}
            />
          )}

          {page === 2 && (
            <LoveLetterPage
              onPrev={() => goToPage(1)}
              onNext={() => goToPage(3)}
              recipientName={capsuleData.recipient}
              senderName={capsuleData.sender}
              initialLetterText={capsuleData.letterText}
              onSaveLetterText={(newText) => handleUpdateConfig({ letterText: newText })}
              isReceiver={isReceiver}
              onReplyWhatsApp={() => CapsuleShareEngine.generateWhatsAppReplyUrl(capsuleData)}
            />
          )}

          {page === 3 && (
            <VinylPlayerPage
              onPrev={() => goToPage(2)}
              onEnter3DWorld={onEnter3DWorld}
            />
          )}
        </div>
      </div>

      {/* The Wax-Sealed Envelope Shell (Physical pocket holding the journal paper) */}
      <div 
        className="envelope-center-stage"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '290px',
          height: '190px',
          zIndex: (isOpened || isExpanding) ? 4 : 10,
          opacity: isEnvelopeVisible ? (isExpanding ? 0 : 1) : 0,
          pointerEvents: (envelopeState === 'sealed') ? 'auto' : 'none',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          perspective: '1000px',
        }}
      >
        {/* Envelope Ambient Glow */}
        <div style={{
          position: 'absolute',
          inset: '-10px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.35) 0%, transparent 70%)',
          borderRadius: '16px',
          filter: 'blur(12px)',
          opacity: hoveredSeal ? 1 : 0.45,
          transition: 'opacity 0.3s ease',
        }} />

        {/* Envelope Back Plate */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#821320',
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.2) 100%)`,
          borderRadius: '12px',
          boxShadow: '0 20px 35px rgba(0,0,0,0.65), 0 4px 10px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.15)',
          overflow: 'hidden',
          zIndex: 4,
        }} />

        {/* Envelope Pocket Geometry (Front Triangle Folds sitting in front of the paper) */}
        {/* Left Pocket Triangle */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 0,
          borderStyle: 'solid',
          borderWidth: '95px 0 95px 145px',
          borderColor: 'transparent transparent transparent #7a121d',
          zIndex: 14,
          pointerEvents: 'none',
        }} />

        {/* Right Pocket Triangle */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 0,
          borderStyle: 'solid',
          borderWidth: '95px 145px 95px 0',
          borderColor: 'transparent #690e18 transparent transparent',
          zIndex: 14,
          pointerEvents: 'none',
        }} />

        {/* Bottom Pocket Triangle */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 145px 110px 145px',
          borderColor: 'transparent transparent #70101b transparent',
          zIndex: 14,
          pointerEvents: 'none',
        }} />

        {/* Top Flap (Flips open upwards in 3D) */}
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
          transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          transition: 'transform 0.85s cubic-bezier(0.34, 1.25, 0.64, 1)',
          zIndex: isFlapOpen ? 2 : 18,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
          pointerEvents: 'none',
        }} />

        {/* Authentic Embossed Wax Seal Medallion with Monogram */}
        <div 
          onClick={handleBreakSeal}
          onMouseEnter={() => setHoveredSeal(true)}
          onMouseLeave={() => setHoveredSeal(false)}
          style={{
            position: 'absolute',
            top: '90px',
            left: '50%',
            transform: `translate(-50%, -50%) ${isFlapOpen ? 'scale(0.8) rotate(-18deg) translateY(12px)' : hoveredSeal ? 'scale(1.08)' : 'scale(1)'}`,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #e8bc80 0%, #b88648 45%, #7a501a 100%)',
            boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.5)',
            border: '2px solid #5a3810',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 22,
            opacity: isFlapOpen ? 0 : 1,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: (envelopeState === 'sealed') ? 'pointer' : 'default',
          }}
        >
          {/* Wax Edge Drips / Irregularity */}
          <div style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, transparent 65%, rgba(138, 90, 26, 0.6) 80%)',
            pointerEvents: 'none',
          }} />

          {/* Monogram Seal Symbol */}
          <span style={{
            color: '#422405',
            fontSize: '22px',
            textShadow: '0 1px 1px rgba(255,255,255,0.4)',
            transform: 'translateY(-1px)',
            userSelect: 'none',
          }}>
            ❦
          </span>
        </div>

        {/* Interactive Tap Hint below wax */}
        {envelopeState === 'sealed' && (
          <div 
            onClick={handleBreakSeal}
            style={{
              position: 'absolute',
              bottom: '18px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 20,
              cursor: 'pointer',
              animation: 'pulse 1.8s infinite',
            }}
          >
            <span style={{
              fontSize: '11px',
              color: 'rgba(255, 235, 235, 0.9)',
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
              zIndex: 25,
              animation: 'fadeBurst 1s forwards',
            }}
          >
            {p.icon}
          </div>
        ))}
      </div>

      {/* Footer Buttons (visible when sealed) */}
      <div 
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 4vh, 36px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 25,
          opacity: (envelopeState === 'sealed' || envelopeState === 'opening-flap' || envelopeState === 'rising-paper') ? 1 : 0,
          pointerEvents: (envelopeState === 'sealed') ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {!isReceiver && (
          <button
            onClick={() => setShowShareModal(true)}
            style={{
              background: '#85101c',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '2px',
              color: '#fff',
              fontSize: '10px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              padding: '5px 12px',
              letterSpacing: '1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(133, 16, 28, 0.5)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a61324'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#85101c'}
          >
            <span>BAGIKAN LINK 🔗</span>
          </button>
        )}

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
            padding: '5px 12px',
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
      </div>

      {/* Love Lock Management Modal */}
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
          proceedOpen();
        }}
      />

      {/* Share Capsule Link Modal */}
      <ShareCapsuleModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        capsuleData={capsuleData}
        onUpdateData={(partial) => handleUpdateConfig(partial)}
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
        @keyframes paperPageFlip {
          0% {
            opacity: 0;
            transform: perspective(1000px) rotateY(-5deg) translateX(12px) scale(0.985);
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.2));
          }
          65% {
            transform: perspective(1000px) rotateY(1deg) translateX(-2px) scale(1.002);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) rotateY(0deg) translateX(0) scale(1);
            filter: none;
          }
        }

        .envelope-center-stage {
          --scale-base: 1.05;
          transform: translate(-50%, -50%) scale(var(--scale-base));
        }
        @media (min-width: 768px) {
          .envelope-center-stage {
            --scale-base: 1.25;
          }
        }
        @media (min-width: 1200px) {
          .envelope-center-stage {
            --scale-base: 1.38;
          }
        }
        @media (max-width: 520px) {
          .envelope-center-stage {
            --scale-base: 0.95;
          }
        }

        @media (min-width: 1280px) {
          .journal-main-sheet.is-opened {
            max-width: 920px !important;
            max-height: 720px !important;
          }
          .journal-under-sheet-1.is-opened {
            max-width: 936px !important;
            max-height: 728px !important;
          }
          .journal-under-sheet-2.is-opened {
            max-width: 928px !important;
            max-height: 724px !important;
          }
        }

        @media (max-width: 680px) {
          .journal-top-bar {
            top: 8px !important;
            left: 8px !important;
            right: 8px !important;
          }
          .journal-btn-reseal button {
            padding: 4px 8px !important;
            font-size: 9px !important;
            letter-spacing: 1px !important;
          }
          .journal-pagination-bar {
            padding: 4px 8px !important;
            gap: 6px !important;
          }
          .journal-pagination-bar span {
            font-size: 10px !important;
            letter-spacing: 1.5px !important;
          }
          .journal-btn-island button {
            padding: 5px 9px !important;
            font-size: 9px !important;
            letter-spacing: 1px !important;
          }
          .journal-main-sheet.is-opened,
          .journal-under-sheet-1.is-opened,
          .journal-under-sheet-2.is-opened {
            width: 96% !important;
            height: calc(100vh - 68px) !important;
            max-height: none !important;
            margin-top: 50px !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </div>
  );
}
