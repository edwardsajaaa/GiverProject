import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Handcrafted Papercraft Materials & Colors ---
const COLOR_PARCHMENT_DAY = new THREE.Color('#FAF7F2');
const COLOR_PARCHMENT_NIGHT = new THREE.Color('#161824');
const COLOR_KRAFT_TIER1_DAY = new THREE.Color('#e8decb');
const COLOR_KRAFT_TIER1_NIGHT = new THREE.Color('#10121c');
const COLOR_KRAFT_BASE_DAY = new THREE.Color('#785f4b');
const COLOR_KRAFT_BASE_NIGHT = new THREE.Color('#0a0d14');
const COLOR_GOLD_LEAF = new THREE.Color('#d4af37');

// --- Romantic Floating Origami Paper Boat ---
function PaperBoat({ position = [0, 0, 0], scale = 0.5, speed = 1.0, radius = 2.2, offset = 0 }) {
  const boatRef = useRef();

  useFrame((state) => {
    if (boatRef.current) {
      const t = state.clock.getElapsedTime() * 0.4 * speed + offset;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius * 0.7;
      boatRef.current.position.set(x, 0.04 + Math.sin(t * 3) * 0.015, z);
      boatRef.current.rotation.y = -t + Math.PI / 2;
      boatRef.current.rotation.z = Math.sin(t * 4) * 0.04;
    }
  });

  return (
    <group ref={boatRef} position={position} scale={scale}>
      {/* Hull: Folded Triangular Paper Prisms */}
      <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.35, 0.1, 0.18, 3]} />
        <meshStandardMaterial color="#fffdfa" roughness={0.7} flatShading />
      </mesh>
      {/* Central Folded Sail */}
      <mesh castShadow position={[0, 0.32, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.22, 0.42, 3]} />
        <meshStandardMaterial color="#faf5ee" roughness={0.65} flatShading />
      </mesh>
      {/* Little Crimson Flag Tip */}
      <mesh position={[0, 0.52, 0]}>
        <coneGeometry args={[0.04, 0.08, 3]} />
        <meshStandardMaterial color="#a61324" roughness={0.4} />
      </mesh>
    </group>
  );
}

// --- Circling Origami Crane (Symbol of Eternal Love) ---
function OrigamiCrane({ radius = 16, height = 7, speed = 0.6, phase = 0, scale = 0.45 }) {
  const craneRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.5 * speed + phase;
    if (craneRef.current) {
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = height + Math.sin(t * 2) * 0.8;
      craneRef.current.position.set(x, y, z);
      craneRef.current.rotation.y = -t - Math.PI / 2;
      craneRef.current.rotation.z = Math.sin(t * 1.5) * 0.1;
    }
    const flap = Math.sin(state.clock.getElapsedTime() * 6 * speed) * 0.35;
    if (leftWingRef.current) leftWingRef.current.rotation.z = flap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap;
  });

  return (
    <group ref={craneRef} scale={scale}>
      {/* Body & Tail */}
      <mesh castShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.18, 1.0, 3]} />
        <meshStandardMaterial color="#fffdfa" roughness={0.6} flatShading />
      </mesh>
      {/* Neck & Head */}
      <mesh position={[0, 0.35, 0.35]} rotation={[-Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.1, 0.7, 3]} />
        <meshStandardMaterial color="#faf5ee" roughness={0.6} flatShading />
      </mesh>
      {/* Left Folded Wing */}
      <group ref={leftWingRef} position={[-0.1, 0.1, 0]}>
        <mesh position={[-0.6, 0.05, 0]} rotation={[0, 0, Math.PI / 12]}>
          <boxGeometry args={[1.1, 0.02, 0.45]} />
          <meshStandardMaterial color="#ffffff" roughness={0.55} flatShading />
        </mesh>
      </group>
      {/* Right Folded Wing */}
      <group ref={rightWingRef} position={[0.1, 0.1, 0]}>
        <mesh position={[0.6, 0.05, 0]} rotation={[0, 0, -Math.PI / 12]}>
          <boxGeometry args={[1.1, 0.02, 0.45]} />
          <meshStandardMaterial color="#ffffff" roughness={0.55} flatShading />
        </mesh>
      </group>
    </group>
  );
}

// --- Handcrafted Papercraft Cherry Blossom Tree ---
function PapercraftSakuraTree({ position = [0, 0, 0], scale = 1.0, rotationY = 0, isNight }) {
  const foliageRef = useRef();

  useFrame((state) => {
    if (foliageRef.current) {
      const t = state.clock.getElapsedTime();
      foliageRef.current.rotation.z = Math.sin(t * 1.2 + position[0]) * 0.025;
      foliageRef.current.rotation.x = Math.cos(t * 1.0 + position[2]) * 0.02;
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Trunk: Stylized Faceted Paper Mache Wood */}
      <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.14, 0.32, 2.4, 7]} />
        <meshStandardMaterial color={isNight ? '#261c14' : '#5c3d28'} roughness={0.9} flatShading />
      </mesh>
      <mesh castShadow position={[0.3, 2.2, 0.1]} rotation={[0.4, 0.3, -0.5]}>
        <cylinderGeometry args={[0.08, 0.16, 1.2, 6]} />
        <meshStandardMaterial color={isNight ? '#261c14' : '#5c3d28'} roughness={0.9} flatShading />
      </mesh>
      <mesh castShadow position={[-0.3, 2.0, -0.1]} rotation={[-0.3, -0.2, 0.45]}>
        <cylinderGeometry args={[0.08, 0.16, 1.1, 6]} />
        <meshStandardMaterial color={isNight ? '#261c14' : '#5c3d28'} roughness={0.9} flatShading />
      </mesh>

      {/* Layered Paper Foliage Clouds (Folded Blossom Petals) */}
      <group ref={foliageRef} position={[0, 2.6, 0]}>
        {/* Core Canopy */}
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <dodecahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial
            color={isNight ? '#b83b5e' : '#fbcfe8'}
            emissive={isNight ? '#701a2e' : '#f472b6'}
            emissiveIntensity={isNight ? 0.3 : 0.05}
            roughness={0.7}
            flatShading
          />
        </mesh>
        {/* Blossom Clump Left */}
        <mesh castShadow position={[-0.7, 0.1, 0.3]}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color={isNight ? '#db2777' : '#f9a8d4'} roughness={0.7} flatShading />
        </mesh>
        {/* Blossom Clump Right */}
        <mesh castShadow position={[0.75, 0.15, -0.2]}>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color={isNight ? '#be185d' : '#f472b6'} roughness={0.7} flatShading />
        </mesh>
        {/* Top Paper Bud */}
        <mesh castShadow position={[0, 0.95, 0]}>
          <dodecahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial color={isNight ? '#fda4af' : '#ffe4e6'} roughness={0.65} flatShading />
        </mesh>
      </group>

      {/* Scattered Fallen Petals around base */}
      {[
        [-0.4, 0.02, 0.5],
        [0.6, 0.02, -0.4],
        [0.2, 0.02, 0.7],
        [-0.5, 0.02, -0.6],
        [0.8, 0.02, 0.3]
      ].map((p, idx) => (
        <mesh key={idx} position={p} rotation={[-Math.PI / 2, 0, idx]}>
          <circleGeometry args={[0.08, 5]} />
          <meshStandardMaterial color="#f472b6" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// --- Romantic Arched Moon Bridge (Papercraft Wood & Gilded Posts) ---
function MoonBridge({ position = [0, 0, 0], rotationY = 0, isNight }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Arch Bridge Deck */}
      <mesh receiveShadow position={[0, 0.38, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.2, 0.45, 6, 16, Math.PI * 0.45]} />
        <meshStandardMaterial color={isNight ? '#3a1e12' : '#8b4513'} roughness={0.85} flatShading />
      </mesh>
      {/* Wooden Slats Walking Surface */}
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = -0.55 + i * 0.14;
        const x = Math.sin(angle) * 2.2;
        const y = Math.cos(angle) * 2.2 - 1.8;
        return (
          <mesh key={i} position={[x, y + 0.38, 0]} rotation={[0, 0, -angle]}>
            <boxGeometry args={[0.18, 0.06, 1.1]} />
            <meshStandardMaterial color={isNight ? '#26140b' : '#a0522d'} roughness={0.8} />
          </mesh>
        );
      })}
      {/* Bridge Railing Posts with Gilded Tips */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <group key={i} position={[x, 0.5, 0]}>
          <mesh position={[0, 0.15, 0.55]}>
            <cylinderGeometry args={[0.04, 0.05, 0.5, 6]} />
            <meshStandardMaterial color="#a61324" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.42, 0.55]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.15, -0.55]}>
            <cylinderGeometry args={[0.04, 0.05, 0.5, 6]} />
            <meshStandardMaterial color="#a61324" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.42, -0.55]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- Romantic Papercraft Gazebo Pavilion ---
function RomanticPavilion({ position = [0, 0, 0], isNight }) {
  return (
    <group position={position}>
      {/* Stone / Paper Pedestal */}
      <mesh receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.8, 2.0, 0.3, 8]} />
        <meshStandardMaterial color={isNight ? '#1e293b' : '#e2d9cc'} roughness={0.9} flatShading />
      </mesh>
      {/* 4 Wooden Columns */}
      {[
        [-0.9, 0, -0.9],
        [0.9, 0, -0.9],
        [-0.9, 0, 0.9],
        [0.9, 0, 0.9]
      ].map((p, i) => (
        <mesh key={i} castShadow position={[p[0], 1.2, p[2]]}>
          <cylinderGeometry args={[0.07, 0.09, 2.1, 7]} />
          <meshStandardMaterial color={isNight ? '#2a1a12' : '#5c3317'} roughness={0.8} />
        </mesh>
      ))}
      {/* Folded Papercraft Pagoda Roof */}
      <mesh castShadow position={[0, 2.65, 0]}>
        <coneGeometry args={[2.2, 1.0, 8]} />
        <meshStandardMaterial
          color={isNight ? '#6b1220' : '#85101c'}
          roughness={0.65}
          flatShading
        />
      </mesh>
      {/* Roof Ornament Crown */}
      <mesh position={[0, 3.25, 0]}>
        <dodecahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Hanging Warm Paper Lantern with Candle Light */}
      <group position={[0, 1.9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.35, 8]} />
          <meshStandardMaterial
            color="#fff8e7"
            emissive="#ffb703"
            emissiveIntensity={isNight ? 1.8 : 0.6}
            roughness={0.3}
          />
        </mesh>
        <pointLight
          color="#ffa200"
          intensity={isNight ? 2.5 : 0.8}
          distance={7}
          decay={2}
        />
      </group>
    </group>
  );
}

// --- Deckle-Edge Layered Papercraft Floating Sanctuary Island ---
export function FloatingIsland({ timeMode = 'day', onGroundTap }) {
  const isNight = timeMode === 'night';
  const islandTopMatRef = useRef();

  useFrame((state, delta) => {
    const lerpSpeed = Math.min(1, delta * 3.5);
    const targetParchment = isNight ? COLOR_PARCHMENT_NIGHT : COLOR_PARCHMENT_DAY;
    if (islandTopMatRef.current) {
      islandTopMatRef.current.color.lerp(targetParchment, lerpSpeed);
    }
  });

  return (
    <group>
      {/* =========================================================================
          TIER 1: MAIN DECKLE-EDGE PAPERCRAFT UPPER PLATEAU
         ========================================================================= */}
      <mesh
        position={[0, -0.15, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (onGroundTap) {
            e.stopPropagation();
            onGroundTap(e.point.x, e.point.z);
          }
        }}
      >
        {/* Multi-faceted cylinder giving authentic folded deckle paper edges */}
        <cylinderGeometry args={[11.5, 11.8, 0.35, 32]} />
        <meshStandardMaterial
          ref={islandTopMatRef}
          color={isNight ? '#161824' : '#FAF7F2'}
          roughness={0.92}
          metalness={0.02}
          flatShading={true}
        />
      </mesh>

      {/* Gold Leaf Contour Ribbon around Upper Deckle Edge */}
      <mesh position={[0, -0.01, 0]}>
        <torusGeometry args={[11.52, 0.045, 6, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.75}
          roughness={0.25}
          emissive="#d4af37"
          emissiveIntensity={isNight ? 0.3 : 0.1}
        />
      </mesh>

      {/* =========================================================================
          TIER 2: SECOND TERRACED ELEVATION (KRAFT PAPERCRAFT STRATA)
         ========================================================================= */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[11.8, 10.4, 0.7, 24]} />
        <meshStandardMaterial
          color={isNight ? '#10121c' : '#e8decb'}
          roughness={0.9}
          metalness={0.04}
          flatShading={true}
        />
      </mesh>

      {/* Secondary Gold Rim */}
      <mesh position={[0, -0.32, 0]}>
        <torusGeometry args={[11.78, 0.035, 6, 40]} />
        <meshStandardMaterial color="#c59b27" metalness={0.65} roughness={0.3} />
      </mesh>

      {/* =========================================================================
          TIER 3: INVERTED KRAFT CARDBOARD / MINERAL CLIFF ROOTS
         ========================================================================= */}
      <mesh position={[0, -1.9, 0]} receiveShadow>
        <cylinderGeometry args={[10.4, 6.2, 1.9, 14]} />
        <meshStandardMaterial
          color={isNight ? '#0a0d14' : '#785f4b'}
          roughness={0.95}
          metalness={0.05}
          flatShading={true}
        />
      </mesh>

      <mesh position={[0, -3.8, 0]} receiveShadow>
        <coneGeometry args={[6.2, 2.5, 10]} />
        <meshStandardMaterial
          color={isNight ? '#05070a' : '#4a382c'}
          roughness={0.98}
          flatShading={true}
        />
      </mesh>

      {/* Small Floating Crystal Shards Orbiting Below */}
      {[
        [-4.5, -4.5, 3.2, 0.6],
        [4.2, -4.2, -3.5, 0.55],
        [1.8, -5.2, 4.0, 0.45],
        [-3.2, -4.8, -2.8, 0.5]
      ].map((p, idx) => (
        <mesh key={idx} position={[p[0], p[1], p[2]]} scale={p[3]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={isNight ? '#93c5fd' : '#e0e7ff'}
            emissive={isNight ? '#38bdf8' : '#818cf8'}
            emissiveIntensity={isNight ? 0.8 : 0.2}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* =========================================================================
          CRYSTALLINE WATERCOLOR POND & FLOATING PAPER BOATS
         ========================================================================= */}
      {/* Curved Watercolor Lake */}
      <group position={[-2.8, 0.03, 1.8]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ellipseCurve aX={0} aY={0} xRadius={3.6} yRadius={2.4} aStartAngle={0} aEndAngle={2 * Math.PI} />
          <circleGeometry args={[3.2, 32]} />
          <meshStandardMaterial
            color={isNight ? '#0369a1' : '#38bdf8'}
            emissive={isNight ? '#0284c7' : '#7dd3fc'}
            emissiveIntensity={isNight ? 0.6 : 0.15}
            roughness={0.1}
            metalness={0.3}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Paper Lily Pads */}
        {[
          [-1.5, 0.04, 0.6],
          [1.8, 0.04, -0.8],
          [0.4, 0.04, 1.6],
          [-1.0, 0.04, -1.2]
        ].map((pos, i) => (
          <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, i * 1.2]}>
            <circleGeometry args={[0.32, 7]} />
            <meshStandardMaterial color="#15803d" roughness={0.7} />
          </mesh>
        ))}

        {/* 2 Floating Miniature Paper Boats */}
        <PaperBoat position={[0, 0, 0]} radius={1.9} speed={1.1} offset={0} />
        <PaperBoat position={[0, 0, 0]} radius={1.5} speed={0.85} offset={Math.PI} scale={0.42} />
      </group>

      {/* =========================================================================
          LANDMARKS: ARCHED MOON BRIDGE & ROMANTIC PAVILION
         ========================================================================= */}
      {/* Arched Bridge over edge of the pond */}
      <MoonBridge position={[-0.8, 0.02, 1.6]} rotationY={Math.PI / 3} isNight={isNight} />

      {/* Handcrafted Romantic Gazebo Pavilion */}
      <RomanticPavilion position={[5.2, 0.02, -3.8]} isNight={isNight} />

      {/* =========================================================================
          FOREST GROVE: 3 DETAILED PAPERCRAFT SAKURA TREES
         ========================================================================= */}
      <PapercraftSakuraTree position={[-6.2, 0.02, -4.5]} scale={1.2} rotationY={0.4} isNight={isNight} />
      <PapercraftSakuraTree position={[-4.5, 0.02, -6.8]} scale={0.95} rotationY={1.2} isNight={isNight} />
      <PapercraftSakuraTree position={[6.5, 0.02, 3.8]} scale={1.05} rotationY={-0.6} isNight={isNight} />

      {/* =========================================================================
          NATURAL STEPPING STONE PATH (Connecting Pavilion to Altar Center)
         ========================================================================= */}
      {[
        [4.2, 0.03, -2.6],
        [3.4, 0.03, -1.8],
        [2.5, 0.03, -1.1],
        [1.6, 0.03, -0.5],
        [0.8, 0.03, -0.2],
        [-0.8, 0.03, 0.2],
        [-1.6, 0.03, 0.6],
      ].map((p, i) => (
        <mesh key={i} position={p} rotation={[-Math.PI / 2, 0, i * 0.4]}>
          <circleGeometry args={[0.38 + (i % 2) * 0.08, 6]} />
          <meshStandardMaterial color={isNight ? '#334155' : '#dcd6ca'} roughness={0.9} flatShading />
        </mesh>
      ))}

      {/* =========================================================================
          VINTAGE CANDLE LANTERN POSTS
         ========================================================================= */}
      {[
        [3.8, 0.02, -1.0],
        [-1.2, 0.02, 3.8],
        [1.8, 0.02, 4.5]
      ].map((pos, i) => (
        <group key={i} position={pos}>
          {/* Post */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 1.4, 6]} />
            <meshStandardMaterial color={isNight ? '#1e293b' : '#475569'} roughness={0.8} />
          </mesh>
          {/* Lantern Head */}
          <mesh position={[0, 1.45, 0]}>
            <cylinderGeometry args={[0.14, 0.1, 0.25, 6]} />
            <meshStandardMaterial
              color="#ffeedd"
              emissive="#f59e0b"
              emissiveIntensity={isNight ? 1.6 : 0.4}
              roughness={0.3}
            />
          </mesh>
          <pointLight
            position={[0, 1.45, 0]}
            color="#ffb703"
            intensity={isNight ? 1.4 : 0.3}
            distance={5}
            decay={2}
          />
        </group>
      ))}

      {/* =========================================================================
          ORBITING ETERNAL ORIGAMI CRANES CIRCLING HIGH ABOVE
         ========================================================================= */}
      <OrigamiCrane radius={15} height={6.5} speed={0.7} phase={0} />
      <OrigamiCrane radius={18} height={8.2} speed={0.55} phase={Math.PI * 0.7} scale={0.4} />
      <OrigamiCrane radius={13} height={5.8} speed={0.8} phase={Math.PI * 1.4} scale={0.36} />
    </group>
  );
}

export const OutdoorGround = FloatingIsland;
