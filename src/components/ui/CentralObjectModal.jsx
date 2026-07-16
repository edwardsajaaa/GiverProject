import React, { useRef } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';

const SHAPE_PRESETS = [
  { id: 'cube', label: 'Kubus Cyber', icon: '🧊', desc: 'Kubus presisi futuristik' },
  { id: 'sphere', label: 'Bola Plasma', icon: '🔮', desc: 'Inti energi bulat sempurna' },
  { id: 'torus', label: 'Cincin Quantum', icon: '🪐', desc: 'Cincin gravitasi melayang' },
  { id: 'pyramid', label: 'Piramida Kristal', icon: '🔺', desc: 'Konus geometri suci' },
  { id: 'dodecahedron', label: 'Bintang Suci', icon: '🌟', desc: 'Sisi 12 dimensi tinggi' },
  { id: 'cylinder', label: 'Pilar Kapsul', icon: '🏛️', desc: 'Pilar energi monolit' },
];

const COLOR_SWATCHES = [
  { color: '#4f8cff', name: 'Cyber Blue' },
  { color: '#38bdf8', name: 'Crystal Sky' },
  { color: '#ec4899', name: 'Neon Pink' },
  { color: '#10b981', name: 'Emerald Green' },
  { color: '#f59e0b', name: 'Golden Sun' },
  { color: '#a855f7', name: 'Purple Void' },
  { color: '#f8fafc', name: 'Pure White' },
];

const MATERIAL_PRESETS = [
  { id: 'holographic', label: '✨ Holographic Aura', desc: 'Berkilau dengan cincin aura wireframe' },
  { id: 'metallic', label: '🪞 Chrome Mirror', desc: 'Pantulan logam reflektif padat' },
  { id: 'glass', label: '💎 Crystal Glass', desc: 'Transparan kristal tembus pandang' },
  { id: 'wireframe', label: '🌐 Neon Wireframe', desc: 'Kerangka matriks siber' },
];

export function CentralObjectModal({
  isNight,
  centralModalOpen, setCentralModalOpen,
  centralObjectType, setCentralObjectType,
  centralObjectColor, setCentralObjectColor,
  centralObjectMaterial, setCentralObjectMaterial,
  centralObjectScale, setCentralObjectScale,
  centralObjectUrl, setCentralObjectUrl,
  centralObjectName, setCentralObjectName
}) {
  const fileInputRef = useRef(null);

  if (!centralModalOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCentralObjectUrl(url);
    setCentralObjectName(file.name);
    setCentralObjectType('custom');
    SoundEngine.playPop();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      animation: 'modalFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <style>{`
        @keyframes modalFadeIn {
          0% { opacity: 0; transform: scale(0.92) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Glass Panel */}
      <div style={{
        background: isNight ? 'rgba(20, 24, 34, 0.94)' : 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(40px) saturate(220%)',
        WebkitBackdropFilter: 'blur(40px) saturate(220%)',
        border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 28, padding: '26px 30px',
        width: 'min(540px, 92vw)', maxHeight: '88vh',
        display: 'flex', flexDirection: 'column', gap: 20,
        boxShadow: isNight ? '0 28px 68px rgba(0,0,0,0.8)' : '0 24px 60px rgba(0,0,0,0.2)',
        overflowY: 'auto'
      }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: isNight ? '#F5F5F7' : '#1D1D1F', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>💎 Studio Objek Utama Altar</span>
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 12, color: isNight ? '#94a3b8' : '#64748b' }}>
              Pilih bentuk centerpiece tengah pulau atau upload file 3D milik Anda (.glb / .gltf / .obj / .fbx).
            </p>
          </div>
          <button
            onClick={() => { setCentralModalOpen(false); SoundEngine.playClick(); }}
            style={{
              background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
              border: 'none', borderRadius: 14, width: 34, height: 34,
              fontSize: 14, fontWeight: 700, color: isNight ? '#F5F5F7' : '#1D1D1F',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* 1. Bentuk Objek Bawaan */}
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: isNight ? '#38bdf8' : '#007AFF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
            1. Bentuk Geometri Presisi (Bawaan)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {SHAPE_PRESETS.map((shape) => {
              const active = centralObjectType === shape.id;
              return (
                <button
                  key={shape.id}
                  onClick={() => {
                    setCentralObjectType(shape.id);
                    SoundEngine.playPop();
                  }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '12px 8px', borderRadius: 18,
                    background: active ? (isNight ? 'rgba(56, 189, 248, 0.24)' : 'rgba(0, 122, 255, 0.16)') : (isNight ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
                    border: active ? `2px solid ${isNight ? '#38bdf8' : '#007AFF'}` : (isNight ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)'),
                    cursor: 'pointer', transition: 'all 0.25s',
                    color: isNight ? '#F5F5F7' : '#1D1D1F'
                  }}
                >
                  <span style={{ fontSize: 24 }}>{shape.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{shape.label}</span>
                  <span style={{ fontSize: 9, color: isNight ? '#94a3b8' : '#64748b', textAlign: 'center' }}>{shape.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Upload Model 3D Kustom */}
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: isNight ? '#e879f9' : '#c026d3', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            2. Atau Upload Model 3D Milik Anda
          </label>
          <div
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              padding: '16px 20px', borderRadius: 18,
              background: centralObjectType === 'custom' ? (isNight ? 'rgba(232, 121, 249, 0.2)' : 'rgba(192, 38, 211, 0.12)') : (isNight ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
              border: centralObjectType === 'custom' ? `2px dashed ${isNight ? '#e879f9' : '#c026d3'}` : (isNight ? '1px dashed rgba(255,255,255,0.22)' : '1px dashed rgba(0,0,0,0.18)'),
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.25s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 26 }}>📤</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: centralObjectType === 'custom' ? (isNight ? '#e879f9' : '#c026d3') : (isNight ? '#F5F5F7' : '#1D1D1F') }}>
                  {centralObjectType === 'custom' && centralObjectName ? `File Terpilih: ${centralObjectName}` : 'Klik untuk Pilih File Model 3D (.glb / .gltf / .obj / .fbx)'}
                </div>
                <div style={{ fontSize: 11, color: isNight ? '#94a3b8' : '#64748b' }}>
                  Model akan otomatis disesuaikan ukurannya agar pas mengapung di atas Altar utama.
                </div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: isNight ? '#e879f9' : '#c026d3', background: isNight ? 'rgba(232,121,249,0.15)' : 'rgba(192,38,211,0.1)', padding: '6px 12px', borderRadius: 12 }}>
              Pilih File
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".glb,.gltf,.obj,.fbx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* 3. Pilihan Warna & Gaya Material */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: isNight ? '#F5F5F7' : '#1D1D1F', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
              3. Warna Energi Inti
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {COLOR_SWATCHES.map((item) => (
                <button
                  key={item.color}
                  onClick={() => { setCentralObjectColor(item.color); SoundEngine.playClick(); }}
                  title={item.name}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: item.color,
                    border: centralObjectColor === item.color ? '3px solid #FFF' : '2px solid transparent',
                    boxShadow: centralObjectColor === item.color ? `0 0 14px ${item.color}` : 'none',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: isNight ? '#F5F5F7' : '#1D1D1F', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
              4. Gaya Material
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {MATERIAL_PRESETS.map((mat) => {
                const active = centralObjectMaterial === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => { setCentralObjectMaterial(mat.id); SoundEngine.playClick(); }}
                    style={{
                      padding: '8px 12px', borderRadius: 12, textAlign: 'left',
                      background: active ? (isNight ? 'rgba(56, 189, 248, 0.22)' : 'rgba(0, 122, 255, 0.14)') : (isNight ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
                      border: active ? `1.5px solid ${isNight ? '#38bdf8' : '#007AFF'}` : '1px solid transparent',
                      color: isNight ? '#F5F5F7' : '#1D1D1F', fontSize: 11, fontWeight: active ? 700 : 500,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div>{mat.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Skala Ukuran */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: isNight ? '#F5F5F7' : '#1D1D1F', textTransform: 'uppercase', letterSpacing: 0.8 }}>
              5. Skala Ukuran Centerpiece: {centralObjectScale.toFixed(1)}x
            </label>
            <button
              onClick={() => { setCentralObjectScale(1.0); SoundEngine.playClick(); }}
              style={{ background: 'none', border: 'none', color: isNight ? '#38bdf8' : '#007AFF', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
            >
              Reset Normal (1.0x)
            </button>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.4"
            step="0.1"
            value={centralObjectScale}
            onChange={(e) => setCentralObjectScale(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: isNight ? '#38bdf8' : '#007AFF' }}
          />
        </div>

        {/* Tombol Simpan / Tutup */}
        <button
          onClick={() => { setCentralModalOpen(false); SoundEngine.playPop(); }}
          style={{
            background: isNight ? 'linear-gradient(135deg, #0284c7, #3b82f6)' : 'linear-gradient(135deg, #007AFF, #5856D6)',
            border: 'none', borderRadius: 18, padding: '14px',
            color: '#FFF', fontSize: 14, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
            transition: 'transform 0.2s'
          }}
        >
          ✨ Terapkan Objek Utama & Tutup Studio
        </button>
      </div>
    </div>
  );
}
