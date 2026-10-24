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

      {/* Lower Lattice Truss Pyramid */}
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
  speed = 0.18,
  reverse = false,
  isNight,
  artStyle
}) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const trainRef = useRef();

  useFrame((state) => {
    if (trainRef.current) {
      const dir = reverse ? -1 : 1;
      const t = state.clock.getElapsedTime() * speed * dir;
      const angle = (t % 1) * Math.PI * 2;
      trainRef.current.position.x = center[0] + Math.cos(angle) * radius;
      trainRef.current.position.z = center[2] + Math.sin(angle) * radius;
      trainRef.current.rotation.y = -angle + (reverse ? -Math.PI / 2 : Math.PI / 2);
    }
  });

  const piers = useMemo(() => {
    const list = [];
    const count = Math.round(radius * 0.8);
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

// --- Miniature Rainbow Bridge & Waterfront Port (レインボーブリッジ) ---
function TokyoBayWaterfront({ position = [18, -2.6, 16], isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const bridgePylonColor = '#f8fafc';

  return (
    <group position={position} rotation={[0, -0.45, 0]}>
      {/* Tokyo Bay Water Inlet */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 16]} />
        <meshStandardMaterial
          color={isNight ? '#021827' : '#0284c7'}
          roughness={0.12}
          metalness={0.7}
          emissive={isNight ? '#03263e' : '#0284c7'}
          emissiveIntensity={isNight ? 0.35 : 0.05}
        />
      </mesh>

      {/* Main Bridge Road Deck */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[22, 0.22, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Bridge Roadway Lane Stripes */}
      <mesh position={[0, 1.13, 0]}>
        <boxGeometry args={[21.5, 0.02, 0.08]} />
        <meshBasicMaterial color={isNight ? '#fef08a' : '#ffffff'} />
      </mesh>

      {/* Bridge Suspension Towers (Two iconic white pylons) */}
      {[-5.5, 5.5].map((tx, idx) => (
        <group key={`pylon-${idx}`} position={[tx, 0, 0]}>
          <mesh position={[0, 2.8, -0.65]}>
            <cylinderGeometry args={[0.2, 0.35, 5.6, flat ? 4 : 8]} />
            <meshStandardMaterial color={bridgePylonColor} roughness={0.4} />
          </mesh>
          <mesh position={[0, 2.8, 0.65]}>
            <cylinderGeometry args={[0.2, 0.35, 5.6, flat ? 4 : 8]} />
            <meshStandardMaterial color={bridgePylonColor} roughness={0.4} />
          </mesh>
          <mesh position={[0, 5.2, 0]}>
            <boxGeometry args={[0.45, 0.45, 1.7]} />
            <meshStandardMaterial color={bridgePylonColor} roughness={0.4} />
          </mesh>
          {/* Suspension Cables */}
          <mesh position={[0, 3.4, 0]} rotation={[0, 0, idx === 0 ? 0.2 : -0.2]}>
            <boxGeometry args={[6.5, 0.06, 1.6]} />
            <meshStandardMaterial
              color={isNight ? '#38bdf8' : '#cbd5e1'}
              emissive={isNight ? '#38bdf8' : '#000000'}
              emissiveIntensity={isNight ? 0.8 : 0}
              wireframe={true}
            />
          </mesh>
        </group>
      ))}

      {/* Docks & Cargo Containers */}
      {[-8, -10, 8, 10].map((dx, dIdx) => (
        <mesh key={`dock-${dIdx}`} position={[dx, 0.2, -6 + (dIdx % 2) * 1.5]}>
          <boxGeometry args={[1.6, 0.4, 0.7]} />
          <meshStandardMaterial
            color={['#ef4444', '#0284c7', '#f59e0b', '#10b981'][dIdx % 4]}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- Sprawling Full-Metropolis Carpet (Blanketing the Entire Valley Floor) ---
function TokyoFullMetropolisCarpet({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  // Procedurally generate a dense, sprawling 700+ building metropolis blanketing the entire landscape
  const buildings = useMemo(() => {
    const list = [];
    const seedRnd = (seed) => {
      const x = Math.sin(seed * 9999.0) * 10000;
      return x - Math.floor(x);
    };

    // Helper to check if a location collides with Zen platform or Mount Fuji peak
    const isValidLocation = (x, z) => {
      // Exclude Zen Platform (|x| < 12.2 && |z| < 12.2)
      if (Math.abs(x) < 12.4 && Math.abs(z) < 12.4) return false;
      // Exclude Mount Fuji central volcanic cone (radius < 24.5 from [-48, -48])
      const distFuji = Math.hypot(x - (-48), z - (-48));
      if (distFuji < 24.5) return false;
      // Stay within outer terrain disc (radius < 78m from [-15, -15])
      const distDisc = Math.hypot(x - (-15), z - (-15));
      if (distDisc > 78) return false;
      return true;
    };

    let idx = 0;

    // District 1: Mount Fuji Foothills 360-Degree Belt (r = 25.5m to 46m around [-48, -48])
    const fujiCenter = [-48, -48];
    const fujiRadii = [26.0, 28.5, 31.2, 34.0, 37.0, 40.2, 43.5, 46.5];
    for (let rIdx = 0; rIdx < fujiRadii.length; rIdx++) {
      const r = fujiRadii[rIdx];
      const count = Math.round(r * 0.7);
      for (let c = 0; c < count; c++) {
        idx++;
        const angle = (c / count) * Math.PI * 2 + (rIdx * 0.2);
        const jx = (seedRnd(idx * 1.3) - 0.5) * 1.4;
        const jz = (seedRnd(idx * 2.7) - 0.5) * 1.4;
        const x = fujiCenter[0] + Math.cos(angle) * r + jx;
        const z = fujiCenter[1] + Math.sin(angle) * r + jz;

        if (isValidLocation(x, z)) {
          const hRnd = seedRnd(idx * 4.1);
          const h = 2.8 + hRnd * 5.4 + (rIdx <= 3 ? 1.6 : 0);
          const w = 1.1 + seedRnd(idx * 5.3) * 0.6;
          const d = 1.1 + seedRnd(idx * 6.7) * 0.6;
          const types = ['glass_blue', 'stepped', 'slab', 'helipad', 'spire', 'glass_amber', 'twin'];
          const type = types[idx % types.length];
          const neons = ['#38bdf8', '#ec4899', '#f59e0b', '#10b981', '#a855f7', '#06b6d4', '#fbbf24'];
          const neon = neons[idx % neons.length];
          list.push({ x, z, h, w, d, type, neon, rotY: -angle + Math.PI / 2 });
        }
      }
    }

    // District 2: Central Midtown Tokyo Corridor (Connecting Mount Fuji area across to Zen Platform)
    // Spanning x: -44 to -12, z: -44 to -12
    for (let gx = -44; gx <= -12; gx += 2.8) {
      for (let gz = -44; gz <= -12; gz += 2.8) {
        idx++;
        const jx = (seedRnd(idx * 3.1) - 0.5) * 1.2;
        const jz = (seedRnd(idx * 7.4) - 0.5) * 1.2;
        const x = gx + jx;
        const z = gz + jz;

        if (isValidLocation(x, z)) {
          const hRnd = seedRnd(idx * 8.9);
          const h = 3.8 + hRnd * 6.8;
          const w = 1.3 + seedRnd(idx * 2.2) * 0.7;
          const d = 1.3 + seedRnd(idx * 3.8) * 0.7;
          const types = ['glass_blue', 'helipad', 'spire', 'glass_amber', 'slab', 'stepped'];
          const type = types[idx % types.length];
          const neons = ['#ec4899', '#38bdf8', '#f59e0b', '#10b981', '#f43f5e', '#a855f7'];
          const neon = neons[idx % neons.length];
          list.push({ x, z, h, w, d, type, neon, rotY: seedRnd(idx * 1.9) * Math.PI });
        }
      }
    }

    // District 3: Metropolitan Environs Around Zen Platform (Surrounding front, right, and flanks)
    // Radial rings around [0, 0] from r = 14.5m to 42m
    const zenRadii = [15.0, 18.2, 21.8, 25.5, 29.5, 34.0, 39.0, 44.5];
    for (let zrIdx = 0; zrIdx < zenRadii.length; zrIdx++) {
      const r = zenRadii[zrIdx];
      const count = Math.round(r * 0.85);
      for (let c = 0; c < count; c++) {
        idx++;
        const angle = (c / count) * Math.PI * 2 + (zrIdx * 0.15);
        const jx = (seedRnd(idx * 2.3) - 0.5) * 1.3;
        const jz = (seedRnd(idx * 5.1) - 0.5) * 1.3;
        const x = Math.cos(angle) * r + jx;
        const z = Math.sin(angle) * r + jz;

        if (isValidLocation(x, z)) {
          const hRnd = seedRnd(idx * 6.3);
          const isFrontEntrance = z > 11 && Math.abs(x) < 18;
          const h = isFrontEntrance
            ? (1.2 + hRnd * 1.5)
            : (2.4 + hRnd * 5.2 + (zrIdx <= 2 ? 1.2 : 0));
          const w = 1.1 + seedRnd(idx * 4.4) * 0.6;
          const d = 1.1 + seedRnd(idx * 9.1) * 0.6;
          const types = ['slab', 'glass_blue', 'stepped', 'glass_amber', 'helipad'];
          const type = types[idx % types.length];
          const neons = ['#fbbf24', '#38bdf8', '#10b981', '#ec4899', '#f97316'];
          const neon = neons[idx % neons.length];
          list.push({ x, z, h, w, d, type, neon, rotY: -angle + Math.PI / 2 });
        }
      }
    }

    // District 4: Eastern Waterfront Coastal Blocks (x: 12 to 38, z: -8 to 32)
    for (let ex = 13; ex <= 36; ex += 3.2) {
      for (let ez = -6; ez <= 28; ez += 3.2) {
        idx++;
        const jx = (seedRnd(idx * 1.7) - 0.5) * 1.1;
        const jz = (seedRnd(idx * 8.3) - 0.5) * 1.1;
        const x = ex + jx;
        const z = ez + jz;

        if (isValidLocation(x, z)) {
          const hRnd = seedRnd(idx * 3.4);
          const h = 2.2 + hRnd * 4.6;
          const w = 1.0 + seedRnd(idx * 5.8) * 0.5;
          const d = 1.0 + seedRnd(idx * 7.2) * 0.5;
          const types = ['glass_blue', 'slab', 'stepped', 'glass_amber'];
          const type = types[idx % types.length];
          const neons = ['#38bdf8', '#06b6d4', '#facc15', '#ec4899'];
          const neon = neons[idx % neons.length];
          list.push({ x, z, h, w, d, type, neon, rotY: seedRnd(idx * 2.8) * Math.PI });
        }
      }
    }

    return list;
  }, []);

  // Concentric and cross-cutting metropolis avenues
  const avenueRings = [
    { center: [-48, -48], radii: [27.5, 32.5, 38.0, 44.0] },
    { center: [0, 0], radii: [16.5, 23.5, 31.5, 41.5] }
  ];

  return (
    <group position={[0, -2.6, 0]}>
      {/* 1. All 700+ Procedural Skyscrapers */}
      {buildings.map((b, i) => {
        const bodyColor = isNight
          ? (b.type === 'glass_blue' ? '#0f172a' : (b.type === 'glass_amber' ? '#172554' : '#1e293b'))
          : (b.type === 'glass_blue' ? '#94a3b8' : (b.type === 'glass_amber' ? '#cbd5e1' : '#e2e8f0'));

        const windowColor = isNight
          ? (b.type === 'glass_amber' ? '#fef08a' : (b.type === 'glass_blue' ? '#7dd3fc' : '#fbbf24'))
          : '#475569';

        return (
          <group key={i} position={[b.x, 0, b.z]} rotation={[0, b.rotY, 0]}>
            {/* Primary Tower Structure */}
            <mesh position={[0, b.h / 2, 0]} castShadow={false}>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial
                color={bodyColor}
                roughness={0.4}
                metalness={0.15}
                flatShading={flat}
              />
            </mesh>

            {/* Glowing Window Grid Overlay at Night */}
            {isNight && (
              <mesh position={[0, b.h / 2, 0]}>
                <boxGeometry args={[b.w + 0.02, b.h * 0.88, b.d + 0.02]} />
                <meshStandardMaterial
                  color={windowColor}
                  emissive={windowColor}
                  emissiveIntensity={0.6}
                  roughness={0.3}
                  wireframe={true}
                />
              </mesh>
            )}

            {/* Rooftop Helipad Feature */}
            {b.type === 'helipad' && (
              <group position={[0, b.h + 0.04, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.26, 0.38, 8]} />
                  <meshBasicMaterial color="#facc15" />
                </mesh>
                <mesh position={[0, 0.015, 0]}>
                  <boxGeometry args={[0.06, 0.02, 0.3]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            )}

            {/* Antenna Spire Feature */}
            {b.type === 'spire' && (
              <mesh position={[0, b.h + 0.75, 0]}>
                <cylinderGeometry args={[0.03, 0.09, 1.5, 4]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  emissive={isNight ? b.neon : '#000000'}
                  emissiveIntensity={isNight ? 1.0 : 0}
                />
              </mesh>
            )}

            {/* Cyberpunk Glowing Neon Billboard */}
            <mesh position={[0, b.h * 0.45, b.d / 2 + 0.025]}>
              <planeGeometry args={[b.w * 0.75, 0.38]} />
              <meshBasicMaterial color={b.neon} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      {/* 2. Metropolitan Expressway Avenues (Encircling and connecting the districts) */}
      {avenueRings.map((sys, sIdx) =>
        sys.radii.map((rad, rIdx) => (
          <mesh
            key={`ave-${sIdx}-${rIdx}`}
            position={[sys.center[0], 0.02, sys.center[1]]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[rad - 0.26, rad + 0.26, 64]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
        ))
      )}

      {/* 3. Glowing Traffic Headlight & Taillight Arteries at Night */}
      {isNight && (
        <group position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Yellow Headlights around Mount Fuji */}
          {[27.5, 38.0].map((rf, idx) => (
            <mesh key={`fuji-y-${idx}`} position={[-48, 48, 0]}>
              <ringGeometry args={[rf - 0.05, rf + 0.05, 64]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
          ))}
          {/* Red Taillights around Mount Fuji */}
          {[32.5, 44.0].map((rf, idx) => (
            <mesh key={`fuji-r-${idx}`} position={[-48, 48, 0]}>
              <ringGeometry args={[rf - 0.05, rf + 0.05, 64]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          ))}
          {/* Traffic Loops around Zen Platform */}
          {[16.5, 31.5].map((rz, idx) => (
            <mesh key={`zen-y-${idx}`}>
              <ringGeometry args={[rz - 0.05, rz + 0.05, 64]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
          ))}
          {[23.5, 41.5].map((rz, idx) => (
            <mesh key={`zen-r-${idx}`}>
              <ringGeometry args={[rz - 0.05, rz + 0.05, 64]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          ))}
        </group>
      )}

      {/* 4. Miniature Green Urban Parks (Scattered across the city) */}
      {Array.from({ length: 72 }).map((_, pIdx) => {
        const a = (pIdx / 72) * Math.PI * 2;
        const r = 20.0 + ((pIdx % 9) * 4.5);
        const px = Math.cos(a) * r + (pIdx % 2 ? -18 : 6);
        const pz = Math.sin(a) * r + (pIdx % 2 ? -18 : 6);

        // Don't place on Zen platform or Fuji center
        if (Math.abs(px) < 13 && Math.abs(pz) < 13) return null;
        if (Math.hypot(px - (-48), pz - (-48)) < 24) return null;

        return (
          <group key={`park-${pIdx}`} position={[px, 0.08, pz]}>
            <mesh position={[0, 0.22, 0]}>
              <coneGeometry args={[0.42, 0.65, 5]} />
              <meshStandardMaterial
                color={isNight ? '#064e3b' : '#15803d'}
                roughness={0.9}
                flatShading={flat}
              />
            </mesh>
            <mesh position={[0.3, 0.16, 0.2]}>
              <coneGeometry args={[0.32, 0.5, 5]} />
              <meshStandardMaterial
                color={isNight ? '#065f46' : '#16a34a'}
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
  isNight = true,
  artStyle = 'lowpoly'
}) {
  return (
    <group name="MiniatureTokyoMetropolisFull">
      {/* City Ambient Sky Glow Lights at Night */}
      {isNight && (
        <>
          <pointLight position={[-20, 9, -15]} color="#fbbf24" intensity={0.5} distance={55} />
          <pointLight position={[-44, 9, -40]} color="#38bdf8" intensity={0.45} distance={50} />
          <pointLight position={[15, 8, 12]} color="#ec4899" intensity={0.45} distance={50} />
          <pointLight position={[0, 8, -30]} color="#fbbf24" intensity={0.4} distance={50} />
        </>
      )}

      {/* Landmark 1: Iconic Red-White Tokyo Tower (Between Zen Platform & Mount Fuji) */}
      <TokyoTowerMiniature
        position={[-21, -2.6, -16]}
        scale={0.55}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Landmark 2: Secondary Tokyo Tower (Nestled at Mount Fuji skirt) */}
      <TokyoTowerMiniature
        position={[-42, -2.6, -26]}
        scale={0.46}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Landmark 3: Modern Tokyo Skytree Spire (North skyline) */}
      <TokyoSkytreeMiniature
        position={[-14, -2.6, -38]}
        scale={0.5}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Landmark 4: Secondary Skytree (East skyline) */}
      <TokyoSkytreeMiniature
        position={[26, -2.6, -12]}
        scale={0.44}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Shinkansen Loop 1: Circling Mount Fuji Base */}
      <MiniatureShinkansenRing
        center={[-48, 0, -48]}
        radius={35.0}
        speed={0.16}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Shinkansen Loop 2: Express Loop Connecting Tokyo Central to Zen Outskirts */}
      <MiniatureShinkansenRing
        center={[-18, 0, -18]}
        radius={24.0}
        speed={0.22}
        reverse={true}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Tokyo Bay Waterfront & Rainbow Bridge */}
      <TokyoBayWaterfront
        position={[20, -2.6, 18]}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Complete 700+ Building Tokyo Metropolis Carpet Covering the Entire Terrain */}
      <TokyoFullMetropolisCarpet
        isNight={isNight}
        artStyle={artStyle}
      />
    </group>
  );
}
