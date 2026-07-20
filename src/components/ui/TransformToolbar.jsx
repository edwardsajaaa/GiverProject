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
          background: isNight ? 'rgba(20, 20, 20, 0.85)' : 'rgba(250, 250, 250, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: isNight ? '0 10px 40px rgba(0, 0, 0, 0.5)' : '0 10px 40px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'auto'
        }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.5px', color: isNight ? '#A3A3A3' : '#525252' }}>SELECTED:</span>
          <button onClick={() => handleRotateSelected(-Math.PI / 4)} title="Putar -45°" style={{
            padding: '4px 10px', borderRadius: 6, border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', color: isNight ? '#E5E5E5' : '#171717', cursor: 'pointer', fontWeight: 500, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>-45°</button>
          <button onClick={() => handleRotateSelected(Math.PI / 4)} title="Putar +45°" style={{
            padding: '4px 10px', borderRadius: 6, border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', color: isNight ? '#E5E5E5' : '#171717', cursor: 'pointer', fontWeight: 500, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>+45°</button>
          <button onClick={() => handleScaleSelected(-0.2)} title="Perkecil (-20%)" style={{
            padding: '4px 10px', borderRadius: 6, border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', color: isNight ? '#E5E5E5' : '#171717', cursor: 'pointer', fontWeight: 500, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>- SCALE</button>
          <button onClick={() => handleScaleSelected(0.2)} title="Perbesar (+20%)" style={{
            padding: '4px 10px', borderRadius: 6, border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)', background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)', color: isNight ? '#E5E5E5' : '#171717', cursor: 'pointer', fontWeight: 500, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>+ SCALE</button>
          <button onClick={handleDeleteSelected} style={{
            padding: '4px 10px', borderRadius: 6, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontWeight: 500, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>DELETE</button>
        </div>
      )}

      {/* 2. Dragging Drop Hint Banner */}
      {draggingItem && (
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '8px 20px', borderRadius: 12,
          background: isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.8)',
          color: isNight ? '#FFF' : '#FFF', fontWeight: 500, fontSize: 12, letterSpacing: '0.5px',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)', pointerEvents: 'none',
          transition: 'all 0.4s ease'
        }}>
          <span>RELEASE <strong>{ITEM_DEFS[draggingItem]?.label}</strong> ON GROUND TO PLACE</span>
        </div>
      )}

      {/* 3. Touch Tap-to-Place Banner */}
      {activePlacementType && !draggingItem && (
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '8px 20px', borderRadius: 12,
          background: isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.8)',
          color: isNight ? '#FFF' : '#FFF', fontWeight: 500, fontSize: 12, letterSpacing: '0.5px',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)', pointerEvents: 'auto',
          transition: 'all 0.4s ease'
        }}>
          <span>TAP GROUND TO PLACE <strong>{ITEM_DEFS[activePlacementType]?.label}</strong></span>
          <button onClick={() => setActivePlacementType(null)} style={{
            background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 4,
            color: '#fff', cursor: 'pointer', padding: '2px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '0.5px'
          }}>CANCEL</button>
        </div>
      )}
    </>
  );
}
