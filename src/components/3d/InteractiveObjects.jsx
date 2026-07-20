import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';

export function Flower3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 1, 8]} />
        <meshStandardMaterial color="#2d8a4e" roughness={0.7} />
      </mesh>
      <group position={[0, 0.35, 0]}>
        <mesh position={[0.15, 0, 0.05]} rotation={[0.3, 0.5, -0.6]} castShadow>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="#3aad5c" roughness={0.6} />
        </mesh>
        <mesh position={[-0.15, 0.1, -0.05]} rotation={[0.4, -0.4, 0.6]} castShadow>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color="#3aad5c" roughness={0.6} />
        </mesh>
      </group>
      <group position={[0, 1.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#ffd700" roughness={0.4} />
        </mesh>
        {Array.from({ length: 6 }).map((_, idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          const px = Math.cos(angle) * 0.22;
          const pz = Math.sin(angle) * 0.22;
          return (
            <mesh key={idx} position={[px, -0.02, pz]} rotation={[0.2 * Math.cos(angle), -angle, 0.2 * Math.sin(angle)]} castShadow>
              <sphereGeometry args={[0.15, 10, 10]} />
              <meshStandardMaterial color="#ff6b9d" roughness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function Tree3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.2, 8]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.9} />
      </mesh>
      <group position={[0, 1.6, 0]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <coneGeometry args={[0.65, 1.1, 8]} />
          <meshStandardMaterial color="#4caf50" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <coneGeometry args={[0.9, 1.2, 8]} />
          <meshStandardMaterial color="#388e3c" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow>
          <coneGeometry args={[1.15, 1.3, 8]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export function Rock3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial color="#78909c" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[-0.3, 0.18, 0.1]} rotation={[0.5, 1.2, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#90a4ae" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function Lamp3D({ position = [0, 0, 0], timeMode = 'night' }) {
  const isNight = timeMode === 'night';
  const pole1Ref = useRef();
  const pole2Ref = useRef();
  const bulbRef = useRef();
  const lightRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    const isNightNow = timeMode === 'night';
    const lerpSpeed = delta * 3.5;
    if (pole1Ref.current) pole1Ref.current.color.lerp(isNightNow ? new THREE.Color('#2d3342') : new THREE.Color('#555555'), lerpSpeed);
    if (pole2Ref.current) pole2Ref.current.color.lerp(isNightNow ? new THREE.Color('#1e222d') : new THREE.Color('#444444'), lerpSpeed);
    if (bulbRef.current) {
      bulbRef.current.emissive.lerp(isNightNow ? new THREE.Color('#ffbe3b') : new THREE.Color('#ffd54f'), lerpSpeed);
      bulbRef.current.emissiveIntensity = THREE.MathUtils.lerp(bulbRef.current.emissiveIntensity, isNightNow ? 3.5 : 1.2, lerpSpeed);
    }
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, isNightNow ? 2.8 : 0.6, lerpSpeed);
      lightRef.current.distance = THREE.MathUtils.lerp(lightRef.current.distance, isNightNow ? 10 : 4, lerpSpeed);
    }
    if (haloRef.current) {
      haloRef.current.opacity = THREE.MathUtils.lerp(haloRef.current.opacity, isNightNow ? 0.18 : 0.0, lerpSpeed);
      haloRef.current.visible = haloRef.current.opacity > 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 2, 8]} />
        <meshStandardMaterial ref={pole1Ref} color={isNight ? '#2d3342' : '#555555'} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.08, 0.25, 8]} />
        <meshStandardMaterial ref={pole2Ref} color={isNight ? '#1e222d' : '#444444'} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial ref={bulbRef} color="#fff8e1" emissive={isNight ? '#ffbe3b' : '#ffd54f'} emissiveIntensity={isNight ? 3.5 : 1.2} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 1.9, 0]} color="#ffcf48" intensity={isNight ? 2.8 : 0.6} distance={isNight ? 10 : 4} decay={2} />
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial ref={haloRef} color="#ffcf48" transparent opacity={isNight ? 0.18 : 0.0} />
      </mesh>
    </group>
  );
}

export function Crystal3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.12;
      groupRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#c084fc" roughness={0.2} metalness={0.8} emissive="#6b21a8" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.35, 0.6, 0.2]} rotation={[0.4, 0.2, -0.3]} castShadow>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#e879f9" roughness={0.2} metalness={0.8} emissive="#86198f" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.32, 0.5, -0.15]} rotation={[-0.3, 0.5, 0.4]} castShadow>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} emissive="#0369a1" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export function Mushroom3D({ position = [0, 0, 0] }) {
  const capRef = useRef();
  useFrame((state) => {
    if (capRef.current) {
      capRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + position[2]) * 0.04;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.9, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.7} />
      </mesh>
      <group ref={capRef} position={[0, 0.9, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <meshStandardMaterial color="#f472b6" roughness={0.4} emissive="#be185d" emissiveIntensity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.2, 0.38, 0.15]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.22, 0.32, -0.1]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.05, 0.45, -0.2]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export function Pyramid3D({ position = [0, 0, 0] }) {
  const topRef = useRef();
  useFrame((state) => {
    if (topRef.current) {
      topRef.current.rotation.y += 0.02;
      topRef.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 2.5) * 0.06;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.85, 1.1, 4]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh ref={topRef} position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#fef08a" roughness={0.1} metalness={0.9} emissive="#d97706" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export function Fountain3D({ position = [0, 0, 0] }) {
  const waterRef = useRef();
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = 0.85 + Math.sin(state.clock.elapsedTime * 4) * 0.08;
      waterRef.current.scale.x = 1 + Math.cos(state.clock.elapsedTime * 4) * 0.1;
      waterRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.4, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.39, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.04, 16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>
      <mesh ref={waterRef} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#7dd3fc" roughness={0.1} transparent opacity={0.85} emissive="#0284c7" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

export function Tower3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.55, 1.8, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[0.55, 0.7, 12]} />
        <meshStandardMaterial color="#ef4444" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.82, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 12]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function Cactus3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 1.4, 10]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
      <group position={[0.25, 0.65, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -1.2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
        <mesh position={[0.15, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-0.25, 0.85, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 1.2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.35, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
        <mesh position={[-0.12, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.35, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
      </group>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#facc15" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Campfire3D({ position = [0, 0, 0] }) {
  const flameRef = useRef();
  useFrame((state) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.25;
      flameRef.current.scale.x = 1 + Math.cos(state.clock.elapsedTime * 6) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.4, 0]}>
        <coneGeometry args={[0.25, 0.6, 8]} />
        <meshStandardMaterial color="#f97316" roughness={0.2} emissive="#ea580c" emissiveIntensity={1.2} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color="#f97316" intensity={2.2} distance={6} decay={2} />
    </group>
  );
}

export function Monument3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.24, 1.6, 4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.15, 0]} castShadow>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} emissive="#d97706" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

const OBJECT_COMPONENTS = {
  flower: Flower3D,
  tree: Tree3D,
  rock: Rock3D,
  lamp: Lamp3D,
  crystal: Crystal3D,
  mushroom: Mushroom3D,
  pyramid: Pyramid3D,
  fountain: Fountain3D,
  tower: Tower3D,
  cactus: Cactus3D,
  campfire: Campfire3D,
  monument: Monument3D,
};

export function PlacedObjectWrapper({ obj, deleteMode, selected, onSelect, onDelete, timeMode, transformMode, setPlacedObjects }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const Comp = OBJECT_COMPONENTS[obj.type];
  if (!Comp) return null;

  const [ox, , oz] = obj.position;
  const rotY = obj.rotationY || 0;
  const scaleVal = obj.scale || 1;
  const ringColor = deleteMode ? '#ff4444' : selected ? '#4fc3f7' : timeMode === 'night' ? '#8ab4f8' : '#ffffff';
  const showRing = hovered || selected;

  // Handle updates from TransformControls dragging
  const handleTransformChange = () => {
    if (groupRef.current && setPlacedObjects) {
      const pos = groupRef.current.position;
      const rot = groupRef.current.rotation;
      const scl = groupRef.current.scale;
      setPlacedObjects(prev => prev.map(o => o.id === obj.id ? {
        ...o,
        position: [pos.x, pos.y, pos.z],
        rotationY: rot.y,
        scale: Math.max(0.2, scl.x) // Prevent scaling to 0 or negative
      } : o));
    }
  };

  return (
    <>
      {selected && !deleteMode && (
        <TransformControls
          object={groupRef}
          mode={transformMode}
          onMouseUp={handleTransformChange}
          showY={transformMode === 'translate' ? false : true}
          showX={transformMode === 'rotate' ? false : true}
          showZ={transformMode === 'rotate' ? false : true}
          size={0.6}
        />
      )}
      <group
        ref={groupRef}
        position={[ox, 0, oz]}
        rotation={[0, rotY, 0]}
        scale={[scaleVal, scaleVal, scaleVal]}
        onClick={(e) => { e.stopPropagation(); deleteMode ? onDelete(obj.id) : onSelect(obj.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <Comp position={[0, 0, 0]} timeMode={timeMode} />
        {showRing && (
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.65, 0.82, 40]} />
            <meshBasicMaterial color={ringColor} transparent opacity={hovered && deleteMode ? 0.9 : 0.65} />
          </mesh>
        )}
        <mesh position={[0, 0.6, 0]} visible={false}>
          <cylinderGeometry args={[0.9, 0.9, 1.8, 12]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </>
  );
}
