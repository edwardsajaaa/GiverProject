import React, { useState } from 'react';
import { SoundEngine } from '../../utils/SoundEngine';

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
      background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)',
      animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{
        background: isNight ? 'rgba(20, 24, 34, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 24, padding: '24px', width: 'min(400px, 90vw)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
        color: isNight ? '#F5F5F7' : '#1D1D1F'
      }}>
        <h2 style={{ marginTop: 0, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>💌</span> Tulis Pesan untuk Kado
        </h2>
        <p style={{ fontSize: 12, color: isNight ? '#94a3b8' : '#64748b', marginBottom: 20 }}>
          Siapapun yang meng-klik barang ini nanti akan bisa melihat pesan manismu.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 6, color: isNight ? '#38bdf8' : '#007AFF' }}>NAMA PENGIRIM</label>
            <input 
              autoFocus
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder="Cth: Budi"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 12,
                background: isNight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: isNight ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                color: isNight ? '#FFF' : '#000', outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 6, color: isNight ? '#38bdf8' : '#007AFF' }}>PESAN SINGKAT</label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tulis ucapan selamat atau pesan manismu di sini..."
              rows={3}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 12,
                background: isNight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: isNight ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                color: isNight ? '#FFF' : '#000', outline: 'none', resize: 'none',
                boxSizing: 'border-box', fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                flex: 1, padding: '12px', borderRadius: 14, border: 'none',
                background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                color: isNight ? '#FFF' : '#000', fontWeight: 700, cursor: 'pointer'
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              style={{
                flex: 2, padding: '12px', borderRadius: 14, border: 'none',
                background: isNight ? '#38bdf8' : '#007AFF', color: '#FFF', 
                fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(56,189,248,0.3)'
              }}
            >
              Kirim Kado 🎁
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
