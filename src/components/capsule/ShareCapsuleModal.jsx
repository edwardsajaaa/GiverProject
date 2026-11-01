import React, { useState } from 'react';
import { CapsuleShareEngine } from '../../utils/capsuleShareEngine';
import { TornEdgeTop, TornEdgeBottom, WashiTape, BlackTape } from './TornPaper';

export function ShareCapsuleModal({ isOpen, onClose, capsuleData, onUpdateData }) {
  if (!isOpen) return null;

  const [sender, setSender] = useState(capsuleData.sender || 'Alex');
  const [recipient, setRecipient] = useState(capsuleData.recipient || 'Sarah');
  const [copied, setCopied] = useState(false);

  const currentData = {
    ...capsuleData,
    sender,
    recipient,
  };

  const shareLink = CapsuleShareEngine.generateShareLink(currentData);
  const waShareUrl = CapsuleShareEngine.generateWhatsAppShareUrl(currentData, shareLink);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareLink);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      // Save changes to parent state & localStorage
      onUpdateData({ sender, recipient });
      CapsuleShareEngine.saveLocalData(currentData);
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  const handleApplyChanges = () => {
    onUpdateData({ sender, recipient });
    CapsuleShareEngine.saveLocalData(currentData);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      backgroundColor: 'rgba(10, 2, 4, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      userSelect: 'none',
      animation: 'fadeIn 0.25s ease forwards',
    }}>
      {/* Modal Card with Torn Paper Edges */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FAF7F2',
          backgroundImage: `
            linear-gradient(rgba(235, 227, 215, 0.45) 1px, transparent 1px),
            radial-gradient(#eee4d6 15%, transparent 16%)
          `,
          backgroundSize: '100% 24px, 4px 4px',
          padding: '28px 24px 28px 24px',
          borderLeft: '2px solid #121212',
          borderRight: '2px solid #121212',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 4px 15px rgba(0,0,0,0.3)',
          fontFamily: "'Cormorant Garamond', serif",
          color: '#121212',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <TornEdgeTop color="#FAF7F2" fiberColor="#ffffff" height={16} />
        <TornEdgeBottom color="#FAF7F2" fiberColor="#ffffff" height={16} />
        <BlackTape top="-10px" left="35px" width="70px" rotate={-3} />
        <WashiTape top="-10px" left="calc(100% - 95px)" rotate={3} width="70px" color="rgba(255, 225, 205, 0.85)" />

        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '8px',
          marginBottom: '16px',
        }}>
          <div>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#85101c',
            }}>
              ✦ SPECIAL DELIVERY
            </span>
            <h2 style={{
              margin: '2px 0 0',
              fontFamily: "'Pinyon Script', cursive",
              fontSize: '32px',
              fontWeight: 400,
              color: '#121212',
              lineHeight: 1.1,
            }}>
              Share Your Love Capsule
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#121212',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>

        <p style={{
          fontSize: '14px',
          lineHeight: 1.5,
          color: '#444',
          margin: '0 0 16px',
        }}>
          Atur nama pengirim dan penerima, lalu bagikan tautan ini. Pasanganmu akan menerima amplop & surat cinta khusus yang dipersonalisasi!
        </p>

        {/* Sender & Recipient Inputs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: '4px',
            }}>
              Nama Pengirim (Kamu):
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => {
                setSender(e.target.value);
                handleApplyChanges();
              }}
              placeholder="Contoh: Alex"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1.5px solid #121212',
                backgroundColor: '#fff',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#85101c',
              marginBottom: '4px',
            }}>
              Nama Penerima (Pasangan):
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                handleApplyChanges();
              }}
              placeholder="Contoh: Sarah"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1.5px solid #85101c',
                backgroundColor: '#fff',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#85101c',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div style={{
          backgroundColor: '#f2ece1',
          border: '1px dashed #121212',
          padding: '12px 14px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '28px' }}>💌</span>
          <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
            <div><strong>Untuk:</strong> <span style={{ color: '#85101c' }}>{recipient || '(Nama Penerima)'}</span></div>
            <div><strong>Dari:</strong> {sender || '(Nama Pengirim)'}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
              ✦ Penerima akan melihat pesan *"For {recipient || 'You'}, from {sender || 'Me'}"*
            </div>
          </div>
        </div>

        {/* Shareable Link Box */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#666',
            marginBottom: '4px',
          }}>
            Tautan Kapsul Khusus (Shareable URL):
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              readOnly
              value={shareLink}
              style={{
                flex: 1,
                padding: '8px 10px',
                border: '1px solid rgba(0,0,0,0.2)',
                backgroundColor: '#fff',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                color: '#444',
                outline: 'none',
              }}
            />
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: copied ? '#10b981' : '#121212',
                color: '#fff',
                border: 'none',
                padding: '8px 14px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {copied ? '✓ TERSALIN!' : 'SALIN LINK'}
            </button>
          </div>
        </div>

        {/* WhatsApp Share Button */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyChanges}
            style={{
              flex: 1,
              backgroundColor: '#25D366',
              color: '#fff',
              border: 'none',
              padding: '10px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            <span>KIRIM KE WHATSAPP 📲</span>
          </a>

          <button
            onClick={() => {
              handleApplyChanges();
              window.open(shareLink, '_blank');
            }}
            style={{
              backgroundColor: '#85101c',
              color: '#fff',
              border: 'none',
              padding: '10px 14px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            PRATINJAU LINK ↗
          </button>
        </div>
      </div>
    </div>
  );
}
