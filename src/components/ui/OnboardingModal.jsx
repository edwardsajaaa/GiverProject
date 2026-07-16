import React from 'react';
import { StorageEngine } from '../../utils/storageEngine';
import { SoundEngine } from '../../utils/SoundEngine';

export function OnboardingModal({ isNight, showTutorial, setShowTutorial }) {
  if (!showTutorial) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        maxWidth: 540, width: '90%',
        background: isNight ? 'rgba(28, 28, 32, 0.85)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(36px) saturate(190%)', WebkitBackdropFilter: 'blur(36px) saturate(190%)',
        border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.85)',
        borderRadius: 36, padding: '32px 36px',
        boxShadow: isNight ? '0 24px 60px rgba(0,0,0,0.65)' : '0 20px 50px rgba(0,0,0,0.18)',
        color: isNight ? '#F5F5F7' : '#1D1D1F', pointerEvents: 'auto'
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px', margin: '0 0 14px 0', color: isNight ? '#0A84FF' : '#007AFF', display: 'flex', alignItems: 'center', gap: 10 }}>
          👋 Selamat Datang di GiverSource Sandbox v3.1
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: isNight ? '#98989D' : '#636366', margin: '0 0 24px 0' }}>
          Dunia kreatif interaktif bergaya Apple visionOS / macOS dengan fisika 3D, mode atmosfer siang/malam, material PBR berkelas, dan sintesis suara real-time.
        </p>

        <div style={{ display: 'grid', gap: 16, margin: '0 0 28px 0', fontSize: 13, lineHeight: 1.5 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>🖥️</span>
            <div><strong style={{ fontWeight: 600 }}>Drag atau Tap (Mobile/Touch):</strong> Tarik item dari Apple Dock bawah, atau tap item lalu ketuk area daratan untuk menaruh objek dengan mulus.</div>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>📐</span>
            <div><strong style={{ fontWeight: 600 }}>Snap Grid Presisi & Photo Mode:</strong> Aktifkan "Snap Grid" di header untuk menata objek kelipatan presisi, dan ambil foto HD tanpa elemen UI dengan klik tombol "Ambil Foto".</div>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>🔄</span>
            <div><strong style={{ fontWeight: 600 }}>Dynamic Transform Island:</strong> Klik objek yang ditaruh untuk memutar (-/+ 45°) atau mengatur skala dari kapsul atas.</div>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <div><strong style={{ fontWeight: 600 }}>PBR Materials & Dynamic Lighting:</strong> Saat mode Galaxy Malam, lampu taman dan api unggun memancarkan cahaya lokal dramatis ke sekitar objek!</div>
          </div>
        </div>

        <button onClick={() => {
          setShowTutorial(false);
          StorageEngine.setOnboarded(true);
          SoundEngine.playPop();
        }} style={{
          width: '100%', padding: '14px', borderRadius: 24,
          background: isNight ? '#0A84FF' : '#007AFF',
          border: 'none', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          boxShadow: isNight ? '0 8px 24px rgba(10, 132, 255, 0.45)' : '0 8px 24px rgba(0, 122, 255, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}>
          Mulai Membangun Dunia 🚀
        </button>
      </div>
    </div>
  );
}
