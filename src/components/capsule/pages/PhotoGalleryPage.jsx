import React, { useState } from 'react';
import { SecurityEngine } from '../../../utils/securityEngine';
import {
  TornScrap,
  WashiTape,
  BlackTape,
  DoodleCrown,
  BrushSlash,
  EditorialButton,
} from '../TornPaper';

// High quality romantic aesthetic film photographs matching the editorial look
const DEFAULT_PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop',
    alt: 'Warm Embrace',
    caption: 'Every sweet moment with you',
    rotate: -1.8,
    tapeType: 'black',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
    alt: 'The prettiest smile',
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
    alt: 'Close To You',
    caption: 'In your eyes, I found my home',
    rotate: -1.2,
    tapeType: 'black',
  }
];

export function PhotoGalleryPage({ onNext, authorName = "you" }) {
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [activePhoto, setActivePhoto] = useState(null);

  const handlePhotoUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict file type and size validation
    const validation = SecurityEngine.validateFile(file, {
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      maxSizeBytes: 8 * 1024 * 1024 // 8MB
    });

    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // Revoke previous blob URL if exists to prevent memory leak DoS
    if (photos[index]?.url && photos[index].url.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(photos[index].url);
      } catch {
        /* ignore */
      }
    }

    const newUrl = URL.createObjectURL(file);
    const updated = [...photos];
    updated[index] = { ...updated[index], url: newUrl };
    setPhotos(updated);
  };

  return (
    <div 
      className="photo-gallery-page"
      style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px 32px 36px 32px',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        color: '#121212',
      }}
    >
      {/* Top Editorial Header */}
      <div 
        className="photo-gallery-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '10px',
        }}
      >
        {/* Left Date / Issue Number on Torn Paper Chip */}
        <TornScrap rotate={-2} style={{ padding: '4px 12px', backgroundColor: '#fffdfa' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            color: '#121212',
            letterSpacing: '1px',
          }}>
            09
          </span>
        </TornScrap>

        {/* Center Title on Soft Torn Paper Scrap Banner with Crown Doodle */}
        <TornScrap
          rotate={0.4}
          style={{
            padding: '4px 24px',
            backgroundColor: '#fffdf9',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-14px',
            right: '18px',
            zIndex: 10,
          }}>
            <DoodleCrown size={28} color="#c8102e" rotate={12} />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '6px' }}>
            <span style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: '46px',
              color: '#85101c',
              lineHeight: 0.8,
              transform: 'translateY(4px)',
            }}>
              Y
            </span>
            <div style={{ textAlign: 'left' }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#121212',
                display: 'block',
              }}>
                ou too <em style={{ fontFamily: "'Pinyon Script', cursive", textTransform: 'none', fontSize: '18px', fontWeight: 'normal', color: '#c8102e' }}>devine</em>
              </span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '3px',
                color: '#121212',
              }}>
                TO JUST BE [ MINE ]
              </span>
              <BrushSlash width="85%" color="#c8102e" height="4px" />
            </div>
          </div>
        </TornScrap>

        {/* Right Anniversary Number on Torn Paper Chip */}
        <TornScrap rotate={2} style={{ padding: '4px 12px', backgroundColor: '#fffdfa' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            color: '#121212',
            letterSpacing: '1px',
          }}>
            02
          </span>
        </TornScrap>
      </div>

      {/* Middle Photo Gallery Grid (Mixed-Media Torn Collage with Red Paint Splash) */}
      <div 
        className="photo-gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          margin: '8px 0',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {photos.map((item, idx) => (
          <div
            key={item.id}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `rotate(${item.rotate}deg)`,
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Center Photo Signature: Jagged Red Torn Paper Silhouette Splash (like Image 2!) */}
            {idx === 1 && (
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px -8px -8px -8px',
                  backgroundColor: '#c8102e',
                  zIndex: 0,
                  clipPath: 'polygon(0% 12%, 8% 4%, 22% 0%, 55% 4%, 82% 0%, 96% 8%, 100% 25%, 98% 60%, 100% 88%, 90% 100%, 65% 96%, 35% 100%, 10% 95%, 0% 80%, 2% 40%)',
                  boxShadow: '0 8px 24px rgba(200, 16, 46, 0.45)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
                }}
              />
            )}

            {/* Tape strips: Black gaffer tape or translucent washi */}
            {item.tapeType === 'black' ? (
              <BlackTape top="-10px" left="calc(50% - 35px)" width="70px" rotate={idx === 0 ? -4 : 3} />
            ) : (
              <WashiTape top="-10px" left="calc(50% - 40px)" width="80px" rotate={-2} color="rgba(255, 235, 205, 0.85)" />
            )}

            {/* Torn Red Paper Labels (Streetwear/Dymo Style) */}
            {item.tagLeft && (
              <div style={{
                position: 'absolute',
                left: '-20px',
                top: '28%',
                backgroundColor: '#121212',
                color: '#fff',
                padding: '3px 8px',
                fontSize: '9px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                letterSpacing: '1px',
                borderRadius: '0px',
                boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
                zIndex: 10,
                transform: 'rotate(-6deg)',
                clipPath: 'polygon(0% 10%, 4% 0%, 96% 0%, 100% 12%, 97% 50%, 100% 88%, 96% 100%, 4% 100%, 0% 88%, 3% 50%)',
                borderLeft: '2px solid #c8102e',
              }}>
                {item.tagLeft}
              </div>
            )}
            {item.tagRight && (
              <div style={{
                position: 'absolute',
                right: '-18px',
                bottom: '22%',
                backgroundColor: '#c8102e',
                color: '#fff',
                padding: '3px 8px',
                fontSize: '9px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                letterSpacing: '1px',
                borderRadius: '0px',
                boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                zIndex: 10,
                transform: 'rotate(5deg)',
                clipPath: 'polygon(0% 12%, 4% 0%, 96% 0%, 100% 10%, 97% 50%, 100% 90%, 96% 100%, 4% 100%, 0% 90%, 3% 50%)',
              }}>
                {item.tagRight}
              </div>
            )}

            {/* Photo Frame Card */}
            <div
              onClick={() => setActivePhoto(item)}
              className="photo-polaroid-frame"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                maxHeight: 'min(285px, 34vh)',
                backgroundColor: '#ffffff',
                padding: '6px',
                boxShadow: '0 10px 26px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                clipPath: 'polygon(0% 3px, 2% 0px, 98% 0px, 100% 4px, 99% 97%, 100% 100%, 2% 100%, 0% 97%)',
                border: '1.5px solid #121212',
                zIndex: 2,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, box-shadow',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.parentElement.style.transform = `perspective(1000px) rotateX(4deg) rotateY(${idx === 0 ? 5 : idx === 2 ? -5 : 0}deg) scale(1.045) translateY(-8px)`;
                e.currentTarget.parentElement.style.zIndex = '30';
                e.currentTarget.style.boxShadow = '0 24px 48px -10px rgba(0, 0, 0, 0.38), 0 8px 16px rgba(0,0,0,0.15)';
                const sheen = e.currentTarget.querySelector('.photo-sheen-sweep');
                if (sheen) sheen.style.transform = 'translateX(100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.parentElement.style.transform = `rotate(${item.rotate}deg) scale(1) translateY(0)`;
                e.currentTarget.parentElement.style.zIndex = '1';
                e.currentTarget.style.boxShadow = '0 10px 26px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0,0,0,0.08)';
                const sheen = e.currentTarget.querySelector('.photo-sheen-sweep');
                if (sheen) sheen.style.transform = 'translateX(-100%)';
              }}
            >
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.url}
                  alt={item.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(35%) contrast(110%)',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="photo-img-inner"
                />

                {/* Specular Light Sheen Sweep on hover */}
                <div 
                  className="photo-sheen-sweep"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.05) 55%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Film grain / print dot texture */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 1px, transparent 0)`,
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Edit/Change Button */}
              <label
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: '#121212',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '0px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.3)',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  letterSpacing: '1px',
                }}
                className="photo-edit-btn"
              >
                ✎ CHANGE
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(idx, e)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation Bar with Streetwear Editorial Style */}
      <div 
        className="photo-gallery-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1.5px solid #121212',
          paddingTop: '12px',
        }}
      >
        {/* Left: Minimal Edition Stamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#121212',
          }}>
            01 / 03
          </span>
          <span style={{
            fontSize: '10px',
            color: '#666',
            fontFamily: "'Montserrat', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            • CHAPTER ONE
          </span>
        </div>

        {/* Center: Dedication */}
        <span 
          className="photo-gallery-dedication"
          style={{
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            color: '#121212',
            letterSpacing: '0.5px',
          }}
        >
          made with love by {authorName}
        </span>

        {/* Right: High-Fashion Editorial Button */}
        <EditorialButton
          variant="black"
          onClick={onNext}
          arrow
        >
          READ LETTER
        </EditorialButton>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 18, 18, 0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
            padding: '20px',
            animation: 'fadeInLightbox 0.3s ease forwards',
          }}
        >
          <div 
            style={{
              maxWidth: '520px',
              backgroundColor: '#faf7f2',
              padding: '14px 14px 26px 14px',
              border: '2px solid #121212',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
              textAlign: 'center',
              position: 'relative',
              animation: 'lightboxSpring 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <BlackTape top="-10px" left="calc(50% - 40px)" width="80px" rotate={-2} />
            <img
              src={activePhoto.url}
              alt={activePhoto.alt}
              style={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <p style={{
              margin: '16px 0 0',
              fontFamily: "'Pinyon Script', cursive",
              fontSize: '32px',
              color: '#85101c',
            }}>
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInLightbox {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lightboxSpring {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes polaroidDropIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .photo-gallery-grid > div:nth-child(1) {
          animation: polaroidDropIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s backwards;
        }
        .photo-gallery-grid > div:nth-child(2) {
          animation: polaroidDropIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s backwards;
        }
        .photo-gallery-grid > div:nth-child(3) {
          animation: polaroidDropIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s backwards;
        }

        div:hover .photo-edit-btn {
          opacity: 1 !important;
        }

        @media (max-width: 680px) {
          .photo-gallery-page {
            padding: 16px 14px 24px 14px !important;
          }
          .photo-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            margin: 16px 0 !important;
            justify-items: center !important;
          }
          .photo-gallery-grid > div {
            width: 100% !important;
            max-width: 270px !important;
          }
          .photo-gallery-header {
            padding-bottom: 8px !important;
          }
          .photo-gallery-header span {
            font-size: 10px !important;
          }
          .photo-gallery-dedication {
            display: none !important;
          }
          .photo-gallery-footer {
            padding-top: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
