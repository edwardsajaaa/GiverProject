import React, { useState } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div style={{
      position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: 'auto', maxWidth: '96vw',
      transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
      pointerEvents: 'auto'
    }}>
      {/* Sembunyikan scrollbar browser bawaan */}
      <style>{`
        .compact-dock-scroll::-webkit-scrollbar { display: none; }
        .compact-dock-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Satu Tombol Dropdown Utama & Menu Glassmorphism (Menggantikan 2 tombol terpisah sebelumnya) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0 6px 0' }}>
        <button 
          onClick={() => { 
            if (!inventoryOpen) {
              setInventoryOpen(true);
            } else {
              setDropdownOpen(!dropdownOpen);
            }
            SoundEngine.playClick(); 
          }} 
          style={{
            background: isNight ? 'rgba(24, 24, 28, 0.88)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            border: dropdownOpen ? (isNight ? '1px solid #38bdf8' : '1px solid #007AFF') : (isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.08)'),
            borderRadius: 18, padding: '5px 16px',
            color: isNight ? '#38bdf8' : '#007AFF',
            fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: dropdownOpen ? '0 6px 20px rgba(56, 189, 248, 0.3)' : (isNight ? '0 4px 14px rgba(0, 0, 0, 0.45)' : '0 4px 14px rgba(0, 0, 0, 0.08)'),
            transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          <span>📦 {inventoryOpen ? (inventoryExpanded ? 'Dock: Grid Semua (12)' : 'Dock: Baris Ringkas') : 'Buka Dock Objek (12)'}</span>
          <span style={{ transform: (inventoryOpen && dropdownOpen) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', display: 'flex' }}>
            <IconChevronUp size={12} />
          </span>
        </button>

        {/* Popup Dropdown Menu Glassmorphism */}
        {inventoryOpen && dropdownOpen && (
          <div style={{
            position: 'absolute', bottom: '100%', marginBottom: 8, left: '50%', transform: 'translateX(-50%)',
            background: isNight ? 'rgba(22, 22, 28, 0.95)' : 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 18, padding: 6,
            display: 'flex', flexDirection: 'column', gap: 4,
            boxShadow: isNight ? '0 16px 40px rgba(0, 0, 0, 0.75)' : '0 14px 36px rgba(0, 0, 0, 0.15)',
            zIndex: 50, minWidth: 220
          }}>
            <button
              onClick={() => { setInventoryExpanded(false); setDropdownOpen(false); SoundEngine.playClick(); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', borderRadius: 12, border: 'none',
                background: !inventoryExpanded ? (isNight ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0, 122, 255, 0.12)') : 'transparent',
                color: !inventoryExpanded ? (isNight ? '#38bdf8' : '#007AFF') : (isNight ? '#e2e8f0' : '#1e293b'),
                fontSize: 11, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.2s'
              }}
            >
              <span>➖ Mode Baris Ringkas</span>
              {!inventoryExpanded && <span>✓</span>}
            </button>

            <button
              onClick={() => { setInventoryExpanded(true); setDropdownOpen(false); SoundEngine.playClick(); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', borderRadius: 12, border: 'none',
                background: inventoryExpanded ? (isNight ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0, 122, 255, 0.12)') : 'transparent',
                color: inventoryExpanded ? (isNight ? '#38bdf8' : '#007AFF') : (isNight ? '#e2e8f0' : '#1e293b'),
                fontSize: 11, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.2s'
              }}
            >
              <span>⛶ Mode Grid Expand (12)</span>
              {inventoryExpanded && <span>✓</span>}
            </button>

            <div style={{ height: 1, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', margin: '2px 0' }} />

            <button
              onClick={() => { setInventoryOpen(false); setDropdownOpen(false); SoundEngine.playClick(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 12, border: 'none',
                background: 'transparent',
                color: '#FF3B30',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.2s'
              }}
            >
              <span>✕ Sembunyikan Dock</span>
            </button>
          </div>
        )}
      </div>

      {inventoryOpen && (
        <div style={{
          padding: inventoryExpanded ? '16px 20px' : '6px 14px',
          display: 'flex',
          flexDirection: inventoryExpanded ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: inventoryExpanded ? 14 : 12,
          width: inventoryExpanded ? 'min(700px, 92vw)' : 'auto',
          maxHeight: inventoryExpanded ? '60vh' : 'none',
          overflowY: inventoryExpanded ? 'auto' : 'visible',
          background: isNight ? 'rgba(20, 20, 26, 0.82)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.85)',
          borderRadius: inventoryExpanded ? 28 : 24,
          boxShadow: isNight ? '0 16px 48px rgba(0, 0, 0, 0.6)' : '0 14px 40px rgba(0, 0, 0, 0.12)',
          transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}>
          {/* macOS Dock Items Container (Tanpa Scrollbar Abu-Abu) */}
          <div className="compact-dock-scroll" style={{
            display: inventoryExpanded ? 'grid' : 'flex',
            gridTemplateColumns: inventoryExpanded ? 'repeat(auto-fill, minmax(68px, 1fr))' : 'none',
            alignItems: 'center',
            gap: inventoryExpanded ? 10 : 8,
            overflowX: inventoryExpanded ? 'visible' : 'auto',
            padding: '2px',
            width: '100%',
            maxWidth: inventoryExpanded ? '100%' : 'min(580px, 68vw)'
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
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: inventoryExpanded ? '8px 4px' : '4px 6px',
                    borderRadius: 14,
                    background: isActive ? (isNight ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0, 122, 255, 0.15)') : 'transparent',
                    border: isActive ? `1.5px solid ${isNight ? '#38bdf8' : '#007AFF'}` : '1.5px solid transparent',
                    cursor: item ? 'grab' : 'default',
                    transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    transform: isActive ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
                    flexShrink: 0
                  }}
                  title={`Taruh ${item ? item.label : itemType}`}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 11,
                    background: isNight ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isActive ? `0 3px 10px ${item.color}55` : 'none',
                    transition: 'all 0.25s'
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
              width: 1, height: 34,
              background: isNight ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.1)',
              flexShrink: 0, margin: '0 2px'
            }} />
          )}

          {/* Dock Control Actions (Mode Hapus & Reset) - Sangat Compact */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: inventoryExpanded ? 'flex-end' : 'center',
            gap: 8,
            borderTop: inventoryExpanded ? (isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)') : 'none',
            paddingTop: inventoryExpanded ? 12 : 0,
            flexShrink: 0
          }}>
            {/* Tombol mini shortcut Expand / Ringkas langsung di dock */}
            <button
              onClick={() => { setInventoryExpanded(!inventoryExpanded); SoundEngine.playClick(); }}
              title={inventoryExpanded ? "Kecilkan ke Baris Ringkas" : "Perbesar ke Mode Grid (12 Objek)"}
              style={{
                padding: '6px 10px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 4,
                background: isNight ? 'rgba(48, 48, 56, 0.8)' : 'rgba(238, 238, 242, 0.9)',
                color: isNight ? '#38bdf8' : '#007AFF',
                border: isNight ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(0, 0, 0, 0.06)',
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
                background: deleteMode ? '#FF3B30' : (isNight ? 'rgba(48, 48, 56, 0.8)' : 'rgba(238, 238, 242, 0.9)'),
                color: deleteMode ? '#fff' : (isNight ? '#f1f5f9' : '#1e293b'),
                border: deleteMode ? '1px solid #FF3B30' : (isNight ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(0, 0, 0, 0.06)'),
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
      )}
    </div>
  );
}

