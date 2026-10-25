import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

export function MountainBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161e31' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const cloudRef = useRef();

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  const mountainPeaks = useMemo(() => {
    const peaks = [];
    const count = 14;
    const radius = 34;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = radius + (i % 3) * 6;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const height = 22 + ((i * 7) % 16);
      const radiusBottom = 11 + ((i * 3) % 7);
      peaks.push({ x, z, height, radiusBottom, id: i });
    }
    return peaks;
  }, []);

  return (
    <group>
      {/* 1. Kraft Paper Mountain Strata Pedestal */}
      <mesh position={[0, -9.5, 0]} receiveShadow>
        <cylinderGeometry args={[12, 34, 19, 7]} />
        <meshStandardMaterial
          color={isNight ? '#0b1325' : '#7c5e3f'}
          roughness={0.92}
          flatShading={true}
        />
      </mesh>

      {/* Gold Foil Ring Under Deckle Plateau */}
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[23.6, 0.08, 23.6]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Main Deckle-Edge Torn Paper Plateau (Interactive Ground) */}
      <mesh
        position={[0, -0.2, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (onGroundTap) {
            e.stopPropagation();
            onGroundTap(e.point.x, e.point.z);
            SoundEngine.playPop();
          }
        }}
      >
        <boxGeometry args={[22.4, 0.38, 22.4]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.9}
          metalness={0.03}
        />
      </mesh>

      {/* Alpine Snow Drift Layer on Summit */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[16.5, 0.05, 16.5]} />
        <meshStandardMaterial
          color={isNight ? '#93c5fd' : '#ffffff'}
          roughness={0.5}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* Dark Walnut Alpine Log Perimeter Rails */}
      {[-11.1, 11.1].map((pos, i) => (
        <React.Fragment key={i}>
          <mesh position={[0, 0.05, pos]} receiveShadow>
            <boxGeometry args={[22.6, 0.24, 0.45]} />
            <meshStandardMaterial color={isNight ? '#171412' : '#3d2516'} roughness={0.8} />
          </mesh>
          <mesh position={[pos, 0.05, 0]} receiveShadow>
            <boxGeometry args={[0.45, 0.24, 21.8]} />
            <meshStandardMaterial color={isNight ? '#171412' : '#3d2516'} roughness={0.8} />
          </mesh>
        </React.Fragment>
      ))}

      {/* 3. Layered Papercraft Mountain Peaks with Deckle Snow Caps */}
      {mountainPeaks.map((peak) => (
        <group key={peak.id} position={[peak.x, peak.height / 2 - 12, peak.z]}>
          {/* Main Origami Peak Cone */}
          <mesh castShadow={false} receiveShadow={false}>
            <coneGeometry args={[peak.radiusBottom, peak.height, 5]} />
            <meshStandardMaterial
              color={isNight ? '#0b162b' : '#374151'}
              roughness={0.9}
              flatShading={true}
            />
          </mesh>
          {/* Snow Cap with Gilded Seam */}
          <mesh position={[0, peak.height * 0.28, 0]}>
            <coneGeometry args={[peak.radiusBottom * 0.45, peak.height * 0.45, 5]} />
            <meshStandardMaterial
              color={isNight ? '#bfdbfe' : '#FAF7F2'}
              roughness={0.6}
              flatShading={true}
            />
          </mesh>
          {/* Gilded Peak Tip */}
          <mesh position={[0, peak.height * 0.48, 0]}>
            <coneGeometry args={[peak.radiusBottom * 0.08, peak.height * 0.1, 5]} />
            <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 4. Drifting Origami Cloud Sea */}
      <group ref={cloudRef} position={[0, -5, 0]}>
        {Array.from({ length: 8 }).map((_, cIdx) => {
          const a = (cIdx / 8) * Math.PI * 2;
          const r = 24 + (cIdx % 3) * 4;
          return (
            <mesh key={cIdx} position={[Math.cos(a) * r, (cIdx % 2) * 1.5, Math.sin(a) * r]}>
              <dodecahedronGeometry args={[4.5, 0]} />
              <meshStandardMaterial
                color={isNight ? '#1e293b' : '#FAF7F2'}
                transparent
                opacity={0.65}
                roughness={0.8}
                flatShading
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
