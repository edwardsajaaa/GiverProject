import React, { useState, useEffect } from 'react';
import { SecurityEngine } from '../../utils/securityEngine';
import { TornEdgeTop, TornEdgeBottom, WashiTape, BlackTape } from './TornPaper';

function compressImageFile(file, maxSize = 640, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar.'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsDataURL(file);
  });
}

export function EditPhotoModal({ isOpen, onClose, photo, onSave, isNew = false }) {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [tagLeft, setTagLeft] = useState('');
  const [tagRight, setTagRight] = useState('');
  const [tapeType, setTapeType] = useState('black');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl(photo?.url || '');
      setCaption(photo?.caption || '');
      setTagLeft(photo?.tagLeft || '');
      setTagRight(photo?.tagRight || '');
      setTapeType(photo?.tapeType || 'black');
      setError('');
    }
  }, [isOpen, photo]);

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = SecurityEngine.validateFile(file, {
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      maxSizeBytes: 10 * 1024 * 1024,
    });

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    try {
      setIsProcessing(true);
      setError('');
      const compressedDataUrl = await compressImageFile(file);
      setUrl(compressedDataUrl);
    } catch (err) {
      setError(err.message || 'Gagal memproses gambar.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setError('Silakan unggah foto atau masukkan tautan gambar terlebih dahulu.');
      return;
    }

    onSave({
      ...(photo || {}),
      id: photo?.id || Date.now(),
      url: cleanUrl,
      alt: SecurityEngine.sanitizeText(caption || 'Foto Kenangan', 80),
      caption: SecurityEngine.sanitizeText(caption || 'Momen indah bersama', 120),
      tagLeft: SecurityEngine.sanitizeText(tagLeft, 30) || undefined,
      tagRight: SecurityEngine.sanitizeText(tagRight, 30) || undefined,
      tapeType,
      rotate: typeof photo?.rotate === 'number'
        ? photo.rotate
        : Number(((Math.random() - 0.5) * 3.4).toFixed(1)),
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10005,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 2, 5, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '16px',
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          backgroundColor: '#FAF7F2',
          border: '2px solid #121212',
          padding: '22px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
          color: '#121212',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <TornEdgeTop color="#FAF7F2" fiberColor="#ffffff" height={12} />
        <TornEdgeBottom color="#FAF7F2" fiberColor="#ffffff" height={12} />
        <BlackTape top="-10px" left="24px" width="56px" rotate={-3} />
        <WashiTape top="-10px" left="calc(100% - 86px)" width="64px" rotate={3} color="rgba(255, 235, 215, 0.85)" />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '10px',
          marginBottom: '14px',
        }}>
          <div>
            <span style={{
              fontSize: '9px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#85101c',
              textTransform: 'uppercase',
              display: 'block',
            }}>
              {isNew ? '✦ TAMBAH FOTO BARU' : '✦ UBAH FOTO GALERI'}
            </span>
            <h3 style={{
              margin: '2px 0 0',
              fontSize: '20px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}>
              {isNew ? 'Tambah Kenangan' : 'Edit Foto & Keterangan'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              border: '1.5px solid #121212',
              backgroundColor: '#ffffff',
              color: '#121212',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '2px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{
              width: '84px',
              height: '108px',
              flexShrink: 0,
              border: '1.5px solid #121212',
              backgroundColor: '#f0e9df',
              padding: '4px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {url ? (
                <img
                  src={url}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <span style={{ fontSize: '10px', fontFamily: "'Montserrat', sans-serif", color: '#777', textAlign: 'center' }}>
                  Preview Foto
                </span>
              )}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: '#121212',
                color: '#ffffff',
                padding: '8px 12px',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: '1px',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}>
                <span>{isProcessing ? 'MEMPROSES...' : 'UNGGAH DARI PERANGKAT'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isProcessing}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="text"
                value={url.startsWith('data:') ? '' : url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="Atau tempel tautan gambar (https://...)"
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  border: '1px solid #121212',
                  backgroundColor: '#ffffff',
                  fontSize: '11px',
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: '10px', color: '#666', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.35 }}>
                Pakai tautan gambar (URL) jika ingin foto ikut terkirim melalui tautan bagikan.
              </span>
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '10px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '1px',
              color: '#85101c',
              marginBottom: '4px',
            }}>
              KETERANGAN / CAPTION
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Contoh: Momen paling berkesan bersama kamu"
              maxLength={120}
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1.5px solid #121212',
                backgroundColor: '#ffffff',
                fontSize: '12px',
                fontFamily: "'Montserrat', sans-serif",
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '9px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: '1px',
                color: '#555',
                marginBottom: '4px',
              }}>
                STIKER KIRI (OPSIONAL)
              </label>
              <input
                type="text"
                value={tagLeft}
                onChange={(e) => setTagLeft(e.target.value)}
                placeholder="Contoh: our story"
                maxLength={30}
                style={{
                  width: '100%',
                  padding: '7px 8px',
                  border: '1px solid #121212',
                  backgroundColor: '#ffffff',
                  fontSize: '11px',
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '9px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: '1px',
                color: '#555',
                marginBottom: '4px',
              }}>
                STIKER KANAN (OPSIONAL)
              </label>
              <input
                type="text"
                value={tagRight}
                onChange={(e) => setTagRight(e.target.value)}
                placeholder="Contoh: my favorite"
                maxLength={30}
                style={{
                  width: '100%',
                  padding: '7px 8px',
                  border: '1px solid #121212',
                  backgroundColor: '#ffffff',
                  fontSize: '11px',
                  fontFamily: "'Montserrat', sans-serif",
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '9px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '1px',
              color: '#555',
            }}>
              MODEL SELOTIP:
            </span>
            <button
              type="button"
              onClick={() => setTapeType('black')}
              style={{
                padding: '4px 10px',
                border: '1.5px solid #121212',
                backgroundColor: tapeType === 'black' ? '#121212' : '#ffffff',
                color: tapeType === 'black' ? '#ffffff' : '#121212',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Hitam
            </button>
            <button
              type="button"
              onClick={() => setTapeType('washi')}
              style={{
                padding: '4px 10px',
                border: '1.5px solid #121212',
                backgroundColor: tapeType === 'washi' ? '#85101c' : '#ffffff',
                color: tapeType === 'washi' ? '#ffffff' : '#121212',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Krem Washi
            </button>
          </div>

          {error && (
            <div style={{
              fontSize: '11px',
              fontFamily: "'Montserrat', sans-serif",
              color: '#c8102e',
              fontWeight: 600,
              backgroundColor: 'rgba(200, 16, 46, 0.08)',
              padding: '6px 10px',
              borderLeft: '3px solid #c8102e',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 14px',
                border: '1.5px solid #121212',
                backgroundColor: '#ffffff',
                color: '#121212',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: '1px',
                cursor: 'pointer',
              }}
            >
              BATAL
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: '#85101c',
                color: '#ffffff',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: '1.5px',
                cursor: isProcessing ? 'wait' : 'pointer',
              }}
            >
              {isNew ? '+ TAMBAHKAN FOTO' : 'SIMPAN PERUBAHAN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
