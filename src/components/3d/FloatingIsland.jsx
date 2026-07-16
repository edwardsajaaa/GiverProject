import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Box() {
  return (
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f8cff" roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

export function FloatingIsland({ timeMode = 'night', onGroundTap }) {
  const topMatRef = useRef();
  const sideMat1Ref = useRef();
  const sideMat2Ref = useRef();
  const ringMatsRef = useRef([]);
  const coneMatsRef = useRef([]);
  const pondMatRef = useRef();

  useFrame((state, delta) => {
    const isNight = timeMode === 'night';
    const lerpSpeed = delta * 3.5;

    const targetTop = isNight ? new THREE.Color('#131826') : new THREE.Color('#49a85c');
    const targetSide1 = isNight ? new THREE.Color('#0c0f18') : new THREE.Color('#6b5344');
    const targetSide2 = isNight ? new THREE.Color('#06070b') : new THREE.Color('#4a382e');
    const targetPond = isNight ? new THREE.Color('#0284c7') : new THREE.Color('#38bdf8');

    if (topMatRef.current) {
      topMatRef.current.color.lerp(targetTop, lerpSpeed);
      topMatRef.current.roughness = THREE.MathUtils.lerp(topMatRef.current.roughness, isNight ? 0.9 : 0.8, lerpSpeed);
      topMatRef.current.metalness = THREE.MathUtils.lerp(topMatRef.current.metalness, isNight ? 0.15 : 0.05, lerpSpeed);
    }
    if (sideMat1Ref.current) sideMat1Ref.current.color.lerp(targetSide1, lerpSpeed);
    if (sideMat2Ref.current) sideMat2Ref.current.color.lerp(targetSide2, lerpSpeed);

    if (pondMatRef.current) {
      pondMatRef.current.color.lerp(targetPond, lerpSpeed);
      pondMatRef.current.emissive.lerp(isNight ? new THREE.Color('#0284c7') : new THREE.Color('#000000'), lerpSpeed);
      pondMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(pondMatRef.current.emissiveIntensity, isNight ? 0.4 : 0, lerpSpeed);
    }

    ringMatsRef.current.forEach(mat => {
      if (mat) {
        mat.color.lerp(isNight ? new THREE.Color('#38bdf8') : new THREE.Color('#72d686'), lerpSpeed);
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, isNight ? 0.15 : 0.22, lerpSpeed);
      }
    });

    coneMatsRef.current.forEach((mat, i) => {
      if (mat) {
        const targetColor = isNight ? (i % 2 === 0 ? new THREE.Color('#38bdf8') : new THREE.Color('#e879f9')) : new THREE.Color('#358a47');
        const targetEmissive = isNight ? (i % 2 === 0 ? new THREE.Color('#0284c7') : new THREE.Color('#c026d3')) : new THREE.Color('#000000');
        mat.color.lerp(targetColor, lerpSpeed);
        mat.emissive.lerp(targetEmissive, lerpSpeed);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isNight ? 1.5 : 0, lerpSpeed);
      }
    });
  });

  const isNightInit = timeMode === 'night';
  const radius = 11;

  return (
    <group>
      {/* Top Grass Ground Cylinder */}
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
        <cylinderGeometry args={[radius, radius, 0.4, 64]} />
        <meshStandardMaterial ref={topMatRef} color={isNightInit ? '#131826' : '#49a85c'} roughness={isNightInit ? 0.9 : 0.8} metalness={isNightInit ? 0.15 : 0.05} />
      </mesh>

      {/* Crystal clear glowing center pond / pool */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.4, 32]} />
        <meshStandardMaterial
          ref={pondMatRef}
          color={isNightInit ? '#0284c7' : '#38bdf8'}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.85}
          emissive={isNightInit ? '#0284c7' : '#000000'}
          emissiveIntensity={isNightInit ? 0.4 : 0}
        />
      </mesh>

      {/* Concentric Glowing Energy Rings */}
      {[3.8, 6.5, 9.2].map((r, idx) => (
        <mesh key={idx} position={[0, 0.01 + idx * 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.04, r + 0.04, 64]} />
          <meshBasicMaterial ref={el => ringMatsRef.current[idx] = el} color={isNightInit ? '#38bdf8' : '#72d686'} transparent opacity={isNightInit ? 0.15 : 0.22} />
        </mesh>
      ))}

      {/* 16 Border Crystals / Grass Cones */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * (radius - 0.4), 0.18, Math.sin(angle) * (radius - 0.4)]} rotation={[0, -angle, 0]} castShadow>
            <coneGeometry args={[0.15, 0.36, 6]} />
            <meshStandardMaterial ref={el => coneMatsRef.current[i] = el} color={isNightInit ? (i % 2 === 0 ? '#38bdf8' : '#e879f9') : '#358a47'} emissive={isNightInit ? (i % 2 === 0 ? '#0284c7' : '#c026d3') : '#000000'} emissiveIntensity={isNightInit ? 1.5 : 0} roughness={0.6} />
          </mesh>
        );
      })}

      {/* Rock Cliffs Layer 1 */}
      <mesh position={[0, -1.7, 0]} receiveShadow><cylinderGeometry args={[radius, 8.8, 2.6, 64]} /><meshStandardMaterial ref={sideMat1Ref} color={isNightInit ? '#0c0f18' : '#6b5344'} roughness={0.95} /></mesh>
      {/* Rock Cliffs Layer 2 (Tapered Bottom) */}
      <mesh position={[0, -4.0, 0]} receiveShadow><cylinderGeometry args={[8.8, 3.8, 2.0, 64]} /><meshStandardMaterial ref={sideMat2Ref} color={isNightInit ? '#06070b' : '#4a382e'} roughness={0.95} /></mesh>
    </group>
  );
}

// Alias for backward compatibility if needed
export const OutdoorGround = FloatingIsland;
