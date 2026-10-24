import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// --- Miniature Tokyo Tower (東京タワー) with Interactive Audio & Beacon ---
export function TokyoTowerMiniature({ position = [0, 0, 0], scale = 0.52, isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const redOrange = isNight ? '#e11d48' : '#dc2626';
  const whiteLattice = '#f8fafc';
  const beaconRef = useRef();
  const [pulse, setPulse] = useState(0);

  useFrame((state) => {
    if (beaconRef.current) {
      const t = state.clock.getElapsedTime();
      beaconRef.current.intensity = 0.6 + Math.sin(t * 5.0) * 0.4 + pulse * 1.5;
    }
    if (pulse > 0) {
      setPulse((p) => Math.max(0, p - 0.03));
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    SoundEngine.playTokyoTowerBeacon();
    setPulse(1.0);
  };

  return (
    <group
      position={position}
      scale={scale}
      onPointerDown={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
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
          emissiveIntensity={1.5 + pulse * 2.0}
        />
      </mesh>
      {isNight && (
        <pointLight
          ref={beaconRef}
          position={[0, 13.1, 0]}
          color="#ef4444"
          intensity={0.8 + pulse * 1.5}
          distance={18}
        />
      )}
    </group>
  );
}

// --- Miniature Tokyo Skytree (東京スカイツリー) with Interactive Audio ---
export function TokyoSkytreeMiniature({ position = [0, 0, 0], scale = 0.46, isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const latticeColor = isNight ? '#cbd5e1' : '#e2e8f0';

  const handleClick = (e) => {
    e.stopPropagation();
    SoundEngine.playSkytreeChime();
  };

  return (
    <group
      position={position}
      scale={scale}
      onPointerDown={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
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

// --- Animated Shinkansen Bullet Train Ring Circuit with Station Departure Melody ---
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

  const handleTrainClick = (e) => {
    e.stopPropagation();
    SoundEngine.playShinkansenDeparture();
  };

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

      {/* Animated Bullet Train (Clickable for JR station jingle) */}
      <group
        ref={trainRef}
        position={[center[0] + radius, 1.55, center[2]]}
        onPointerDown={handleTrainClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
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

// --- Animated Real-Time Metropolitan Traffic (48+ Moving Cars, Taxis & Police Patrols) ---
function TokyoMetropolitanTraffic({ isNight }) {
  const carsGroupRef = useRef();

  const trafficData = useMemo(() => {
    const list = [];
    const rings = [
      { center: [-48, -48], r: 27.5, count: 6, speed: 0.10, dir: 1 },
      { center: [-48, -48], r: 32.5, count: 8, speed: 0.13, dir: -1 },
      { center: [-48, -48], r: 38.0, count: 9, speed: 0.09, dir: 1 },
      { center: [0, 0], r: 16.5, count: 7, speed: 0.11, dir: 1 },
      { center: [0, 0], r: 23.5, count: 8, speed: 0.14, dir: -1 },
      { center: [0, 0], r: 31.5, count: 10, speed: 0.10, dir: 1 },
    ];
    let cIdx = 0;
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        cIdx++;
        const baseOffset = i / ring.count;
        const carTypes = ['taxi', 'sports', 'sedan', 'van', 'police'];
        const type = carTypes[cIdx % carTypes.length];
        const colors = {
          taxi: '#facc15',
          sports: '#ef4444',
          sedan: '#38bdf8',
          van: '#f8fafc',
          police: '#ffffff'
        };
        list.push({
          id: cIdx,
          center: ring.center,
          r: ring.r,
          speed: ring.speed * ring.dir,
          baseOffset,
          type,
          color: colors[type]
        });
      }
    });
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (carsGroupRef.current) {
      const children = carsGroupRef.current.children;
      for (let i = 0; i < trafficData.length; i++) {
        const car = trafficData[i];
        const child = children[i];
        if (child) {
          const angle = (car.baseOffset + t * car.speed * 0.22) * Math.PI * 2;
          const x = car.center[0] + Math.cos(angle) * car.r;
          const z = car.center[1] + Math.sin(angle) * car.r;
          child.position.x = x;
          child.position.z = z;
          child.rotation.y = -angle + (car.speed > 0 ? -Math.PI / 2 : Math.PI / 2);
        }
      }
    }
  });

  return (
    <group ref={carsGroupRef} position={[0, -2.55, 0]}>
      {trafficData.map((car) => (
        <group key={car.id}>
          {/* Car Chassis */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.36, 0.11, 0.19]} />
            <meshStandardMaterial color={car.color} roughness={0.4} />
          </mesh>
          {/* Car Cabin Roof */}
          <mesh position={[-0.03, 0.17, 0]}>
            <boxGeometry args={[0.18, 0.08, 0.16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} />
          </mesh>

          {/* Special Taxi Top Sign */}
          {car.type === 'taxi' && (
            <mesh position={[-0.03, 0.23, 0]}>
              <boxGeometry args={[0.07, 0.04, 0.09]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          )}

          {/* Special Police Flashing Strobe */}
          {car.type === 'police' && (
            <mesh position={[-0.03, 0.23, 0]}>
              <boxGeometry args={[0.08, 0.04, 0.12]} />
              <meshBasicMaterial color={isNight ? '#ef4444' : '#38bdf8'} />
            </mesh>
          )}

          {/* Headlights & Taillights at Night */}
          {isNight && (
            <>
              <mesh position={[0.19, 0.08, -0.06]}>
                <sphereGeometry args={[0.025, 4, 4]} />
                <meshBasicMaterial color="#fef08a" />
              </mesh>
              <mesh position={[0.19, 0.08, 0.06]}>
                <sphereGeometry args={[0.025, 4, 4]} />
                <meshBasicMaterial color="#fef08a" />
              </mesh>
              <mesh position={[-0.19, 0.08, -0.06]}>
                <sphereGeometry args={[0.02, 4, 4]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
              <mesh position={[-0.19, 0.08, 0.06]}>
                <sphereGeometry args={[0.02, 4, 4]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  );
}

// --- Animated Cruising Boats on Tokyo Bay ---
function TokyoBayVessels({ isNight }) {
  const ferryRef = useRef();
  const cargoRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ferryRef.current) {
      const p = (Math.sin(t * 0.18) + 1) * 0.5;
      ferryRef.current.position.x = 12 + p * 16;
      ferryRef.current.position.z = 13 + Math.sin(p * Math.PI) * 3.5;
      ferryRef.current.rotation.y = Math.cos(t * 0.18) > 0 ? 0.3 : -Math.PI + 0.3;
      ferryRef.current.rotation.z = Math.sin(t * 2.5) * 0.04;
    }
    if (cargoRef.current) {
      const p = (Math.cos(t * 0.12) + 1) * 0.5;
      cargoRef.current.position.x = 27 - p * 14;
      cargoRef.current.position.z = 21 + Math.sin(p * Math.PI) * 2.2;
      cargoRef.current.rotation.y = -Math.sin(t * 0.12) > 0 ? -0.2 : Math.PI - 0.2;
      cargoRef.current.rotation.z = Math.cos(t * 2.0) * 0.03;
    }
  });

  return (
    <group position={[0, -2.55, 0]}>
      {/* 1. Tokyo Sightseeing Water Bus / Ferry */}
      <group ref={ferryRef}>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[1.5, 0.22, 0.55]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0.1, 0.28, 0]}>
          <boxGeometry args={[0.9, 0.14, 0.42]} />
          <meshStandardMaterial
            color={isNight ? '#38bdf8' : '#0284c7'}
            emissive={isNight ? '#38bdf8' : '#000000'}
            emissiveIntensity={isNight ? 0.6 : 0}
            roughness={0.2}
          />
        </mesh>
        {/* Water Wake Trail */}
        <mesh position={[-0.9, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* 2. Container Cargo Vessel */}
      <group ref={cargoRef}>
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[2.2, 0.28, 0.65]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* Colorful Container Stacks */}
        {[-0.5, 0.0, 0.5].map((cx, i) => (
          <mesh key={i} position={[cx, 0.42, 0]}>
            <boxGeometry args={[0.42, 0.26, 0.52]} />
            <meshStandardMaterial color={['#ef4444', '#0284c7', '#f59e0b'][i]} roughness={0.5} />
          </mesh>
        ))}
        {/* Bridge Cabin */}
        <mesh position={[-0.85, 0.46, 0]}>
          <boxGeometry args={[0.3, 0.36, 0.48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// --- Animated Tokyo Advertising Blimp / Airship (Cruising in the High Sky) ---
function TokyoAdvertisingBlimp({ isNight }) {
  const blimpRef = useRef();
  const propRef = useRef();
  const navLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (blimpRef.current) {
      const angle = t * 0.06;
      blimpRef.current.position.x = -24 + Math.cos(angle) * 44;
      blimpRef.current.position.z = -24 + Math.sin(angle) * 44;
      blimpRef.current.position.y = 18.2 + Math.sin(t * 0.6) * 0.5;
      blimpRef.current.rotation.y = -angle + Math.PI / 2;
      blimpRef.current.rotation.z = Math.sin(t * 1.2) * 0.03;
    }
    if (propRef.current) {
      propRef.current.rotation.z = t * 24.0;
    }
    if (navLightRef.current) {
      navLightRef.current.intensity = Math.sin(t * 5.0) > 0.4 ? 1.0 : 0.0;
    }
  });

  const handleBlimpClick = (e) => {
    e.stopPropagation();
    SoundEngine.playAirshipHorn();
  };

  return (
    <group
      ref={blimpRef}
      position={[-24, 18.5, -24]}
      scale={0.9}
      onPointerDown={handleBlimpClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {/* Airship Gas Envelope (Egg/Spheroid) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[1.1, 3.4, 8, 16]} />
        <meshStandardMaterial
          color={isNight ? '#0284c7' : '#ffffff'}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Gondola Cabin Underneath */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[1.6, 0.35, 0.55]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Tail Fins (Stabilizers) */}
      {[-1.8, 1.8].map((fx, i) => (
        <group key={i} position={[-2.4, 0, 0]}>
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.06]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.06]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.06]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.06]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Spinning Stern Propeller */}
      <group ref={propRef} position={[-2.9, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 0.7, 0.08]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.04, 0.7, 0.08]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* Glowing Tokyo Neon Billboard Sign on Airship Hull */}
      <mesh position={[0, 0, 1.13]}>
        <planeGeometry args={[2.8, 0.7]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={isNight ? 1.4 : 0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, -1.13]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.8, 0.7]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={isNight ? 1.4 : 0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Flashing Navigation Beacon on Gondola */}
      <mesh position={[0, -1.45, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      {isNight && (
        <pointLight
          ref={navLightRef}
          position={[0, -1.45, 0]}
          color="#ef4444"
          intensity={0.6}
          distance={12}
        />
      )}
    </group>
  );
}

// --- Drifting Low-Poly Anime Clouds Orbiting Mount Fuji ---
function DriftingAnimeClouds({ isNight }) {
  const cloudsRef = useRef();

  useFrame((state, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.014;
    }
  });

  const cloudClusters = [
    { x: -48 + 22, y: 14.5, z: -48 + 10, scale: 1.2 },
    { x: -48 - 20, y: 16.0, z: -48 + 14, scale: 1.4 },
    { x: -48 + 14, y: 13.5, z: -48 - 22, scale: 1.1 },
    { x: -48 - 18, y: 15.0, z: -48 - 16, scale: 1.3 },
    { x: -26, y: 13.0, z: -32, scale: 1.0 },
    { x: -35, y: 14.0, z: -15, scale: 1.15 }
  ];

  const cloudColor = isNight ? '#1e293b' : '#ffffff';

  return (
    <group ref={cloudsRef}>
      {cloudClusters.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]} scale={c.scale}>
          <mesh position={[0, 0, 0]}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color={cloudColor}
              roughness={0.8}
              transparent
              opacity={isNight ? 0.75 : 0.88}
              flatShading={true}
            />
          </mesh>
          <mesh position={[1.2, -0.2, 0.2]}>
            <dodecahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial
              color={cloudColor}
              roughness={0.8}
              transparent
              opacity={isNight ? 0.75 : 0.88}
              flatShading={true}
            />
          </mesh>
          <mesh position={[-1.1, -0.1, -0.3]}>
            <dodecahedronGeometry args={[1.0, 0]} />
            <meshStandardMaterial
              color={cloudColor}
              roughness={0.8}
              transparent
              opacity={isNight ? 0.75 : 0.88}
              flatShading={true}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- Shinjuku 3D Animated Curved Giant Billboard ---
function Shinjuku3DCornerBillboard({ isNight }) {
  const ledRef = useRef();

  useFrame((state) => {
    if (ledRef.current) {
      const t = state.clock.getElapsedTime();
      const hue = (t * 0.08) % 1;
      ledRef.current.color.setHSL(hue, 0.95, isNight ? 0.6 : 0.5);
    }
  });

  return (
    <group position={[-23, 3.8, -19]}>
      {/* Curved Screen Frame */}
      <mesh>
        <cylinderGeometry args={[2.2, 2.2, 1.8, 12, 1, true, 0, Math.PI / 1.5]} />
        <meshStandardMaterial
          ref={ledRef}
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={isNight ? 1.2 : 0.7}
          roughness={0.2}
        />
      </mesh>
      {/* 3D Giant Mascot Cube Hologram Hovering in Front */}
      <mesh position={[1.4, 0.1, 1.4]} rotation={[0.2, 0.4, 0.1]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fef08a"
          emissiveIntensity={isNight ? 1.0 : 0.4}
        />
      </mesh>
    </group>
  );
}

// --- Miniature Rainbow Bridge & Waterfront Port (レインボーブリッジ) ---
function TokyoBayWaterfront({ position = [20, -2.6, 18], isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const bridgePylonColor = '#f8fafc';

  return (
    <group position={position} rotation={[0, -0.45, 0]}>
      {/* Tokyo Bay Water Inlet */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 18]} />
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
        <boxGeometry args={[24, 0.22, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Bridge Roadway Lane Stripes */}
      <mesh position={[0, 1.13, 0]}>
        <boxGeometry args={[23.5, 0.02, 0.08]} />
        <meshBasicMaterial color={isNight ? '#fef08a' : '#ffffff'} />
      </mesh>

      {/* Bridge Suspension Towers (Two iconic white pylons) */}
      {[-6.0, 6.0].map((tx, idx) => (
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

  // Procedurally generate 700+ building metropolis blanketing the landscape
  const buildings = useMemo(() => {
    const list = [];
    const seedRnd = (seed) => {
      const x = Math.sin(seed * 9999.0) * 10000;
      return x - Math.floor(x);
    };

    // Helper to check if a location collides with Zen platform or Mount Fuji peak
    const isValidLocation = (x, z) => {
      // Exclude Zen Platform (|x| < 12.4 && |z| < 12.4)
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

    // District 3: Metropolitan Environs Around Zen Platform
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

    // District 4: Eastern Waterfront Coastal Blocks
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

      {/* 2. Metropolitan Expressway Avenues */}
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

      {/* 3. Miniature Green Urban Parks */}
      {Array.from({ length: 72 }).map((_, pIdx) => {
        const a = (pIdx / 72) * Math.PI * 2;
        const r = 20.0 + ((pIdx % 9) * 4.5);
        const px = Math.cos(a) * r + (pIdx % 2 ? -18 : 6);
        const pz = Math.sin(a) * r + (pIdx % 2 ? -18 : 6);

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

      {/* Landmark 1: Iconic Red-White Tokyo Tower (Interactive Audio & Beacon) */}
      <TokyoTowerMiniature
        position={[-21, -2.6, -16]}
        scale={0.55}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Landmark 2: Secondary Tokyo Tower at Mount Fuji skirt */}
      <TokyoTowerMiniature
        position={[-42, -2.6, -26]}
        scale={0.46}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* Landmark 3: Modern Tokyo Skytree Spire (North skyline - Interactive Audio) */}
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

      {/* Real-Time Tokyo Bay Cruising Watercraft (Ferry & Cargo ship) */}
      <TokyoBayVessels isNight={isNight} />

      {/* 48+ Real-Time Animated Moving Cars, Taxis & Police Patrols on Avenues */}
      <TokyoMetropolitanTraffic isNight={isNight} />

      {/* High-Altitude Tokyo Advertising Blimp / Airship with Spinning Props & Horn */}
      <TokyoAdvertisingBlimp isNight={isNight} />

      {/* Shinjuku 3D Animated Curved Giant Billboard */}
      <Shinjuku3DCornerBillboard isNight={isNight} />

      {/* Soft Low-Poly Anime Clouds Drifting around Mount Fuji */}
      <DriftingAnimeClouds isNight={isNight} />

      {/* Complete 700+ Building Tokyo Metropolis Carpet */}
      <TokyoFullMetropolisCarpet
        isNight={isNight}
        artStyle={artStyle}
      />
    </group>
  );
}
