import React, { useState } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';
import { BIOMES, ART_STYLES } from '../../constants/worldPresets';

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
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      animation: 'fadeIn 0.25s ease-out',
      padding: 16
    }}>
      <div style={{
        width: '100%', maxWidth: 560, maxHeight: '90vh',
        background: isNight ? 'rgba(23, 23, 23, 0.92)' : 'rgba(255, 255, 255, 0.94)',
        border: isNight ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 28,
        boxShadow: isNight ? '0 24px 64px rgba(0,0,0,0.8)' : '0 24px 64px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', color: isNight ? '#E5E5E5' : '#171717'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: isNight ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>
              🌍 Kustomisasi Dunia & Gaya Seni
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: isNight ? '#A3A3A3' : '#737373' }}>
              Ubah lokasi tempat dan gaya visual 3D sesuai imajinasimu
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              SoundEngine.playClick();
            }}
            style={{
              width: 32, height: 32, borderRadius: 16, border: 'none',
              background: isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              color: isNight ? '#fff' : '#000', fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Toggle */}
        <div style={{
          display: 'flex', padding: '12px 24px 0', gap: 8
        }}>
          <button
            onClick={() => { setActiveTab('biome'); SoundEngine.playClick(); }}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 14, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: activeTab === 'biome'
                ? (isNight ? '#38bdf8' : '#0284c7')
                : (isNight ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'),
              color: activeTab === 'biome' ? '#ffffff' : (isNight ? '#A3A3A3' : '#737373'),
              transition: 'all 0.2s'
            }}
          >
            <span>🏝️ Lokasi Tempat ({BIOMES.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('artStyle'); SoundEngine.playClick(); }}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 14, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: activeTab === 'artStyle'
                ? (isNight ? '#a855f7' : '#9333ea')
                : (isNight ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'),
              color: activeTab === 'artStyle' ? '#ffffff' : (isNight ? '#A3A3A3' : '#737373'),
              transition: 'all 0.2s'
            }}
          >
            <span>🎨 Gaya Seni Visual ({ART_STYLES.length})</span>
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
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  borderRadius: 18, cursor: 'pointer',
                  background: isSelected
                    ? (isNight ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)')
                    : (isNight ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'),
                  border: isSelected
                    ? '2px solid #38bdf8'
                    : (isNight ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)'),
                  transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
              >
                <div style={{
                  fontSize: 28, width: 44, height: 44, borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isNight ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'
                }}>
                  {b.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{b.name}</span>
                    <span style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700,
                      background: isNight ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)',
                      color: isNight ? '#38bdf8' : '#0284c7'
                    }}>
                      {b.badge}
                    </span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: isNight ? '#A3A3A3' : '#64748b' }}>
                    {b.desc}
                  </p>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 10,
                  border: isSelected ? '6px solid #38bdf8' : '2px solid #64748b',
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
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  borderRadius: 18, cursor: 'pointer',
                  background: isSelected
                    ? (isNight ? 'rgba(168, 85, 247, 0.15)' : 'rgba(147, 51, 234, 0.1)')
                    : (isNight ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'),
                  border: isSelected
                    ? '2px solid #a855f7'
                    : (isNight ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)'),
                  transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
              >
                <div style={{
                  fontSize: 28, width: 44, height: 44, borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isNight ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</span>
                    <span style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700,
                      background: isNight ? 'rgba(168, 85, 247, 0.2)' : 'rgba(147, 51, 234, 0.15)',
                      color: isNight ? '#c084fc' : '#7e22ce'
                    }}>
                      {s.badge}
                    </span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: isNight ? '#A3A3A3' : '#64748b' }}>
                    {s.desc}
                  </p>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 10,
                  border: isSelected ? '6px solid #a855f7' : '2px solid #64748b',
                  boxSizing: 'border-box'
                }} />
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div style={{
          padding: '12px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: isNight ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
          background: isNight ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: 11, color: isNight ? '#737373' : '#a3a3a3' }}>
            ⚡ Semua lokasi & gaya seni dioptimasi instanced (0 FPS drop)
          </span>
          <button
            onClick={() => {
              setIsOpen(false);
              SoundEngine.playClick();
            }}
            style={{
              padding: '8px 20px', borderRadius: 20, border: 'none',
              background: isNight ? '#ffffff' : '#171717',
              color: isNight ? '#000000' : '#ffffff',
              fontSize: 12, fontWeight: 700, cursor: 'pointer'
            }}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
