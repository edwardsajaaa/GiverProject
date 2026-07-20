import React from 'react';
import { ITEM_DEFS } from '../objects/ItemDefs';

export function TransformToolbar({
  isNight,
  selectedId,
  transformMode,
  setTransformMode,
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
          background: isNight ? 'rgba(20, 20, 20, 0.45)' : 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: isNight ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)' : '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'auto'
        }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.5px', color: isNight ? '#A3A3A3' : '#525252' }}>SELECTED:</span>
          <button 
            onClick={() => setTransformMode('translate')} 
            title="Geser (T)" 
            style={{
              padding: '4px 12px', borderRadius: 16, border: 'none', 
              background: transformMode === 'translate' ? (isNight ? '#E5E5E5' : '#171717') : 'transparent', 
              color: transformMode === 'translate' ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#E5E5E5' : '#171717'), 
              cursor: 'pointer', fontWeight: 600, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
            }}>
            GESER
          </button>
          <button 
            onClick={() => setTransformMode('rotate')} 
            title="Putar (R)" 
            style={{
              padding: '4px 12px', borderRadius: 16, border: 'none', 
              background: transformMode === 'rotate' ? (isNight ? '#E5E5E5' : '#171717') : 'transparent', 
              color: transformMode === 'rotate' ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#E5E5E5' : '#171717'), 
              cursor: 'pointer', fontWeight: 600, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
            }}>
            PUTAR
          </button>
          <button 
            onClick={() => setTransformMode('scale')} 
            title="Skala (S)" 
            style={{
              padding: '4px 12px', borderRadius: 16, border: 'none', 
              background: transformMode === 'scale' ? (isNight ? '#E5E5E5' : '#171717') : 'transparent', 
              color: transformMode === 'scale' ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#E5E5E5' : '#171717'), 
              cursor: 'pointer', fontWeight: 600, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
            }}>
            SKALA
          </button>
          
          <div style={{ width: 1, height: 16, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', margin: '0 4px' }} />
          
          <button onClick={handleDeleteSelected} title="Hapus Objek (Del)" style={{
            padding: '4px 12px', borderRadius: 16, border: '1px solid rgba(239, 68, 68, 0.5)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontWeight: 600, fontSize: 11, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>DELETE</button>
        </div>
      )}

      {/* 2. Dragging Drop Hint Banner */}
      {draggingItem && (
        <div style={{
          position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '8px 20px', borderRadius: 12,
          background: isNight ? 'rgba(20, 20, 20, 0.45)' : 'rgba(255, 255, 255, 0.45)',
          color: isNight ? '#FFF' : '#171717', fontWeight: 600, fontSize: 11, letterSpacing: '0.5px',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: isNight ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)' : '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
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
          background: isNight ? 'rgba(20, 20, 20, 0.45)' : 'rgba(255, 255, 255, 0.45)',
          color: isNight ? '#FFF' : '#171717', fontWeight: 600, fontSize: 11, letterSpacing: '0.5px',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: isNight ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)' : '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
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
