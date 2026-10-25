import React, { useState } from 'react';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';
import { LoveLetterPage } from './pages/LoveLetterPage';
import { VinylPlayerPage } from './pages/VinylPlayerPage';
import { capsuleAudio } from './audio/capsuleAudio';
import { LoveLockModal, LoveLockManager } from './LoveLockModal';
import { TornEdgeTop, TornEdgeBottom, WashiTape, EditorialButton, CircleArrowButton, PostageStampButton } from './TornPaper';

export function CapsuleJournal({ onEnter3DWorld, onBackToEnvelope }) {
  const [page, setPage] = useState(1);
  const [showLockModal, setShowLockModal] = useState(false);
  const totalPages = 3;

  const goToPage = (newPage) => {
    capsuleAudio.playPageTurn();
    setPage(newPage);
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

      {/* Top Editorial Mixed-Media Navigation Bar */}
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
        }}
      >
        {/* Left: Vintage Postage Stamp Button & Love Lock Option */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="journal-btn-reseal">
            <PostageStampButton
              onClick={onBackToEnvelope}
              style={{
                backgroundColor: 'rgba(250, 247, 242, 0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              <span>✉ RE-SEAL</span>
            </PostageStampButton>
          </div>

          <button
            onClick={() => setShowLockModal(true)}
            title="Kelola Gembok Kapsul (PIN)"
            style={{
              background: 'rgba(18, 18, 18, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffd700',
              padding: '6px 8px',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔒
          </button>
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
        className="journal-under-sheet-1"
        style={{
          position: 'absolute',
          width: '95%',
          maxWidth: '836px',
          height: '84vh',
          maxHeight: '668px',
          backgroundColor: '#ebdccb',
          borderRadius: '3px',
          transform: 'rotate(0.9deg) translateY(2px)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <TornEdgeTop color="#ebdccb" fiberColor="#f8f1e7" height={16} />
        <TornEdgeBottom color="#ebdccb" fiberColor="#f8f1e7" height={16} />
      </div>

      {/* Layer 2 Behind: Torn White Fiber Under-sheet */}
      <div 
        className="journal-under-sheet-2"
        style={{
          position: 'absolute',
          width: '94.5%',
          maxWidth: '828px',
          height: '84vh',
          maxHeight: '664px',
          backgroundColor: '#ffffff',
          borderRadius: '2px',
          transform: 'rotate(-0.6deg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <TornEdgeTop color="#ffffff" fiberColor="#f2ece1" height={14} />
        <TornEdgeBottom color="#ffffff" fiberColor="#f2ece1" height={14} />
      </div>

      {/* Main Foreground Torn Paper Journal Sheet */}
      <div 
        className="journal-main-sheet"
        style={{
          position: 'relative',
          width: '94%',
          maxWidth: '820px',
          height: '84vh',
          maxHeight: '660px',
          backgroundColor: '#FAF7F2',
          // Natural paper fiber & soft deckle lines
          backgroundImage: `
            linear-gradient(rgba(235, 227, 215, 0.45) 1px, transparent 1px),
            radial-gradient(#eee4d6 15%, transparent 16%)
          `,
          backgroundSize: '100% 24px, 4px 4px',
          borderRadius: '2px',
          boxShadow: `
            0 20px 50px rgba(0, 0, 0, 0.6),
            0 4px 12px rgba(0, 0, 0, 0.3),
            inset 0 0 50px rgba(133, 16, 28, 0.04)
          `,
          overflow: 'visible',
          zIndex: 5,
          transition: 'all 0.4s ease',
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
            animation: 'paperPageFlip 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            position: 'relative',
            zIndex: 7,
            transformOrigin: 'left center',
          }}
        >
          {page === 1 && (
            <PhotoGalleryPage
              onNext={() => goToPage(2)}
              authorName="you"
            />
          )}

          {page === 2 && (
            <LoveLetterPage
              onPrev={() => goToPage(1)}
              onNext={() => goToPage(3)}
              recipientName="My Valentine"
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

      {/* Love Lock Management Modal */}
      <LoveLockModal
        isOpen={showLockModal}
        mode="setup"
        onClose={() => setShowLockModal(false)}
        onUnlocked={() => setShowLockModal(false)}
      />

      <style>{`
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
          .journal-main-sheet,
          .journal-under-sheet-1,
          .journal-under-sheet-2 {
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
