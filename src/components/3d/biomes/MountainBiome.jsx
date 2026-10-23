import React, { useMemo } from 'react';
import * as THREE from 'three';

export function MountainBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';

  // Distant low-poly mountain peaks generated statically (0 GC)
  const mountainPeaks = useMemo(() => {
    const peaks = [];
    const count = 16;
    const radius = 32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = radius + (i % 3) * 6;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const height = 18 + ((i * 7) % 14);
      const radiusBottom = 10 + ((i * 3) % 8);
      peaks.push({ x, z, height, radiusBottom, id: i });
    }
    return peaks;
  }, []);

  // Low altitude cloud planes
  const cloudPuffs = useMemo(() => {
    const clouds = [];
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2 + 0.3;
      const d = 16 + (i % 4) * 4;
      clouds.push({
        x: Math.cos(ang) * d,
        y: -3.5 - (i % 2) * 1.5,
        z: Math.sin(ang) * d,
        scale: 3 + (i % 3) * 1.5,
        id: i
      });
    }
    return clouds;
  }, []);

  return (
    <group>
      {/* 1. Main Summit Flat Ridge (Interactive Ground) */}
      <mesh
        position={[0, -0.2, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (onGroundTap) {
            e.stopPropagation();
            onGroundTap(e.point.x, e.point.z);
          }
        }}
      >
        <cylinderGeometry args={[11, 11.5, 0.4, 7]} />
        <meshStandardMaterial
          color={isNight ? '#1e293b' : '#f1f5f9'}
          roughness={0.9}
          metalness={0.05}
          flatShading={true}
        />
      </mesh>

      {/* 2. Summit Snow Patch Center */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[8.5, 9, 0.05, 7]} />
        <meshStandardMaterial
          color={isNight ? '#cbd5e1' : '#ffffff'}
          roughness={0.6}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* 3. Mountain Cliff Base descending into clouds */}
      <mesh position={[0, -4.5, 0]} receiveShadow>
        <cylinderGeometry args={[11.5, 4, 8.5, 7]} />
        <meshStandardMaterial
          color={isNight ? '#0f172a' : '#475569'}
          roughness={0.95}
          metalness={0.05}
          flatShading={true}
        />
      </mesh>

      {/* 4. Distant Surrounding Mountain Peaks */}
      {mountainPeaks.map((peak) => (
        <group key={peak.id} position={[peak.x, peak.height / 2 - 10, peak.z]}>
          {/* Rock Body */}
          <mesh castShadow={false} receiveShadow={false}>
            <coneGeometry args={[peak.radiusBottom, peak.height, 5]} />
            <meshStandardMaterial
              color={isNight ? '#0b1329' : '#334155'}
              roughness={0.9}
              flatShading={true}
            />
          </mesh>
          {/* Snowy Top Cap */}
          <mesh position={[0, peak.height * 0.28, 0]}>
            <coneGeometry args={[peak.radiusBottom * 0.45, peak.height * 0.45, 5]} />
            <meshStandardMaterial
              color={isNight ? '#64748b' : '#f8fafc'}
              roughness={0.5}
              flatShading={true}
            />
          </mesh>
        </group>
      ))}

      {/* 5. Sea of Clouds below summit */}
      {cloudPuffs.map((c) => (
        <mesh key={c.id} position={[c.x, c.y, c.z]}>
          <sphereGeometry args={[c.scale, 7, 5]} />
          <meshStandardMaterial
            color={isNight ? '#1e293b' : '#ffffff'}
            transparent
            opacity={isNight ? 0.35 : 0.65}
            roughness={1}
            flatShading={artStyle === 'retro_8bit'}
          />
        </mesh>
      ))}

      {/* Summit Wind / Ambient Warm Beacon */}
      <pointLight
        position={[0, 4, 0]}
        color={isNight ? '#93c5fd' : '#fef08a'}
        distance={25}
        intensity={isNight ? 0.6 : 1.0}
      />
    </group>
  );
}
