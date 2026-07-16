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
  sceneRef
}) {
  const isNight = timeMode === 'night';

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
      {/* Left: Undo / Redo & Snap Grid Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: isNight ? 'rgba(44, 44, 46, 0.8)' : 'rgba(240, 240, 245, 0.9)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 20, padding: '4px 8px', backdropFilter: 'blur(12px)'
        }}>
          <button
            onClick={handleUndo}
            disabled={historyPast.length === 0}
            title="Undo (Ctrl+Z)"
            style={{
              padding: '4px 10px', borderRadius: 14, border: 'none', cursor: historyPast.length === 0 ? 'not-allowed' : 'pointer',
              background: 'transparent', color: historyPast.length === 0 ? (isNight ? '#48484A' : '#C7C7CC') : (isNight ? '#E5E5EA' : '#1D1D1F'),
              fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4,
              opacity: historyPast.length === 0 ? 0.5 : 1, transition: 'all 0.2s'
            }}
          >↩️ Undo</button>
          <div style={{ width: 1, height: 16, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
          <button
            onClick={handleRedo}
            disabled={historyFuture.length === 0}
            title="Redo (Ctrl+Y)"
            style={{
              padding: '4px 10px', borderRadius: 14, border: 'none', cursor: historyFuture.length === 0 ? 'not-allowed' : 'pointer',
              background: 'transparent', color: historyFuture.length === 0 ? (isNight ? '#48484A' : '#C7C7CC') : (isNight ? '#E5E5EA' : '#1D1D1F'),
              fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4,
              opacity: historyFuture.length === 0 ? 0.5 : 1, transition: 'all 0.2s'
            }}
          >↪️ Redo</button>
        </div>

        {/* Snap to Grid Toggle Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20,
          background: snapGrid ? '#5856D6' : (isNight ? 'rgba(58, 58, 60, 0.75)' : 'rgba(240, 240, 245, 0.9)'),
          border: snapGrid ? '1px solid #5856D6' : (isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)'),
          color: snapGrid ? '#ffffff' : (isNight ? '#E5E5EA' : '#3A3A3C'), fontSize: 13, fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', backdropFilter: 'blur(12px)',
          boxShadow: snapGrid ? '0 4px 14px rgba(88, 86, 214, 0.35)' : 'none'
        }}>
          <button
            onClick={() => { setSnapGrid(!snapGrid); SoundEngine.playClick(); }}
            style={{
              background: 'transparent', border: 'none', color: 'inherit',
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontWeight: 'inherit', fontSize: 'inherit'
            }}
            title="Aktifkan atau nonaktifkan penguncian posisi objek ke grid"
          >
            <IconGrid size={15} />
            <span>Snap Grid: {snapGrid ? 'ON' : 'OFF'}</span>
          </button>
          {snapGrid && (
            <button
              onClick={() => { setSnapSize(snapSize === 0.5 ? 1.0 : 0.5); SoundEngine.playClick(); }}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '2px 6px',
                color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer'
              }}
              title="Ubah resolusi snap grid"
            >{snapSize}m</button>
          )}
        </div>
      </div>

      {/* Right: Controls & Time Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
        {/* Photo / Screenshot Mode */}
        <button
          onClick={handleTakePhoto}
          title="Ambil Foto HD dari Canvas 3D tanpa elemen UI"
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 15px', borderRadius: 20,
            background: isNight ? 'rgba(58, 58, 60, 0.75)' : 'rgba(240, 240, 245, 0.9)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
            color: isNight ? '#38bdf8' : '#007AFF', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', backdropFilter: 'blur(12px)'
          }}
        >
          <IconCamera size={15} />
          <span>Ambil Foto</span>
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
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 15px', borderRadius: 20,
            background: audioActive ? '#30D158' : (isNight ? 'rgba(58, 58, 60, 0.75)' : 'rgba(240, 240, 245, 0.9)'),
            border: audioActive ? '1px solid #30D158' : (isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)'),
            color: audioActive ? '#ffffff' : (isNight ? '#E5E5EA' : '#3A3A3C'), fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', backdropFilter: 'blur(12px)',
            boxShadow: audioActive ? '0 4px 14px rgba(48, 209, 88, 0.35)' : 'none'
          }}
        >
          {audioActive ? <IconAudioOn size={15} /> : <IconAudioOff size={15} />}
          <span>{audioActive ? 'Audio: ON' : 'Audio: OFF'}</span>
        </button>

        <button
          onClick={() => { setAutoRotate(!autoRotate); SoundEngine.playClick(); }}
          title="Aktifkan atau nonaktifkan putaran otomatis kamera"
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 15px', borderRadius: 20,
            background: autoRotate ? '#0A84FF' : (isNight ? 'rgba(58, 58, 60, 0.75)' : 'rgba(240, 240, 245, 0.9)'),
            border: autoRotate ? '1px solid #0A84FF' : (isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)'),
            color: autoRotate ? '#ffffff' : (isNight ? '#E5E5EA' : '#3A3A3C'), fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', backdropFilter: 'blur(12px)',
            boxShadow: autoRotate ? '0 4px 14px rgba(10, 132, 255, 0.35)' : 'none'
          }}
        >
          {autoRotate ? <IconRotateOn size={15} /> : <IconRotateOff size={15} />}
          <span>{autoRotate ? 'Putar: ON' : 'Putar: OFF'}</span>
        </button>

        {/* Time Switcher Toggle with Smooth Apple Pill Transition */}
        <div style={{
          display: 'flex', alignItems: 'center', background: isNight ? 'rgba(44, 44, 46, 0.8)' : 'rgba(229, 229, 234, 0.8)',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)', borderRadius: 24, padding: 3,
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)', backdropFilter: 'blur(12px)'
        }}>
          <button onClick={() => { setTimeMode('day'); SoundEngine.setAmbient(audioActive, false); SoundEngine.playClick(); }} style={{
            padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
            background: !isNight ? '#ffffff' : 'transparent',
            color: !isNight ? '#007AFF' : (isNight ? '#98989D' : '#636366'), display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: !isNight ? '0 2px 10px rgba(0, 0, 0, 0.12)' : 'none'
          }}><IconSun size={15} /> Siang</button>
          <button onClick={() => { setTimeMode('night'); SoundEngine.setAmbient(audioActive, true); SoundEngine.playClick(); }} style={{
            padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
            background: isNight ? '#BF5AF2' : 'transparent',
            color: isNight ? '#ffffff' : (isNight ? '#98989D' : '#636366'), display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: isNight ? '0 2px 12px rgba(191, 90, 242, 0.4)' : 'none'
          }}><IconGalaxy size={15} /> Galaxy Malam</button>
        </div>

        <button onClick={() => setShowTutorial(true)} title="Bantuan Tutorial" style={{
          width: 34, height: 34, borderRadius: '50%',
          border: isNight ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)',
          background: isNight ? 'rgba(58, 58, 60, 0.75)' : 'rgba(240, 240, 245, 0.9)',
          color: isNight ? '#0A84FF' : '#007AFF', backdropFilter: 'blur(12px)',
          fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>❓</button>
      </div>
    </header>
  );
}
