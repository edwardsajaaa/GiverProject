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

export function FloatingIsland({ timeMode = 'night', onGroundTap }) {
  const topMatRef = useRef();
  const sideMat1Ref = useRef();
  const sideMat2Ref = useRef();
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
        <cylinderGeometry args={[radius, radius, 0.4, 24]} />
        <meshStandardMaterial
          ref={topMatRef}
          color={isNightInit ? '#131826' : '#49a85c'}
          roughness={isNightInit ? 0.9 : 0.8}
          metalness={isNightInit ? 0.15 : 0.05}
        />
      </mesh>

      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.5, 24]} />
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

      <mesh position={[0, -1.6, 0]} receiveShadow>
        <cylinderGeometry args={[radius, 8.5, 2.4, 14]} />
        <meshStandardMaterial
          ref={sideMat1Ref}
          color={isNightInit ? '#0c0f18' : '#6b5344'}
          roughness={0.9}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>

      <mesh position={[0, -3.6, 0]} receiveShadow>
        <cylinderGeometry args={[8.5, 3.2, 2.2, 10]} />
        <meshStandardMaterial
          ref={sideMat2Ref}
          color={isNightInit ? '#06070b' : '#4a382e'}
          roughness={0.95}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>
    </group>
  );
}

export const OutdoorGround = FloatingIsland;
