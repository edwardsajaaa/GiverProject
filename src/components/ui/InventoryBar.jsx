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
      position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: 'auto', maxWidth: '96vw',
      pointerEvents: 'auto'
    }}>
      {/* Keyframes Animasi Spring & Scrollbar Tersembunyi */}
      <style>{`
        .compact-dock-scroll::-webkit-scrollbar,
        .dock-outer-scroll::-webkit-scrollbar,
        *::-webkit-scrollbar { 
          display: none !important; 
          width: 0 !important; 
          height: 0 !important; 
          background: transparent !important;
        }
        .compact-dock-scroll,
        .dock-outer-scroll,
        * { 
          -ms-overflow-style: none !important; 
          scrollbar-width: none !important; 
        }

        .dock-item-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s ease, border-color 0.25s ease !important;
        }
        .dock-item-card:hover {
          transform: scale(1.15) translateY(-6px) !important;
        }
        .dock-item-card:active {
          transform: scale(0.95) translateY(0) !important;
        }
      `}</style>

      {/* Tombol Toggle Buka/Tutup Dock (Bersih, Rapi, Langsung 1-Klik tanpa dropdown karena kontrol expand grid sudah ada di dalam dock) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: inventoryOpen ? '0 0 8px 0' : '0', transition: 'margin 0.35s' }}>
        <button 
          onClick={() => { 
            setInventoryOpen(!inventoryOpen);
            SoundEngine.playClick(); 
          }} 
          style={{
            background: isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 8, padding: '4px 12px',
            color: isNight ? '#E5E5E5' : '#171717',
            fontWeight: 500, fontSize: 11, letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: 'none',
            transition: 'all 0.3s ease'
          }}
          title={inventoryOpen ? "Sembunyikan Dock" : "Buka Dock"}
        >
          <span>{inventoryOpen ? 'CLOSE DOCK' : 'OPEN DOCK'}</span>
          <span style={{ transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease', display: 'flex' }}>
            <IconChevronUp size={12} />
          </span>
        </button>
      </div>

      {/* Kontainer Dock Utama (Animasi Spring Mulus ala iOS/macOS saat Buka/Tutup & Expand/Collapse) */}
      <div className="dock-outer-scroll" style={{
        padding: inventoryOpen ? (inventoryExpanded ? '18px 22px' : '8px 16px') : '0px 16px',
        display: 'flex',
        flexDirection: inventoryExpanded ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: inventoryExpanded ? 16 : 12,
        width: inventoryExpanded ? 'min(700px, 92vw)' : 'min(580px, 68vw)',
        maxHeight: inventoryOpen ? (inventoryExpanded ? '65vh' : '85px') : '0px',
        opacity: inventoryOpen ? 1 : 0,
        transform: inventoryOpen ? 'translateY(0px) scale(1)' : 'translateY(48px) scale(0.82)',
        overflowY: inventoryExpanded ? 'auto' : 'visible',
        overflowX: 'visible',
        background: isNight ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: inventoryOpen ? (isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)') : '0px solid transparent',
        borderRadius: 12,
        boxShadow: inventoryOpen ? '0 4px 24px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.4s ease',
        pointerEvents: inventoryOpen ? 'auto' : 'none'
      }}>
        {/* macOS Dock Items Container */}
        <div className="compact-dock-scroll" style={{
          display: inventoryExpanded ? 'grid' : 'flex',
          gridTemplateColumns: inventoryExpanded ? 'repeat(auto-fill, minmax(68px, 1fr))' : 'none',
          alignItems: 'center',
          gap: inventoryExpanded ? 12 : 8,
          overflowX: inventoryExpanded ? 'visible' : 'auto',
          padding: '4px 2px',
          width: '100%',
          maxWidth: inventoryExpanded ? '100%' : 'min(580px, 68vw)',
          transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {inventory.map((itemType, idx) => {
            const item = ITEM_DEFS[itemType];
            const isActive = activePlacementType === itemType;
            return (
              <div
                key={idx}
                className="dock-item-card"
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
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: inventoryExpanded ? '6px 4px' : '2px 4px',
                  borderRadius: 8,
                  background: isActive ? (isNight ? '#E5E5E5' : '#171717') : 'transparent',
                  border: '1px solid transparent',
                  cursor: item ? 'grab' : 'default',
                  transform: isActive ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
                  flexShrink: 0
                }}
                title={`Place ${item ? item.label : itemType}`}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: isActive ? (isNight ? '#171717' : '#FAFAFA') : (isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'none',
                  color: isActive ? (isNight ? '#FAFAFA' : '#171717') : (isNight ? '#A3A3A3' : '#525252'),
                  transition: 'all 0.2s ease'
                }}>
                  {item ? React.cloneElement(item.icon, { size: 18 }) : null}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 500,
                  color: isActive ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#737373' : '#A3A3A3'),
                  textAlign: 'center', whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>
                  {item ? item.label : itemType}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pembatas Vertikal Ringkas di Mode Dock Biasa */}
        {!inventoryExpanded && (
          <div style={{
            width: 1, height: 36,
            background: isNight ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
            flexShrink: 0, margin: '0 2px',
            transition: 'opacity 0.3s'
          }} />
        )}

        {/* Dock Control Actions (Mode Hapus & Reset) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: inventoryExpanded ? 'flex-end' : 'center',
          gap: 8,
          borderTop: inventoryExpanded ? (isNight ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)') : 'none',
          paddingTop: inventoryExpanded ? 14 : 0,
          flexShrink: 0,
          transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Tombol mini shortcut Expand / Ringkas langsung di dock */}
          <button
            onClick={() => { setInventoryExpanded(!inventoryExpanded); SoundEngine.playClick(); }}
            title={inventoryExpanded ? "Kecilkan" : "Perbesar"}
            style={{
              padding: '4px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4,
              background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              color: isNight ? '#E5E5E5' : '#171717',
              border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
              fontWeight: 500, fontSize: 10, cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{inventoryExpanded ? '⬇' : '⛶'}</span>
          </button>

          <button
            onClick={() => { setDeleteMode(!deleteMode); setSelectedId(null); SoundEngine.playClick(); }}
            title={deleteMode ? "Matikan Mode Hapus" : "Aktifkan Mode Hapus"}
            style={{
              padding: '4px 10px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4,
              background: deleteMode ? '#ef4444' : (isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'),
              color: deleteMode ? '#FAFAFA' : (isNight ? '#E5E5E5' : '#171717'),
              border: deleteMode ? '1px solid #ef4444' : (isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
              fontWeight: 500, fontSize: 10, cursor: 'pointer', letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              boxShadow: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <IconTrash size={12} />
            <span>{deleteMode ? 'DEL: ON' : 'DELETE'}</span>
          </button>

          {!resetConfirm ? (
            <button onClick={() => setResetConfirm(true)} title="Reset semua objek di atas pulau" style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: '1px solid #ef4444',
              background: 'transparent', color: '#ef4444', fontWeight: 500, cursor: 'pointer', fontSize: 10, letterSpacing: '0.5px',
              transition: 'all 0.2s ease', whiteSpace: 'nowrap'
            }}>
              <IconReset size={12} /> RESET
            </button>
          ) : (
            <button onClick={handleResetAll} style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: 'none',
              background: '#ef4444', color: '#FAFAFA', fontWeight: 600, cursor: 'pointer', fontSize: 10, letterSpacing: '0.5px',
              transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              boxShadow: 'none'
            }}>
              <IconWarning size={12} /> SURE?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

