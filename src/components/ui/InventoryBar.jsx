import React from 'react';
import { 
  IconChevronUp, IconTrash, IconReset, IconWarning 
} from '../icons/SvgIcons';
import { ITEM_DEFS } from '../objects/ItemDefs';
import { SoundEngine } from '../../utils/SoundEngine';

export function InventoryBar({
  isNight,
  inventoryOpen, setInventoryOpen,
  inventoryExpanded, setInventoryExpanded,
  inventory,
  activePlacementType, setActivePlacementType,
  handleDragStart, handleDragEnd,
  deleteMode, setDeleteMode,
  setSelectedId,
  resetConfirm, setResetConfirm,
  handleResetAll
}) {
  return (
    <div style={{
      position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: 'auto', maxWidth: '94%',
      transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
      pointerEvents: 'auto'
    }}>
      {/* Toggle Dock Button & Expand/Unexpand Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 10px 0', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => { setInventoryOpen(!inventoryOpen); SoundEngine.playClick(); }} style={{
          background: isNight ? 'rgba(28, 28, 32, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(190%)',
          WebkitBackdropFilter: 'blur(20px) saturate(190%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.8)',
          borderRadius: 20, padding: '6px 18px',
          color: isNight ? '#0A84FF' : '#007AFF',
          fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: isNight ? '0 6px 20px rgba(0, 0, 0, 0.4)' : '0 6px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}>
          <span>{inventoryOpen ? 'Tutup Dock Item' : 'Buka Dock Item'}</span>
          <span style={{ transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><IconChevronUp /></span>
        </button>

        {inventoryOpen && (
          <button onClick={() => { setInventoryExpanded(!inventoryExpanded); SoundEngine.playClick(); }} style={{
            background: inventoryExpanded ? (isNight ? '#0A84FF' : '#007AFF') : (isNight ? 'rgba(44, 44, 50, 0.85)' : 'rgba(240, 240, 245, 0.9)'),
            backdropFilter: 'blur(20px) saturate(190%)',
            border: inventoryExpanded ? 'none' : (isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.08)'),
            borderRadius: 20, padding: '6px 18px',
            color: inventoryExpanded ? '#ffffff' : (isNight ? '#F5F5F7' : '#1D1D1F'),
            fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: inventoryExpanded ? '0 6px 20px rgba(10, 132, 255, 0.4)' : '0 4px 12px rgba(0,0,0,0.06)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }} title={inventoryExpanded ? "Kecilkan dock ke mode ringkas" : "Perbesar dock untuk melihat semua 12 bentuk objek 3D"}>
            <span>{inventoryExpanded ? '⬇ Ringkas (Unexpand)' : '⛶ Expand Semua Objek (12)'}</span>
          </button>
        )}
      </div>

      {inventoryOpen && (
        <div style={{
          padding: inventoryExpanded ? '20px 24px' : '14px 24px',
          display: 'flex',
          flexDirection: inventoryExpanded ? 'column' : 'row',
          alignItems: inventoryExpanded ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: inventoryExpanded ? 18 : 24,
          width: inventoryExpanded ? 'min(760px, 92vw)' : 'auto',
          maxHeight: inventoryExpanded ? '62vh' : 'none',
          overflowY: inventoryExpanded ? 'auto' : 'visible',
          background: isNight ? 'rgba(28, 28, 32, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(36px) saturate(190%)',
          WebkitBackdropFilter: 'blur(36px) saturate(190%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.85)',
          borderRadius: 36,
          boxShadow: isNight ? '0 24px 60px rgba(0, 0, 0, 0.65)' : '0 20px 50px rgba(0, 0, 0, 0.14)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}>
          {/* macOS Dock App Icon Slots / visionOS Grid */}
          <div style={{
            display: inventoryExpanded ? 'grid' : 'flex',
            gridTemplateColumns: inventoryExpanded ? 'repeat(auto-fill, minmax(76px, 1fr))' : 'none',
            alignItems: 'center',
            gap: 14,
            overflowX: inventoryExpanded ? 'visible' : 'auto',
            padding: '4px 2px',
            width: '100%',
            maxWidth: inventoryExpanded ? '100%' : '65vw'
          }}>
            {inventory.map((itemType, idx) => {
              const item = ITEM_DEFS[itemType];
              const isActive = activePlacementType === itemType;
              return (
                <div
                  key={idx}
                  draggable={!!item}
                  onDragStart={(e) => item && handleDragStart(e, itemType)}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    if (item) {
                      setActivePlacementType(itemType);
                      SoundEngine.playClick();
                    }
                  }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: inventoryExpanded ? '10px 6px' : '8px 10px',
                    borderRadius: 18,
                    background: isActive ? (isNight ? 'rgba(10, 132, 255, 0.25)' : 'rgba(0, 122, 255, 0.15)') : 'transparent',
                    border: isActive ? `1.5px solid ${isNight ? '#0A84FF' : '#007AFF'}` : '1.5px solid transparent',
                    cursor: item ? 'grab' : 'default',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: isNight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isActive ? `0 4px 14px ${item.color}66` : 'none',
                    transition: 'box-shadow 0.3s'
                  }}>
                    {item ? item.icon : null}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: isActive ? (isNight ? '#0A84FF' : '#007AFF') : (isNight ? '#E5E5EA' : '#3A3A3C'),
                    textAlign: 'center', whiteSpace: 'nowrap'
                  }}>
                    {item ? item.label : itemType}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dock Actions (Delete Mode & Reset) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: inventoryExpanded ? 'flex-end' : 'flex-start',
            gap: 10,
            borderTop: inventoryExpanded ? (isNight ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)') : 'none',
            paddingTop: inventoryExpanded ? 14 : 0,
            flexShrink: 0
          }}>
            <button
              onClick={() => { setDeleteMode(!deleteMode); setSelectedId(null); SoundEngine.playClick(); }}
              style={{
                padding: '10px 18px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 6,
                background: deleteMode ? '#FF3B30' : (isNight ? 'rgba(58, 58, 60, 0.8)' : 'rgba(240, 240, 245, 0.9)'),
                color: deleteMode ? '#fff' : (isNight ? '#F5F5F7' : '#1D1D1F'),
                border: deleteMode ? '1px solid #FF3B30' : (isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)'),
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                boxShadow: deleteMode ? '0 6px 20px rgba(255, 59, 48, 0.4)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              <IconTrash size={16} />
              <span>{deleteMode ? 'Mode Hapus: AKTIF' : 'Mode Hapus: OFF'}</span>
            </button>

            {!resetConfirm ? (
              <button onClick={() => setResetConfirm(true)} title="Reset semua objek di atas pulau" style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 24, border: '1px solid #FF3B30',
                background: 'transparent', color: '#FF3B30', fontWeight: 600, cursor: 'pointer', fontSize: 13,
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', whiteSpace: 'nowrap'
              }}>
                <IconReset size={16} /> Reset Semua
              </button>
            ) : (
              <button onClick={handleResetAll} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 30, border: 'none',
                background: '#dc2626', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 13,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', whiteSpace: 'nowrap'
              }}>
                <IconWarning size={16} /> Yakin? (3s)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
