import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Miniature Tokyo Tower (東京タワー) ---
function TokyoTowerMiniature({ position = [-24, -2.6, -26], scale = 0.55, isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const redOrange = isNight ? '#e11d48' : '#dc2626';
  const whiteLattice = '#f8fafc';
  const beaconRef = useRef();

  useFrame((state) => {
    if (beaconRef.current) {
      const t = state.clock.getElapsedTime();
      beaconRef.current.intensity = 0.6 + Math.sin(t * 5.0) * 0.4;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 4-legged arched base foundation */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[2.0, 3.2, 0.8, flat ? 4 : 8]} />
        <meshStandardMaterial color={redOrange} roughness={0.6} flatShading={flat} />
      </mesh>

      {/* Lower Lattice Truss Pyramid (Red/Orange) */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[1.2, 2.0, 3.4, flat ? 4 : 8, 1, true]} />
        <meshStandardMaterial color={redOrange} roughness={0.5} flatShading={flat} />
      </mesh>

      {/* Main Observatory Deck (2-tiered observation floor) */}
      <mesh position={[0, 4.4, 0]} castShadow>
        <boxGeometry args={[2.4, 0.8, 2.4]} />
        <meshStandardMaterial
          color={isNight ? '#0284c7' : '#334155'}
          emissive={isNight ? '#38bdf8' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
          roughness={0.3}
          flatShading={flat}
        />
      </mesh>
      {/* Observation window glow strip */}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[2.45, 0.35, 2.45]} />
        <meshStandardMaterial
          color={isNight ? '#fef08a' : '#ffffff'}
          emissive={isNight ? '#fef08a' : '#f8fafc'}
          emissiveIntensity={isNight ? 0.9 : 0.2}
          roughness={0.2}
        />
      </mesh>

      {/* Mid Lattice Section (Alternating White and Red bands) */}
      <mesh position={[0, 6.2, 0]}>
        <cylinderGeometry args={[0.7, 1.1, 2.8, flat ? 4 : 8]} />
        <meshStandardMaterial color={whiteLattice} roughness={0.6} flatShading={flat} />
      </mesh>
      <mesh position={[0, 8.2, 0]}>
        <cylinderGeometry args={[0.4, 0.7, 2.0, flat ? 4 : 8]} />
        <meshStandardMaterial color={redOrange} roughness={0.6} flatShading={flat} />
      </mesh>

      {/* Special Top Observatory Deck */}
      <mesh position={[0, 9.4, 0]}>
        <cylinderGeometry args={[0.75, 0.6, 0.6, flat ? 6 : 12]} />
        <meshStandardMaterial
          color={isNight ? '#fbbf24' : '#e2e8f0'}
          emissive={isNight ? '#fbbf24' : '#000000'}
          emissiveIntensity={isNight ? 0.8 : 0}
          roughness={0.3}
        />
      </mesh>

      {/* Slender Top Antenna Spire */}
      <mesh position={[0, 11.4, 0]}>
        <cylinderGeometry args={[0.08, 0.2, 3.4, 6]} />
        <meshStandardMaterial color={whiteLattice} roughness={0.4} />
      </mesh>

      {/* Pulsing Aircraft Warning Beacon Light on tip */}
      <mesh position={[0, 13.1, 0]}>
        <sphereGeometry args={[0.22, 8, 8]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={1.5}
        />
      </mesh>
      {isNight && (
        <pointLight
          ref={beaconRef}
          position={[0, 13.1, 0]}
          color="#ef4444"
          intensity={0.8}
          distance={15}
        />
      )}
    </group>
  );
}

// --- Miniature Tokyo Skytree (東京スカイツリー) ---
function TokyoSkytreeMiniature({ position = [-16, -2.6, -38], scale = 0.5, isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const latticeColor = isNight ? '#cbd5e1' : '#e2e8f0';

  return (
    <group position={position} scale={scale}>
      {/* Tripod Lattice Footing */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[1.0, 2.2, 4.0, 3]} />
        <meshStandardMaterial color={latticeColor} roughness={0.4} flatShading={flat} />
      </mesh>

      {/* Main Slender Lattice Shaft */}
      <mesh position={[0, 7.5, 0]}>
        <cylinderGeometry args={[0.6, 1.0, 7.0, flat ? 6 : 12]} />
        <meshStandardMaterial
          color={latticeColor}
          emissive={isNight ? '#38bdf8' : '#000000'}
          emissiveIntensity={isNight ? 0.25 : 0}
          roughness={0.4}
          flatShading={flat}
        />
      </mesh>

      {/* First Observatory Pod (Tembo Deck) */}
      <mesh position={[0, 11.2, 0]}>
        <cylinderGeometry args={[1.5, 1.2, 1.1, flat ? 8 : 16]} />
        <meshStandardMaterial
          color={isNight ? '#38bdf8' : '#475569'}
          emissive={isNight ? '#67e8f9' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
          roughness={0.25}
        />
      </mesh>

      {/* Upper Shaft */}
      <mesh position={[0, 13.2, 0]}>
        <cylinderGeometry args={[0.4, 0.55, 3.0, flat ? 6 : 12]} />
        <meshStandardMaterial color={latticeColor} roughness={0.4} />
      </mesh>

      {/* Second Observatory Pod (Tembo Galleria) */}
      <mesh position={[0, 15.0, 0]}>
        <cylinderGeometry args={[0.9, 0.75, 0.8, flat ? 8 : 14]} />
        <meshStandardMaterial
          color={isNight ? '#a855f7' : '#64748b'}
          emissive={isNight ? '#c084fc' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
          roughness={0.25}
        />
      </mesh>

      {/* Needle Antenna Spire */}
      <mesh position={[0, 17.6, 0]}>
        <cylinderGeometry args={[0.06, 0.22, 4.4, 6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Top Cyan Beacon */}
      <mesh position={[0, 19.8, 0]}>
        <sphereGeometry args={[0.18, 6, 6]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

// --- Miniature Shinkansen Bullet Train on Elevated Rail (新幹線) ---
function MiniatureShinkansen({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const trainRef = useRef();

  useFrame((state) => {
    if (trainRef.current) {
      const t = state.clock.getElapsedTime() * 0.45;
      // Loop smoothly along curved railway path
      const angle = (t % 1) * Math.PI * 2;
      const radiusX = 18;
      const radiusZ = 9;
      const cx = -27;
      const cz = -23;

      trainRef.current.position.x = cx + Math.cos(angle) * radiusX;
      trainRef.current.position.z = cz + Math.sin(angle) * radiusZ;
      // Rotate facing travel direction tangent
      trainRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group position={[0, -2.5, 0]}>
      {/* Elevated Concrete Rail Viaduct Piers & Tracks */}
      {[-40, -34, -28, -22, -16, -10].map((x, i) => (
        <group key={i} position={[x, 0, -23 + Math.sin(i * 0.8) * 3]}>
          {/* Concrete Pier Pillar */}
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[0.45, 1.3, 0.45]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} flatShading={flat} />
          </mesh>
          {/* Horizontal Track Beam */}
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[4.2, 0.2, 0.9]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>
          {/* Dual Rail Tracks */}
          <mesh position={[0, 1.48, -0.22]}>
            <boxGeometry args={[4.2, 0.06, 0.08]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 1.48, 0.22]}>
            <boxGeometry args={[4.2, 0.06, 0.08]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* The Sleek Animated Shinkansen Train Carriages */}
      <group ref={trainRef} position={[-25, 1.55, -23]}>
        {/* Lead Car with Aerodynamic Bullet Nose */}
        <mesh position={[1.4, 0.16, 0]}>
          <boxGeometry args={[1.5, 0.32, 0.38]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Shinkansen Iconic Blue Stripe */}
        <mesh position={[1.4, 0.1, 0]}>
          <boxGeometry args={[1.52, 0.07, 0.39]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Nose Taper Cone */}
        <mesh position={[2.25, 0.13, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.18, 0.45, 6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Front Headlights */}
        <mesh position={[2.42, 0.12, 0]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fef08a"
            emissiveIntensity={isNight ? 1.5 : 0.4}
          />
        </mesh>

        {/* Passenger Car 2 */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[1.2, 0.32, 0.38]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.22, 0.07, 0.39]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>

        {/* Passenger Car 3 */}
        <mesh position={[-1.3, 0.16, 0]}>
          <boxGeometry args={[1.2, 0.32, 0.38]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[-1.3, 0.1, 0]}>
          <boxGeometry args={[1.22, 0.07, 0.39]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// --- Miniature Rainbow Bridge & Tokyo Bay Waterway ---
function MiniatureRainbowBridge({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const towerColor = '#f8fafc';

  return (
    <group position={[-20, 0, -18]} rotation={[0, 0.35, 0]}>
      {/* Tokyo Bay Water Canal Plane */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial
          color={isNight ? '#032030' : '#0284c7'}
          roughness={0.15}
          metalness={0.65}
          emissive={isNight ? '#083344' : '#000000'}
          emissiveIntensity={isNight ? 0.2 : 0}
        />
      </mesh>

      {/* Road Deck */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[16, 0.12, 1.1]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Golden roadway light line */}
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[15.6, 0.02, 0.06]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fef08a"
          emissiveIntensity={isNight ? 1.0 : 0.2}
        />
      </mesh>

      {/* Twin Suspension Towers */}
      {[-4.5, 4.5].map((tx, idx) => (
        <group key={idx} position={[tx, 0, 0]}>
          {/* Left Portal Column */}
          <mesh position={[0, 1.8, -0.6]}>
            <boxGeometry args={[0.3, 2.5, 0.3]} />
            <meshStandardMaterial color={towerColor} roughness={0.5} flatShading={flat} />
          </mesh>
          {/* Right Portal Column */}
          <mesh position={[0, 1.8, 0.6]}>
            <boxGeometry args={[0.3, 2.5, 0.3]} />
            <meshStandardMaterial color={towerColor} roughness={0.5} flatShading={flat} />
          </mesh>
          {/* Top Crossbar */}
          <mesh position={[0, 3.0, 0]}>
            <boxGeometry args={[0.35, 0.3, 1.5]} />
            <meshStandardMaterial color={towerColor} roughness={0.5} />
          </mesh>
          {/* Illuminated Cable Struts at Night */}
          {isNight && (
            <mesh position={[0, 3.2, 0]}>
              <sphereGeometry args={[0.1, 6, 6]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
            </mesh>
          )}
        </group>
      ))}

      {/* Main Suspension Cables */}
      <mesh position={[0, 2.0, -0.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[9.2, 0.04, 0.04]} />
        <meshStandardMaterial
          color={isNight ? '#38bdf8' : '#94a3b8'}
          emissive={isNight ? '#38bdf8' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
        />
      </mesh>
      <mesh position={[0, 2.0, 0.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[9.2, 0.04, 0.04]} />
        <meshStandardMaterial
          color={isNight ? '#38bdf8' : '#94a3b8'}
          emissive={isNight ? '#38bdf8' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
        />
      </mesh>
    </group>
  );
}

// --- Procedural Miniature Skyscraper Clusters (Distrik Tokyo Miniatur) ---
function SkyscraperDistrictMiniature({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  // Seeded architectural blocks representing Shinjuku, Roppongi, and Shibuya
  const buildings = useMemo(() => [
    // Front Row near Bridge & Waterway
    { x: -16.5, z: -21.0, w: 1.4, d: 1.4, h: 4.8, type: 'glass_blue', neon: '#38bdf8' },
    { x: -18.8, z: -23.5, w: 1.6, d: 1.3, h: 5.6, type: 'stepped', neon: '#ec4899' },
    { x: -21.2, z: -21.5, w: 1.3, d: 1.5, h: 4.2, type: 'slab', neon: '#f59e0b' },
    { x: -23.6, z: -23.0, w: 1.7, d: 1.7, h: 6.4, type: 'helipad', neon: '#10b981' },
    { x: -26.0, z: -21.0, w: 1.5, d: 1.2, h: 4.5, type: 'glass_amber', neon: '#eab308' },
    { x: -28.5, z: -23.2, w: 1.4, d: 1.4, h: 5.2, type: 'spire', neon: '#a855f7' },
    { x: -31.0, z: -22.0, w: 1.8, d: 1.5, h: 3.8, type: 'low_block', neon: '#06b6d4' },

    // Mid High-Rise Row (Shinjuku Skyline Heart)
    { x: -17.5, z: -26.5, w: 1.8, d: 1.8, h: 6.8, type: 'twin_tower', neon: '#0284c7' },
    { x: -20.5, z: -28.0, w: 2.0, d: 1.6, h: 7.8, type: 'helipad', neon: '#f43f5e' },
    { x: -23.0, z: -27.5, w: 1.6, d: 1.6, h: 8.5, type: 'spire', neon: '#38bdf8' },
    { x: -26.2, z: -28.5, w: 2.2, d: 1.8, h: 7.2, type: 'stepped', neon: '#10b981' },
    { x: -29.2, z: -27.0, w: 1.7, d: 1.5, h: 6.0, type: 'glass_blue', neon: '#fbbf24' },
    { x: -32.5, z: -28.0, w: 1.6, d: 1.6, h: 5.5, type: 'slab', neon: '#ec4899' },
    { x: -35.0, z: -26.5, w: 1.5, d: 1.4, h: 4.6, type: 'low_block', neon: '#a855f7' },

    // Back Row against Mount Fuji Foothills
    { x: -14.5, z: -32.0, w: 1.5, d: 1.5, h: 4.2, type: 'glass_blue', neon: '#38bdf8' },
    { x: -18.0, z: -33.5, w: 1.8, d: 1.8, h: 6.2, type: 'stepped', neon: '#f59e0b' },
    { x: -21.5, z: -34.0, w: 2.0, d: 2.0, h: 6.8, type: 'slab', neon: '#06b6d4' },
    { x: -25.5, z: -33.0, w: 1.6, d: 1.6, h: 5.8, type: 'spire', neon: '#ef4444' },
    { x: -29.0, z: -34.5, w: 2.1, d: 1.7, h: 5.4, type: 'helipad', neon: '#eab308' },
    { x: -33.0, z: -33.5, w: 1.8, d: 1.6, h: 4.8, type: 'glass_amber', neon: '#10b981' },
    { x: -37.0, z: -32.0, w: 1.5, d: 1.5, h: 4.0, type: 'low_block', neon: '#38bdf8' },

    // Flank Clusters (Suburban / Low-rise commercial perimeter)
    { x: -12.5, z: -25.0, w: 1.2, d: 1.2, h: 3.2, type: 'low_block', neon: '#f43f5e' },
    { x: -11.0, z: -28.0, w: 1.3, d: 1.3, h: 3.5, type: 'slab', neon: '#fbbf24' },
    { x: -39.0, z: -27.0, w: 1.4, d: 1.4, h: 3.6, type: 'stepped', neon: '#06b6d4' },
    { x: -41.5, z: -24.5, w: 1.3, d: 1.3, h: 3.0, type: 'low_block', neon: '#a855f7' },
  ], []);

  return (
    <group position={[0, 0, 0]}>
      {buildings.map((b, i) => {
        const bodyColor = isNight
          ? (b.type === 'glass_blue' ? '#0f172a' : '#1e293b')
          : (b.type === 'glass_blue' ? '#94a3b8' : '#cbd5e1');

        const windowColor = isNight
          ? (b.type === 'glass_amber' ? '#fef08a' : (b.type === 'glass_blue' ? '#7dd3fc' : '#fbbf24'))
          : '#475569';

        return (
          <group key={i} position={[b.x, 0, b.z]}>
            {/* Main Building Tower Core */}
            <mesh position={[0, b.h / 2, 0]} castShadow>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial
                color={bodyColor}
                roughness={0.5}
                flatShading={flat}
              />
            </mesh>

            {/* Glowing Window Grid Strips (Luminous at Night) */}
            {isNight && (
              <mesh position={[0, b.h / 2, 0]}>
                <boxGeometry args={[b.w + 0.02, b.h * 0.88, b.d + 0.02]} />
                <meshStandardMaterial
                  color={windowColor}
                  emissive={windowColor}
                  emissiveIntensity={0.65}
                  roughness={0.3}
                  wireframe={true}
                />
              </mesh>
            )}

            {/* Rooftop Details */}
            {b.type === 'helipad' && (
              <group position={[0, b.h + 0.05, 0]}>
                {/* Helipad Yellow Ring */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.35, 0.45, 12]} />
                  <meshBasicMaterial color="#facc15" />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                  <boxGeometry args={[0.08, 0.02, 0.4]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            )}

            {b.type === 'spire' && (
              <mesh position={[0, b.h + 0.9, 0]}>
                <cylinderGeometry args={[0.04, 0.12, 1.8, 6]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  emissive={isNight ? b.neon : '#000000'}
                  emissiveIntensity={isNight ? 1.0 : 0}
                />
              </mesh>
            )}

            {/* Cyberpunk / Shibuya Neon Billboard on Facade */}
            <mesh position={[0, b.h * 0.45, b.d / 2 + 0.04]}>
              <planeGeometry args={[b.w * 0.75, 0.45]} />
              <meshBasicMaterial
                color={b.neon}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}

      {/* Tiny City Street Grid & Traffic Light Trails */}
      {[-24, -28, -32].map((sz, sIdx) => (
        <mesh key={`st-${sIdx}`} position={[-26, 0.02, sz]}>
          <planeGeometry args={[26, 0.35]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
      ))}
      {/* Golden Headlight and Crimson Taillight streaks */}
      {isNight && (
        <group position={[0, 0.05, 0]}>
          <mesh position={[-25, 0, -23.8]}>
            <planeGeometry args={[22, 0.06]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh position={[-25, 0, -24.1]}>
            <planeGeometry args={[22, 0.06]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[-25, 0, -27.8]}>
            <planeGeometry args={[20, 0.06]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh position={[-25, 0, -28.1]}>
            <planeGeometry args={[20, 0.06]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}

      {/* Miniature Parks & Greenery nestled between skyscrapers */}
      {[-15, -22, -30, -36].map((gx, gIdx) => (
        <group key={`park-${gIdx}`} position={[gx, 0.1, -25.5 + (gIdx % 2) * 2]}>
          <mesh position={[0, 0.25, 0]}>
            <coneGeometry args={[0.5, 0.7, 6]} />
            <meshStandardMaterial
              color={isNight ? '#064e3b' : '#15803d'}
              roughness={0.9}
              flatShading={flat}
            />
          </mesh>
          <mesh position={[0.4, 0.2, 0.3]}>
            <coneGeometry args={[0.4, 0.55, 6]} />
            <meshStandardMaterial
              color={isNight ? '#064e3b' : '#16a34a'}
              roughness={0.9}
              flatShading={flat}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- Main Miniature Tokyo Diorama Assembly ---
export function MiniatureTokyo({ isNight = true, artStyle = 'lowpoly' }) {
  return (
    <group name="MiniatureTokyoDiorama" position={[0, -2.6, 0]}>
      {/* Soft Tokyo City Glow at Night */}
      {isNight && (
        <pointLight
          position={[-24, 7, -26]}
          color="#fbbf24"
          intensity={0.45}
          distance={40}
        />
      )}

      {/* 1. Iconic Red-White Tokyo Tower */}
      <TokyoTowerMiniature
        position={[-23, 0, -24]}
        scale={0.52}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 2. Modern Tokyo Skytree Spire */}
      <TokyoSkytreeMiniature
        position={[-15, 0, -34]}
        scale={0.46}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 3. Dense Skyscraper Skyline Blocks with Glowing Windows */}
      <SkyscraperDistrictMiniature
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 4. Miniature Shinkansen (Bullet Train) on Elevated Viaduct */}
      <MiniatureShinkansen
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 5. Rainbow Bridge & Tokyo Bay Waterway */}
      <MiniatureRainbowBridge
        isNight={isNight}
        artStyle={artStyle}
      />
    </group>
  );
}
