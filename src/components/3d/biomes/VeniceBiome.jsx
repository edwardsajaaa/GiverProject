import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. ST. MARK'S CAMPANILE & PIAZZA PALAZZO (Solidly Anchored on Island Terrace!)
// ============================================================================
function StMarksCampanileArchitecture({ position = [-9.2, 0, -9.2], isNight, onInteractiveClick }) {
  const brickColor = isNight ? '#25150e' : '#b45309';
  const marbleLoggia = isNight ? '#cbd5e1' : '#f8fafc';
  const greenCopperRoof = isNight ? '#064e3b' : '#047857';
  const goldAngel = '#d4af37';

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playBell();
        if (onInteractiveClick) onInteractiveClick('campanile');
      }}
      cursor="pointer"
    >
      {/* Piazza San Marco Marble Terrace Base */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.8, 0.9, 8.8]} />
        <meshStandardMaterial color={isNight ? '#1e2538' : '#f1f5f9'} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[8.9, 0.06, 8.9]} />
        <meshStandardMaterial color={goldAngel} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Terracotta Brick Tower Shaft */}
      <mesh position={[0, 9.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 17.8, 4.8]} />
        <meshStandardMaterial color={brickColor} roughness={0.85} flatShading />
      </mesh>

      {/* Fluted Brick Pilasters */}
      {[-2.42, 2.42].map((bx, i) => (
        <mesh key={i} position={[bx, 9.8, 0]} castShadow>
          <boxGeometry args={[0.2, 17.8, 4.2]} />
          <meshStandardMaterial color={brickColor} roughness={0.9} />
        </mesh>
      ))}

      {/* White Marble Loggia (Belfry with Arches) */}
      <group position={[0, 19.8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[5.2, 2.8, 5.2]} />
          <meshStandardMaterial color={marbleLoggia} roughness={0.6} />
        </mesh>
        {/* Belfry Arch Openings */}
        {[-2.62, 2.62].map((dx, i) => (
          <mesh key={i} position={[dx, 0, 0]}>
            <planeGeometry args={[2.2, 2.0]} />
            <meshStandardMaterial
              color={isNight ? '#fef08a' : '#1e293b'}
              emissive={isNight ? '#fbbf24' : '#000000'}
              emissiveIntensity={isNight ? 1.8 : 0}
            />
          </mesh>
        ))}
        {/* Golden Bell Inside */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.35, 0.55, 0.8, 8]} />
          <meshStandardMaterial color={goldAngel} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Attic Platform with Lion of St. Mark */}
      <mesh position={[0, 22.0, 0]} castShadow>
        <boxGeometry args={[4.6, 1.4, 4.6]} />
        <meshStandardMaterial color={marbleLoggia} roughness={0.6} />
      </mesh>

      {/* Pyramidal Spire Roof (Green Verdigris Copper) */}
      <mesh position={[0, 25.5, 0]} castShadow>
        <coneGeometry args={[2.8, 5.6, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color={greenCopperRoof} roughness={0.65} flatShading />
      </mesh>

      {/* Golden Angel Gabriel Weathervane on Pinnacle */}
      <group position={[0, 28.6, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.12, 0.8, 8]} />
          <meshStandardMaterial color={goldAngel} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial color={goldAngel} metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* Flanking Venetian Palazzo Wing */}
      <group position={[5.8, 0, 0]}>
        <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 5.6, 4.6]} />
          <meshStandardMaterial color={isNight ? '#3b1d16' : '#ea580c'} roughness={0.8} />
        </mesh>
        {/* Byzantine Dome */}
        <mesh position={[0, 6.2, 0]} castShadow>
          <sphereGeometry args={[2.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={greenCopperRoof} roughness={0.65} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 2. GRAND CANAL & TRADITIONAL WOODEN GONDOLA (Clickable to Rock & Splash!)
// ============================================================================
function GrandCanalAndGondola({ isNight, onInteractiveClick }) {
  const waterColor = isNight ? '#0b2a3a' : '#0ea5e9';
  const stoneQuay = isNight ? '#1e293b' : '#f1f5f9';
  const gondolaRef = useRef();

  useFrame((state) => {
    if (gondolaRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle floating and rocking motion
      gondolaRef.current.position.y = 0.08 + Math.sin(t * 1.6) * 0.04;
      gondolaRef.current.rotation.z = Math.sin(t * 1.2) * 0.035;
      gondolaRef.current.rotation.x = Math.cos(t * 1.0) * 0.02;
    }
  });

  return (
    <group>
      {/* Grand Canal Turquoise Water Bed */}
      <mesh position={[2.5, -0.05, 0]} receiveShadow>
        <boxGeometry args={[6.8, 0.1, 28.5]} />
        <meshStandardMaterial
          color={waterColor}
          metalness={0.88}
          roughness={0.12}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* White Marble Quay Borders (Fondamenta) */}
      <mesh position={[-0.95, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.45, 28.5]} />
        <meshStandardMaterial color={stoneQuay} roughness={0.7} />
      </mesh>
      <mesh position={[5.95, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.45, 28.5]} />
        <meshStandardMaterial color={stoneQuay} roughness={0.7} />
      </mesh>

      {/* Traditional Venetian Gondola with Crimson Velvet Cushions */}
      <group
        ref={gondolaRef}
        position={[2.5, 0.08, 2.5]}
        rotation={[0, 0.15, 0]}
        onClick={(e) => {
          e.stopPropagation();
          SoundEngine.playWaterSplash();
          if (onInteractiveClick) onInteractiveClick('gondola');
        }}
        cursor="pointer"
      >
        {/* Asymmetrical Curved Wooden Hull */}
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.38, 4.8]} />
          <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Brass Ferro (Iconic Metal Prow with 6 Prongs) */}
        <mesh position={[0, 0.45, -2.4]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.3]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Crimson Velvet Passenger Seat Cushion */}
        <mesh position={[0, 0.22, 0.2]}>
          <boxGeometry args={[0.9, 0.18, 1.4]} />
          <meshStandardMaterial color="#991b1b" roughness={0.9} />
        </mesh>
        {/* Polished Oarlock (Forcola) */}
        <mesh position={[0.7, 0.4, 1.2]}>
          <cylinderGeometry args={[0.04, 0.06, 0.45, 6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Floating Lantern on Gondola */}
        <group position={[0, 0.35, -1.2]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.15, 0.28, 6]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive={isNight ? '#f59e0b' : '#fef08a'}
              emissiveIntensity={isNight ? 2.2 : 0.6}
            />
          </mesh>
          {isNight && (
            <pointLight color="#fbbf24" intensity={1.5} distance={4.5} decay={1.8} />
          )}
        </group>
      </group>

      {/* Striped Wooden Mooring Poles (Pali da Casada - Blue & White / Red & White) */}
      {[
        { x: -0.4, z: -4.5, c: '#2563eb' },
        { x: -0.4, z: 5.5, c: '#dc2626' },
        { x: 5.4, z: -2.5, c: '#2563eb' },
        { x: 5.4, z: 7.2, c: '#dc2626' },
      ].map((pole, idx) => (
        <group key={idx} position={[pole.x, 0, pole.z]}>
          <mesh position={[0, 1.6, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 3.2, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
          {/* Diagonal Barber Stripes */}
          {[0.6, 1.2, 1.8, 2.4].map((sy, sIdx) => (
            <mesh key={sIdx} position={[0, sy, 0]}>
              <cylinderGeometry args={[0.105, 0.105, 0.22, 8]} />
              <meshStandardMaterial color={pole.c} roughness={0.5} />
            </mesh>
          ))}
          {/* Gold Finial Top */}
          <mesh position={[0, 3.25, 0]}>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Rialto White Marble Arched Footbridge Crossing Canal */}
      <group position={[2.5, 0, -0.5]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.4]} />
          <meshStandardMaterial color={stoneQuay} roughness={0.8} />
        </mesh>
        {/* Arched Walkway */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.2, 2.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.65} />
        </mesh>
        {/* Balustrade with Flower Boxes */}
        {[-1.35, 1.35].map((rz, rIdx) => (
          <group key={rIdx} position={[0, 1.05, rz]}>
            <mesh>
              <boxGeometry args={[7.2, 0.45, 0.12]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.7} />
            </mesh>
            {/* Red Geranium Flower Boxes */}
            {[-2.0, 0, 2.0].map((fx, fIdx) => (
              <mesh key={fIdx} position={[fx, 0.15, rz > 0 ? 0.12 : -0.12]}>
                <boxGeometry args={[1.1, 0.18, 0.22]} />
                <meshStandardMaterial color="#ef4444" roughness={0.5} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 3. VENETIAN WATERFRONT PALAZZO (Ochre & Terracotta with Gothic Quatrefoils)
// ============================================================================
function VenetianWaterfrontPalazzo({ position = [8.5, 0, -4.5], isNight, onInteractiveClick }) {
  const terracotta = isNight ? '#3b1d16' : '#ea580c';
  const marbleTrim = isNight ? '#cbd5e1' : '#f8fafc';

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playBell();
        if (onInteractiveClick) onInteractiveClick('palazzo');
      }}
      cursor="pointer"
    >
      {/* Marble Quay Foundation */}
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <boxGeometry args={[7.5, 0.36, 6.5]} />
        <meshStandardMaterial color={isNight ? '#1e2538' : '#e2e8f0'} roughness={0.85} />
      </mesh>

      {/* Main 2-Story Venetian Gothic Palazzo Body */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.2, 4.4, 5.8]} />
        <meshStandardMaterial color={terracotta} roughness={0.8} />
      </mesh>

      {/* Gothic Quatrefoil Arched Windows with Balconies */}
      {[-2.2, 0, 2.2].map((wx, i) => (
        <group key={i} position={[wx, 2.6, 2.92]}>
          <mesh>
            <planeGeometry args={[1.2, 1.8]} />
            <meshStandardMaterial
              color={isNight ? '#fef08a' : '#ffffff'}
              emissive={isNight ? '#f59e0b' : '#000000'}
              emissiveIntensity={isNight ? 1.6 : 0}
            />
          </mesh>
          {/* White Marble Balcony */}
          <group position={[0, -0.7, 0.25]}>
            <mesh>
              <boxGeometry args={[1.4, 0.3, 0.45]} />
              <meshStandardMaterial color={marbleTrim} />
            </mesh>
            {/* Flowers */}
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[1.2, 0.15, 0.25]} />
              <meshStandardMaterial color="#ec4899" />
            </mesh>
          </group>
        </group>
      ))}

      {/* Roof Cornice with Gothic Battlements */}
      <mesh position={[0, 4.85, 0]} castShadow>
        <boxGeometry args={[7.6, 0.35, 6.2]} />
        <meshStandardMaterial color={marbleTrim} roughness={0.6} />
      </mesh>

      {/* Hanging Brass Venetian Lanterns */}
      {[-3.2, 3.2].map((lx, i) => (
        <group key={i} position={[lx, 2.2, 3.1]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.7, 6]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} />
          </mesh>
          <mesh castShadow>
            <octahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={isNight ? 2.5 : 0.8}
            />
          </mesh>
          {isNight && (
            <pointLight color="#ffb703" intensity={1.8} distance={6} decay={1.8} />
          )}
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 4. MAIN VENICE BIOME ASSEMBLY (Expanded, Grounded & Interactive!)
// ============================================================================
export function VeniceBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161e2a' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const curbColor = isNight ? '#0f172a' : '#475569';

  return (
    <group>
      {/* 1. Expanded Solid Ground Strata Base (30 x 30 Size!) */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[31.6, 1.6, 31.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#7c5e3f'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Foil Ribbon Rim */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[31.8, 0.08, 31.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Main Marble Promenade Ground Platform (Expanded 30 x 30 Area!) */}
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
        <boxGeometry args={[30.4, 0.36, 30.4]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.88}
          metalness={0.03}
        />
      </mesh>

      {/* Venetian Marble Pavement Lines */}
      {[-12, -9, -6, -3, 3, 6, 9, 12].map((z, idx) => (
        <mesh key={idx} position={[8.5, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[11, 0.14]} />
          <meshBasicMaterial
            color={isNight ? '#38bdf8' : '#c4b5a0'}
            transparent
            opacity={isNight ? 0.25 : 0.6}
          />
        </mesh>
      ))}

      {/* Perimeter Rails */}
      <mesh position={[0, 0.04, 15.1]} receiveShadow>
        <boxGeometry args={[30.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.04, -15.1]} receiveShadow>
        <boxGeometry args={[30.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[15.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 29.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[-15.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 29.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>

      {/* 3. St. Mark's Campanile on Piazza Terrace (Firmly Grounded on Island!) */}
      <StMarksCampanileArchitecture position={[-9.2, 0, -9.2]} isNight={isNight} />

      {/* 4. Grand Canal with Traditional Wooden Gondola & Mooring Poles */}
      <GrandCanalAndGondola isNight={isNight} />

      {/* 5. Venetian Waterfront Palazzo Facade with Flower Balconies */}
      <VenetianWaterfrontPalazzo position={[8.5, 0, -4.5]} isNight={isNight} />

      {/* 6. Romantic Venetian Potted Olive Trees & Flower Urns */}
      <group position={[8.5, 0, 6.5]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.32, 2.4, 8]} />
          <meshStandardMaterial color="#452a1b" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <dodecahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial color={isNight ? '#166534' : '#22c55e'} roughness={0.65} flatShading />
        </mesh>
        <mesh position={[0, 0.15, 0]} receiveShadow>
          <cylinderGeometry args={[1.2, 1.3, 0.3, 12]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>
      </group>

      {/* 7. Gentle Ambient Night Romance Light in Venice */}
      {isNight && (
        <pointLight
          position={[0, 6, 0]}
          color="#fbcfe8"
          intensity={1.8}
          distance={22}
          decay={1.6}
        />
      )}
    </group>
  );
}
