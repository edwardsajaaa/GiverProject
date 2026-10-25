import React, { useRef, useState } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';
import { ModelStorage } from '../../utils/modelStorage';
import { WashiTape, BlackTape } from '../capsule/TornPaper';

// Curated SVG Geometric Vector Emblems (Professional Digital Arts / Gallery Standard)
const ShapeIcons = {
  cube: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  sphere: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="3.5" ry="9" />
      <path d="M3.5 9h17" />
      <path d="M3.5 15h17" />
    </svg>
  ),
  torus: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-20 12 12)" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  pyramid: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L2 19h20L12 3z" />
      <path d="M12 3v16" />
      <path d="M12 19l6-2" />
    </svg>
  ),
  dodecahedron: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  cylinder: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
      <path d="M9 7.5v13.5" />
      <path d="M15 7.5v13.5" />
    </svg>
  )
};

const MaterialIcons = {
  original: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  holographic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  metallic: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M7 17L17 7" />
    </svg>
  ),
  glass: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
    </svg>
  ),
  wireframe: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  )
};

const SHAPE_PRESETS = [
  { id: 'cube', label: 'Kubus Geometri', desc: 'Presisi kubik modern' },
  { id: 'sphere', label: 'Bola Celestial', desc: 'Harmoni sferis kosmik' },
  { id: 'torus', label: 'Cincin Orbital', desc: 'Cincin gravitasi melayang' },
  { id: 'pyramid', label: 'Piramida Kristal', desc: 'Geometri sakral oktahedron' },
  { id: 'dodecahedron', label: 'Stellar Dodeca', desc: 'Faset polihedral 12 sisi' },
  { id: 'cylinder', label: 'Pilar Monolit', desc: 'Kolom arsitektur klasik' },
];

const COLOR_SWATCHES = [
  { color: '#85101c', name: 'Imperial Crimson' },
  { color: '#c8102e', name: 'Romantic Scarlet' },
  { color: '#d4af37', name: 'Antique Gold' },
  { color: '#2d6a4f', name: 'Emerald Forest' },
  { color: '#1d3557', name: 'Deep Midnight' },
  { color: '#4a0e4e', name: 'Royal Velvet' },
  { color: '#faf7f2', name: 'Parchment Ivory' },
];

const MATERIAL_PRESETS = [
  { id: 'original', label: 'Tekstur Asli Model', desc: 'Palet bawaan berkas 3D' },
  { id: 'holographic', label: 'Aura Holografis', desc: 'Pendaran cincin spektral' },
  { id: 'metallic', label: 'Liquid Chrome Mirror', desc: 'Refleksi logam cair' },
  { id: 'glass', label: 'Kaca Kristal Temaram', desc: 'Refraksi kristal transparan' },
  { id: 'wireframe', label: 'Matriks Wireframe', desc: 'Kisi-kisi poligon siber' },
];

export function CentralObjectModal({
  isNight,
  centralModalOpen, setCentralModalOpen,
  centralObjectType, setCentralObjectType,
  centralObjectColor, setCentralObjectColor,
  centralObjectMaterial, setCentralObjectMaterial,
  centralObjectScale, setCentralObjectScale,
  setCentralObjectUrl,
  centralObjectName, setCentralObjectName
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!centralModalOpen) return null;

  const processFile = async (file) => {
    if (!file) return;

    const lower = file.name.toLowerCase();
    const validExts = ['.glb', '.gltf', '.fbx', '.obj'];
    const isSupported = validExts.some((ext) => lower.endsWith(ext));
    if (!isSupported) {
      alert('Format berkas tidak didukung.\nMohon gunakan file berformat .GLB, .GLTF, .FBX, atau .OBJ.');
      return;
    }

    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      alert(`Berkas Cukup Besar (${(file.size / 1024 / 1024).toFixed(1)} MB):\nDisarankan di bawah 25MB untuk performa rendering optimal.`);
    }

    try {
      setIsUploading(true);
      const { blobUrl, fileName } = await ModelStorage.saveHeroModel(file);
      setCentralObjectUrl(blobUrl);
      setCentralObjectName(fileName);
      setCentralObjectType('custom');
      setCentralObjectMaterial('original');
      SoundEngine.playPop();
    } catch (err) {
      alert(`Gagal memuat model 3D: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleRemoveCustomModel = async () => {
    await ModelStorage.deleteHeroModel();
    setCentralObjectUrl(null);
    setCentralObjectName(null);
    setCentralObjectType('cube');
    setCentralObjectMaterial('holographic');
    SoundEngine.playDelete();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(15, 2, 5, 0.82)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      animation: 'centralModalFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      padding: '16px',
      fontFamily: "'Cormorant Garamond', serif",
    }}>
      <style>{`
        @keyframes centralModalFade {
          0% { opacity: 0; transform: scale(0.92) translateY(18px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Torn Paper Editorial Studio Panel */}
      <div style={{
        position: 'relative',
        backgroundColor: isNight ? '#161616' : '#FAF7F2',
        border: '2px solid #121212',
        padding: '28px 32px 30px',
        width: 'min(580px, 94vw)', maxHeight: '88vh',
        display: 'flex', flexDirection: 'column', gap: 20,
        boxShadow: '0 30px 80px rgba(0,0,0,0.85), 0 4px 14px rgba(0,0,0,0.3)',
        overflowY: 'auto',
        color: isNight ? '#F5F5F7' : '#121212',
        clipPath: 'polygon(0% 4px, 1.5% 0px, 98.5% 0px, 100% 4px, 99.5% 96%, 100% 100%, 0.5% 100%, 0% 96%)',
      }}>
        {/* Tape strips */}
        <WashiTape top="-8px" left="28px" width="70px" rotate={-2} color="rgba(255, 235, 215, 0.85)" />
        <BlackTape top="-6px" right="28px" width="60px" rotate={3} />

        {/* Header Modal */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1.5px solid #121212', paddingBottom: '12px' }}>
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
              CURATOR STUDIO • 3D CENTERPIECE
            </div>
            <h2 style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: isNight ? '#F5F5F7' : '#121212',
              letterSpacing: '-0.3px',
            }}>
              Studio Objek Utama Altar
            </h2>
            <p style={{
              margin: '3px 0 0',
              fontSize: 12,
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: isNight ? '#a3a3a3' : '#555',
            }}>
              Tentukan monumen pusat pulau cinta atau sematkan patung 3D kustom berharga.
            </p>
          </div>
          <button
            onClick={() => { setCentralModalOpen(false); SoundEngine.playClick(); }}
            style={{
              backgroundColor: isNight ? '#222' : '#ffffff',
              border: '1.5px solid #121212',
              width: 30, height: 30,
              fontSize: 12, fontWeight: 800,
              color: isNight ? '#F5F5F7' : '#121212',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Montserrat', sans-serif",
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#a61324'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isNight ? '#222' : '#fff'; e.currentTarget.style.color = isNight ? '#F5F5F7' : '#121212'; }}
            title="Tutup Studio"
          >
            ✕
          </button>
        </div>

        {/* 1. Bentuk Geometri Bawaan */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#85101c',
              textTransform: 'uppercase',
            }}>
              ✦ 01 / GEOMETRIC MONUMENTS
            </span>
          </div>

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
                    padding: '12px 8px',
                    borderRadius: '0px',
                    clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 2px, 99% 98%, 100% 100%, 2% 100%, 0% 98%)',
                    background: active 
                      ? '#121212' 
                      : (isNight ? 'rgba(255,255,255,0.04)' : '#ffffff'),
                    border: active ? '1.5px solid #85101c' : '1px solid #121212',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: active ? '#ffffff' : (isNight ? '#F5F5F7' : '#121212'),
                    boxShadow: active ? '0 4px 14px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#85101c';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#121212';
                    }
                  }}
                >
                  <div style={{ color: active ? '#ffd700' : '#85101c', transition: 'color 0.2s' }}>
                    {ShapeIcons[shape.id]}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.5px' }}>
                    {shape.label}
                  </span>
                  <span style={{ fontSize: 10, color: active ? 'rgba(255,255,255,0.7)' : (isNight ? '#94a3b8' : '#666'), textAlign: 'center', fontStyle: 'italic' }}>
                    {shape.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Upload Model 3D Kustom */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#85101c',
              textTransform: 'uppercase',
            }}>
              ✦ 02 / BESPOKE 3D IMPORT (.GLB, .GLTF, .FBX, .OBJ)
            </span>
            {centralObjectType === 'custom' && (
              <button
                onClick={(e) => { e.stopPropagation(); handleRemoveCustomModel(); }}
                style={{
                  background: 'none', border: 'none', color: '#c8102e', fontSize: 10,
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}
              >
                ✕ HAPUS MODEL KUSTOM
              </button>
            )}
          </div>
          <div
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
              }
            }}
            style={{
              padding: '14px 18px',
              borderRadius: '0px',
              background: centralObjectType === 'custom' 
                ? (isNight ? 'rgba(133, 16, 28, 0.25)' : 'rgba(255, 235, 235, 0.8)') 
                : (isNight ? 'rgba(255,255,255,0.03)' : '#ffffff'),
              border: centralObjectType === 'custom' ? '1.5px dashed #85101c' : '1.5px dashed #121212',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.25s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#85101c';
              e.currentTarget.style.backgroundColor = isNight ? 'rgba(133, 16, 28, 0.15)' : 'rgba(255, 248, 245, 0.9)';
            }}
            onMouseLeave={(e) => {
              if (centralObjectType !== 'custom') {
                e.currentTarget.borderColor = '#121212';
                e.currentTarget.style.backgroundColor = isNight ? 'rgba(255,255,255,0.03)' : '#ffffff';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36,
                backgroundColor: '#121212',
                color: '#ffd700',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isUploading ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                )}
              </div>
              <div>
                <div style={{
                  fontSize: 12, fontWeight: 700, fontFamily: "'Montserrat', sans-serif",
                  color: centralObjectType === 'custom' ? '#85101c' : (isNight ? '#F5F5F7' : '#121212'),
                  letterSpacing: '0.3px',
                }}>
                  {isUploading ? 'Memproses Berkas 3D...' : (centralObjectType === 'custom' && centralObjectName ? `Berkas Aktif: ${centralObjectName}` : 'Klik atau Tarik File 3D ke Sini (.GLB / .GLTF / .FBX / .OBJ)')}
                </div>
                <div style={{ fontSize: 11, fontStyle: 'italic', color: isNight ? '#94a3b8' : '#666' }}>
                  Tersimpan di IndexedDB lokal browser Anda.
                </div>
              </div>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 800, fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '1px', textTransform: 'uppercase',
              color: '#ffffff', backgroundColor: '#121212',
              padding: '6px 12px',
              clipPath: 'polygon(0% 1px, 3% 0%, 97% 0%, 100% 1px, 99% 99%, 100% 100%, 2% 100%, 0% 99%)',
            }}>
              {isUploading ? 'PROSES...' : 'PILIH BERKAS ⟶'}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".glb,.gltf,.fbx,.obj"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* 3. Warna Energi & Gaya Material */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#85101c',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              ✦ 03 / AURA PALETTE
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {COLOR_SWATCHES.map((item) => (
                <button
                  key={item.color}
                  onClick={() => { setCentralObjectColor(item.color); SoundEngine.playClick(); }}
                  title={item.name}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: item.color,
                    border: centralObjectColor === item.color ? '2.5px solid #121212' : '1.5px solid rgba(0,0,0,0.2)',
                    boxShadow: centralObjectColor === item.color ? '0 0 10px rgba(133, 16, 28, 0.4), inset 0 0 0 2px #fff' : 'none',
                    cursor: 'pointer', transition: 'all 0.2s',
                    outline: 'none',
                    transform: centralObjectColor === item.color ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#85101c',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              ✦ 04 / SURFACE MATERIAL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {MATERIAL_PRESETS.map((mat) => {
                const active = centralObjectMaterial === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => { setCentralObjectMaterial(mat.id); SoundEngine.playClick(); }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '0px',
                      textAlign: 'left',
                      background: active ? '#121212' : (isNight ? 'rgba(255,255,255,0.03)' : '#ffffff'),
                      border: active ? '1px solid #85101c' : '1px solid #121212',
                      color: active ? '#ffffff' : (isNight ? '#F5F5F7' : '#121212'),
                      fontSize: 11,
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                  >
                    <div style={{ color: active ? '#ffd700' : '#85101c' }}>
                      {MaterialIcons[mat.id]}
                    </div>
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
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#85101c',
              textTransform: 'uppercase',
            }}>
              ✦ 05 / SCALE: {centralObjectScale.toFixed(1)}X
            </span>
            <button
              onClick={() => { setCentralObjectScale(1.0); SoundEngine.playClick(); }}
              style={{
                background: 'none', border: 'none', color: '#121212',
                fontSize: 10, fontWeight: 700, fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer', letterSpacing: '0.5px', textDecoration: 'underline'
              }}
            >
              RESET (1.0X)
            </button>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.4"
            step="0.1"
            value={centralObjectScale}
            onChange={(e) => setCentralObjectScale(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: '#85101c' }}
          />
        </div>

        {/* Tombol Simpan / Tutup (Editorial Block Button) */}
        <button
          onClick={() => { setCentralModalOpen(false); SoundEngine.playPop(); }}
          style={{
            background: '#121212',
            border: 'none',
            borderRadius: '0px',
            padding: '12px 18px',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.35)',
            clipPath: 'polygon(0% 2px, 2% 0%, 98% 0%, 100% 2px, 99% 98%, 100% 100%, 2% 100%, 0% 98%)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#a61324';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#121212';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>TERAPKAN OBJEK UTAMA & SIMPAN</span>
          <span style={{ fontSize: '13px' }}>⟶</span>
        </button>
      </div>
    </div>
  );
}
