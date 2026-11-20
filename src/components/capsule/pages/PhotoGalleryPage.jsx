import React, { useState, useEffect } from 'react';
import {
  TornScrap,
  WashiTape,
  BlackTape,
  DoodleCrown,
  BrushSlash,
  EditorialButton,
} from '../TornPaper';
import { EditPhotoModal } from '../EditPhotoModal';

const MAX_PHOTOS = 12;

export function PhotoGalleryPage({
  onNext,
  authorName = 'Alex',
  recipientName = 'Sarah',
  customPhotos,
  onUpdatePhotos,
  isReceiver = false
}) {
  const [photos, setPhotos] = useState(
    Array.isArray(customPhotos) ? customPhotos : []
  );
  const [activePhoto, setActivePhoto] = useState(null);
  const [modalState, setModalState] = useState({ open: false, isNew: false, index: -1, photo: null });

  useEffect(() => {
    if (Array.isArray(customPhotos)) {
      setPhotos(customPhotos);
    }
  }, [customPhotos]);

  const commitPhotos = (updated) => {
    setPhotos(updated);
    if (onUpdatePhotos) onUpdatePhotos(updated);
  };

  const handleOpenAdd = () => {
    if (isReceiver || photos.length >= MAX_PHOTOS) return;
    setModalState({
      open: true,
      isNew: true,
      index: -1,
      photo: {
        id: Date.now(),
        url: '',
        caption: `Kenangan bersama ${recipientName || 'kamu'}`,
        tagLeft: '',
        tagRight: '',
        tapeType: photos.length % 2 === 0 ? 'black' : 'washi',
        rotate: Number(((Math.random() - 0.5) * 3.4).toFixed(1)),
      },
    });
  };

  const handleOpenEdit = (index, item, e) => {
    e.stopPropagation();
    if (isReceiver) return;
    setModalState({ open: true, isNew: false, index, photo: item });
  };

  const handleDeletePhoto = (index, item, e) => {
    e.stopPropagation();
    if (isReceiver) return;
    if (!window.confirm(`Hapus foto "${item.caption || 'ini'}" dari galeri?`)) return;
    const updated = photos.filter((_, i) => i !== index);
    commitPhotos(updated);
  };

  const handleSavePhoto = (savedPhoto) => {
    if (modalState.isNew) {
      commitPhotos([...photos, savedPhoto]);
    } else if (modalState.index >= 0) {
      const updated = photos.map((p, i) => (i === modalState.index ? savedPhoto : p));
      commitPhotos(updated);
    }
  };

  return (
    <div
      className="photo-gallery-page"
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px 28px 18px 28px',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        color: '#121212',
        overflow: 'hidden',
      }}
    >
      <div
        className="photo-gallery-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '8px',
          flexShrink: 0,
        }}
      >
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

      <div
        className="photo-gallery-scroll-area"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '18px 14px 14px 14px',
          margin: '4px -6px',
          WebkitOverflowScrolling: 'touch',
          display: photos.length === 0 ? 'flex' : 'block',
          alignItems: photos.length === 0 ? 'center' : undefined,
          justifyContent: photos.length === 0 ? 'center' : undefined,
        }}
      >
        {photos.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '14px',
            padding: '24px 20px',
            width: '100%',
            maxWidth: '340px',
            border: '2px dashed #85101c',
            backgroundColor: 'rgba(255, 253, 249, 0.8)',
          }}>
            <span style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: '30px',
              color: '#85101c',
              lineHeight: 1.1,
            }}>
              {isReceiver ? 'Belum ada foto kenangan' : 'Galeri Masih Kosong'}
            </span>
            <p style={{
              margin: 0,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              color: '#555',
              lineHeight: 1.5,
            }}>
              {isReceiver
                ? `${authorName} belum menambahkan foto ke dalam kapsul ini.`
                : 'Tambahkan foto kenangan spesialmu. Foto yang sudah kamu isi akan otomatis tersimpan.'}
            </p>
            {!isReceiver && (
              <button
                type="button"
                onClick={handleOpenAdd}
                style={{
                  backgroundColor: '#85101c',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(133, 16, 28, 0.35)',
                }}
              >
                + TAMBAH FOTO PERTAMA
              </button>
            )}
          </div>
        ) : (
        <div
          className="photo-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px 20px',
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
                transform: `rotate(${item.rotate || 0}deg)`,
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {idx === 1 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-10px -8px -8px -8px',
                    backgroundColor: '#c8102e',
                    zIndex: 0,
                    clipPath: 'polygon(0% 12%, 8% 4%, 22% 0%, 55% 4%, 82% 0%, 96% 8%, 100% 25%, 98% 60%, 100% 88%, 90% 100%, 65% 96%, 35% 100%, 10% 95%, 0% 80%, 2% 40%)',
                    boxShadow: '0 8px 24px rgba(200, 16, 46, 0.45)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
                  }}
                />
              )}

              {item.tapeType === 'washi' ? (
                <WashiTape top="-10px" left="calc(50% - 40px)" width="80px" rotate={-2} color="rgba(255, 235, 205, 0.85)" />
              ) : (
                <BlackTape top="-10px" left="calc(50% - 35px)" width="70px" rotate={idx % 2 === 0 ? -4 : 3} />
              )}

              {item.tagLeft && (
                <div style={{
                  position: 'absolute',
                  left: '-14px',
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
                  pointerEvents: 'none',
                }}>
                  {item.tagLeft}
                </div>
              )}

              {item.tagRight && (
                <div style={{
                  position: 'absolute',
                  right: '-12px',
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
                  pointerEvents: 'none',
                }}>
                  {item.tagRight}
                </div>
              )}

              <div
                onClick={() => setActivePhoto(item)}
                className="photo-polaroid-frame"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  maxHeight: 'min(265px, 34vh)',
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
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.parentElement.style.transform = `perspective(1000px) rotateX(4deg) rotateY(${idx % 3 === 0 ? 4 : idx % 3 === 2 ? -4 : 0}deg) scale(1.04) translateY(-6px)`;
                  e.currentTarget.parentElement.style.zIndex = '30';
                  e.currentTarget.style.boxShadow = '0 24px 48px -10px rgba(0, 0, 0, 0.38), 0 8px 16px rgba(0,0,0,0.15)';
                  const sheen = e.currentTarget.querySelector('.photo-sheen-sweep');
                  if (sheen) sheen.style.transform = 'translateX(100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement.style.transform = `rotate(${item.rotate || 0}deg) scale(1) translateY(0)`;
                  e.currentTarget.parentElement.style.zIndex = '1';
                  e.currentTarget.style.boxShadow = '0 10px 26px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0,0,0,0.08)';
                  const sheen = e.currentTarget.querySelector('.photo-sheen-sweep');
                  if (sheen) sheen.style.transform = 'translateX(-100%)';
                }}
              >
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.url}
                    alt={item.alt || item.caption}
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

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 1px, transparent 0)`,
                    backgroundSize: '4px 4px',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                  }} />
                </div>

                {!isReceiver && (
                  <div
                    className="photo-edit-actions"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      zIndex: 15,
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => handleOpenEdit(idx, item, e)}
                      style={{
                        backgroundColor: '#121212',
                        color: '#fff',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: '0px',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.35)',
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                        letterSpacing: '0.8px',
                      }}
                      title="Ubah foto, keterangan, atau stiker"
                    >
                      ✎ UBAH
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeletePhoto(idx, item, e)}
                      style={{
                        backgroundColor: '#85101c',
                        color: '#fff',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '4px 7px',
                        borderRadius: '0px',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.35)',
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                      }}
                      title="Hapus foto ini"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {!isReceiver && photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="photo-add-slot"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                maxHeight: 'min(265px, 34vh)',
                backgroundColor: 'rgba(255, 253, 249, 0.75)',
                border: '2px dashed #85101c',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                color: '#85101c',
                padding: '12px',
                boxSizing: 'border-box',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(133, 16, 28, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 253, 249, 0.75)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              title="Tambahkan foto baru ke galeri"
            >
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1.5px solid #85101c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                lineHeight: 1,
                fontFamily: "'Montserrat', sans-serif",
              }}>
                +
              </span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>
                TAMBAH FOTO
              </span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '9px',
                color: '#666',
              }}>
                ({photos.length}/{MAX_PHOTOS})
              </span>
            </button>
          )}
        </div>
        )}
      </div>

      <div
        className="photo-gallery-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1.5px solid #121212',
          paddingTop: '8px',
          paddingBottom: '2px',
          marginTop: 'auto',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
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
            • GALERI FOTO ({photos.length})
          </span>
        </div>

        <EditorialButton
          variant="black"
          onClick={onNext}
          arrow
          rotate={0}
          style={{
            padding: '7px 16px',
            fontSize: '11px',
            position: 'relative',
            zIndex: 15,
          }}
        >
          BACA SURAT
        </EditorialButton>
      </div>

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
              alt={activePhoto.alt || activePhoto.caption}
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

      <EditPhotoModal
        isOpen={modalState.open}
        isNew={modalState.isNew}
        photo={modalState.photo}
        onClose={() => setModalState({ open: false, isNew: false, index: -1, photo: null })}
        onSave={handleSavePhoto}
      />

      <style>{`
        .photo-gallery-scroll-area::-webkit-scrollbar {
          width: 5px;
        }
        .photo-gallery-scroll-area::-webkit-scrollbar-track {
          background: rgba(18, 18, 18, 0.04);
          border-radius: 4px;
        }
        .photo-gallery-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(133, 16, 28, 0.35);
          border-radius: 4px;
        }
        .photo-gallery-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(133, 16, 28, 0.7);
        }

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
            transform: translateY(24px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .photo-gallery-grid > div {
          animation: polaroidDropIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        @media (max-width: 680px) {
          .photo-gallery-page {
            padding: 12px 12px 18px 12px !important;
          }
          .photo-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px 14px !important;
            justify-items: center !important;
          }
          .photo-gallery-grid > div,
          .photo-add-slot {
            width: 100% !important;
            max-width: 220px !important;
          }
          .photo-gallery-header {
            padding-bottom: 6px !important;
          }
          .photo-gallery-header span {
            font-size: 10px !important;
          }
          .photo-gallery-footer {
            padding-top: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}
