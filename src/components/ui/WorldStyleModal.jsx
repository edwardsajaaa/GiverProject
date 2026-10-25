import React, { useState } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';
import { BIOMES, ART_STYLES } from '../../constants/worldPresets';
import { WashiTape, BlackTape } from '../capsule/TornPaper';

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
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.25s ease-out',
      padding: 16
    }}>
      {/* Torn Paper Scrapbook Dossier Modal Card */}
      <div style={{
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
            <h2 style={{ 
              margin: 0, 
              fontSize: 20, 
              fontWeight: 700, 
              fontFamily: "'Playfair Display', serif",
              color: isNight ? '#fff' : '#121212',
              letterSpacing: '-0.3px' 
            }}>
              🌍 Kustomisasi Dunia & Gaya Seni
            </h2>
            <p style={{ 
              margin: '4px 0 0', 
              fontSize: 11, 
              fontFamily: "'Montserrat', sans-serif",
              color: isNight ? '#A3A3A3' : '#666',
              letterSpacing: '0.5px' 
            }}>
              Ubah lokasi pulau cinta dan gaya visual 3D diorama
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              SoundEngine.playClick();
            }}
            style={{
              width: 32, height: 32, border: '1.5px solid #121212',
              backgroundColor: isNight ? '#222' : '#fff',
              color: isNight ? '#fff' : '#000', fontSize: 13, cursor: 'pointer',
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
            <span>🏝️ Lokasi Tempat ({BIOMES.length})</span>
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
            <span>🎨 Gaya Seni ({ART_STYLES.length})</span>
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
                  fontSize: 26, width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: isNight ? '#121212' : '#fff',
                  border: '1px solid #121212',
                }}>
                  {b.icon}
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
                  fontSize: 26, width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: isNight ? '#121212' : '#fff',
                  border: '1px solid #121212',
                }}>
                  {s.icon}
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
      </div>
    </div>
  );
}
