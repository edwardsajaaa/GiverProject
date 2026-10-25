import React from 'react';
import { ITEM_DEFS } from '../objects/ItemDefs';
import { WashiTape, BlackTape } from '../capsule/TornPaper';

export function TransformToolbar({
  isNight,
  selectedId,
  selectedObject,
  transformMode,
  setTransformMode,
  handleDeleteSelected,
  handleDuplicateSelected,
  handleUpdateSelectedStyle,
  draggingItem,
  activePlacementType,
  setActivePlacementType
}) {
  const btnStyle = (active) => ({
    padding: '4px 10px',
    border: active ? '1px solid #121212' : 'none',
    backgroundColor: active ? (isNight ? '#ffffff' : '#121212') : 'transparent',
    color: active ? (isNight ? '#121212' : '#ffffff') : (isNight ? '#f5f5f5' : '#121212'),
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '10px',
    letterSpacing: '1px',
    fontFamily: "'Montserrat', sans-serif",
    transition: 'all 0.2s',
    clipPath: active ? 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)' : 'none',
  });

  return (
    <>
      {/* 1. Torn Paper Transform Toolbar when an object is selected */}
      {selectedId && (
        <div style={{
          position: 'absolute', top: 78, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px',
          backgroundColor: isNight ? '#161616' : '#faf7f2',
          border: '1.5px solid #121212',
          clipPath: 'polygon(0% 2px, 2% 0px, 98% 0px, 100% 2px, 99% 98%, 100% 100%, 1% 100%, 0% 98%)',
          boxShadow: isNight ? '0 10px 30px rgba(0,0,0,0.6)' : '0 8px 24px rgba(74, 8, 18, 0.15)',
          transition: 'all 0.4s ease', pointerEvents: 'auto'
        }}>
          <WashiTape top="-8px" left="20px" width="50px" rotate={-3} color="rgba(255, 235, 215, 0.85)" />

          <span style={{ 
            fontSize: 10, 
            fontWeight: 800, 
            letterSpacing: '1px', 
            fontFamily: "'Montserrat', sans-serif",
            color: '#a61324' 
          }}>
            ✦ SELECTED:
          </span>

          <button 
            onClick={() => setTransformMode('translate')} 
            title="Geser (T)" 
            style={btnStyle(transformMode === 'translate')}>
            GESER
          </button>
          <button 
            onClick={() => setTransformMode('rotate')} 
            title="Putar (R)" 
            style={btnStyle(transformMode === 'rotate')}>
            PUTAR
          </button>
          <button 
            onClick={() => setTransformMode('scale')} 
            title="Skala (S)" 
            style={btnStyle(transformMode === 'scale')}>
            SKALA
          </button>

          <button 
            onClick={handleDuplicateSelected} 
            title="Duplikasi Objek (D)" 
            style={{
              padding: '4px 10px', border: '1px dashed #121212',
              backgroundColor: isNight ? '#262626' : '#fff',
              color: isNight ? '#f5f5f5' : '#121212',
              cursor: 'pointer', fontWeight: 800, fontSize: 10, letterSpacing: '1px',
              fontFamily: "'Montserrat', sans-serif",
            }}>
            DUPLIKAT
          </button>

          <select
            value={selectedObject?.artStyle || 'auto'}
            onChange={(e) => handleUpdateSelectedStyle && handleUpdateSelectedStyle(e.target.value)}
            title="Gaya Visual Objek"
            style={{
              padding: '4px 8px', border: '1px solid #121212',
              backgroundColor: isNight ? '#262626' : '#fff',
              color: isNight ? '#f5f5f5' : '#121212',
              cursor: 'pointer', fontWeight: 700, fontSize: 9, letterSpacing: '0.5px', outline: 'none',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <option value="auto" style={{ background: isNight ? '#1e1e1e' : '#fff', color: isNight ? '#fff' : '#000' }}>STYLE: AUTO</option>
            <option value="lowpoly" style={{ background: isNight ? '#1e1e1e' : '#fff', color: isNight ? '#fff' : '#000' }}>LOW-POLY</option>
            <option value="anime" style={{ background: isNight ? '#1e1e1e' : '#fff', color: isNight ? '#fff' : '#000' }}>ANIME TOON</option>
            <option value="retro_8bit" style={{ background: isNight ? '#1e1e1e' : '#fff', color: isNight ? '#fff' : '#000' }}>RETRO 8-BIT</option>
            <option value="synthwave" style={{ background: isNight ? '#1e1e1e' : '#fff', color: isNight ? '#fff' : '#000' }}>SYNTHWAVE</option>
            <option value="pbr" style={{ background: isNight ? '#1e1e1e' : '#fff', color: isNight ? '#fff' : '#000' }}>REALISTIC PBR</option>
          </select>
          
          <div style={{ width: 1, height: 16, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />
          
          <button 
            onClick={handleDeleteSelected} 
            title="Hapus Objek (Del)" 
            style={{
              padding: '4px 10px', border: '1.5px solid #121212',
              backgroundColor: '#c8102e', color: '#fff',
              cursor: 'pointer', fontWeight: 800, fontSize: 10, letterSpacing: '1px',
              fontFamily: "'Montserrat', sans-serif",
              clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
            }}
          >
            DELETE
          </button>
        </div>
      )}

      {/* 2. Dragging Drop Hint Banner (Torn Note) */}
      {draggingItem && (
        <div style={{
          position: 'absolute', top: 78, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 10, padding: '7px 18px',
          backgroundColor: '#FAF7F2',
          border: '1.5px solid #121212',
          color: '#121212', fontWeight: 800, fontSize: 10, letterSpacing: '1px',
          fontFamily: "'Montserrat', sans-serif",
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          clipPath: 'polygon(0% 2px, 2% 0px, 98% 0px, 100% 2px, 99% 98%, 100% 100%, 1% 100%, 0% 98%)',
        }}>
          <BlackTape top="-8px" left="25px" width="50px" rotate={-3} />
          <span>RELEASE <strong>{ITEM_DEFS[draggingItem]?.label}</strong> ON ISLAND TO PLACE</span>
        </div>
      )}

      {/* 3. Touch Tap-to-Place Banner (Torn Note) */}
      {activePlacementType && !draggingItem && (
        <div style={{
          position: 'absolute', top: 78, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 10, padding: '7px 18px',
          backgroundColor: '#FAF7F2',
          border: '1.5px solid #121212',
          color: '#121212', fontWeight: 800, fontSize: 10, letterSpacing: '1px',
          fontFamily: "'Montserrat', sans-serif",
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          clipPath: 'polygon(0% 2px, 2% 0px, 98% 0px, 100% 2px, 99% 98%, 100% 100%, 1% 100%, 0% 98%)',
        }}>
          <WashiTape top="-8px" left="25px" width="50px" rotate={2} color="rgba(255, 235, 215, 0.85)" />
          <span>TAP ISLAND TO PLACE <strong>{ITEM_DEFS[activePlacementType]?.label}</strong></span>
          <button 
            onClick={() => setActivePlacementType(null)} 
            style={{
              background: '#121212', border: 'none',
              color: '#fff', cursor: 'pointer', padding: '3px 8px', fontSize: 9, fontWeight: 800, letterSpacing: '1px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            CANCEL
          </button>
        </div>
      )}
    </>
  );
}
