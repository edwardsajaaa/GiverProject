import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

const BUILDING_COUNT = 36;

const STATIC_BUILDINGS = (() => {
  const dummy = new THREE.Object3D();
  const matrices = [];
  const radiusDist = 26;

  for (let i = 0; i < BUILDING_COUNT; i++) {
    const seed1 = Math.abs(Math.sin(i * 12.9898));
    const seed2 = Math.abs(Math.cos(i * 38.233));
    const seed3 = Math.abs(Math.sin(i * 93.185));

    const angle = (i / BUILDING_COUNT) * Math.PI * 2 + (Math.sin(i * 1.5) * 0.15);
    const dist = radiusDist + seed1 * 18;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    
    const width = 4 + seed2 * 5;
    const depth = 4 + seed3 * 5;
    const height = 18 + seed1 * 32;
    const y = height / 2 - 0.4;

    dummy.position.set(x, y, z);
    dummy.scale.set(width, height, depth);
    dummy.rotation.y = seed2 * Math.PI * 0.5;
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

function StreetLamp({ position, rotationY = 0, isNight }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 3.6, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.45, 3.55, 0]}>
        <boxGeometry args={[1.0, 0.08, 0.12]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.85, 3.48, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial
          color={isNight ? '#fef08a' : '#ffffff'}
          emissive={isNight ? '#eab308' : '#94a3b8'}
          emissiveIntensity={isNight ? 2.5 : 0.2}
          roughness={0.2}
        />
      </mesh>
      {isNight && (
        <pointLight position={[0.85, 3.2, 0]} color="#fef08a" distance={15} intensity={1.5} />
      )}
    </group>
  );
}

export function CyberCityBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const instancedRef = useRef();

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

  useEffect(() => {
    if (instancedRef.current) {
      STATIC_BUILDINGS.forEach((matrix, i) => {
        instancedRef.current.setMatrixAt(i, matrix);
      });
      instancedRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <group>
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[140, 0.4, 140]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#1e293b'}
          roughness={0.85}
          metalness={0.2}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

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
          metalness={0.3}
          vertexColors
          flatShading={artStyle === 'retro_8bit'}
        />
      </instancedMesh>

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
        <boxGeometry args={[22, 0.4, 22]} />
        <meshStandardMaterial
          color={isNight ? '#131825' : '#334155'}
          roughness={0.65}
          metalness={0.25}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      <group position={[0, 0.01, 0]}>
        {[-3, -1.8, -0.6, 0.6, 1.8, 3].map((offZ, idx) => (
          <mesh key={`cw-n-${idx}`} position={[0, 0, 9.2 + offZ]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.5, 0.35]} />
            <meshBasicMaterial color={isNight ? '#94a3b8' : '#e2e8f0'} />
          </mesh>
        ))}
        {[-3, -1.8, -0.6, 0.6, 1.8, 3].map((offZ, idx) => (
          <mesh key={`cw-s-${idx}`} position={[0, 0, -9.2 + offZ]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.5, 0.35]} />
            <meshBasicMaterial color={isNight ? '#94a3b8' : '#e2e8f0'} />
          </mesh>
        ))}
        {[-3, -1.8, -0.6, 0.6, 1.8, 3].map((offX, idx) => (
          <mesh key={`cw-e-${idx}`} position={[9.2 + offX, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[1.5, 0.35]} />
            <meshBasicMaterial color={isNight ? '#94a3b8' : '#e2e8f0'} />
          </mesh>
        ))}
        {[-3, -1.8, -0.6, 0.6, 1.8, 3].map((offX, idx) => (
          <mesh key={`cw-w-${idx}`} position={[-9.2 + offX, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[1.5, 0.35]} />
            <meshBasicMaterial color={isNight ? '#94a3b8' : '#e2e8f0'} />
          </mesh>
        ))}
      </group>

      <mesh position={[0, 0.02, 10.6]} receiveShadow>
        <boxGeometry args={[22.4, 0.12, 0.9]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#64748b'} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.02, -10.6]} receiveShadow>
        <boxGeometry args={[22.4, 0.12, 0.9]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#64748b'} roughness={0.7} />
      </mesh>
      <mesh position={[10.6, 0.02, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.12, 20.6]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#64748b'} roughness={0.7} />
      </mesh>
      <mesh position={[-10.6, 0.02, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.12, 20.6]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#64748b'} roughness={0.7} />
      </mesh>

      <StreetLamp position={[-9.5, 0, -9.5]} rotationY={Math.PI * 0.25} isNight={isNight} />
      <StreetLamp position={[9.5, 0, -9.5]} rotationY={Math.PI * 0.75} isNight={isNight} />
      <StreetLamp position={[9.5, 0, 9.5]} rotationY={Math.PI * 1.25} isNight={isNight} />
      <StreetLamp position={[-9.5, 0, 9.5]} rotationY={Math.PI * 1.75} isNight={isNight} />
    </group>
  );
}
