import React, { useState, useEffect } from 'react';
import { SecurityEngine } from '../../utils/securityEngine';
import { TornScrap, WashiTape, BlackTape, EditorialButton } from './TornPaper';

const PASSCODE_HASH_KEY = 'giver_capsule_passcode_hash';
const PASSCODE_ENABLED_KEY = 'giver_capsule_lock_enabled';

export const LoveLockManager = {
  isLockEnabled() {
    try {
      const enabled = localStorage.getItem(PASSCODE_ENABLED_KEY);
      const hash = localStorage.getItem(PASSCODE_HASH_KEY);
      return enabled === 'true' && Boolean(hash);
    } catch {
      return false;
    }
  },

  async setPasscode(pin) {
    if (!pin || pin.length < 4) return false;
    const hash = await SecurityEngine.hashPasscode(pin);
    localStorage.setItem(PASSCODE_HASH_KEY, hash);
    localStorage.setItem(PASSCODE_ENABLED_KEY, 'true');
    return true;
  },

  removePasscode() {
    localStorage.removeItem(PASSCODE_HASH_KEY);
    localStorage.setItem(PASSCODE_ENABLED_KEY, 'false');
  },

  async verifyPasscode(inputPin) {
    // Check rate limit to prevent brute force
    const rateCheck = SecurityEngine.checkRateLimit('capsule_pin', 5, 30000);
    if (!rateCheck.allowed) {
      return { success: false, rateLimited: true, waitSeconds: rateCheck.waitSeconds };
    }

    const savedHash = localStorage.getItem(PASSCODE_HASH_KEY);
    if (!savedHash) return { success: true };

    const inputHash = await SecurityEngine.hashPasscode(inputPin);
    if (inputHash === savedHash) {
      SecurityEngine.resetRateLimit('capsule_pin');
      return { success: true };
    }

    return { success: false, rateLimited: false };
  }
};

export function LoveLockModal({ isOpen, onClose, onUnlocked, mode = 'unlock' }) {
  // mode: 'unlock' (prompt PIN to open) | 'setup' (set or change PIN)
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setErrorMsg('');
      setCooldown(0);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!isOpen) return null;

  const handleKeyPress = (digit) => {
    if (cooldown > 0) return;
    if (pin.length < 6) {
      setPin(prev => prev + digit);
      setErrorMsg('');
    }
  };

  const handleDelete = () => {
    if (cooldown > 0) return;
    setPin(prev => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleSubmit = async () => {
    if (cooldown > 0) return;
    if (pin.length < 4) {
      setErrorMsg('Masukkan minimal 4 digit PIN.');
      return;
    }

    setIsVerifying(true);
    if (mode === 'setup') {
      await LoveLockManager.setPasscode(pin);
      setIsVerifying(false);
      onClose();
      alert('🔒 Gembok Cinta berhasil diaktifkan dengan PIN rahasia!');
      return;
    }

    const result = await LoveLockManager.verifyPasscode(pin);
    setIsVerifying(false);

    if (result.success) {
      setPin('');
      onUnlocked();
    } else if (result.rateLimited) {
      setCooldown(result.waitSeconds);
      setErrorMsg(`Terlalu banyak percobaan! Mohon tunggu ${result.waitSeconds} detik.`);
    } else {
      setPin('');
      setErrorMsg('PIN salah! Harap masukkan tanggal atau kode yang benar.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(15, 2, 5, 0.88)',
      backdropFilter: 'blur(12px)',
      padding: '16px',
      fontFamily: "'Cormorant Garamond', serif",
    }}>
      {/* Torn Paper Scrapbook Lock Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '360px',
        backgroundColor: '#FAF7F2',
        border: '2px solid #121212',
        padding: '28px 24px 24px 24px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 4px 14px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        clipPath: 'polygon(0% 4px, 2% 0px, 98% 0px, 100% 4px, 99% 96%, 100% 100%, 1% 100%, 0% 96%)',
      }}>
        {/* Tape strips */}
        <WashiTape top="-10px" left="25px" width="70px" rotate={-3} color="rgba(255, 235, 205, 0.9)" />
        <BlackTape top="-8px" right="25px" width="60px" rotate={4} />

        {/* Padlock Icon with Torn Paper Aesthetic */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#121212',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#ffd700',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          marginBottom: '12px',
          border: '2px dashed rgba(255, 215, 0, 0.4)',
        }}>
          🔒
        </div>

        <p style={{
          margin: 0,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#a61324',
        }}>
          {mode === 'setup' ? '✦ ATUR GEMBOK CINTA ✦' : '✦ KAPSUL TERSIMPAN AMAN ✦'}
        </p>

        <h3 style={{
          margin: '6px 0',
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px',
          fontWeight: 700,
          color: '#121212',
        }}>
          {mode === 'setup' ? 'Buat PIN Rahasia' : 'Buka Kapsul Kita'}
        </h3>

        <p style={{
          margin: '0 0 16px',
          fontSize: '13px',
          color: '#555',
          fontStyle: 'italic',
        }}>
          {mode === 'setup' 
            ? 'Masukkan 4-6 digit (contoh: tanggal jadian / ulang tahun)' 
            : 'Hanya kamu yang tahu kuncinya... masukkan PIN cinta kita.'}
        </p>

        {/* PIN Indicators */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          margin: '10px 0 18px',
        }}>
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '2px solid #121212',
                backgroundColor: pin.length > idx ? '#a61324' : 'transparent',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: pin.length > idx ? 'scale(1.15)' : 'scale(1)',
                boxShadow: pin.length > idx ? '0 0 8px rgba(166, 19, 36, 0.4)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Error / Cooldown Message */}
        {errorMsg && (
          <div style={{
            fontSize: '11px',
            fontFamily: "'Montserrat', sans-serif",
            color: '#a61324',
            fontWeight: 700,
            marginBottom: '12px',
            padding: '4px 8px',
            backgroundColor: 'rgba(166, 19, 36, 0.08)',
            border: '1px dashed #a61324',
          }}>
            {errorMsg}
          </div>
        )}

        {/* Keypad 0-9 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          width: '100%',
          maxWidth: '240px',
          margin: '0 auto 16px',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              disabled={cooldown > 0 || isVerifying}
              style={{
                height: '42px',
                backgroundColor: '#fffdf9',
                border: '1.5px solid #121212',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#121212',
                cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
                clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 2px, 98% 98%, 100% 100%, 2% 100%, 0% 98%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#121212'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fffdf9'; e.currentTarget.style.color = '#121212'; }}
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            disabled={cooldown > 0}
            style={{
              height: '42px',
              backgroundColor: '#f4ebd9',
              border: '1.5px solid #121212',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#666',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            ⌫ HAPUS
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            disabled={cooldown > 0 || isVerifying}
            style={{
              height: '42px',
              backgroundColor: '#fffdf9',
              border: '1.5px solid #121212',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '16px',
              fontWeight: 700,
              color: '#121212',
              cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#121212'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fffdf9'; e.currentTarget.style.color = '#121212'; }}
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={cooldown > 0 || isVerifying || pin.length < 4}
            style={{
              height: '42px',
              backgroundColor: pin.length >= 4 ? '#a61324' : '#eee',
              border: '1.5px solid #121212',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              color: pin.length >= 4 ? '#fff' : '#888',
              cursor: pin.length >= 4 ? 'pointer' : 'not-allowed',
              letterSpacing: '1px',
            }}
          >
            ✓ BUKA
          </button>
        </div>

        {/* Modal Action Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          width: '100%',
          borderTop: '1px dashed #121212',
          paddingTop: '12px',
        }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                color: '#666',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              ✕ TUTUP
            </button>
          )}

          {mode === 'setup' && LoveLockManager.isLockEnabled() && (
            <button
              onClick={() => {
                LoveLockManager.removePasscode();
                onClose();
                alert('🔓 Gembok Cinta telah dinonaktifkan.');
              }}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                color: '#a61324',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              HAPUS PIN (BUKA GEMBOK)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
