import React from 'react';
import { 
  IconSun, IconGalaxy, IconRotateOn, IconRotateOff, 
  IconAudioOn, IconAudioOff, IconGrid, IconCamera 
} from '../icons/SvgIcons';
import { SoundEngine } from '../../utils/SoundEngine';
import { ScreenshotHelper } from '../../utils/screenshotHelper';

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
  setCentralModalOpen
}) {
  const isNight = timeMode === 'night';

  const getHeroLabel = () => {
    if (centralObjectType === 'custom') return centralObjectName ? `Custom: ${centralObjectName.slice(0, 10)}...` : 'Model 3D Saya';
    const labels = {
      cube: 'Kubus Cyber',
      sphere: 'Bola Plasma',
      torus: 'Cincin Quantum',
      pyramid: 'Piramida Kristal',
      dodecahedron: 'Bintang Suci',
      cylinder: 'Pilar Kapsul'
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

  return (
    <header style={{
      position: 'absolute', top: 16, left: 0, right: 0, boxSizing: 'border-box',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 0, zIndex: 25, pointerEvents: 'none',
      transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
    }}>
      {/* Central Unified Glass Panel */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'auto', flexWrap: 'wrap',
        background: isNight ? 'rgba(20, 20, 20, 0.3)' : 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: 24, padding: '6px',
        boxShadow: isNight ? '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1), inset 0 -1px 1px rgba(0,0,0,0.05)'
      }}>
        {/* Undo / Redo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button onClick={handleUndo} disabled={historyPast.length === 0} title="Undo (Ctrl+Z)" style={{
            padding: '6px 12px', borderRadius: 18, border: 'none', cursor: historyPast.length === 0 ? 'not-allowed' : 'pointer',
            background: 'transparent', color: historyPast.length === 0 ? (isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)') : (isNight ? '#E5E5E5' : '#171717'),
            fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>UNDO</button>
          <div style={{ width: 1, height: 16, background: isNight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
          <button onClick={handleRedo} disabled={historyFuture.length === 0} title="Redo (Ctrl+Y)" style={{
            padding: '6px 12px', borderRadius: 18, border: 'none', cursor: historyFuture.length === 0 ? 'not-allowed' : 'pointer',
            background: 'transparent', color: historyFuture.length === 0 ? (isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)') : (isNight ? '#E5E5E5' : '#171717'),
            fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.2s'
          }}>REDO</button>
        </div>

        <div style={{ width: 1, height: 24, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', margin: '0 4px' }} />

        {/* Snap to Grid */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button onClick={() => { setSnapGrid(!snapGrid); SoundEngine.playClick(); }} title="Snap Grid" style={{
            padding: '6px 12px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 6,
            background: snapGrid ? (isNight ? '#E5E5E5' : '#171717') : 'transparent',
            border: 'none', cursor: 'pointer',
            color: snapGrid ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), 
            fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease'
          }}>
            <IconGrid size={14} />
            <span>SNAP{snapGrid ? ': ON' : ''}</span>
          </button>
          {snapGrid && (
            <button onClick={() => { setSnapSize(snapSize === 0.5 ? 1.0 : 0.5); SoundEngine.playClick(); }} title="Resolusi Snap" style={{
              background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 12, padding: '4px 8px',
              color: isNight ? '#E5E5E5' : '#171717', fontSize: 10, fontWeight: 600, cursor: 'pointer'
            }}>{snapSize}m</button>
          )}
        </div>

        <div style={{ width: 1, height: 24, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', margin: '0 4px' }} />

        {/* Altar */}
        <button onClick={() => { if (setCentralModalOpen) { setCentralModalOpen(true); SoundEngine.playPop(); } }} title="Studio Altar" style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 18,
          background: isNight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)', border: 'none',
          color: isNight ? '#FFF' : '#000', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          {getHeroLabel().toUpperCase()}
        </button>

        <div style={{ width: 1, height: 24, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', margin: '0 4px' }} />

        {/* Audio & Rotate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button onClick={() => { const next = !audioActive; setAudioActive(next); SoundEngine.setAmbient(next, isNight); SoundEngine.playClick(); }} title="Audio" style={{
            padding: '6px 12px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 6,
            background: audioActive ? (isNight ? '#E5E5E5' : '#171717') : 'transparent', border: 'none', cursor: 'pointer',
            color: audioActive ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), 
            fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease'
          }}>
            {audioActive ? <IconAudioOn size={14} /> : <IconAudioOff size={14} />}
          </button>
          <button onClick={() => { setAutoRotate(!autoRotate); SoundEngine.playClick(); }} title="Auto Rotate" style={{
            padding: '6px 12px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 6,
            background: autoRotate ? (isNight ? '#E5E5E5' : '#171717') : 'transparent', border: 'none', cursor: 'pointer',
            color: autoRotate ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), 
            fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease'
          }}>
            {autoRotate ? <IconRotateOn size={14} /> : <IconRotateOff size={14} />}
          </button>
        </div>

        <div style={{ width: 1, height: 24, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', margin: '0 4px' }} />

        {/* Photo */}
        <button onClick={handleTakePhoto} title="Foto HD" style={{
          padding: '6px 12px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: isNight ? '#E5E5E5' : '#171717', 
          fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease'
        }}>
          <IconCamera size={14} /> FOTO
        </button>

        <div style={{ width: 1, height: 24, background: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', margin: '0 4px' }} />

        {/* Time Mode */}
        <div style={{ display: 'flex', alignItems: 'center', background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)', borderRadius: 18, padding: 2 }}>
          <button onClick={() => { setTimeMode('day'); SoundEngine.setAmbient(audioActive, false); SoundEngine.playClick(); }} style={{
            padding: '4px 10px', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: !isNight ? (isNight ? '#E5E5E5' : '#171717') : 'transparent',
            color: !isNight ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'),
            display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.3s ease'
          }}>
            <IconSun size={14} />
          </button>
          <button onClick={() => { setTimeMode('night'); SoundEngine.setAmbient(audioActive, true); SoundEngine.playClick(); }} style={{
            padding: '4px 10px', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: isNight ? (isNight ? '#E5E5E5' : '#171717') : 'transparent',
            color: isNight ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'),
            display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.3s ease'
          }}>
            <IconGalaxy size={14} />
          </button>
        </div>

        {/* Help */}
        <button onClick={() => setShowTutorial(true)} title="Tutorial" style={{
          padding: '6px 12px', borderRadius: 18, border: 'none', cursor: 'pointer',
          background: 'transparent', color: isNight ? '#E5E5E5' : '#171717', 
          fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', transition: 'all 0.3s ease'
        }}>
          HELP
        </button>
      </div>
    </header>
  );
}
