import React from 'react';
import { ITEM_DEFS } from '../objects/ItemDefs';

export function TransformToolbar({
  isNight,
  selectedId,
  handleRotateSelected,
  handleScaleSelected,
  handleDeleteSelected,
  draggingItem,
  activePlacementType,
  setActivePlacementType
}) {
  return (
    <>
      {/* 1. Apple Dynamic Island Transform Toolbar when an object is selected */}
      {selectedId && (
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 32,
          background: isNight ? 'rgba(28, 28, 32, 0.82)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: isNight ? '0 16px 40px rgba(0, 0, 0, 0.5)' : '0 12px 36px rgba(0, 0, 0, 0.12)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'auto'
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: isNight ? '#0A84FF' : '#007AFF' }}>Objek Terpilih:</span>
          <button onClick={() => handleRotateSelected(-Math.PI / 4)} title="Putar -45°" style={{
            padding: '6px 14px', borderRadius: 18, border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(58, 58, 60, 0.8)' : 'rgba(240, 240, 245, 0.9)', color: isNight ? '#F5F5F7' : '#1D1D1F', cursor: 'pointer', fontWeight: 600, fontSize: 12, transition: 'all 0.2s'
          }}>🔄 -45°</button>
          <button onClick={() => handleRotateSelected(Math.PI / 4)} title="Putar +45°" style={{
            padding: '6px 14px', borderRadius: 18, border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(58, 58, 60, 0.8)' : 'rgba(240, 240, 245, 0.9)', color: isNight ? '#F5F5F7' : '#1D1D1F', cursor: 'pointer', fontWeight: 600, fontSize: 12, transition: 'all 0.2s'
          }}>🔄 +45°</button>
          <button onClick={() => handleScaleSelected(-0.2)} title="Perkecil (-20%)" style={{
            padding: '6px 14px', borderRadius: 18, border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(58, 58, 60, 0.8)' : 'rgba(240, 240, 245, 0.9)', color: isNight ? '#F5F5F7' : '#1D1D1F', cursor: 'pointer', fontWeight: 600, fontSize: 12, transition: 'all 0.2s'
          }}>🔍 - Skala</button>
          <button onClick={() => handleScaleSelected(0.2)} title="Perbesar (+20%)" style={{
            padding: '6px 14px', borderRadius: 18, border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(58, 58, 60, 0.8)' : 'rgba(240, 240, 245, 0.9)', color: isNight ? '#F5F5F7' : '#1D1D1F', cursor: 'pointer', fontWeight: 600, fontSize: 12, transition: 'all 0.2s'
          }}>🔍 + Skala</button>
          <button onClick={handleDeleteSelected} style={{
            padding: '6px 14px', borderRadius: 18, border: '1px solid #FF3B30', background: 'rgba(255, 59, 48, 0.15)', color: '#FF3B30', cursor: 'pointer', fontWeight: 700, fontSize: 12, transition: 'all 0.2s'
          }}>🗑️ Hapus</button>
        </div>
      )}

      {/* 2. Dragging Drop Hint Banner */}
      {draggingItem && (
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderRadius: 32,
          background: '#007AFF', color: '#fff', fontWeight: 700, fontSize: 14,
          boxShadow: '0 12px 36px rgba(0, 122, 255, 0.45)', pointerEvents: 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}>
          <span>📦 Lepaskan <strong>{ITEM_DEFS[draggingItem]?.label}</strong> ke atas daratan untuk menaruh</span>
        </div>
      )}

      {/* 3. Touch Tap-to-Place Banner */}
      {activePlacementType && !draggingItem && (
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderRadius: 32,
          background: '#34C759', color: '#fff', fontWeight: 700, fontSize: 14,
          boxShadow: '0 12px 36px rgba(52, 199, 89, 0.45)', pointerEvents: 'auto',
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}>
          <span>💡 Mode Taruh Aktif: Ketuk area daratan untuk meletakkan <strong>{ITEM_DEFS[activePlacementType]?.label}</strong></span>
          <button onClick={() => setActivePlacementType(null)} style={{
            background: 'rgba(255, 255, 255, 0.25)', border: 'none', borderRadius: 14,
            color: '#fff', cursor: 'pointer', padding: '3px 10px', fontSize: 12, fontWeight: 800
          }}>✕ Batal</button>
        </div>
      )}
    </>
  );
}
