import React from 'react';
import { 
  IconChevronUp, IconTrash, IconReset, IconWarning 
} from '../icons/SvgIcons';
import { ITEM_DEFS } from '../objects/ItemDefs';
import { SoundEngine } from '../../utils/SoundEngine';
import { BlackTape, WashiTape } from '../capsule/TornPaper';

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
      position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: 'auto', maxWidth: '96vw',
      pointerEvents: 'auto'
    }}>
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
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, border-color 0.2s ease !important;
        }
        .dock-item-card:hover {
          transform: scale(1.1) translateY(-4px) !important;
        }
        .dock-item-card:active {
          transform: scale(0.95) translateY(0) !important;
        }
      `}</style>

      {/* Torn Paper Ticket Toggle Button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: inventoryOpen ? '0 0 8px 0' : '0', transition: 'margin 0.35s' }}>
        <button 
          onClick={() => { 
            setInventoryOpen(!inventoryOpen);
            SoundEngine.playClick(); 
          }} 
          style={{
            position: 'relative',
            backgroundColor: isNight ? '#161616' : '#faf7f2',
            border: '1.5px solid #121212',
            padding: '5px 18px',
            color: isNight ? '#f5f5f5' : '#121212',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '10px',
            letterSpacing: '1.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 2px, 98% 98%, 100% 100%, 2% 100%, 0% 98%)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            transition: 'all 0.2s ease',
          }}
          title={inventoryOpen ? "Tutup Palet Objek" : "Buka Palet Objek"}
        >
          <span>{inventoryOpen ? '✦ CLOSE PALETTE ✦' : '✦ OPEN PALETTE ✦'}</span>
          <span style={{ transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease', display: 'flex' }}>
            <IconChevronUp size={12} />
          </span>
        </button>
      </div>

      {/* Main Torn Paper Palette Container */}
      <div className="dock-outer-scroll" style={{
        position: 'relative',
        padding: inventoryOpen ? (inventoryExpanded ? '18px 24px' : '8px 18px') : '0px 18px',
        display: 'flex',
        flexDirection: inventoryExpanded ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: inventoryExpanded ? 16 : 12,
        width: inventoryExpanded ? 'min(720px, 92vw)' : 'min(620px, 72vw)',
        maxHeight: inventoryOpen ? (inventoryExpanded ? '65vh' : '90px') : '0px',
        opacity: inventoryOpen ? 1 : 0,
        transform: inventoryOpen ? 'translateY(0px) scale(1)' : 'translateY(48px) scale(0.85)',
        overflowY: inventoryExpanded ? 'auto' : 'visible',
        overflowX: 'visible',
        backgroundColor: isNight ? '#161616' : '#FAF7F2',
        border: inventoryOpen ? '1.5px solid #121212' : 'none',
        clipPath: inventoryOpen 
          ? 'polygon(0% 4px, 1.5% 0px, 98.5% 0px, 100% 4px, 99.5% 96%, 100% 100%, 0.5% 100%, 0% 96%)' 
          : 'none',
        boxShadow: inventoryOpen 
          ? (isNight 
              ? '0 16px 45px rgba(0,0,0,0.7), 0 3px 10px rgba(0,0,0,0.5)' 
              : '0 14px 40px rgba(74, 8, 18, 0.16), 0 3px 10px rgba(0,0,0,0.08)')
          : 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        pointerEvents: inventoryOpen ? 'auto' : 'none'
      }}>
        {/* Black Tape on Dock corners */}
        {inventoryOpen && (
          <>
            <BlackTape top="-9px" left="-14px" width="55px" rotate={-4} />
            <WashiTape top="-9px" left="calc(100% - 40px)" width="55px" rotate={3} color="rgba(255, 235, 215, 0.85)" />
          </>
        )}

        {/* Object Stamp Cards Container */}
        <div className="compact-dock-scroll" style={{
          display: inventoryExpanded ? 'grid' : 'flex',
          gridTemplateColumns: inventoryExpanded ? 'repeat(auto-fill, minmax(72px, 1fr))' : 'none',
          alignItems: 'center',
          gap: inventoryExpanded ? 12 : 8,
          overflowX: inventoryExpanded ? 'visible' : 'auto',
          padding: '4px 2px',
          width: '100%',
          maxWidth: inventoryExpanded ? '100%' : 'min(620px, 72vw)',
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
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  padding: inventoryExpanded ? '8px 6px' : '4px 6px',
                  borderRadius: '0px',
                  backgroundColor: isActive 
                    ? (isNight ? '#ffffff' : '#121212') 
                    : (isNight ? '#222222' : '#ffffff'),
                  border: isActive ? '1.5px solid #a61324' : '1px solid #121212',
                  cursor: item ? 'grab' : 'default',
                  transform: isActive ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
                  boxShadow: isActive ? '0 4px 12px rgba(166, 19, 36, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                  flexShrink: 0,
                  clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
                }}
                title={`Place ${item ? item.label : (typeof itemType === 'string' ? itemType : itemType?.label || '')}`}
              >
                <div style={{
                  width: 30, height: 30,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? (isNight ? '#121212' : '#ffffff') : (isNight ? '#f5f5f5' : '#121212'),
                  transition: 'all 0.2s ease'
                }}>
                  {item ? React.cloneElement(item.icon, { size: 18 }) : null}
                </div>
                <span style={{
                  fontSize: 9,
                  fontWeight: 800,
                  fontFamily: "'Montserrat', sans-serif",
                  color: isActive ? (isNight ? '#121212' : '#ffffff') : (isNight ? '#f5f5f5' : '#121212'),
                  textAlign: 'center', whiteSpace: 'nowrap',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}>
                  {item ? item.label : (typeof itemType === 'string' ? itemType : itemType?.label || '')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Vertical Divider */}
        {!inventoryExpanded && (
          <div style={{
            width: 1.5, height: 38,
            background: isNight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
            flexShrink: 0, margin: '0 4px',
          }} />
        )}

        {/* Dock Control Actions (Mode Hapus & Reset) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: inventoryExpanded ? 'flex-end' : 'center',
          gap: 6,
          borderTop: inventoryExpanded ? (isNight ? '1px dashed rgba(255, 255, 255, 0.2)' : '1px dashed rgba(0, 0, 0, 0.15)') : 'none',
          paddingTop: inventoryExpanded ? 12 : 0,
          flexShrink: 0,
        }}>
          {/* Expand / Minimize Button */}
          <button
            onClick={() => { setInventoryExpanded(!inventoryExpanded); SoundEngine.playClick(); }}
            title={inventoryExpanded ? "Kecilkan" : "Perbesar"}
            style={{
              padding: '6px 8px',
              border: '1px solid #121212',
              backgroundColor: isNight ? '#262626' : '#fff',
              color: isNight ? '#f5f5f5' : '#121212',
              fontWeight: 700, fontSize: 10, cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <span>{inventoryExpanded ? '⬇' : '⛶'}</span>
          </button>

          {/* Delete Mode Button (Torn Red Stamp) */}
          <button
            onClick={() => { setDeleteMode(!deleteMode); setSelectedId(null); SoundEngine.playClick(); }}
            title={deleteMode ? "Matikan Mode Hapus" : "Aktifkan Mode Hapus"}
            style={{
              padding: '6px 12px',
              border: '1.5px solid #121212',
              backgroundColor: deleteMode ? '#c8102e' : (isNight ? '#262626' : '#fff'),
              color: deleteMode ? '#ffffff' : (isNight ? '#f5f5f5' : '#121212'),
              fontWeight: 800, fontSize: 10, cursor: 'pointer', letterSpacing: '1px',
              fontFamily: "'Montserrat', sans-serif",
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 4,
              boxShadow: deleteMode ? '0 3px 10px rgba(200, 16, 46, 0.4)' : 'none',
              clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
            }}
          >
            <IconTrash size={12} />
            <span>{deleteMode ? 'DEL: ON' : 'DELETE'}</span>
          </button>

          {/* Reset Button */}
          {!resetConfirm ? (
            <button 
              onClick={() => setResetConfirm(true)} 
              title="Reset semua objek di atas pulau" 
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                border: '1px dashed #c8102e',
                backgroundColor: 'transparent', color: '#c8102e',
                fontWeight: 800, cursor: 'pointer', fontSize: 10, letterSpacing: '1px',
                fontFamily: "'Montserrat', sans-serif",
                whiteSpace: 'nowrap'
              }}
            >
              <IconReset size={12} /> RESET
            </button>
          ) : (
            <button 
              onClick={handleResetAll} 
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                border: '1.5px solid #121212',
                backgroundColor: '#c8102e', color: '#ffffff',
                fontWeight: 800, cursor: 'pointer', fontSize: 10, letterSpacing: '1px',
                fontFamily: "'Montserrat', sans-serif",
                whiteSpace: 'nowrap',
                boxShadow: '0 3px 10px rgba(200, 16, 46, 0.4)'
              }}
            >
              <IconWarning size={12} /> SURE?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
