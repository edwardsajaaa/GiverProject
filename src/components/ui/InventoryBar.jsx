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
            background: isNight ? 'rgba(24, 24, 28, 0.88)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 20, padding: '6px 18px',
            color: isNight ? '#38bdf8' : '#007AFF',
            fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: isNight ? '0 6px 18px rgba(0, 0, 0, 0.55)' : '0 6px 18px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title={inventoryOpen ? "Sembunyikan Dock Objek" : "Buka Dock Objek 3D"}
        >
          <span>📦 {inventoryOpen ? 'Tutup Dock Objek' : 'Buka Dock Objek (12)'}</span>
          <span style={{ transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex' }}>
            <IconChevronUp size={12} />
          </span>
        </button>
      </div>

      {/* Kontainer Dock Utama (Animasi Spring Mulus saat Buka/Tutup & Expand/Collapse) */}
      <div className="dock-outer-scroll" style={{
        padding: inventoryOpen ? (inventoryExpanded ? '18px 22px' : '8px 16px') : '0px',
        display: 'flex',
        flexDirection: inventoryExpanded ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: inventoryExpanded ? 16 : 12,
        width: inventoryOpen ? (inventoryExpanded ? 'min(700px, 92vw)' : 'auto') : '0px',
        maxHeight: inventoryOpen ? (inventoryExpanded ? '65vh' : '85px') : '0px',
        opacity: inventoryOpen ? 1 : 0,
        transform: inventoryOpen ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.92)',
        overflowY: inventoryExpanded ? 'auto' : 'visible',
        overflowX: 'visible',
        background: isNight ? 'rgba(20, 20, 26, 0.85)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(36px) saturate(210%)',
        WebkitBackdropFilter: 'blur(36px) saturate(210%)',
        border: inventoryOpen ? (isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(255, 255, 255, 0.9)') : 'none',
        borderRadius: inventoryExpanded ? 30 : 26,
        boxShadow: inventoryOpen ? (isNight ? '0 18px 54px rgba(0, 0, 0, 0.65)' : '0 16px 45px rgba(0, 0, 0, 0.14)') : 'none',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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
                  padding: inventoryExpanded ? '8px 4px' : '4px 6px',
                  borderRadius: 14,
                  background: isActive ? (isNight ? 'rgba(56, 189, 248, 0.24)' : 'rgba(0, 122, 255, 0.16)') : 'transparent',
                  border: isActive ? `1.5px solid ${isNight ? '#38bdf8' : '#007AFF'}` : '1.5px solid transparent',
                  cursor: item ? 'grab' : 'default',
                  transform: isActive ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                  flexShrink: 0
                }}
                title={`Taruh ${item ? item.label : itemType}`}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: isNight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? `0 4px 12px ${item.color}66` : 'none',
                  transition: 'box-shadow 0.3s'
                }}>
                  {item ? React.cloneElement(item.icon, { size: 22 }) : null}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: isActive ? (isNight ? '#38bdf8' : '#007AFF') : (isNight ? '#cbd5e1' : '#334155'),
                  textAlign: 'center', whiteSpace: 'nowrap',
                  letterSpacing: '-0.2px'
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
            title={inventoryExpanded ? "Kecilkan ke Baris Ringkas" : "Perbesar ke Mode Grid (12 Objek)"}
            style={{
              padding: '6px 10px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 4,
              background: isNight ? 'rgba(48, 48, 56, 0.85)' : 'rgba(238, 238, 242, 0.95)',
              color: isNight ? '#38bdf8' : '#007AFF',
              border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)',
              fontWeight: 700, fontSize: 11, cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{inventoryExpanded ? '⬇' : '⛶'}</span>
          </button>

          <button
            onClick={() => { setDeleteMode(!deleteMode); setSelectedId(null); SoundEngine.playClick(); }}
            title={deleteMode ? "Matikan Mode Hapus" : "Aktifkan Mode Hapus Objek"}
            style={{
              padding: '6px 12px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 5,
              background: deleteMode ? '#FF3B30' : (isNight ? 'rgba(48, 48, 56, 0.85)' : 'rgba(238, 238, 242, 0.95)'),
              color: deleteMode ? '#fff' : (isNight ? '#f1f5f9' : '#1e293b'),
              border: deleteMode ? '1px solid #FF3B30' : (isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)'),
              fontWeight: 600, fontSize: 11, cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
              boxShadow: deleteMode ? '0 4px 14px rgba(255, 59, 48, 0.4)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <IconTrash size={14} />
            <span>{deleteMode ? 'Hapus: ON' : 'Hapus'}</span>
          </button>

          {!resetConfirm ? (
            <button onClick={() => setResetConfirm(true)} title="Reset semua objek di atas pulau" style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 16, border: '1px solid #FF3B30',
              background: 'transparent', color: '#FF3B30', fontWeight: 600, cursor: 'pointer', fontSize: 11,
              transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)', whiteSpace: 'nowrap'
            }}>
              <IconReset size={14} /> Reset
            </button>
          ) : (
            <button onClick={handleResetAll} style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 16, border: 'none',
              background: '#dc2626', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 11,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.45)'
            }}>
              <IconWarning size={14} /> Yakin?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

