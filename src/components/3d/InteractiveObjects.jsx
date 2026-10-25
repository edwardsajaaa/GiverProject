import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { TransformControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// 1. FLOWER 3D - Handcrafted Origami Blossom with Gold Stamen
// ============================================================================
export function Flower3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.6 + position[0]) * 0.05;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8 + position[2]) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Kraft Paper Stem */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.05, 0.9, 6]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.7} flatShading />
      </mesh>

      {/* Folded Paper Leaf Wings */}
      <mesh position={[0.1, 0.35, 0]} rotation={[0, 0, -0.6]} castShadow>
        <coneGeometry args={[0.1, 0.28, 3]} />
        <meshStandardMaterial color="#40916c" roughness={0.6} flatShading />
      </mesh>
      <mesh position={[-0.1, 0.48, 0]} rotation={[0, 0, 0.6]} castShadow>
        <coneGeometry args={[0.09, 0.25, 3]} />
        <meshStandardMaterial color="#52b788" roughness={0.6} flatShading />
      </mesh>

      {/* Origami Blossom Head (Multi-Tier Petal Rose) */}
      <group position={[0, 0.92, 0]}>
        {/* Core Gilded Stamen */}
        <mesh castShadow>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Inner Petal Tier */}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={`in-${i}`}
              position={[Math.cos(a) * 0.14, 0.02, Math.sin(a) * 0.14]}
              rotation={[0.3, -a, 0]}
              castShadow
            >
              <coneGeometry args={[0.12, 0.26, 3]} />
              <meshStandardMaterial color="#f472b6" roughness={0.4} flatShading />
            </mesh>
          );
        })}

        {/* Outer Flared Petal Tier */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2 + 0.3;
          return (
            <mesh
              key={`out-${i}`}
              position={[Math.cos(a) * 0.24, -0.04, Math.sin(a) * 0.24]}
              rotation={[0.6, -a, 0]}
              castShadow
            >
              <coneGeometry args={[0.15, 0.32, 3]} />
              <meshStandardMaterial color="#fda4af" roughness={0.45} flatShading />
            </mesh>
          );
        })}

        {/* Delicate Gold Rim Highlight */}
        <mesh position={[0, -0.06, 0]}>
          <ringGeometry args={[0.26, 0.29, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#d4af37" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 2. TREE 3D - Handcrafted Papercraft Bonsai with Gold Leaf Contours
// ============================================================================
export function Tree3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9 + position[0]) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carved Natural Cedar Trunk with Branch Knots */}
      <mesh position={[0, 0.65, 0]} rotation={[0.06, 0, -0.04]} castShadow>
        <cylinderGeometry args={[0.13, 0.24, 1.3, 7]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.85} flatShading />
      </mesh>
      {/* Branch Left */}
      <mesh position={[-0.25, 1.25, 0.1]} rotation={[0.4, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 5]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.85} flatShading />
      </mesh>
      {/* Branch Right */}
      <mesh position={[0.3, 1.3, -0.1]} rotation={[-0.3, 0.2, -0.65]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.75, 5]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.85} flatShading />
      </mesh>

      {/* Layered Papercraft Canopy Clouds */}
      <group position={[0, 1.65, 0]}>
        {/* Main Central Crown */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <dodecahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.65} flatShading />
        </mesh>
        {/* Left Foliage Tier */}
        <mesh position={[-0.6, 0.2, 0.15]} castShadow>
          <dodecahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color="#40916c" roughness={0.65} flatShading />
        </mesh>
        {/* Right Foliage Tier */}
        <mesh position={[0.65, 0.25, -0.1]} castShadow>
          <dodecahedronGeometry args={[0.58, 1]} />
          <meshStandardMaterial color="#52b788" roughness={0.65} flatShading />
        </mesh>
        {/* Top Canopy Peak with Gold Leaf Accent */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <dodecahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#74c69d" roughness={0.6} flatShading />
        </mesh>
        {/* Subtle Gold Dust Contour on Tree Crown */}
        <mesh position={[0, 1.35, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Base Moss Pad */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.65, 10]} />
        <meshStandardMaterial color="#1b4332" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 3. ROCK 3D - Japanese Kintsugi Garden Stone with Gold Veins
// ============================================================================
export function Rock3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  return (
    <group position={position}>
      {/* Primary River Stone */}
      <mesh position={[0, 0.32, 0]} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial color="#475569" roughness={0.88} flatShading />
      </mesh>

      {/* Real Kintsugi Gold Vein Seams */}
      <mesh position={[0, 0.32, 0]} rotation={[0.22, 0.52, 0.12]} scale={1.015}>
        <dodecahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          color="#d4af37"
          wireframe
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Flanking Companion Pebble */}
      <mesh position={[-0.38, 0.2, 0.15]} rotation={[0.4, 1.1, -0.2]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.34, 1]} />
        <meshStandardMaterial color="#64748b" roughness={0.88} flatShading />
      </mesh>

      {/* Base Moss Cushion */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.75, 12]} />
        <meshStandardMaterial color="#15803d" roughness={0.95} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 4. LAMP 3D - Handcrafted Japanese Toro / Andon Lantern with Candle Light
// ============================================================================
export function Lamp3D({ position = [0, 0, 0], timeMode = 'night', artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const bulbIntensity = isNight ? 2.6 : 0.8;

  return (
    <group position={position}>
      {/* Cedar Post Stand */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 1.6, 6]} />
        <meshStandardMaterial color="#382315" roughness={0.8} flatShading />
      </mesh>

      {/* Stone / Cedar Base Plinth */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.34, 0.16, 6]} />
        <meshStandardMaterial color="#271b12" roughness={0.85} flatShading />
      </mesh>

      {/* Lantern Lamp Housing (Translucent Washi Screen) */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.42, 6]} />
        <meshStandardMaterial
          color="#fffbeb"
          emissive={isNight ? '#f59e0b' : '#fbbf24'}
          emissiveIntensity={bulbIntensity}
          roughness={0.3}
        />
      </mesh>

      {/* Wood Lattice Window Grille */}
      <mesh position={[0, 1.7, 0]} scale={1.03}>
        <cylinderGeometry args={[0.24, 0.24, 0.42, 6]} />
        <meshStandardMaterial color="#1c1917" wireframe />
      </mesh>

      {/* Swept Hexagonal Wooden Roof with Gold Peak */}
      <mesh position={[0, 2.02, 0]} castShadow>
        <coneGeometry args={[0.45, 0.26, 6]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 2.18, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Warm Ambient Candle Point Light */}
      <pointLight
        position={[0, 1.7, 0]}
        color="#ffb703"
        intensity={bulbIntensity}
        distance={7.5}
        decay={2}
      />
    </group>
  );
}

// ============================================================================
// 5. CRYSTAL 3D - Levitating Faceted Gemstone with Orbiting Shards
// ============================================================================
export function Crystal3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const groupRef = useRef();
  const shardsRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + 0.8 + Math.sin(t * 2 + position[0]) * 0.12;
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.08;
    }
    if (shardsRef.current) {
      shardsRef.current.rotation.y = -t * 0.8;
    }
  });

  return (
    <group position={position}>
      {/* Stone Pedestal Base */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.24, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <ringGeometry args={[0.36, 0.41, 6]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Levitating Crystal Group */}
      <group ref={groupRef}>
        {/* Central Faceted Prism (Rose Quartz / Amethyst) */}
        <mesh castShadow>
          <octahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial
            color="#c084fc"
            roughness={0.15}
            metalness={0.7}
            emissive="#7e22ce"
            emissiveIntensity={0.85}
            flatShading
          />
        </mesh>
        {/* Internal Gold Leaf Filament Core */}
        <mesh scale={0.4}>
          <octahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Orbiting Satellite Shards */}
        <group ref={shardsRef}>
          {[-0.65, 0.65].map((sx, i) => (
            <mesh key={i} position={[sx, Math.sin(i) * 0.2, 0]} scale={0.35}>
              <octahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial
                color="#e879f9"
                roughness={0.2}
                emissive="#a855f7"
                emissiveIntensity={1.2}
                flatShading
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

// ============================================================================
// 6. MUSHROOM 3D - Handcrafted Papercraft Forest Mushroom
// ============================================================================
export function Mushroom3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const capRef = useRef();
  useFrame((state) => {
    if (capRef.current) {
      capRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.8 + position[2]) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Textured Papercraft Stem */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.16, 0.85, 7]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.75} flatShading />
      </mesh>

      {/* Scalloped Papercraft Cap */}
      <group ref={capRef} position={[0, 0.85, 0]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <coneGeometry args={[0.54, 0.42, 7]} />
          <meshStandardMaterial
            color="#f472b6"
            roughness={0.4}
            emissive="#be185d"
            emissiveIntensity={0.4}
            flatShading
          />
        </mesh>
        {/* Gold Polka Dots */}
        {[
          [0.2, 0.25, 0.15],
          [-0.22, 0.18, -0.1],
          [0.05, 0.32, -0.22],
          [-0.15, 0.26, 0.2]
        ].map((pt, i) => (
          <mesh key={i} position={pt} scale={0.6}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Scalloped Underside Gills Ring */}
        <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.52, 7]} />
          <meshStandardMaterial color="#fff1f2" roughness={0.7} flatShading />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 7. PYRAMID 3D - Tiered Origami Obelisk with Hovering Apex
// ============================================================================
export function Pyramid3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const topRef = useRef();
  useFrame((state) => {
    if (topRef.current) {
      topRef.current.rotation.y += 0.02;
      topRef.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 2.5) * 0.06;
    }
  });

  return (
    <group position={position}>
      {/* Tier 1 Step (Base) */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.35, 1.4]} />
        <meshStandardMaterial color="#8c6d48" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <ringGeometry args={[0.9, 1.0, 4]} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Tier 2 Step */}
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.34, 1.0]} />
        <meshStandardMaterial color="#a78b60" roughness={0.75} flatShading />
      </mesh>

      {/* Tier 3 Step */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.62, 0.7, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#c5a059" roughness={0.7} flatShading />
      </mesh>

      {/* Floating Gilded Crystal Apex */}
      <mesh ref={topRef} position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color="#fef08a"
          roughness={0.15}
          metalness={0.9}
          emissive="#d4af37"
          emissiveIntensity={1.2}
          flatShading
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// 8. FOUNTAIN 3D - Handcrafted Tiered Stone Basin with Rippling Water
// ============================================================================
export function Fountain3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const waterRef = useRef();
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = 0.88 + Math.sin(state.clock.elapsedTime * 3.5) * 0.05;
      waterRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      {/* Stone Basin Bottom */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.95, 0.44, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} flatShading />
      </mesh>
      {/* Water Pool in Lower Basin */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.04, 8]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.3} transparent opacity={0.85} />
      </mesh>

      {/* Center Fluted Pedestal */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.75, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.75} flatShading />
      </mesh>

      {/* Upper Pedestal Bowl */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.22, 0.18, 8]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} flatShading />
      </mesh>

      {/* Water Spout Gem / Ripple */}
      <mesh ref={waterRef} position={[0, 1.1, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#7dd3fc"
          roughness={0.1}
          metalness={0.4}
          emissive="#0284c7"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// 9. TOWER 3D - Handcrafted Papercraft Pagoda with Swept Eaves
// ============================================================================
export function Tower3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  return (
    <group position={position}>
      {/* Base Foundation */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial color="#334155" roughness={0.85} flatShading />
      </mesh>

      {/* Tier 1 Pavilion Level */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.82, 0.7, 0.82]} />
        <meshStandardMaterial color="#dc2626" roughness={0.65} flatShading />
      </mesh>
      {/* Tier 1 Swept Pagoda Eaves */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.95, 0.28, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} flatShading />
      </mesh>

      {/* Tier 2 Pavilion Level */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[0.62, 0.55, 0.62]} />
        <meshStandardMaterial color="#dc2626" roughness={0.65} flatShading />
      </mesh>
      {/* Tier 2 Swept Pagoda Eaves */}
      <mesh position={[0, 1.88, 0]} castShadow>
        <coneGeometry args={[0.75, 0.25, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} flatShading />
      </mesh>

      {/* Gilded Roof Finial Needle (Sorin) */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.45, 6]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 2.45, 0]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 10. CACTUS 3D - Folded Origami Desert Succulent with Blossom
// ============================================================================
export function Cactus3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  return (
    <group position={position}>
      {/* Terracotta Pot */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.26, 0.4, 8]} />
        <meshStandardMaterial color="#b45309" roughness={0.8} flatShading />
      </mesh>

      {/* Main Origami Stem */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.85, 6]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} flatShading />
      </mesh>

      {/* Left Branch Arm */}
      <group position={[-0.2, 0.72, 0]} rotation={[0, 0, 0.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.35, 6]} />
          <meshStandardMaterial color="#16a34a" roughness={0.75} flatShading />
        </mesh>
      </group>

      {/* Right Branch Arm */}
      <group position={[0.22, 0.82, 0]} rotation={[0, 0, -0.5]}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.38, 6]} />
          <meshStandardMaterial color="#16a34a" roughness={0.75} flatShading />
        </mesh>
      </group>

      {/* Pink Origami Blossom at Crown */}
      <group position={[0, 1.26, 0]}>
        <mesh>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#f472b6" roughness={0.4} flatShading />
        </mesh>
        <mesh scale={0.5}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 11. CAMPFIRE 3D - Miniature Hearth with Kintsugi Pebbles & Origami Flames
// ============================================================================
export function Campfire3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const flameRef = useRef();
  useFrame((state) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 9) * 0.22;
      flameRef.current.scale.x = 1 + Math.cos(state.clock.elapsedTime * 7) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* River Pebble Ring Base */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.42, 0.08, Math.sin(a) * 0.42]} castShadow>
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#64748b" roughness={0.85} flatShading />
          </mesh>
        );
      })}

      {/* Criss-Crossed Cedar Firewood Twigs */}
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.65, 6]} />
        <meshStandardMaterial color="#452a1b" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.65, 6]} />
        <meshStandardMaterial color="#452a1b" roughness={0.9} flatShading />
      </mesh>

      {/* Layered Origami Amber Flame Crystals */}
      <group ref={flameRef} position={[0, 0.38, 0]}>
        <mesh>
          <coneGeometry args={[0.22, 0.55, 6]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={1.8}
            roughness={0.2}
            flatShading
          />
        </mesh>
        {/* Inner Gold Flame Tongue */}
        <mesh position={[0, 0.05, 0]} scale={0.65}>
          <coneGeometry args={[0.16, 0.45, 5]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={2.5}
            roughness={0.1}
            flatShading
          />
        </mesh>
      </group>

      {/* Warm Ambient Firelight */}
      <pointLight position={[0, 0.45, 0]} color="#f97316" intensity={2.4} distance={6.5} decay={2} />
    </group>
  );
}

// ============================================================================
// 12. MONUMENT 3D - Miniature Romantic Torii / Love Archway
// ============================================================================
export function Monument3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  return (
    <group position={position}>
      {/* Stone Base Plinth */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.24, 0.6]} />
        <meshStandardMaterial color="#475569" roughness={0.85} flatShading />
      </mesh>

      {/* Dual Vermilion Columns */}
      {[-0.48, 0.48].map((cx, i) => (
        <mesh key={i} position={[cx, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 1.5, 6]} />
          <meshStandardMaterial color="#dc2626" roughness={0.65} flatShading />
        </mesh>
      ))}

      {/* Sweeping Lintel Arch with Gold Leaf Tips */}
      <mesh position={[0, 1.74, 0]} castShadow>
        <boxGeometry args={[1.4, 0.15, 0.18]} />
        <meshStandardMaterial color="#dc2626" roughness={0.65} flatShading />
      </mesh>
      {[-0.7, 0.7].map((gx, idx) => (
        <mesh key={idx} position={[gx, 1.74, 0]}>
          <boxGeometry args={[0.06, 0.17, 0.2]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Hanging Golden Heart Charm */}
      <mesh position={[0, 1.48, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.16, 0.16, 0.05]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.2}
          emissive="#b45309"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// COMPONENT MAP
// ============================================================================
const OBJECT_COMPONENTS = {
  flower: Flower3D,
  tree: Tree3D,
  rock: Rock3D,
  lamp: Lamp3D,
  crystal: Crystal3D,
  mushroom: Mushroom3D,
  pyramid: Pyramid3D,
  fountain: Fountain3D,
  tower: Tower3D,
  cactus: Cactus3D,
  campfire: Campfire3D,
  monument: Monument3D,
};

// ============================================================================
// PLACED OBJECT WRAPPER (Interactive Transform & Love Note Preview)
// ============================================================================
export function PlacedObjectWrapper({
  obj,
  artStyle: globalArtStyle = 'lowpoly',
  deleteMode,
  selected,
  onSelect,
  onDelete,
  timeMode,
  transformMode,
  setPlacedObjects
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const Comp = OBJECT_COMPONENTS[obj.type];
  if (!Comp) return null;

  const currentStyle = obj.artStyle || globalArtStyle || 'lowpoly';
  const [ox, , oz] = obj.position;
  const rotY = obj.rotationY || 0;
  const scaleVal = obj.scale || 1;
  const ringColor = deleteMode ? '#ef4444' : selected ? '#d4af37' : timeMode === 'night' ? '#c084fc' : '#d4af37';
  const showRing = hovered || selected;

  const handleTransformChange = () => {
    if (groupRef.current && setPlacedObjects) {
      const pos = groupRef.current.position;
      const rot = groupRef.current.rotation;
      const scl = groupRef.current.scale;
      setPlacedObjects(prev => prev.map(o => o.id === obj.id ? {
        ...o,
        position: [pos.x, pos.y, pos.z],
        rotationY: rot.y,
        scale: Math.max(0.2, scl.x)
      } : o));
    }
  };

  return (
    <>
      {selected && !deleteMode && (
        <TransformControls
          object={groupRef}
          mode={transformMode}
          onMouseUp={handleTransformChange}
          showY={transformMode === 'translate' ? false : true}
          showX={transformMode === 'rotate' ? false : true}
          showZ={transformMode === 'rotate' ? false : true}
          size={0.6}
        />
      )}
      <group
        ref={groupRef}
        position={[ox, 0, oz]}
        rotation={[0, rotY, 0]}
        scale={[scaleVal, scaleVal, scaleVal]}
        onClick={(e) => { e.stopPropagation(); deleteMode ? onDelete(obj.id) : onSelect(obj.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <Comp position={[0, 0, 0]} timeMode={timeMode} artStyle={currentStyle} />
        {showRing && (
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.65, 0.82, 32]} />
            <meshBasicMaterial color={ringColor} transparent opacity={hovered && deleteMode ? 0.9 : 0.75} />
          </mesh>
        )}
        
        {obj.message && (
          <Html position={[0, 1.8, 0]} center zIndexRange={[100, 0]}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
              transform: selected ? 'scale(1)' : 'scale(0.85)',
              opacity: selected ? 1 : 0.85,
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
              {!selected ? (
                <div style={{
                  background: '#FAF7F2', padding: '6px', borderRadius: '50%',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)', border: '1px solid #d4af37',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
                    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
                  </svg>
                </div>
              ) : (
                <div style={{
                  background: timeMode === 'night' ? 'rgba(20,24,34,0.95)' : 'rgba(250,247,242,0.96)',
                  backdropFilter: 'blur(10px)', color: timeMode === 'night' ? '#FAF7F2' : '#2d1810',
                  padding: '12px 16px', borderRadius: 16, width: 170,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)', textAlign: 'center',
                  border: '1px solid #d4af37'
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    DARI: {obj.senderName || 'Anonim'}
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.4, wordWrap: 'break-word', fontStyle: 'italic' }}>
                    "{obj.message}"
                  </div>
                </div>
              )}
            </div>
          </Html>
        )}

        <mesh position={[0, 0.6, 0]} visible={false}>
          <cylinderGeometry args={[0.9, 0.9, 1.8, 16]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </>
  );
}
