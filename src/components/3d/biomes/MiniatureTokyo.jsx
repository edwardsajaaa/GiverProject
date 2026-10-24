import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Miniature Tokyo Tower (東京タワー) ---
export function TokyoTowerMiniature({ position = [0, 0, 0], scale = 0.52, isNight, artStyle }) {
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

      {/* Main Observatory Deck */}
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
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[2.45, 0.35, 2.45]} />
        <meshStandardMaterial
          color={isNight ? '#fef08a' : '#ffffff'}
          emissive={isNight ? '#fef08a' : '#f8fafc'}
          emissiveIntensity={isNight ? 0.9 : 0.2}
          roughness={0.2}
        />
      </mesh>

      {/* Mid Lattice Section */}
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

      {/* Antenna Spire */}
      <mesh position={[0, 11.4, 0]}>
        <cylinderGeometry args={[0.08, 0.2, 3.4, 6]} />
        <meshStandardMaterial color={whiteLattice} roughness={0.4} />
      </mesh>

      {/* Beacon Light */}
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
export function TokyoSkytreeMiniature({ position = [0, 0, 0], scale = 0.46, isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const latticeColor = isNight ? '#cbd5e1' : '#e2e8f0';

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[1.0, 2.2, 4.0, 3]} />
        <meshStandardMaterial color={latticeColor} roughness={0.4} flatShading={flat} />
      </mesh>
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
      <mesh position={[0, 11.2, 0]}>
        <cylinderGeometry args={[1.5, 1.2, 1.1, flat ? 8 : 16]} />
        <meshStandardMaterial
          color={isNight ? '#38bdf8' : '#475569'}
          emissive={isNight ? '#67e8f9' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 13.2, 0]}>
        <cylinderGeometry args={[0.4, 0.55, 3.0, flat ? 6 : 12]} />
        <meshStandardMaterial color={latticeColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, 15.0, 0]}>
        <cylinderGeometry args={[0.9, 0.75, 0.8, flat ? 8 : 14]} />
        <meshStandardMaterial
          color={isNight ? '#a855f7' : '#64748b'}
          emissive={isNight ? '#c084fc' : '#000000'}
          emissiveIntensity={isNight ? 0.7 : 0}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 17.6, 0]}>
        <cylinderGeometry args={[0.06, 0.22, 4.4, 6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      <mesh position={[0, 19.8, 0]}>
        <sphereGeometry args={[0.18, 6, 6]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

// --- Animated Shinkansen Bullet Train Ring Circuit ---
export function MiniatureShinkansenRing({
  center = [-48, 0, -48],
  radius = 35.5,
  isNight,
  artStyle
}) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const trainRef = useRef();

  useFrame((state) => {
    if (trainRef.current) {
      const t = state.clock.getElapsedTime() * 0.18;
      const angle = (t % 1) * Math.PI * 2;
      trainRef.current.position.x = center[0] + Math.cos(angle) * radius;
      trainRef.current.position.z = center[2] + Math.sin(angle) * radius;
      trainRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  const piers = useMemo(() => {
    const list = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      list.push({
        x: center[0] + Math.cos(a) * radius,
        z: center[2] + Math.sin(a) * radius,
        rot: -a
      });
    }
    return list;
  }, [center, radius]);

  return (
    <group position={[0, -2.6, 0]}>
      {/* Viaduct Piers */}
      {piers.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]} rotation={[0, p.rot, 0]}>
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[0.45, 1.3, 0.45]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} flatShading={flat} />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[0.9, 0.2, 5.0]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>
          <mesh position={[-0.22, 1.48, 0]}>
            <boxGeometry args={[0.08, 0.06, 5.0]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.22, 1.48, 0]}>
            <boxGeometry args={[0.08, 0.06, 5.0]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Animated Bullet Train */}
      <group ref={trainRef} position={[center[0] + radius, 1.55, center[2]]}>
        <mesh position={[1.4, 0.16, 0]}>
          <boxGeometry args={[1.5, 0.32, 0.38]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[1.4, 0.1, 0]}>
          <boxGeometry args={[1.52, 0.07, 0.39]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        <mesh position={[2.25, 0.13, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.18, 0.45, 6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[2.42, 0.12, 0]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fef08a"
            emissiveIntensity={isNight ? 1.5 : 0.4}
          />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[1.2, 0.32, 0.38]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.22, 0.07, 0.39]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
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

// --- Procedural 360-Degree Tokyo Metropolis Belt Circling Mount Fuji ---
function TokyoMetropolisBelt({ center = [-48, 0, -48], isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  // Generate dense ring of 110+ skyscrapers circling Mount Fuji's skirt
  const buildings = useMemo(() => {
    const list = [];
    const count = 116;
    const ringRadii = [28.5, 31.8, 35.2, 38.6];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const ringIdx = i % ringRadii.length;
      const baseR = ringRadii[ringIdx];
      const r = baseR + (Math.sin(i * 3.7) * 1.4);
      const x = center[0] + Math.cos(angle) * r;
      const z = center[2] + Math.sin(angle) * r;

      const heightRnd = (Math.sin(i * 12.3) + 1) * 0.5;
      const h = 3.6 + heightRnd * 5.2; // 3.6m to 8.8m
      const w = 1.3 + ((i % 5) * 0.18);
      const d = 1.3 + (((i + 2) % 4) * 0.2);

      const types = ['glass_blue', 'stepped', 'slab', 'helipad', 'spire', 'glass_amber'];
      const type = types[i % types.length];

      const neons = ['#38bdf8', '#ec4899', '#f59e0b', '#10b981', '#a855f7', '#06b6d4', '#ef4444', '#fbbf24'];
      const neon = neons[i % neons.length];

      list.push({ x, z, h, w, d, type, neon, angle });
    }
    return list;
  }, [center]);

  return (
    <group position={[0, -2.6, 0]}>
      {buildings.map((b, i) => {
        const bodyColor = isNight
          ? (b.type === 'glass_blue' ? '#0f172a' : '#1e293b')
          : (b.type === 'glass_blue' ? '#94a3b8' : '#cbd5e1');

        const windowColor = isNight
          ? (b.type === 'glass_amber' ? '#fef08a' : (b.type === 'glass_blue' ? '#7dd3fc' : '#fbbf24'))
          : '#475569';

        return (
          <group key={i} position={[b.x, 0, b.z]} rotation={[0, -b.angle + Math.PI / 2, 0]}>
            {/* Building Core */}
            <mesh position={[0, b.h / 2, 0]} castShadow={false}>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial
                color={bodyColor}
                roughness={0.5}
                flatShading={flat}
              />
            </mesh>

            {/* Glowing Window Grid Strips */}
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

            {/* Helipad Accent */}
            {b.type === 'helipad' && (
              <group position={[0, b.h + 0.05, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.3, 0.42, 10]} />
                  <meshBasicMaterial color="#facc15" />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                  <boxGeometry args={[0.07, 0.02, 0.35]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            )}

            {/* Spire Accent */}
            {b.type === 'spire' && (
              <mesh position={[0, b.h + 0.9, 0]}>
                <cylinderGeometry args={[0.03, 0.1, 1.8, 5]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  emissive={isNight ? b.neon : '#000000'}
                  emissiveIntensity={isNight ? 1.0 : 0}
                />
              </mesh>
            )}

            {/* Cyberpunk Neon Billboard */}
            <mesh position={[0, b.h * 0.45, b.d / 2 + 0.03]}>
              <planeGeometry args={[b.w * 0.75, 0.42]} />
              <meshBasicMaterial color={b.neon} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      {/* Concentric Metropolis Avenue Rings */}
      {[30.2, 33.6, 37.0].map((rad, idx) => (
        <mesh
          key={`ring-road-${idx}`}
          position={[center[0], 0.02, center[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[rad - 0.28, rad + 0.28, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
      ))}

      {/* Traffic Headlight / Taillight Trails circling the mountain */}
      {isNight && (
        <group position={[center[0], 0.05, center[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <ringGeometry args={[30.15, 30.25, 64]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh>
            <ringGeometry args={[33.55, 33.65, 64]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh>
            <ringGeometry args={[36.95, 37.05, 64]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        </group>
      )}

      {/* Miniature Green Parks scattered along the metropolitan ring */}
      {Array.from({ length: 32 }).map((_, pIdx) => {
        const a = (pIdx / 32) * Math.PI * 2 + 0.05;
        const r = 27.2 + ((pIdx % 3) * 0.6);
        const px = center[0] + Math.cos(a) * r;
        const pz = center[2] + Math.sin(a) * r;
        return (
          <group key={`metropark-${pIdx}`} position={[px, 0.1, pz]}>
            <mesh position={[0, 0.25, 0]}>
              <coneGeometry args={[0.45, 0.65, 5]} />
              <meshStandardMaterial
                color={isNight ? '#064e3b' : '#15803d'}
                roughness={0.9}
                flatShading={flat}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// --- Main Miniature Tokyo Diorama Assembly ---
export function MiniatureTokyo({
  center = [-48, 0, -48],
  isNight = true,
  artStyle = 'lowpoly'
}) {
  return (
    <group name="MiniatureTokyoMetropolisRing">
      {/* City Ambient Glow Lights along the perimeter */}
      {isNight && (
        <>
          <pointLight position={[center[0] + 25, 7, center[2]]} color="#fbbf24" intensity={0.4} distance={45} />
          <pointLight position={[center[0] - 25, 7, center[2]]} color="#38bdf8" intensity={0.4} distance={45} />
          <pointLight position={[center[0], 7, center[2] + 25]} color="#ec4899" intensity={0.4} distance={45} />
          <pointLight position={[center[0], 7, center[2] - 25]} color="#fbbf24" intensity={0.4} distance={45} />
        </>
      )}

      {/* 1. Iconic Red-White Tokyo Tower (Placed on the front-right flank of Mount Fuji) */}
      <TokyoTowerMiniature
        position={[center[0] + 16, -2.6, center[2] + 24]}
        scale={0.52}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 2. Modern Tokyo Skytree Spire (Placed on the front-left flank of Mount Fuji) */}
      <TokyoSkytreeMiniature
        position={[center[0] - 22, -2.6, center[2] + 18]}
        scale={0.46}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 3. Secondary Tokyo Tower on opposite diagonal for full 360 panorama */}
      <TokyoTowerMiniature
        position={[center[0] - 18, -2.6, center[2] - 20]}
        scale={0.42}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 4. Complete 360-Degree Tokyo Metropolis Belt Circling Mount Fuji (110+ Skyscrapers) */}
      <TokyoMetropolisBelt
        center={center}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 5. Circular Shinkansen Viaduct Loop Circling the Entire Mountain Base */}
      <MiniatureShinkansenRing
        center={center}
        radius={35.5}
        isNight={isNight}
        artStyle={artStyle}
      />
    </group>
  );
}
