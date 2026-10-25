import React from 'react';
import { 
  IconSun, IconGalaxy, IconRotateOn, IconRotateOff, 
  IconAudioOn, IconAudioOff, IconGrid, IconCamera 
} from '../icons/SvgIcons';
import { SoundEngine } from '../../utils/SoundEngine';
import { ScreenshotHelper } from '../../utils/screenshotHelper';
import { BlackTape, WashiTape } from '../capsule/TornPaper';

export function HeaderToolbar({
  timeMode, setTimeMode,
  autoRotate, setAutoRotate,
  audioActive, setAudioActive,
  snapGrid, setSnapGrid,
  snapSize, setSnapSize,
  historyPast, historyFuture,
  handleUndo, handleRedo,
  setShowTutorial,
  sceneRef,
  centralObjectType,
  centralObjectName,
  setCentralModalOpen,
  setWorldModalOpen,
  handleExportJson,
  handleImportJson
}) {
  const isNight = timeMode === 'night';

  const getHeroLabel = () => {
    if (centralObjectType === 'custom') return centralObjectName ? `Custom: ${centralObjectName.slice(0, 10)}...` : 'Model 3D';
    const labels = {
      cube: 'Kubus Cinta',
      sphere: 'Kristal Kenangan',
      torus: 'Cincin Abadi',
      pyramid: 'Piramida Cinta',
      dodecahedron: 'Bintang Suci',
      cylinder: 'Kapsul Waktu'
    };
    return labels[centralObjectType] || 'Altar Utama';
  };

  const handleTakePhoto = () => {
    if (sceneRef && sceneRef.current) {
      const { scene, camera, gl } = sceneRef.current;
      ScreenshotHelper.takePhoto({
        gl, scene, camera,
        onSuccess: () => SoundEngine.playPop()
      });
    } else {
      ScreenshotHelper.takePhoto({
        onSuccess: () => SoundEngine.playPop()
      });
    }
  };

  const btnBaseStyle = {
    padding: '6px 11px',
    border: 'none',
    borderRadius: '0px',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: 'transparent',
    color: isNight ? '#f5f5f5' : '#121212',
  };

  return (
    <header 
      className="sandbox-header-toolbar"
      style={{
        position: 'absolute', top: 16, left: 0, right: 0, boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0, zIndex: 25, pointerEvents: 'none',
        transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
    >
      {/* Torn Paper Scrapbook Ruler Toolbar */}
      <div 
        className="sandbox-toolbar-inner"
        style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', gap: 4, pointerEvents: 'auto', flexWrap: 'wrap',
          backgroundColor: isNight ? '#161616' : '#faf7f2',
          border: '1.5px solid #121212',
          boxShadow: isNight 
            ? '0 12px 36px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.4)' 
            : '0 10px 30px rgba(74, 8, 18, 0.15), 0 2px 6px rgba(0,0,0,0.08)',
          padding: '5px 8px',
          // Jagged ragged torn paper ends
          clipPath: 'polygon(0% 3px, 1% 0px, 99% 0px, 100% 3px, 99.5% 97%, 100% 100%, 0.5% 100%, 0% 97%)',
        }}
      >
        {/* Black Tape & Washi Tape Accents on Toolbar Edges */}
        <BlackTape top="-9px" left="-12px" width="50px" rotate={-5} />
        <WashiTape top="-9px" left="calc(100% - 38px)" width="50px" rotate={4} color="rgba(255, 230, 210, 0.85)" />

        {/* Undo / Redo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <button 
            onClick={handleUndo} 
            disabled={historyPast.length === 0} 
            title="Undo (Ctrl+Z)" 
            style={{
              ...btnBaseStyle,
              opacity: historyPast.length === 0 ? 0.35 : 1,
              cursor: historyPast.length === 0 ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => { if (historyPast.length > 0) e.currentTarget.style.backgroundColor = isNight ? '#262626' : '#ede7dc'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            UNDO
          </button>
          <div style={{ width: 1, height: 16, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />
          <button 
            onClick={handleRedo} 
            disabled={historyFuture.length === 0} 
            title="Redo (Ctrl+Y)" 
            style={{
              ...btnBaseStyle,
              opacity: historyFuture.length === 0 ? 0.35 : 1,
              cursor: historyFuture.length === 0 ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => { if (historyFuture.length > 0) e.currentTarget.style.backgroundColor = isNight ? '#262626' : '#ede7dc'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            REDO
          </button>
        </div>

        <div style={{ width: 1, height: 20, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />

        {/* Snap to Grid */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button 
            onClick={() => { setSnapGrid(!snapGrid); SoundEngine.playClick(); }} 
            title="Snap Grid" 
            style={{
              ...btnBaseStyle,
              backgroundColor: snapGrid ? (isNight ? '#ffffff' : '#121212') : 'transparent',
              color: snapGrid ? (isNight ? '#121212' : '#ffffff') : (isNight ? '#f5f5f5' : '#121212'),
              clipPath: snapGrid ? 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)' : 'none',
            }}
          >
            <IconGrid size={13} />
            <span>SNAP{snapGrid ? ': ON' : ''}</span>
          </button>
          {snapGrid && (
            <button 
              onClick={() => { setSnapSize(snapSize === 0.5 ? 1.0 : 0.5); SoundEngine.playClick(); }} 
              title="Resolusi Snap" 
              style={{
                ...btnBaseStyle,
                padding: '4px 6px',
                border: '1px dashed #121212',
                backgroundColor: isNight ? '#262626' : '#fff',
                fontSize: 9,
              }}
            >
              {snapSize}m
            </button>
          )}
        </div>

        <div style={{ width: 1, height: 20, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />

        {/* Altar / Centerpiece Studio */}
        <button 
          onClick={() => { if (setCentralModalOpen) { setCentralModalOpen(true); SoundEngine.playPop(); } }} 
          title="Studio Centerpiece" 
          style={{
            ...btnBaseStyle,
            backgroundColor: isNight ? '#262626' : '#fffdf9',
            border: '1px solid #121212',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          ✦ {getHeroLabel().toUpperCase()}
        </button>

        {/* Dunia & Gaya (Vibrant Crimson Torn Block) */}
        <button 
          onClick={() => { if (setWorldModalOpen) { setWorldModalOpen(true); SoundEngine.playPop(); } }} 
          title="Kustomisasi Dunia & Gaya Seni" 
          style={{
            ...btnBaseStyle,
            backgroundColor: '#a61324',
            color: '#ffffff',
            boxShadow: '0 3px 8px rgba(166, 19, 36, 0.4)',
            clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#870e1c';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#a61324';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🌍 DUNIA & GAYA
        </button>

        <div style={{ width: 1, height: 20, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />

        {/* Audio & Rotate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button 
            onClick={() => { const next = !audioActive; setAudioActive(next); SoundEngine.setAmbient(next, isNight); SoundEngine.playClick(); }} 
            title="Audio" 
            style={{
              ...btnBaseStyle,
              backgroundColor: audioActive ? (isNight ? '#fff' : '#121212') : 'transparent',
              color: audioActive ? (isNight ? '#121212' : '#fff') : (isNight ? '#f5f5f5' : '#121212'),
            }}
          >
            {audioActive ? <IconAudioOn size={13} /> : <IconAudioOff size={13} />}
          </button>
          <button 
            onClick={() => { setAutoRotate(!autoRotate); SoundEngine.playClick(); }} 
            title="Auto Rotate" 
            style={{
              ...btnBaseStyle,
              backgroundColor: autoRotate ? (isNight ? '#fff' : '#121212') : 'transparent',
              color: autoRotate ? (isNight ? '#121212' : '#fff') : (isNight ? '#f5f5f5' : '#121212'),
            }}
          >
            {autoRotate ? <IconRotateOn size={13} /> : <IconRotateOff size={13} />}
          </button>
        </div>

        <div style={{ width: 1, height: 20, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />

        {/* Day / Night */}
        <button 
          onClick={() => {
            const next = isNight ? 'day' : 'night';
            setTimeMode(next);
            SoundEngine.setAmbient(audioActive, next === 'night');
            SoundEngine.playClick();
          }} 
          title="Toggle Day / Night" 
          style={btnBaseStyle}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isNight ? '#262626' : '#ede7dc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          {isNight ? <IconGalaxy size={13} /> : <IconSun size={13} />}
          <span>{isNight ? 'MALAM' : 'SIANG'}</span>
        </button>

        <div style={{ width: 1, height: 20, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />

        {/* Snapshot / Photo Mode */}
        <button 
          onClick={handleTakePhoto} 
          title="Ambil Foto Polaroid Sandbox" 
          style={btnBaseStyle}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isNight ? '#262626' : '#ede7dc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <IconCamera size={13} />
          <span>FOTO</span>
        </button>

        <div style={{ width: 1, height: 20, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', margin: '0 2px' }} />

        {/* Ekspor & Impor JSON */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {handleExportJson && (
            <button 
              onClick={handleExportJson} 
              title="Ekspor Diorama ke File JSON" 
              style={btnBaseStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isNight ? '#262626' : '#ede7dc'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              EKSPOR
            </button>
          )}
          {handleImportJson && (
            <button 
              onClick={handleImportJson} 
              title="Impor Diorama dari File JSON" 
              style={btnBaseStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isNight ? '#262626' : '#ede7dc'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              IMPOR
            </button>
          )}
        </div>

        {/* Tutorial */}
        <button 
          onClick={() => { setShowTutorial(true); SoundEngine.playClick(); }} 
          title="Bantuan Tutorial" 
          style={{
            ...btnBaseStyle,
            padding: '4px 8px',
            border: '1px solid #121212',
            backgroundColor: isNight ? '#222' : '#fff',
            marginLeft: 2,
          }}
        >
          ?
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sandbox-header-toolbar {
            top: 46px !important;
          }
          .sandbox-toolbar-inner {
            max-width: 96vw !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            padding: 4px 6px !important;
            -webkit-overflow-scrolling: touch !important;
          }
        }
      `}</style>
    </header>
  );
}
