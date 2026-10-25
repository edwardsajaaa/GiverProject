import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// 1. Non-visual R3F component to calculate exact Canvas FPS
export function RealTimeAnalytics({ onFpsUpdate }) {
  const frames = useRef(0);
  const prevTime = useRef(0);

  useFrame(() => {
    if (prevTime.current === 0) prevTime.current = performance.now();
    frames.current++;
    const time = performance.now();
    if (time >= prevTime.current + 1000) {
      const fps = Math.round((frames.current * 1000) / (time - prevTime.current));
      if (onFpsUpdate) onFpsUpdate(fps);
      frames.current = 0;
      prevTime.current = time;
    }
  });

  return null;
}

export function TelemetryBadge({ fps = 60, performanceTier = 'high', togglePerformanceTier, objectCount = 0, isNight = true }) {
  return (
    <div style={{
      position: 'absolute', top: 18, right: 20, zIndex: 30,
      backgroundColor: isNight ? '#161616' : '#faf7f2',
      border: '1.5px solid #121212',
      boxShadow: isNight ? '0 4px 16px rgba(0,0,0,0.5)' : '0 4px 16px rgba(74, 8, 18, 0.12)',
      padding: '4px 10px',
      color: isNight ? '#f5f5f5' : '#121212',
      fontFamily: "'Montserrat', monospace", fontSize: 9, fontWeight: 800, letterSpacing: '0.8px',
      display: 'flex', alignItems: 'center', gap: 6,
      pointerEvents: 'auto',
      clipPath: 'polygon(0% 1px, 2% 0%, 98% 0%, 100% 1px, 99% 99%, 100% 100%, 1% 100%, 0% 99%)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, pointerEvents: 'none' }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: fps >= 50 ? '#30D158' : (fps >= 30 ? '#FF9F0A' : '#FF3B30'),
          boxShadow: `0 0 6px ${fps >= 50 ? '#30D158' : (fps >= 30 ? '#FF9F0A' : '#FF3B30')}`
        }} />
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fps} FPS</span>
      </div>
      <div style={{ width: 1, height: 12, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />
      <button
        onClick={togglePerformanceTier}
        title="Klik untuk beralih mode performa (⚡ ECO / 🚀 HIGH)"
        style={{
          background: performanceTier === 'high' ? '#121212' : '#a61324',
          border: 'none',
          padding: '2px 5px',
          color: '#ffffff',
          fontFamily: 'inherit',
          fontSize: 9,
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          letterSpacing: '0.5px',
        }}
      >
        <span>{performanceTier === 'high' ? 'HIGH' : 'ECO'}</span>
      </button>
      <div style={{ width: 1, height: 12, background: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />
      <span style={{ pointerEvents: 'none' }}>✦ <strong>{objectCount}</strong> ITEMS</span>
    </div>
  );
}
