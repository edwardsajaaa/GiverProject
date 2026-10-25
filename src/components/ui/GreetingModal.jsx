import React, { useState } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';
import { WashiTape, BlackTape } from '../capsule/TornPaper';

export function GreetingModal({ isNight, pendingGreeting, setPendingGreeting, setPlacedObjects }) {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  if (!pendingGreeting) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalObject = {
      ...pendingGreeting,
      senderName: senderName.trim() || 'Seseorang',
      message: message.trim() || 'Semoga harimu menyenangkan!',
    };
    
    setPlacedObjects(prev => [...prev, finalObject]);
    setPendingGreeting(null);
    setSenderName('');
    setMessage('');
    SoundEngine.playPop();
  };

  const handleCancel = () => {
    setPendingGreeting(null);
    setSenderName('');
    setMessage('');
    SoundEngine.playClick();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 120,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Torn Paper Greeting Card Sheet */}
      <div style={{
        position: 'relative',
        backgroundColor: isNight ? '#161616' : '#FAF7F2',
        border: '2px solid #121212',
        padding: '28px 24px 24px 24px', width: 'min(420px, 90vw)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 4px 10px rgba(0,0,0,0.4)',
        color: isNight ? '#F5F5F7' : '#121212',
        clipPath: 'polygon(0% 4px, 1.5% 0px, 98.5% 0px, 100% 4px, 99.5% 96%, 100% 100%, 0.5% 100%, 0% 96%)',
        fontFamily: "'Cormorant Garamond', serif",
      }}>
        <WashiTape top="-8px" left="25px" width="60px" rotate={-2} color="rgba(255, 235, 215, 0.85)" />
        <BlackTape top="-6px" right="25px" width="55px" rotate={3} />

        <h2 style={{ 
          marginTop: 0, 
          fontSize: 20, 
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          borderBottom: '1.5px solid #121212',
          paddingBottom: '8px',
        }}>
          <span>💌</span> Tulis Pesan untuk Kado
        </h2>
        <p style={{ 
          fontSize: 11, 
          fontFamily: "'Montserrat', sans-serif",
          color: isNight ? '#94a3b8' : '#64748b', 
          marginBottom: 16 
        }}>
          Pesan manis ini akan tersimpan di dalam objek dan bisa dibaca saat diklik.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 10, 
              fontWeight: 800, 
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: 4, 
              letterSpacing: '1px',
              color: '#a61324' 
            }}>
              NAMA PENGIRIM
            </label>
            <input 
              autoFocus
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder="Contoh: Dari Sayangku..."
              style={{
                width: '100%', boxSizing: 'border-box', padding: '9px 12px',
                border: '1.5px solid #121212',
                backgroundColor: isNight ? '#222' : '#fff',
                color: isNight ? '#fff' : '#000',
                fontFamily: "'Montserrat', sans-serif", fontSize: 12, outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 10, 
              fontWeight: 800, 
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: 4, 
              letterSpacing: '1px',
              color: '#a61324' 
            }}>
              ISI PESAN ROMANTIS
            </label>
            <textarea 
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan atau kenangan indah kalian di sini..."
              style={{
                width: '100%', boxSizing: 'border-box', padding: '9px 12px',
                border: '1.5px solid #121212',
                backgroundColor: isNight ? '#222' : '#fff',
                color: isNight ? '#fff' : '#000',
                fontFamily: "'Cormorant Garamond', serif", fontSize: 15, lineHeight: 1.4, outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '8px 14px', border: '1px solid #121212',
                background: 'transparent',
                color: isNight ? '#aaa' : '#555',
                cursor: 'pointer', fontSize: 10, fontWeight: 800, letterSpacing: '1px',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              BATAL
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px', border: 'none',
                backgroundColor: '#121212', color: '#fff',
                cursor: 'pointer', fontSize: 10, fontWeight: 800, letterSpacing: '1px',
                fontFamily: "'Montserrat', sans-serif",
                clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
                boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
              }}
            >
              SIMPAN KADO ➔
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
