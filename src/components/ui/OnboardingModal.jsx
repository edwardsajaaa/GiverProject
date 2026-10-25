import React from 'react';
import { StorageEngine } from '../../utils/storageEngine';
import { SoundEngine } from '../../utils/SoundEngine';
import { WashiTape, BlackTape } from '../capsule/TornPaper';

export function OnboardingModal({ isNight, showTutorial, setShowTutorial }) {
  if (!showTutorial) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* Torn Paper Scrapbook Guide Sheet */}
      <div style={{
        position: 'relative',
        maxWidth: 540, width: '90%',
        backgroundColor: isNight ? '#161616' : '#FAF7F2',
        border: '2px solid #121212',
        padding: '32px 36px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.4)',
        color: isNight ? '#F5F5F7' : '#121212', 
        pointerEvents: 'auto',
        fontFamily: "'Cormorant Garamond', serif",
        clipPath: 'polygon(0% 4px, 1.5% 0px, 98.5% 0px, 100% 4px, 99.5% 96%, 100% 100%, 0.5% 100%, 0% 96%)',
      }}>
        <WashiTape top="-8px" left="25px" width="70px" rotate={-3} color="rgba(255, 235, 215, 0.85)" />
        <BlackTape top="-6px" right="25px" width="60px" rotate={2} />

        <h2 style={{ 
          fontSize: 22, 
          fontWeight: 700, 
          fontFamily: "'Playfair Display', serif",
          margin: '0 0 8px 0', 
          color: isNight ? '#fff' : '#121212', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 10,
          borderBottom: '1.5px solid #121212',
          paddingBottom: '10px',
        }}>
          💌 Panduan Pulau Kenangan Kita
        </h2>
        <p style={{ 
          fontSize: 12, 
          lineHeight: 1.6, 
          fontFamily: "'Montserrat', sans-serif",
          color: isNight ? '#aaa' : '#555', 
          margin: '0 0 20px 0' 
        }}>
          Diorama 3D ini adalah semesta rahasia kenangan Anda berdua. Anda bebas menata pulau cinta, mengubah tema dunia, dan menambahkan objek bersama.
        </p>

        <div style={{ display: 'grid', gap: 14, margin: '0 0 24px 0', fontSize: 12, lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif" }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>🎨</span>
            <div><strong style={{ fontWeight: 800 }}>Palet Objek Bawah:</strong> Tarik atau ketuk item dari palet kertas bawah, lalu klik di atas tanah pulau untuk meletakkan dekorasi kenangan.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>📐</span>
            <div><strong style={{ fontWeight: 800 }}>Snap Grid & Foto Polaroid:</strong> Aktifkan "SNAP" di menu atas untuk merapikan posisi, dan gunakan tombol "FOTO" untuk mengabadikan sudut pulau terindah.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>🔄</span>
            <div><strong style={{ fontWeight: 800 }}>Transform Toolbar:</strong> Klik objek di pulau untuk memutar, menggeser, atau menduplikasi objek.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16 }}>🌙</span>
            <div><strong style={{ fontWeight: 800 }}>Siang & Malam Romantis:</strong> Ubah suasana dari siang yang cerah menjadi malam bertabur bintang dengan pencahayaan hangat.</div>
          </div>
        </div>

        <button 
          onClick={() => {
            setShowTutorial(false);
            StorageEngine.setOnboarded(true);
            SoundEngine.playPop();
          }} 
          style={{
            width: '100%', 
            padding: '12px',
            backgroundColor: '#121212',
            border: 'none', 
            color: '#fff', 
            fontSize: 12, 
            fontWeight: 800, 
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
            clipPath: 'polygon(0% 2px, 2% 0%, 98% 0%, 100% 2px, 99% 98%, 100% 100%, 1% 100%, 0% 98%)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a61324'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#121212'}
        >
          ✦ MULAI JELAJAHI PULAU KITA ✦
        </button>
      </div>
    </div>
  );
}
