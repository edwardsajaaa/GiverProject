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
      position: 'absolute', top: 16, left: 24, right: 24, boxSizing: 'border-box',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: 0,
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
      zIndex: 25,
      pointerEvents: 'none'
    }}>
      {/* Left: Undo / Redo, Snap Grid & Central Hero Studio Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'auto', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 8, padding: '4px 8px', backdropFilter: 'blur(8px)',
          boxShadow: 'none'
        }}>
          <button
            onClick={handleUndo}
            disabled={historyPast.length === 0}
            title="Undo (Ctrl+Z)"
            style={{
              padding: '4px 10px', borderRadius: 6, border: 'none', cursor: historyPast.length === 0 ? 'not-allowed' : 'pointer',
              background: 'transparent', color: historyPast.length === 0 ? (isNight ? '#555' : '#CCC') : (isNight ? '#E5E5E5' : '#171717'),
              fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 4,
              opacity: historyPast.length === 0 ? 0.5 : 1, transition: 'all 0.2s'
            }}
          >UNDO</button>
          <div style={{ width: 1, height: 16, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
          <button
            onClick={handleRedo}
            disabled={historyFuture.length === 0}
            title="Redo (Ctrl+Y)"
            style={{
              padding: '4px 10px', borderRadius: 6, border: 'none', cursor: historyFuture.length === 0 ? 'not-allowed' : 'pointer',
              background: 'transparent', color: historyFuture.length === 0 ? (isNight ? '#555' : '#CCC') : (isNight ? '#E5E5E5' : '#171717'),
              fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 4,
              opacity: historyFuture.length === 0 ? 0.5 : 1, transition: 'all 0.2s'
            }}
          >REDO</button>
        </div>

        {/* Snap to Grid Toggle Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 8,
          background: snapGrid ? (isNight ? '#E5E5E5' : '#171717') : (isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
          border: snapGrid ? '1px solid transparent' : (isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
          color: snapGrid ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), fontSize: 12, fontWeight: 500, letterSpacing: '0.5px',
          transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
          boxShadow: 'none'
        }}>
          <button
            onClick={() => { setSnapGrid(!snapGrid); SoundEngine.playClick(); }}
            style={{
              background: 'transparent', border: 'none', color: 'inherit',
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 'inherit', fontSize: 'inherit'
            }}
            title="Aktifkan atau nonaktifkan penguncian posisi objek ke grid"
          >
            <IconGrid size={14} />
            <span>SNAP: {snapGrid ? 'ON' : 'OFF'}</span>
          </button>
          {snapGrid && (
            <button
              onClick={() => { setSnapSize(snapSize === 0.5 ? 1.0 : 0.5); SoundEngine.playClick(); }}
              style={{
                background: isNight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)', border: 'none', borderRadius: 4, padding: '2px 6px',
                color: 'inherit', fontSize: 11, fontWeight: 600, cursor: 'pointer'
              }}
              title="Ubah resolusi snap grid"
            >{snapSize}m</button>
          )}
        </div>

        {/* Tombol Studio Altar Utama (Mengganti Objek / Upload Model 3D Sendiri) */}
        <button
          onClick={() => { if (setCentralModalOpen) { setCentralModalOpen(true); SoundEngine.playPop(); } }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 8,
            background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
            color: isNight ? '#E5E5E5' : '#171717', fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', cursor: 'pointer',
            transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
            boxShadow: 'none'
          }}
          title="Buka Studio Altar"
        >
          <span>{getHeroLabel().toUpperCase()}</span>
        </button>
      </div>

      {/* Right: Controls & Time Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
        {/* Photo / Screenshot Mode */}
        <button
          onClick={handleTakePhoto}
          title="Ambil Foto HD dari Canvas 3D tanpa elemen UI"
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8,
            background: isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            color: isNight ? '#A3A3A3' : '#525252', fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', cursor: 'pointer',
            transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
            boxShadow: 'none'
          }}
        >
          <IconCamera size={14} />
          <span>FOTO</span>
        </button>

        <button
          onClick={() => {
            const next = !audioActive;
            setAudioActive(next);
            SoundEngine.setAmbient(next, isNight);
            SoundEngine.playClick();
          }}
          title={audioActive ? 'Mute Ambient Audio' : 'Aktifkan Ambient Audio'}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8,
            background: audioActive ? (isNight ? '#E5E5E5' : '#171717') : (isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
            border: audioActive ? '1px solid transparent' : (isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
            color: audioActive ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', cursor: 'pointer',
            transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
            boxShadow: 'none'
          }}
        >
          {audioActive ? <IconAudioOn size={14} /> : <IconAudioOff size={14} />}
          <span>AUDIO: {audioActive ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={() => { setAutoRotate(!autoRotate); SoundEngine.playClick(); }}
          title="Aktifkan atau nonaktifkan putaran otomatis kamera"
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8,
            background: autoRotate ? (isNight ? '#E5E5E5' : '#171717') : (isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
            border: autoRotate ? '1px solid transparent' : (isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
            color: autoRotate ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), fontSize: 12, fontWeight: 500, letterSpacing: '0.5px', cursor: 'pointer',
            transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
            boxShadow: 'none'
          }}
        >
          {autoRotate ? <IconRotateOn size={14} /> : <IconRotateOff size={14} />}
          <span>PUTAR: {autoRotate ? 'ON' : 'OFF'}</span>
        </button>

        {/* Time Switcher Toggle with Smooth Apple Pill Transition */}
        <div style={{
          display: 'flex', alignItems: 'center', background: isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)', borderRadius: 8, padding: 3,
          transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
          boxShadow: 'none'
        }}>
          <button onClick={() => { setTimeMode('day'); SoundEngine.setAmbient(audioActive, false); SoundEngine.playClick(); }} style={{
            padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, letterSpacing: '0.5px',
            background: !isNight ? (isNight ? '#E5E5E5' : '#171717') : 'transparent',
            color: !isNight ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.3s ease',
            boxShadow: 'none'
          }}><IconSun size={14} /> DAY</button>
          <button onClick={() => { setTimeMode('night'); SoundEngine.setAmbient(audioActive, true); SoundEngine.playClick(); }} style={{
            padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, letterSpacing: '0.5px',
            background: isNight ? (isNight ? '#E5E5E5' : '#171717') : 'transparent',
            color: isNight ? (isNight ? '#0A0A0A' : '#FAFAFA') : (isNight ? '#A3A3A3' : '#525252'), display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.3s ease',
            boxShadow: 'none'
          }}><IconGalaxy size={14} /> NIGHT</button>
        </div>

        <button onClick={() => setShowTutorial(true)} title="Tutorial" style={{
          padding: '6px 12px', borderRadius: 8,
          border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
          background: isNight ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
          color: isNight ? '#A3A3A3' : '#525252', backdropFilter: 'blur(8px)',
          fontWeight: 500, fontSize: 12, letterSpacing: '0.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: 'none'
        }}>HELP</button>
      </div>
    </header>
  );
}
