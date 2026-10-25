import React, { useState } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';
import { BIOMES, ART_STYLES } from '../../constants/worldPresets';
import { WashiTape, BlackTape } from '../capsule/TornPaper';

// Curated SVG Vector Emblems for Biomes & Art Styles (No Emojis)
const BiomeIcons = {
  paris_romantique: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M10 6h4M9 10h6M7 16h10M6 22l4-12M18 22l-4-12M9 22a3 3 0 0 1 6 0" />
      <path d="M12 3c-1.5-1.5-3.5 0-2 2 1.5 2 2 2 2 2s.5 0 2-2c1.5-2-.5-3.5-2-2z" fill="#e11d48" stroke="none" />
    </svg>
  ),
  kyoto_blossom: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M5 6v14M19 6v14M2 10h20M9 6v14M15 6v14" />
      <circle cx="12" cy="14" r="2.5" fill="#f472b6" stroke="none" />
    </svg>
  ),
  london_romance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="10" width="10" height="12" />
      <path d="M12 2l4 8H8l4-8z" />
      <circle cx="12" cy="15" r="2.5" />
      <polyline points="12 13.5 12 15 13.5 15" />
    </svg>
  ),
  venice_serenade: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 15c4 2 14 2 18-2-2 4-10 5-18 2z" fill="currentColor" opacity="0.3" />
      <path d="M18 10l-4 6M19 8c1 0 2 1 2 2" />
    </svg>
  )
};

const ArtStyleIcons = {
  lowpoly: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 17 21 7 21 2 8.5 12 2" />
      <line x1="12" y1="2" x2="12" y2="21" />
      <line x1="2" y1="8.5" x2="22" y2="8.5" />
    </svg>
  ),
  anime: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
    </svg>
  ),
  retro_8bit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="15" cy="13" r="1" fill="currentColor" />
      <circle cx="18" cy="11" r="1" fill="currentColor" />
    </svg>
  ),
  synthwave: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="9" r="6" />
      <line x1="2" y1="15" x2="22" y2="15" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <line x1="6" y1="21" x2="18" y2="21" />
    </svg>
  ),
  pbr: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8a5 5 0 0 1 7 3" />
    </svg>
  )
};

export function WorldStyleModal({
  isNight,
  isOpen,
  setIsOpen,
  biome,
  setBiome,
  artStyle,
  setArtStyle
}) {
  const [activeTab, setActiveTab] = useState('biome'); // 'biome' | 'artStyle'

  if (!isOpen) return null;

  return (
    <div 
      onClick={() => { setIsOpen(false); SoundEngine.playClick(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(15, 2, 5, 0.82)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease-out',
        padding: 16
      }}
    >
      {/* Torn Paper Scrapbook Dossier Modal Card */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
        position: 'relative',
        width: '100%', maxWidth: 560, maxHeight: '90vh',
        backgroundColor: isNight ? '#161616' : '#FAF7F2',
        border: '2px solid #121212',
        borderRadius: '0px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        color: isNight ? '#E5E5E5' : '#171717',
        fontFamily: "'Cormorant Garamond', serif",
        clipPath: 'polygon(0% 4px, 1.5% 0px, 98.5% 0px, 100% 4px, 99.5% 96%, 100% 100%, 0.5% 100%, 0% 96%)',
      }}>
        {/* Tape strips on modal corners */}
        <WashiTape top="-8px" left="28px" width="70px" rotate={-2} color="rgba(255, 235, 215, 0.85)" />
        <BlackTape top="-6px" right="28px" width="60px" rotate={3} />

        {/* Header */}
        <div style={{
          padding: '22px 26px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212'
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
              ENVIRONMENT & RENDERING STUDIO
            </div>
            <h2 style={{ 
              margin: 0, 
              fontSize: 22, 
              fontWeight: 700, 
              fontFamily: "'Playfair Display', serif",
              color: isNight ? '#fff' : '#121212',
              letterSpacing: '-0.3px' 
            }}>
              Kustomisasi Semesta & Gaya Seni
            </h2>
            <p style={{ 
              margin: '3px 0 0', 
              fontSize: 12, 
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: isNight ? '#A3A3A3' : '#666',
            }}>
              Pilih atmosfer pulau kenangan dan estetika visual rendering 3D.
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              SoundEngine.playClick();
            }}
            style={{
              width: 30, height: 30, border: '1.5px solid #121212',
              backgroundColor: isNight ? '#222' : '#fff',
              color: isNight ? '#fff' : '#000', fontSize: 12, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontFamily: "'Montserrat', sans-serif"
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Toggle (Editorial Stamp Buttons) */}
        <div style={{
          display: 'flex', padding: '12px 24px 0', gap: 8
        }}>
          <button
            onClick={() => { setActiveTab('biome'); SoundEngine.playClick(); }}
            style={{
              flex: 1, padding: '9px 14px', border: '1.5px solid #121212', cursor: 'pointer',
              fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '1px',
              textTransform: 'uppercase',
              backgroundColor: activeTab === 'biome'
                ? '#121212'
                : (isNight ? '#262626' : '#fff'),
              color: activeTab === 'biome' ? '#ffffff' : (isNight ? '#aaa' : '#444'),
              transition: 'all 0.2s',
              clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
            }}
          >
            <span>LOKASI SEMESTA ({BIOMES.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('artStyle'); SoundEngine.playClick(); }}
            style={{
              flex: 1, padding: '9px 14px', border: '1.5px solid #121212', cursor: 'pointer',
              fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '1px',
              textTransform: 'uppercase',
              backgroundColor: activeTab === 'artStyle'
                ? '#a61324'
                : (isNight ? '#262626' : '#fff'),
              color: activeTab === 'artStyle' ? '#ffffff' : (isNight ? '#aaa' : '#444'),
              transition: 'all 0.2s',
              clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
            }}
          >
            <span>GAYA VISUAL ({ART_STYLES.length})</span>
          </button>
        </div>

        {/* List Content */}
        <div style={{
          padding: '16px 24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10
        }}>
          {activeTab === 'biome' && BIOMES.map((b) => {
            const isSelected = biome === b.id;
            return (
              <div
                key={b.id}
                onClick={() => {
                  setBiome(b.id);
                  SoundEngine.playPop();
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? (isNight ? '#262626' : '#fff')
                    : (isNight ? '#1f1f1f' : '#f4eee4'),
                  border: isSelected
                    ? '2px solid #a61324'
                    : '1px solid #121212',
                  boxShadow: isSelected ? '0 4px 12px rgba(166, 19, 36, 0.25)' : 'none',
                  transition: 'all 0.2s',
                  clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
                }}
              >
                <div style={{
                  fontSize: 16, width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: isNight ? '#121212' : '#fff',
                  border: '1px solid #121212',
                  color: isSelected ? '#a61324' : '#121212',
                }}>
                  {BiomeIcons[b.icon] || BiomeIcons[b.id] || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 13, fontFamily: "'Montserrat', sans-serif" }}>{b.name}</span>
                    <span style={{
                      fontSize: 9, padding: '2px 6px', fontWeight: 800,
                      backgroundColor: isSelected ? '#a61324' : '#121212',
                      color: '#ffffff',
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: '0.5px'
                    }}>
                      {b.badge}
                    </span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 11, color: isNight ? '#A3A3A3' : '#555', fontFamily: "'Montserrat', sans-serif" }}>
                    {b.desc}
                  </p>
                </div>
                <div style={{
                  width: 18, height: 18,
                  border: isSelected ? '5px solid #a61324' : '1.5px solid #888',
                  boxSizing: 'border-box'
                }} />
              </div>
            );
          })}

          {activeTab === 'artStyle' && ART_STYLES.map((s) => {
            const isSelected = artStyle === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setArtStyle(s.id);
                  SoundEngine.playPop();
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? (isNight ? '#262626' : '#fff')
                    : (isNight ? '#1f1f1f' : '#f4eee4'),
                  border: isSelected
                    ? '2px solid #a61324'
                    : '1px solid #121212',
                  boxShadow: isSelected ? '0 4px 12px rgba(166, 19, 36, 0.25)' : 'none',
                  transition: 'all 0.2s',
                  clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
                }}
              >
                <div style={{
                  fontSize: 16, width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: isNight ? '#121212' : '#fff',
                  border: '1px solid #121212',
                  color: isSelected ? '#a61324' : '#121212',
                }}>
                  {ArtStyleIcons[s.icon] || ArtStyleIcons[s.id] || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 13, fontFamily: "'Montserrat', sans-serif" }}>{s.name}</span>
                    <span style={{
                      fontSize: 9, padding: '2px 6px', fontWeight: 800,
                      backgroundColor: isSelected ? '#a61324' : '#121212',
                      color: '#ffffff',
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: '0.5px'
                    }}>
                      {s.badge}
                    </span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 11, color: isNight ? '#A3A3A3' : '#555', fontFamily: "'Montserrat', sans-serif" }}>
                    {s.desc}
                  </p>
                </div>
                <div style={{
                  width: 18, height: 18,
                  border: isSelected ? '5px solid #a61324' : '1.5px solid #888',
                  boxSizing: 'border-box'
                }} />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px 18px', borderTop: '1px solid #121212',
          display: 'flex', justifyContent: 'flex-end', backgroundColor: isNight ? '#1a1a1a' : '#faf7f2'
        }}>
          <button
            onClick={() => {
              setIsOpen(false);
              SoundEngine.playPop();
            }}
            style={{
              padding: '9px 18px', border: 'none', backgroundColor: '#121212',
              color: '#ffffff', fontWeight: 800, fontSize: 11, cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a61324'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#121212'}
          >
            TERAPKAN & TUTUP ⟶
          </button>
        </div>
      </div>
    </div>
  );
}
