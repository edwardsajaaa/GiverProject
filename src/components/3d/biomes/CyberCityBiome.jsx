import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BUILDING_COUNT = 36;

// Precompute building positions and dimensions statically once (module-level)
const STATIC_BUILDINGS = (() => {
  const dummy = new THREE.Object3D();
  const matrices = [];
  const radiusDist = 28;

  for (let i = 0; i < BUILDING_COUNT; i++) {
    // Deterministic pseudo-random values based on index
    const seed1 = Math.abs(Math.sin(i * 12.9898));
    const seed2 = Math.abs(Math.cos(i * 38.233));
    const seed3 = Math.abs(Math.sin(i * 93.185));

    const angle = (i / BUILDING_COUNT) * Math.PI * 2 + (Math.sin(i * 1.5) * 0.2);
    const dist = radiusDist + seed1 * 20;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    
    const width = 3 + seed2 * 4;
    const depth = 3 + seed3 * 4;
    const height = 12 + seed1 * 28;
    const y = height / 2 - 12;

    dummy.position.set(x, y, z);
    dummy.scale.set(width, height, depth);
    dummy.rotation.y = seed2 * Math.PI;
    dummy.updateMatrix();
    matrices.push(dummy.matrix.clone());
  }

  return matrices;
})();

const PALETTE_NIGHT = [
  new THREE.Color('#0f172a'),
  new THREE.Color('#1e1b4b'),
  new THREE.Color('#111827'),
  new THREE.Color('#022c22'),
  new THREE.Color('#18181b')
];

const PALETTE_DAY = [
  new THREE.Color('#94a3b8'),
  new THREE.Color('#cbd5e1'),
  new THREE.Color('#e2e8f0'),
  new THREE.Color('#64748b'),
  new THREE.Color('#a1a1aa')
];

export function CyberCityBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const instancedRef = useRef();

  // Generate color buffer purely
  const colors = useMemo(() => {
    const colArray = new Float32Array(BUILDING_COUNT * 3);
    const palette = isNight ? PALETTE_NIGHT : PALETTE_DAY;

    for (let i = 0; i < BUILDING_COUNT; i++) {
      const chosenColor = palette[i % palette.length];
      colArray[i * 3] = chosenColor.r;
      colArray[i * 3 + 1] = chosenColor.g;
      colArray[i * 3 + 2] = chosenColor.b;
    }
    return colArray;
  }, [isNight]);

  // Apply matrix to instanced mesh once on mount
  React.useEffect(() => {
    if (instancedRef.current) {
      STATIC_BUILDINGS.forEach((matrix, i) => {
        instancedRef.current.setMatrixAt(i, matrix);
      });
      instancedRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  // Subtle rooftop antenna beacon pulse
  const beaconRef = useRef();
  useFrame(({ clock }) => {
    if (beaconRef.current) {
      beaconRef.current.intensity = 1.0 + Math.sin(clock.getElapsedTime() * 4) * 0.8;
    }
  });

  return (
    <group>
      {/* 1. Distant Skyscrapers (Single Draw Call via InstancedMesh) */}
      <instancedMesh
        ref={instancedRef}
        args={[null, null, BUILDING_COUNT]}
        castShadow={false}
        receiveShadow={false}
      >
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </boxGeometry>
        <meshStandardMaterial
          roughness={0.7}
          metalness={0.4}
          vertexColors
          flatShading={artStyle === 'retro_8bit'}
        />
      </instancedMesh>

      {/* 2. Main Rooftop Plaza Platform (Interactive Ground) */}
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
        <cylinderGeometry args={[11, 11, 0.4, 8]} />
        <meshStandardMaterial
          color={isNight ? '#090d16' : '#27272a'}
          roughness={0.3}
          metalness={0.6}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      {/* 3. Rooftop Cyber Heli-Pad / Circuit Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[9.5, 9.8, 32]} />
        <meshBasicMaterial
          color={isNight ? '#00f0ff' : '#0284c7'}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[5.5, 5.7, 32]} />
        <meshBasicMaterial
          color={isNight ? '#f43f5e' : '#e11d48'}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* 4. Sub-deck Support Structure */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[10.5, 6, 4.6, 8]} />
        <meshStandardMaterial
          color={isNight ? '#05070c' : '#18181b'}
          roughness={0.8}
          metalness={0.5}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      {/* 5. Cyber Neon Accent Rails around the perimeter */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
        const ang = (idx / 8) * Math.PI * 2 + Math.PI / 8;
        const x = Math.cos(ang) * 10.8;
        const z = Math.sin(ang) * 10.8;
        return (
          <group key={idx} position={[x, 0.6, z]}>
            {/* Post */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 1.2, 6]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Blinking Top Cap */}
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#00f0ff' : '#ec4899'} />
            </mesh>
          </group>
        );
      })}

      {/* Pulsing Light Beacon on rooftop */}
      <pointLight
        ref={beaconRef}
        position={[0, 1.5, 0]}
        color={isNight ? '#00f0ff' : '#38bdf8'}
        distance={25}
        intensity={1.2}
      />
    </group>
  );
}
