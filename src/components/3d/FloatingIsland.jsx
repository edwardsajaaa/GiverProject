import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLOR_TOP_NIGHT = new THREE.Color('#131826');
const COLOR_TOP_DAY = new THREE.Color('#49a85c');
const COLOR_SIDE1_NIGHT = new THREE.Color('#0c0f18');
const COLOR_SIDE1_DAY = new THREE.Color('#6b5344');
const COLOR_SIDE2_NIGHT = new THREE.Color('#06070b');
const COLOR_SIDE2_DAY = new THREE.Color('#4a382e');
const COLOR_POND_NIGHT = new THREE.Color('#0284c7');
const COLOR_POND_DAY = new THREE.Color('#38bdf8');
const COLOR_BLACK = new THREE.Color('#000000');
const COLOR_RING_NIGHT = new THREE.Color('#38bdf8');
const COLOR_RING_DAY = new THREE.Color('#72d686');
const COLOR_CYAN = new THREE.Color('#38bdf8');
const COLOR_PURPLE = new THREE.Color('#e879f9');
const COLOR_GRASS = new THREE.Color('#358a47');
const COLOR_EMISSIVE_CYAN = new THREE.Color('#0284c7');
const COLOR_EMISSIVE_PURPLE = new THREE.Color('#c026d3');

export function FloatingIsland({ timeMode = 'night', onGroundTap }) {
  const topMatRef = useRef();
  const sideMat1Ref = useRef();
  const sideMat2Ref = useRef();
  const ringMatsRef = useRef([]);
  const coneMatsRef = useRef([]);
  const pondMatRef = useRef();

  useFrame((state, delta) => {
    const isNight = timeMode === 'night';
    const lerpSpeed = Math.min(1, delta * 3.5);

    const targetTop = isNight ? COLOR_TOP_NIGHT : COLOR_TOP_DAY;
    const targetSide1 = isNight ? COLOR_SIDE1_NIGHT : COLOR_SIDE1_DAY;
    const targetSide2 = isNight ? COLOR_SIDE2_NIGHT : COLOR_SIDE2_DAY;
    const targetPond = isNight ? COLOR_POND_NIGHT : COLOR_POND_DAY;

    if (topMatRef.current) {
      topMatRef.current.color.lerp(targetTop, lerpSpeed);
      topMatRef.current.roughness = THREE.MathUtils.lerp(topMatRef.current.roughness, isNight ? 0.9 : 0.8, lerpSpeed);
      topMatRef.current.metalness = THREE.MathUtils.lerp(topMatRef.current.metalness, isNight ? 0.15 : 0.05, lerpSpeed);
    }
    if (sideMat1Ref.current) sideMat1Ref.current.color.lerp(targetSide1, lerpSpeed);
    if (sideMat2Ref.current) sideMat2Ref.current.color.lerp(targetSide2, lerpSpeed);

    if (pondMatRef.current) {
      pondMatRef.current.color.lerp(targetPond, lerpSpeed);
      pondMatRef.current.emissive.lerp(isNight ? COLOR_POND_NIGHT : COLOR_BLACK, lerpSpeed);
      pondMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(pondMatRef.current.emissiveIntensity, isNight ? 1.5 : 0.2, lerpSpeed);
    }

    ringMatsRef.current.forEach(mat => {
      if (mat) {
        mat.color.lerp(isNight ? COLOR_RING_NIGHT : COLOR_RING_DAY, lerpSpeed);
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, isNight ? 0.15 : 0.22, lerpSpeed);
      }
    });

    coneMatsRef.current.forEach((mat, i) => {
      if (mat) {
        const targetColor = isNight ? (i % 2 === 0 ? COLOR_CYAN : COLOR_PURPLE) : COLOR_GRASS;
        const targetEmissive = isNight ? (i % 2 === 0 ? COLOR_EMISSIVE_CYAN : COLOR_EMISSIVE_PURPLE) : COLOR_BLACK;
        mat.color.lerp(targetColor, lerpSpeed);
        mat.emissive.lerp(targetEmissive, lerpSpeed);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isNight ? 4.0 : 0.1, lerpSpeed);
      }
    });
  });

  const isNightInit = timeMode === 'night';
  const radius = 11;

  return (
    <group>
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
        <cylinderGeometry args={[radius, radius, 0.4, 32]} />
        <meshStandardMaterial ref={topMatRef} color={isNightInit ? '#131826' : '#49a85c'} roughness={isNightInit ? 0.9 : 0.8} metalness={isNightInit ? 0.15 : 0.05} />
      </mesh>

      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.4, 24]} />
        <meshStandardMaterial
          ref={pondMatRef}
          color={isNightInit ? '#0284c7' : '#38bdf8'}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.85}
          emissive={isNightInit ? '#0284c7' : '#000000'}
          emissiveIntensity={isNightInit ? 1.5 : 0.2}
        />
      </mesh>

      {[3.8, 6.5, 9.2].map((r, idx) => (
        <mesh key={idx} position={[0, 0.01 + idx * 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.04, r + 0.04, 32]} />
          <meshBasicMaterial ref={el => ringMatsRef.current[idx] = el} color={isNightInit ? '#38bdf8' : '#72d686'} transparent opacity={isNightInit ? 0.15 : 0.22} />
        </mesh>
      ))}

      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * (radius - 0.4), 0.18, Math.sin(angle) * (radius - 0.4)]} rotation={[0, -angle, 0]} castShadow>
            <coneGeometry args={[0.15, 0.36, 6]} />
            <meshStandardMaterial ref={el => coneMatsRef.current[i] = el} color={isNightInit ? (i % 2 === 0 ? '#38bdf8' : '#e879f9') : '#358a47'} emissive={isNightInit ? (i % 2 === 0 ? '#0284c7' : '#c026d3') : '#000000'} emissiveIntensity={isNightInit ? 4.0 : 0.1} roughness={0.3} metalness={0.2} />
          </mesh>
        );
      })}

      <mesh position={[0, -1.7, 0]} receiveShadow>
        <cylinderGeometry args={[radius, 8.8, 2.6, 32]} />
        <meshStandardMaterial ref={sideMat1Ref} color={isNightInit ? '#0c0f18' : '#6b5344'} roughness={0.8} metalness={0.15} />
      </mesh>

      <mesh position={[0, -4.0, 0]} receiveShadow>
        <cylinderGeometry args={[8.8, 3.8, 2.0, 32]} />
        <meshStandardMaterial ref={sideMat2Ref} color={isNightInit ? '#06070b' : '#4a382e'} roughness={0.85} metalness={0.2} />
      </mesh>
    </group>
  );
}

export const OutdoorGround = FloatingIsland;
