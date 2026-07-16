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
      position: 'absolute', top: 72, left: 24, zIndex: 20,
      display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 20,
      background: isNight ? 'rgba(28, 28, 32, 0.75)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: isNight ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
      color: isNight ? '#E5E5EA' : '#3A3A3C', fontSize: 12, fontWeight: 600,
      boxShadow: isNight ? '0 8px 24px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.06)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'none'
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
