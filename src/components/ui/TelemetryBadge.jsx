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

// 2. DOM Glassmorphism Badge displayed on screen
export function TelemetryBadge({ fps = 60, performanceTier = 'high', objectCount = 0, isNight = true }) {
  return (
    <div style={{
      position: 'absolute', top: 16, left: 24, zIndex: 30,
      background: isNight ? 'rgba(20, 20, 20, 0.45)' : 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      border: isNight ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: isNight ? '0 4px 16px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)' : '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
      padding: '4px 10px', borderRadius: 16,
      color: isNight ? '#E5E5E5' : '#171717',
      fontFamily: 'monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.5px',
      display: 'flex', alignItems: 'center', gap: 6,
      pointerEvents: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: fps >= 50 ? '#30D158' : (fps >= 30 ? '#FF9F0A' : '#FF3B30'),
          boxShadow: `0 0 6px ${fps >= 50 ? '#30D158' : (fps >= 30 ? '#FF9F0A' : '#FF3B30')}`
        }} />
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{fps} FPS</span>
      </div>
      <div style={{ width: 1, height: 12, background: isNight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
      <span>GPU: <strong style={{ color: performanceTier === 'high' ? (isNight ? '#0A84FF' : '#007AFF') : '#FF9F0A', textTransform: 'uppercase' }}>{performanceTier}</strong></span>
      <div style={{ width: 1, height: 12, background: isNight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
      <span>🏝️ <strong>{objectCount}</strong> Objek</span>
    </div>
  );
}
