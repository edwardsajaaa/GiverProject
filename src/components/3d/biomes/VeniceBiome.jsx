import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. VENETIAN HORIZON (ST. MARK'S CAMPANILE & BYZANTINE DOMES)
// ============================================================================
function VeniceBackground({ isNight }) {
  const towerColor = isNight ? '#0b1326' : '#7c4a30';
  const moonColor = isNight ? '#fef08a' : '#fbcfe8';

  return (
    <group position={[-42, -1.8, -42]}>
      {/* Italian Night Moon */}
      <mesh position={[-6, 36, -6]}>
        <circleGeometry args={[11, 32]} />
        <meshBasicMaterial color={moonColor} transparent opacity={isNight ? 0.9 : 0.8} />
      </mesh>

      {/* St. Mark's Campanile (Bell Tower of Venice) */}
      <group position={[0, 0, 0]}>
        {/* Main Brick Tower Shaft */}
        <mesh position={[0, 16, 0]} castShadow={false}>
          <boxGeometry args={[7.5, 32, 7.5]} />
          <meshStandardMaterial color={towerColor} roughness={0.9} flatShading />
        </mesh>
        {/* White Marble Loggia (Belfry) */}
        <mesh position={[0, 33.5, 0]}>
          <boxGeometry args={[8.2, 5, 8.2]} />
          <meshStandardMaterial color={isNight ? '#cbd5e1' : '#f8fafc'} roughness={0.6} />
        </mesh>
        {/* Pyramidal Spire Cap */}
        <mesh position={[0, 39, 0]}>
          <coneGeometry args={[4.8, 8, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={isNight ? '#065f46' : '#047857'} roughness={0.7} flatShading />
        </mesh>
        {/* Golden Angel Weather-Vane */}
        <mesh position={[0, 44, 0]}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* Basilica Domes Silhouettes */}
      {[-18, 18].map((dx, idx) => (
        <group key={idx} position={[dx, 8, (idx % 2) * -5]}>
          <mesh>
            <cylinderGeometry args={[5, 6, 8, 12]} />
            <meshStandardMaterial color={isNight ? '#091020' : '#475569'} roughness={0.85} />
          </mesh>
          <mesh position={[0, 6, 0]}>
            <sphereGeometry args={[5.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={isNight ? '#064e3b' : '#0f766e'} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 2. VENETIAN CANAL, GONDOLA & RIALTO FOOTBRIDGE
// ============================================================================
function VeniceCanalAndGondola({ isNight }) {
  const gondolaRef = useRef();

  useFrame((state) => {
    if (gondolaRef.current) {
      const t = state.clock.elapsedTime * 0.5;
      gondolaRef.current.position.z = Math.sin(t) * 1.5;
      gondolaRef.current.rotation.z = Math.sin(t * 1.5) * 0.04;
      gondolaRef.current.rotation.y = Math.cos(t * 0.8) * 0.05;
    }
  });

  return (
    <group position={[-5.8, 0, 0]}>
      {/* The Venetian Grand Canal Water */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.08, 22.2]} />
        <meshStandardMaterial
          color={isNight ? '#042f2e' : '#0d9488'}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Quayside Stone Walkway */}
      <mesh position={[2.6, 0.22, 0]} receiveShadow>
        <boxGeometry args={[0.6, 0.48, 22.2]} />
        <meshStandardMaterial color={isNight ? '#1e293b' : '#e2e8f0'} roughness={0.8} />
      </mesh>
      <mesh position={[-2.6, 0.22, 0]} receiveShadow>
        <boxGeometry args={[0.6, 0.48, 22.2]} />
        <meshStandardMaterial color={isNight ? '#1e293b' : '#e2e8f0'} roughness={0.8} />
      </mesh>

      {/* Striped Wooden Mooring Poles (Pali da Casada) */}
      {[
        [-1.8, 4.5], [-1.8, -4.5],
        [1.8, 6.5], [1.8, -6.5]
      ].map(([px, pz], pIdx) => (
        <group key={pIdx} position={[px, 0.8, pz]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.09, 2.2, 8]} />
            <meshStandardMaterial color="#0284c7" roughness={0.7} />
          </mesh>
          {/* White Spiral Stripes */}
          {[-0.6, -0.2, 0.2, 0.6].map((sy, sIdx) => (
            <mesh key={sIdx} position={[0, sy, 0]}>
              <cylinderGeometry args={[0.085, 0.085, 0.16, 8]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.7} />
            </mesh>
          ))}
          {/* Top Gold Knob */}
          <mesh position={[0, 1.15, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Traditional Venetian Wooden Gondola */}
      <group ref={gondolaRef} position={[0, 0.15, 0]}>
        {/* Slender Curved Gondola Hull */}
        <mesh castShadow>
          <boxGeometry args={[1.0, 0.28, 4.2]} />
          <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Tapered Prow (Front) */}
        <mesh position={[0, 0.18, 2.3]} rotation={[0.4, 0, 0]} castShadow>
          <coneGeometry args={[0.45, 1.2, 4]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        {/* Polished Brass Ferro Metal Prow Ornament (Iconic multi-prong prow) */}
        <mesh position={[0, 0.8, 2.7]}>
          <boxGeometry args={[0.04, 0.7, 0.25]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Crimson Velvet Upholstered Passenger Seat */}
        <mesh position={[0, 0.2, -0.4]}>
          <boxGeometry args={[0.65, 0.18, 0.6]} />
          <meshStandardMaterial color="#991b1b" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.42, -0.7]}>
          <boxGeometry args={[0.65, 0.35, 0.1]} />
          <meshStandardMaterial color="#991b1b" roughness={0.8} />
        </mesh>

        {/* Gondolier Wooden Oar */}
        <mesh position={[0.45, 0.5, -1.2]} rotation={[0.4, 0, 0.5]}>
          <cylinderGeometry args={[0.02, 0.03, 2.4, 6]} />
          <meshStandardMaterial color="#854d0e" roughness={0.7} />
        </mesh>
      </group>

      {/* Rialto-Style White Marble Arched Footbridge */}
      <group position={[0, 0.45, 6.5]}>
        {/* Curved Walkway */}
        {Array.from({ length: 9 }).map((_, i) => {
          const frac = (i - 4) / 4;
          const y = Math.cos(frac * 1.0) * 0.36;
          const x = frac * 2.3;
          const rz = -frac * 0.3;
          return (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, rz]} castShadow receiveShadow>
              <boxGeometry args={[0.55, 0.08, 2.0]} />
              <meshStandardMaterial color={isNight ? '#e2e8f0' : '#ffffff'} roughness={0.4} />
            </mesh>
          );
        })}
        {/* Classical White Marble Balustrades */}
        {[-1.05, 1.05].map((zSide, zIdx) => (
          <group key={zIdx} position={[0, 0.35, zSide]}>
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[4.8, 0.08, 0.1]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 3. VENETIAN PALAZZO FACADE & HANGING BRASS LANTERNS
// ============================================================================
function VenetianPalazzoCorner({ position = [4.5, 0, -4.5], isNight }) {
  return (
    <group position={position}>
      {/* Terracotta/Ochre Palazzo Wall */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[4.8, 4.4, 3.2]} />
        <meshStandardMaterial color={isNight ? '#3b1d16' : '#b45309'} roughness={0.85} />
      </mesh>

      {/* Gothic Quatrefoil Arched Windows with Warm Interior Glow */}
      {[-1.2, 1.2].map((wx, i) => (
        <group key={i} position={[wx, 2.4, 1.62]}>
          <mesh>
            <planeGeometry args={[1.1, 1.8]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={isNight ? 1.6 : 0.6}
            />
          </mesh>
          {/* Gothic Window Stone Frame */}
          <mesh scale={1.02}>
            <planeGeometry args={[1.1, 1.8]} />
            <meshStandardMaterial color="#1e293b" wireframe />
          </mesh>
          {/* Wrought Iron Flower Balcony with Red Geraniums */}
          <group position={[0, -0.7, 0.25]}>
            <mesh>
              <boxGeometry args={[1.3, 0.25, 0.4]} />
              <meshStandardMaterial color="#18181b" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <dodecahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial color="#ef4444" roughness={0.4} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Hanging Brass Venetian Lantern */}
      <group position={[-2.2, 2.2, 1.8]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#f59e0b"
            emissiveIntensity={isNight ? 2.5 : 0.8}
          />
        </mesh>
        <pointLight position={[0, 0, 0]} color="#ffb703" intensity={isNight ? 2.2 : 0.7} distance={5.5} decay={2} />
      </group>
    </group>
  );
}

// ============================================================================
// 4. MAIN VENICE BIOME ASSEMBLY (Venezia Serenade)
// ============================================================================
export function VeniceBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161e2a' : '#FAF7F2';
  const goldTrim = '#d4af37';

  return (
    <group>
      {/* 1. Distant St. Mark's Campanile & Venetian Horizon */}
      <VeniceBackground isNight={isNight} />

      {/* 2. Kraft Mineral Strata Pedestal */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[23.6, 1.6, 23.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#7c5e3f'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Foil Ribbon Rim */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[23.8, 0.08, 23.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Main Torn Paper Marble Pavement (Interactive Ground) */}
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
        <boxGeometry args={[22.4, 0.36, 22.4]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.9}
          metalness={0.03}
        />
      </mesh>

      {/* Venetian Marble Paving Inlays */}
      {[-7, -3, 1, 5, 9].map((z, idx) => (
        <mesh key={idx} position={[2, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[13, 0.12]} />
          <meshBasicMaterial
            color={isNight ? '#0d9488' : '#cbd5e1'}
            transparent
            opacity={isNight ? 0.3 : 0.6}
          />
        </mesh>
      ))}

      {/* 4. Grand Canal, Wooden Gondola & Rialto Footbridge */}
      <VeniceCanalAndGondola isNight={isNight} />

      {/* 5. Venetian Palazzo Corner Facade */}
      <VenetianPalazzoCorner isNight={isNight} />

      {/* 6. Romantic Venetian Promenade Street Lanterns */}
      {[
        [2.2, 6.8], [8.8, 6.8],
        [8.8, -1.5]
      ].map(([lx, lz], idx) => (
        <group key={idx} position={[lx, 0, lz]}>
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.1, 2.8, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
          <mesh position={[0, 2.9, 0]}>
            <octahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial
              color="#fffbeb"
              emissive={isNight ? '#ffb703' : '#fef08a'}
              emissiveIntensity={isNight ? 2.5 : 0.8}
            />
          </mesh>
          <pointLight position={[0, 2.9, 0]} color="#ffb703" intensity={isNight ? 2.2 : 0.7} distance={6} decay={2} />
        </group>
      ))}
    </group>
  );
}
