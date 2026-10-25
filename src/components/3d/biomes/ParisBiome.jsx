import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. MAJESTIC EIFFEL TOWER & PARISIAN ROOFTOPS SILHOUETTE
// ============================================================================
function EiffelTowerBackground({ isNight }) {
  const beaconRef = useRef();
  const towerColor = isNight ? '#0b1424' : '#334155';
  const goldLight = '#d4af37';
  const moonColor = isNight ? '#fef08a' : '#fbcfe8';

  useFrame((state) => {
    if (beaconRef.current) {
      // Rotating beacon beam of the Eiffel Tower
      beaconRef.current.rotation.y = state.clock.elapsedTime * 0.45;
    }
  });

  return (
    <group position={[-42, -1.8, -42]}>
      {/* Romantic Parisian Moon Disc */}
      <mesh position={[-6, 36, -6]}>
        <circleGeometry args={[11, 32]} />
        <meshBasicMaterial
          color={moonColor}
          transparent
          opacity={isNight ? 0.9 : 0.8}
        />
      </mesh>
      {/* Gold Ring Halo */}
      <mesh position={[-6, 36, -5.95]}>
        <ringGeometry args={[10.9, 11.2, 32]} />
        <meshBasicMaterial color={goldLight} transparent opacity={0.6} />
      </mesh>

      {/* Eiffel Tower Architecture (Tiered Geometric Papercraft Wrought-Iron) */}
      <group position={[0, 0, 0]}>
        {/* Tier 1: Wide Arch Base */}
        <mesh position={[0, 5, 0]} castShadow={false}>
          <cylinderGeometry args={[8.5, 14.5, 10, 4, 1, true]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={towerColor} roughness={0.9} flatShading />
        </mesh>
        {/* Base Arch Cutout Visual */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[6.2, 7.8, 5.2, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshBasicMaterial color={isNight ? '#030712' : '#e5e7eb'} />
        </mesh>

        {/* Tier 1 Platform Balcony */}
        <mesh position={[0, 10.2, 0]}>
          <boxGeometry args={[13, 0.6, 13]} />
          <meshStandardMaterial color={goldLight} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Tier 2: Mid Tower Shaft */}
        <mesh position={[0, 16.5, 0]}>
          <cylinderGeometry args={[4.2, 7.8, 12, 4, 1, true]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={towerColor} roughness={0.9} flatShading />
        </mesh>

        {/* Tier 2 Platform Balcony */}
        <mesh position={[0, 22.8, 0]}>
          <boxGeometry args={[7.2, 0.5, 7.2]} />
          <meshStandardMaterial color={goldLight} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Tier 3: Top Pillar & Spire Dome */}
        <mesh position={[0, 31, 0]}>
          <cylinderGeometry args={[1.2, 3.8, 16, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={towerColor} roughness={0.85} flatShading />
        </mesh>

        {/* Pinnacle Dome & Golden Light Beacon */}
        <mesh position={[0, 39.5, 0]}>
          <cylinderGeometry args={[0.2, 0.9, 3, 6]} />
          <meshStandardMaterial
            color={goldLight}
            emissive={goldLight}
            emissiveIntensity={isNight ? 2.5 : 0.8}
            metalness={0.9}
          />
        </mesh>

        {/* Rotating Lighthouse Searchlight Beacon */}
        <group ref={beaconRef} position={[0, 40, 0]}>
          <mesh position={[12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[3.5, 24, 8, 1, true]} />
            <meshBasicMaterial
              color="#fef08a"
              transparent
              opacity={isNight ? 0.35 : 0.08}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Twinkling Golden Champagne Sparkler Lights on the Tower */}
        {[
          [3, 11, 3], [-3, 11, 3], [3, 11, -3], [-3, 11, -3],
          [1.8, 23.5, 1.8], [-1.8, 23.5, -1.8],
          [0.8, 33, 0.8], [-0.8, 33, -0.8]
        ].map((pt, i) => (
          <mesh key={i} position={pt}>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#fef08a"
              emissiveIntensity={isNight ? 3.0 : 1.0}
            />
          </mesh>
        ))}
      </group>

      {/* Parisian Haussmann Mansard Roof Silhouettes */}
      {[-24, -12, 14, 26].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 2.5, (idx % 2) * -6]}>
          <mesh>
            <boxGeometry args={[10, 7 + (idx % 3) * 2, 8]} />
            <meshStandardMaterial color={isNight ? '#080d19' : '#475569'} roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 4.2 + (idx % 3), 0]}>
            <coneGeometry args={[6.5, 3.5, 4]} rotation={[0, Math.PI / 4, 0]} />
            <meshStandardMaterial color={isNight ? '#050811' : '#334155'} roughness={0.9} flatShading />
          </mesh>
          {/* Warm Parisian Attic Window Lights */}
          {[-2.2, 0, 2.2].map((wx, wIdx) => (
            <mesh key={wIdx} position={[wx, 1.5, 4.05]}>
              <planeGeometry args={[1.2, 1.6]} />
              <meshBasicMaterial color={isNight ? '#fef08a' : '#ffffff'} opacity={0.85} transparent />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 2. PARISIAN CAST-IRON STREET GAS LAMP (Lanterne de Paris)
// ============================================================================
function ParisStreetLamp({ position = [0, 0, 0], scale = 1, isNight }) {
  return (
    <group position={position} scale={scale}>
      {/* Ornate Fluted Cast-Iron Base */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.28, 0.7, 8]} />
        <meshStandardMaterial color="#17202a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Tall Lamp Pole */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 2.2, 8]} />
        <meshStandardMaterial color="#17202a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Decorative Curled Iron Bracket with Gold Leaf Accent */}
      <mesh position={[0, 2.78, 0]}>
        <torusGeometry args={[0.22, 0.03, 6, 12, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Hexagonal Glass Lantern Head */}
      <mesh position={[0, 3.1, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.2, 0.55, 6]} />
        <meshStandardMaterial
          color="#fffbeb"
          emissive={isNight ? '#ffb703' : '#fef08a'}
          emissiveIntensity={isNight ? 2.6 : 0.8}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Dark Iron Lantern Roof & Finial Spike */}
      <mesh position={[0, 3.48, 0]} castShadow>
        <coneGeometry args={[0.42, 0.28, 6]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.68, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Romantic Golden Gas Light Glow */}
      <pointLight
        position={[0, 3.1, 0]}
        color="#ffb703"
        intensity={isNight ? 2.5 : 0.7}
        distance={7.5}
        decay={2}
      />
    </group>
  );
}

// ============================================================================
// 3. PONT DES ARTS LOVE-LOCK BRIDGE CROSSING THE RIVER SEINE
// ============================================================================
function PontDesArtsBridge({ isNight }) {
  const lockColors = ['#dc2626', '#d4af37', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
  const paperBoatRef = useRef();

  useFrame((state) => {
    if (paperBoatRef.current) {
      const t = state.clock.elapsedTime * 0.4;
      paperBoatRef.current.position.z = 4.8 + Math.sin(t) * 1.8;
      paperBoatRef.current.position.x = -6.8 + Math.cos(t) * 0.4;
      paperBoatRef.current.rotation.y = Math.sin(t) * 0.15;
    }
  });

  return (
    <group position={[-5.8, 0, 0]}>
      {/* The River Seine Waterway */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.08, 22.2]} />
        <meshStandardMaterial
          color={isNight ? '#082f49' : '#38bdf8'}
          roughness={0.12}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Stone Embankment Wall Quayside (Quai de la Seine) */}
      <mesh position={[2.6, 0.24, 0]} receiveShadow>
        <boxGeometry args={[0.6, 0.52, 22.2]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#78716c'} roughness={0.85} />
      </mesh>
      <mesh position={[-2.6, 0.24, 0]} receiveShadow>
        <boxGeometry args={[0.6, 0.52, 22.2]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#78716c'} roughness={0.85} />
      </mesh>

      {/* Pont des Arts Arched Footbridge Crossing the River */}
      <group position={[0, 0.5, 0]}>
        {/* Wooden Walkway Deck */}
        {Array.from({ length: 9 }).map((_, i) => {
          const frac = (i - 4) / 4;
          const y = Math.cos(frac * 1.0) * 0.35;
          const x = frac * 2.3;
          const rz = -frac * 0.3;
          return (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, rz]} castShadow receiveShadow>
              <boxGeometry args={[0.55, 0.08, 2.2]} />
              <meshStandardMaterial color="#543825" roughness={0.7} />
            </mesh>
          );
        })}

        {/* Dual Cast-Iron Railings with Love Padlocks */}
        {[-1.15, 1.15].map((zSide, zIdx) => (
          <group key={zIdx} position={[0, 0.35, zSide]}>
            {/* Long Brass Rail */}
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[4.8, 0.06, 0.06]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Mesh Grille with Clustered Love Padlocks */}
            {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((lx, lIdx) => (
              <group key={lIdx} position={[lx, 0.1, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.02, 0.02, 0.45, 4]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.7} />
                </mesh>
                {/* Colorful Love Lock */}
                <mesh position={[0, (lIdx % 3) * 0.08 - 0.08, (zSide > 0 ? 0.04 : -0.04)]}>
                  <boxGeometry args={[0.09, 0.11, 0.04]} />
                  <meshStandardMaterial
                    color={lockColors[lIdx % lockColors.length]}
                    metalness={0.85}
                    roughness={0.3}
                  />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* Romantic Drifting Folded Paper Boat with Candle */}
      <group ref={paperBoatRef}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <coneGeometry args={[0.3, 0.85, 4]} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.4} flatShading />
        </mesh>
        <mesh position={[0, 0.45, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.22, 0.6, 3]} />
          <meshStandardMaterial color="#fff1f2" roughness={0.5} flatShading />
        </mesh>
        <pointLight position={[0, 0.4, 0]} color="#ffb703" intensity={0.9} distance={3.5} />
      </group>
    </group>
  );
}

// ============================================================================
// 4. ROMANTIC PARISIAN SIDEWALK CAFÉ (Café de Paris)
// ============================================================================
function ParisianSidewalkCafe({ position = [4.5, 0, 4.5], isNight }) {
  return (
    <group position={position}>
      {/* Striped Crimson & Cream Café Awning */}
      <group position={[0, 2.5, -2.8]}>
        {/* Main Slanted Awning Roof */}
        <mesh position={[0, 0.2, 0.8]} rotation={[-0.45, 0, 0]} castShadow>
          <boxGeometry args={[5.2, 0.08, 2.2]} />
          <meshStandardMaterial color="#a61324" roughness={0.7} />
        </mesh>
        {/* Alternating Cream Stripes */}
        {[-1.8, -0.6, 0.6, 1.8].map((sx, idx) => (
          <mesh key={idx} position={[sx, 0.245, 0.8]} rotation={[-0.45, 0, 0]}>
            <boxGeometry args={[0.55, 0.085, 2.22]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.7} />
          </mesh>
        ))}
        {/* Scalloped Valance Drop */}
        <mesh position={[0, -0.25, 1.8]}>
          <boxGeometry args={[5.2, 0.35, 0.06]} />
          <meshStandardMaterial color="#a61324" roughness={0.7} />
        </mesh>
      </group>

      {/* Bistro Round Tables & Wicker Chairs */}
      {[-1.5, 1.5].map((tx, tIdx) => (
        <group key={tIdx} position={[tx, 0, 0]}>
          {/* Table Pedestal (Cast Iron) */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.22, 0.8, 8]} />
            <meshStandardMaterial color="#17202a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* White Marble Tabletop with Brass Rim */}
          <mesh position={[0, 0.82, 0]} castShadow>
            <cylinderGeometry args={[0.58, 0.58, 0.05, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <torusGeometry args={[0.58, 0.02, 6, 18]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Candle Lantern on Table */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.2, 8]} />
            <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.8} />
          </mesh>
          <pointLight position={[0, 1.0, 0]} color="#f59e0b" intensity={0.8} distance={3} />

          {/* Two Wicker Bistro Chairs */}
          {[-0.65, 0.65].map((cx, cIdx) => (
            <group key={cIdx} position={[cx, 0, 0]} rotation={[0, cx > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
              <mesh position={[0, 0.26, 0]} castShadow>
                <cylinderGeometry args={[0.22, 0.24, 0.06, 8]} />
                <meshStandardMaterial color="#854d0e" roughness={0.8} />
              </mesh>
              {/* Curved Backrest */}
              <mesh position={[0, 0.62, -0.18]} castShadow>
                <boxGeometry args={[0.42, 0.45, 0.06]} />
                <meshStandardMaterial color="#78350f" roughness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Vintage Flower Cart with Red Roses & Lavender */}
      <group position={[-3.2, 0, 1.2]} rotation={[0, 0.35, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[1.6, 0.65, 0.9]} />
          <meshStandardMaterial color="#452a1b" roughness={0.85} />
        </mesh>
        {/* Wooden Cart Wheels */}
        {[-0.8, 0.8].map((wx, wIdx) => (
          <mesh key={wIdx} position={[wx, 0.35, 0.5]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.08, 12]} />
            <meshStandardMaterial color="#271b12" roughness={0.9} />
          </mesh>
        ))}
        {/* Flower Tubs (Red Roses & Violet Lavender) */}
        {[-0.45, 0, 0.45].map((fx, fIdx) => (
          <group key={fIdx} position={[fx, 0.88, 0]}>
            <mesh>
              <dodecahedronGeometry args={[0.26, 1]} />
              <meshStandardMaterial
                color={fIdx === 1 ? '#a855f7' : '#dc2626'}
                roughness={0.4}
                flatShading
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 5. ROMANTIC FALLING ROSE PETALS (Pluie de Pétales)
// ============================================================================
function FallingRosePetals({ count = 46, isNight }) {
  const petalsRef = useRef();
  const petalData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 8 + 0.5,
      z: (Math.random() - 0.5) * 22,
      speedY: 0.016 + Math.random() * 0.024,
      speedRot: 0.02 + Math.random() * 0.04,
      sway: 0.5 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      scale: 0.08 + Math.random() * 0.05,
    }));
  }, [count]);

  useFrame((state) => {
    if (petalsRef.current) {
      const t = state.clock.elapsedTime;
      petalsRef.current.children.forEach((child, i) => {
        const p = petalData[i];
        p.y -= p.speedY;
        if (p.y < 0.05) {
          p.y = 8;
          p.x = (Math.random() - 0.5) * 22;
          p.z = (Math.random() - 0.5) * 22;
        }
        child.position.set(
          p.x + Math.sin(t * p.sway + p.phase) * 0.55,
          p.y,
          p.z + Math.cos(t * p.sway + p.phase) * 0.55
        );
        child.rotation.x += p.speedRot;
        child.rotation.y += p.speedRot * 0.8;
      });
    }
  });

  return (
    <group ref={petalsRef}>
      {petalData.map((p, idx) => (
        <mesh key={idx} scale={p.scale}>
          <planeGeometry args={[1, 1.3]} />
          <meshBasicMaterial
            color={isNight ? '#f43f5e' : '#e11d48'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 6. MAIN PARIS BIOME ASSEMBLY (Paris Romantique)
// ============================================================================
export function ParisBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161e2e' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const curbColor = isNight ? '#0f172a' : '#574230';

  return (
    <group>
      {/* 1. Distant Eiffel Tower & Haussmann Parisian Rooftops */}
      <EiffelTowerBackground isNight={isNight} />

      {/* 2. Kraft Mineral Strata Pedestal */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[23.6, 1.6, 23.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#8c6d48'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Leaf Contour Ribbon */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[23.8, 0.08, 23.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Main Torn Paper Cobblestone Promenade (Interactive Ground) */}
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

      {/* Parisian Cobblestone Paving Lines */}
      {[-8, -6, -4, -2, 2, 4, 6, 8].map((z, idx) => (
        <mesh key={idx} position={[2.5, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[14, 0.12]} />
          <meshBasicMaterial
            color={isNight ? '#38bdf8' : '#c4b5a0'}
            transparent
            opacity={isNight ? 0.25 : 0.6}
          />
        </mesh>
      ))}

      {/* Carved Parisian Curbs & Perimeter Rails */}
      <mesh position={[0, 0.04, 11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.04, -11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[-11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>

      {/* 4. Pont des Arts Love-Lock Bridge Crossing River Seine */}
      <PontDesArtsBridge isNight={isNight} />

      {/* 5. Parisian Sidewalk Café (Café de Paris) */}
      <ParisianSidewalkCafe position={[4.2, 0, -3.5]} isNight={isNight} />

      {/* 6. Romantic Parisian Cast-Iron Street Gas Lamps */}
      <ParisStreetLamp position={[1.8, 0, 7.8]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[9.2, 0, 7.8]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[1.8, 0, -8.2]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[9.2, 0, -8.2]} scale={0.95} isNight={isNight} />

      {/* 7. Romantic Weeping Willow Garden Accent */}
      <group position={[7.8, 0, 2.2]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.32, 2.4, 7]} />
          <meshStandardMaterial color="#452a1b" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow>
          <dodecahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.65} flatShading />
        </mesh>
        {/* Weeping Tendrils */}
        {Array.from({ length: 6 }).map((_, wIdx) => {
          const a = (wIdx / 6) * Math.PI * 2;
          return (
            <mesh key={wIdx} position={[Math.cos(a) * 1.1, 1.8, Math.sin(a) * 1.1]} castShadow>
              <coneGeometry args={[0.25, 1.4, 4]} />
              <meshStandardMaterial color="#40916c" roughness={0.7} flatShading />
            </mesh>
          );
        })}
      </group>

      {/* 8. Falling Red Rose Petals Rain */}
      <FallingRosePetals count={48} isNight={isNight} />
    </group>
  );
}
