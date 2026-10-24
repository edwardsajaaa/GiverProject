import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MiniatureTokyo } from './MiniatureTokyo';

// --- Mount Fuji & Sky Horizon Silhouette ---
function MountFujiBackground({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const fujiColor = isNight ? '#0b1329' : '#334155';
  const snowColor = isNight ? '#93c5fd' : '#ffffff';
  const sunMoonColor = isNight ? '#fef08a' : '#ef4444';
  const skirtColor = isNight ? '#080d1a' : '#1e293b';

  return (
    <group position={[-36, -2.6, -36]}>
      {/* Sun / Moon Disc behind Mount Fuji */}
      <mesh position={[-4, 30, -6]}>
        <circleGeometry args={[10, 32]} />
        <meshBasicMaterial
          color={sunMoonColor}
          transparent
          opacity={isNight ? 0.85 : 0.95}
        />
      </mesh>

      {/* Mount Fuji Main Volcanic Slope */}
      <mesh position={[0, 14, 0]} castShadow={false}>
        <coneGeometry args={[26, 28, flat ? 18 : 32, 1, true]} />
        <meshStandardMaterial
          color={fujiColor}
          roughness={0.9}
          metalness={0.05}
          flatShading={flat}
        />
      </mesh>

      {/* Volcanic Skirt & Pedestal (Tapering into ground, without invading valley) */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[30, 10, flat ? 18 : 32, 1, true]} />
        <meshStandardMaterial
          color={skirtColor}
          roughness={0.95}
          flatShading={flat}
        />
      </mesh>

      {/* Mount Fuji Snow Cap (Iconic snow crown) */}
      <mesh position={[0, 23.5, 0.05]}>
        <coneGeometry args={[11, 8.5, flat ? 18 : 32]} />
        <meshStandardMaterial
          color={snowColor}
          roughness={0.5}
          metalness={0.1}
          emissive={isNight ? '#38bdf8' : '#ffffff'}
          emissiveIntensity={isNight ? 0.35 : 0.08}
          flatShading={flat}
        />
      </mesh>

      {/* Flanking Foothills (Positioned on the flanks and behind to keep the valley open) */}
      <group position={[0, 2.0, -8]}>
        {[-32, -22, -12, 18, 28].map((xPos, idx) => {
          const height = 8 + ((idx * 3) % 5);
          const rad = 8 + ((idx * 2) % 5);
          return (
            <mesh key={idx} position={[xPos, height / 2 - 2, -(idx % 2) * 5]}>
              <coneGeometry args={[rad, height, 7]} />
              <meshStandardMaterial
                color={isNight ? '#060a14' : '#1e293b'}
                roughness={0.95}
                flatShading={true}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// --- Grounding Valley Basin & Stone Fortress Terrace ---
function ValleyBasinGround({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const groundColor = isNight ? '#070b14' : '#2d3748';

  return (
    <group position={[0, -2.6, 0]}>
      {/* Expansive Panoramic Valley Ground (Prevents world from floating in void) */}
      <mesh position={[-15, -0.65, -15]} receiveShadow>
        <cylinderGeometry args={[95, 110, 1.2, flat ? 24 : 48]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.95}
          metalness={0.02}
          flatShading={flat}
        />
      </mesh>

      {/* Distant Misty Horizon Ring */}
      <mesh position={[-15, -0.6, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[80, 130, 32]} />
        <meshBasicMaterial
          color={isNight ? '#050811' : '#1e293b'}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// --- Traditional Japanese Castle Stone Terrace Foundation (Ishigaki) ---
function ZenTerraceFoundation({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const stoneColor = isNight ? '#111827' : '#334155';
  const plinthColor = isNight ? '#0a0e17' : '#1f2937';

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Stone Retaining Wall (Anchoring Zen platform to valley floor) */}
      <mesh position={[0, -1.75, 0]} receiveShadow>
        <cylinderGeometry args={[16.8, 18.6, 1.8, 4]} />
        <meshStandardMaterial
          color={stoneColor}
          roughness={0.9}
          metalness={0.05}
          flatShading={flat}
        />
      </mesh>

      {/* Basal Stone Foundation Pedestal */}
      <mesh position={[0, -2.3, 0]} receiveShadow>
        <boxGeometry args={[26.5, 0.7, 26.5]} />
        <meshStandardMaterial
          color={plinthColor}
          roughness={0.95}
          flatShading={flat}
        />
      </mesh>
    </group>
  );
}

// --- Grand Japanese Torii Gate (大鳥居) ---
function ToriiGate({ position = [0, 0, 9], rotation = [0, 0, 0], isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const redColor = isNight ? '#991b1b' : '#dc2626';
  const blackColor = '#18181b';
  const goldColor = '#eab308';

  return (
    <group position={position} rotation={rotation}>
      {/* Stone Foundation Plinths (Kamebara) */}
      <mesh position={[-1.75, 0.16, 0]}>
        <cylinderGeometry args={[0.34, 0.38, 0.32, 12]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.9} flatShading={flat} />
      </mesh>
      <mesh position={[1.75, 0.16, 0]}>
        <cylinderGeometry args={[0.34, 0.38, 0.32, 12]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.9} flatShading={flat} />
      </mesh>

      {/* Main Pillars (Hashira) */}
      <mesh position={[-1.75, 2.15, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 3.8, 14]} />
        <meshStandardMaterial color={redColor} roughness={0.7} flatShading={flat} />
      </mesh>
      <mesh position={[1.75, 2.15, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 3.8, 14]} />
        <meshStandardMaterial color={redColor} roughness={0.7} flatShading={flat} />
      </mesh>

      {/* Horizontal Tie Beam (Nuki) */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <boxGeometry args={[4.4, 0.22, 0.22]} />
        <meshStandardMaterial color={redColor} roughness={0.7} flatShading={flat} />
      </mesh>
      {/* Nuki End Caps (Black wedge accents) */}
      <mesh position={[-2.22, 3.0, 0]}>
        <boxGeometry args={[0.08, 0.24, 0.24]} />
        <meshStandardMaterial color={blackColor} roughness={0.8} />
      </mesh>
      <mesh position={[2.22, 3.0, 0]}>
        <boxGeometry args={[0.08, 0.24, 0.24]} />
        <meshStandardMaterial color={blackColor} roughness={0.8} />
      </mesh>

      {/* Main Top Lintel (Kasagi) */}
      <mesh position={[0, 3.9, 0]} castShadow>
        <boxGeometry args={[5.1, 0.3, 0.36]} />
        <meshStandardMaterial color={redColor} roughness={0.7} flatShading={flat} />
      </mesh>

      {/* Upper Black Curved Roof Trim (Shimaki) with flared ends */}
      <mesh position={[0, 4.12, 0]} castShadow>
        <boxGeometry args={[5.35, 0.14, 0.44]} />
        <meshStandardMaterial color={blackColor} roughness={0.7} flatShading={flat} />
      </mesh>
      {/* Upward curved tips (Soritsuno) */}
      <mesh position={[-2.75, 4.22, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.42, 0.12, 0.44]} />
        <meshStandardMaterial color={blackColor} roughness={0.7} />
      </mesh>
      <mesh position={[2.75, 4.22, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.42, 0.12, 0.44]} />
        <meshStandardMaterial color={blackColor} roughness={0.7} />
      </mesh>

      {/* Center Plaque Strut (Gakuzuka) */}
      <mesh position={[0, 3.45, 0]}>
        <boxGeometry args={[0.4, 0.7, 0.16]} />
        <meshStandardMaterial color={blackColor} roughness={0.8} />
      </mesh>
      {/* Gold Inscription Tablet */}
      <mesh position={[0, 3.45, 0.09]}>
        <boxGeometry args={[0.26, 0.52, 0.04]} />
        <meshStandardMaterial color={goldColor} metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

// --- Japanese Sakura / Cherry Blossom Tree (桜) ---
function SakuraTree({ position = [0, 0, 0], scale = 1, rotationY = 0, isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const trunkColor = isNight ? '#261a15' : '#452a1b';
  const pinkPrimary = isNight ? '#be185d' : '#f472b6';
  const pinkLight = isNight ? '#f472b6' : '#fbcfe8';
  const pinkDeep = isNight ? '#9d174d' : '#ec4899';

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Organic Curved Trunk Segments */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0.08]} castShadow>
        <cylinderGeometry args={[0.28, 0.45, 2.4, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} flatShading={flat} />
      </mesh>
      <mesh position={[0.22, 2.7, 0]} rotation={[0, 0, -0.16]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 1.8, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} flatShading={flat} />
      </mesh>
      {/* Main Branches */}
      <mesh position={[-0.45, 3.2, 0.3]} rotation={[0.4, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.5, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} flatShading={flat} />
      </mesh>
      <mesh position={[0.65, 3.3, -0.2]} rotation={[-0.3, 0.2, -0.55]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.6, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} flatShading={flat} />
      </mesh>

      {/* Cloud-like Blossom Foliage Clusters */}
      <group position={[0, 3.6, 0]}>
        {/* Central Dome */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <dodecahedronGeometry args={[1.5, flat ? 0 : 1]} />
          <meshStandardMaterial
            color={pinkPrimary}
            roughness={0.7}
            emissive={isNight ? pinkDeep : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
            flatShading={flat}
          />
        </mesh>
        {/* Soft highlight clusters */}
        <mesh position={[-1.1, 0.2, 0.5]} castShadow>
          <dodecahedronGeometry args={[1.15, flat ? 0 : 1]} />
          <meshStandardMaterial
            color={pinkLight}
            roughness={0.7}
            emissive={isNight ? pinkDeep : '#000000'}
            emissiveIntensity={isNight ? 0.4 : 0}
            flatShading={flat}
          />
        </mesh>
        <mesh position={[1.2, 0.3, -0.4]} castShadow>
          <dodecahedronGeometry args={[1.25, flat ? 0 : 1]} />
          <meshStandardMaterial
            color={pinkLight}
            roughness={0.7}
            emissive={isNight ? pinkDeep : '#000000'}
            emissiveIntensity={isNight ? 0.4 : 0}
            flatShading={flat}
          />
        </mesh>
        <mesh position={[0.2, 1.2, 0.3]} castShadow>
          <dodecahedronGeometry args={[1.1, flat ? 0 : 1]} />
          <meshStandardMaterial
            color={pinkLight}
            roughness={0.7}
            flatShading={flat}
          />
        </mesh>
        <mesh position={[-0.4, 0.7, -1.0]} castShadow>
          <dodecahedronGeometry args={[1.0, flat ? 0 : 1]} />
          <meshStandardMaterial
            color={pinkDeep}
            roughness={0.7}
            flatShading={flat}
          />
        </mesh>
      </group>

      {/* Fallen Petals Ring on Grass/Sand */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 2.5, 12]} />
        <meshBasicMaterial
          color={isNight ? '#be185d' : '#fbcfe8'}
          transparent
          opacity={isNight ? 0.35 : 0.6}
        />
      </mesh>
    </group>
  );
}

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// --- Dynamic Animated Sakura Petals Drifting in the Wind ---
function FallingSakuraPetals({ count = 55, isNight }) {
  const petalsRef = useRef();

  const petalsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 10 + 1);
      const r2 = pseudoRandom(i * 10 + 2);
      const r3 = pseudoRandom(i * 10 + 3);
      const r4 = pseudoRandom(i * 10 + 4);
      const r5 = pseudoRandom(i * 10 + 5);
      const r6 = pseudoRandom(i * 10 + 6);
      const r7 = pseudoRandom(i * 10 + 7);
      const r8 = pseudoRandom(i * 10 + 8);

      data.push({
        x: (r1 - 0.5) * 22,
        y: r2 * 9 + 0.5,
        z: (r3 - 0.5) * 22,
        speedY: 0.6 + r4 * 0.7,
        swaySpeed: 1.2 + r5 * 1.5,
        swayRadius: 0.6 + r6 * 0.8,
        rotSpeedX: (r7 - 0.5) * 2,
        rotSpeedY: (r8 - 0.5) * 3,
        rotSpeedZ: (r1 - 0.5) * 2,
        scale: 0.08 + r2 * 0.07,
        phase: r3 * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!petalsRef.current) return;
    const time = state.clock.getElapsedTime();

    petalsData.forEach((p, idx) => {
      p.y -= p.speedY * delta;
      if (p.y < 0.05) {
        p.y = 8.5 + Math.random() * 2.5;
        p.x = (Math.random() - 0.5) * 22;
        p.z = (Math.random() - 0.5) * 22;
      }

      const currentX = p.x + Math.sin(time * p.swaySpeed + p.phase) * p.swayRadius;
      const currentZ = p.z + Math.cos(time * (p.swaySpeed * 0.8) + p.phase) * (p.swayRadius * 0.6);

      dummy.position.set(currentX, p.y, currentZ);
      dummy.rotation.set(
        time * p.rotSpeedX,
        time * p.rotSpeedY,
        time * p.rotSpeedZ
      );
      dummy.scale.set(p.scale, p.scale * 0.4, p.scale);
      dummy.updateMatrix();

      petalsRef.current.setMatrixAt(idx, dummy.matrix);
    });

    petalsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={petalsRef}
      args={[null, null, count]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color={isNight ? '#f472b6' : '#fda4af'}
        side={THREE.DoubleSide}
        transparent
        opacity={isNight ? 0.75 : 0.85}
      />
    </instancedMesh>
  );
}

// --- Traditional Japanese Taiko-bashi (Red Curved Bridge) & Koi Pond ---
function JapaneseBridgeAndPond({ isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const waterColor = isNight ? '#0369a1' : '#38bdf8';
  const bridgeRed = isNight ? '#991b1b' : '#dc2626';
  const goldColor = '#eab308';

  // Pond riverbed stones
  const riverStones = useMemo(() => {
    const list = [];
    const points = 16;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const rx = 3.2 + Math.sin(i * 1.5) * 0.4;
      const rz = 4.8 + Math.cos(i * 1.2) * 0.5;
      list.push({
        x: Math.cos(angle) * rx,
        z: Math.sin(angle) * rz,
        scale: 0.4 + (i % 3) * 0.15,
        rot: i * 0.4,
      });
    }
    return list;
  }, []);

  return (
    <group position={[6.8, 0, 0]}>
      {/* Serene Koi Pond Pool Basin */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.2, 28]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.15}
          metalness={0.7}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Decorative River Pebbles around Pond */}
      {riverStones.map((st, i) => (
        <mesh key={i} position={[st.x, 0.05, st.z]} rotation={[0, st.rot, 0]}>
          <dodecahedronGeometry args={[st.scale, 0]} />
          <meshStandardMaterial color={isNight ? '#334155' : '#64748b'} roughness={0.9} flatShading />
        </mesh>
      ))}

      {/* Floating Lotus Lily Pads */}
      {[
        { x: -1.8, z: -1.6, scale: 0.65 },
        { x: -1.4, z: 2.1, scale: 0.75 },
        { x: 1.6, z: -2.3, scale: 0.7 },
        { x: 2.1, z: 1.5, scale: 0.6 },
      ].map((pad, idx) => (
        <group key={idx} position={[pad.x, 0.025, pad.z]} scale={pad.scale}>
          {/* Green leaf disc with slit */}
          <mesh rotation={[-Math.PI / 2, 0, idx * 0.8]}>
            <circleGeometry args={[0.7, 16, 0, Math.PI * 1.85]} />
            <meshStandardMaterial color={isNight ? '#15803d' : '#22c55e'} roughness={0.8} />
          </mesh>
          {/* Delicate Lotus Blossom */}
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.22, 0.28, 6]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={isNight ? '#ec4899' : '#fbcfe8'}
              emissiveIntensity={isNight ? 0.6 : 0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Taiko-bashi (Arched Wooden Bridge) crossing the pond */}
      <group position={[0, 0, 0]}>
        {/* Arched Deck Planks */}
        {[-2.2, -1.6, -1.0, -0.4, 0.2, 0.8, 1.4, 2.0].map((z, idx) => {
          // Parabolic arch height
          const norm = z / 2.2;
          const archY = Math.max(0.08, 0.55 - norm * norm * 0.45);
          return (
            <mesh key={idx} position={[0, archY, z]} castShadow>
              <boxGeometry args={[1.5, 0.1, 0.52]} />
              <meshStandardMaterial
                color={isNight ? '#7f1d1d' : '#991b1b'}
                roughness={0.7}
                flatShading={flat}
              />
            </mesh>
          );
        })}

        {/* Vermilion Railings & Golden Finials (Giboshi) */}
        {[-0.72, 0.72].map((sideX, sIdx) => (
          <group key={sIdx} position={[sideX, 0, 0]}>
            {/* Railing posts */}
            {[-2.0, -1.0, 0, 1.0, 2.0].map((z, pIdx) => {
              const norm = z / 2.0;
              const archY = Math.max(0.1, 0.55 - norm * norm * 0.42);
              return (
                <group key={pIdx} position={[0, archY, z]}>
                  {/* Post */}
                  <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
                    <meshStandardMaterial color={bridgeRed} roughness={0.7} />
                  </mesh>
                  {/* Golden Lotus Finial (Giboshi) */}
                  <mesh position={[0, 0.75, 0]}>
                    <coneGeometry args={[0.09, 0.14, 8]} />
                    <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.3} />
                  </mesh>
                </group>
              );
            })}

            {/* Continuous curved rail bar */}
            {[-1.5, -0.5, 0.5, 1.5].map((zMid, rIdx) => {
              const norm = zMid / 2.0;
              const archY = Math.max(0.1, 0.55 - norm * norm * 0.42) + 0.65;
              return (
                <mesh key={rIdx} position={[0, archY, zMid]}>
                  <boxGeometry args={[0.08, 0.08, 1.1]} />
                  <meshStandardMaterial color={bridgeRed} roughness={0.7} />
                </mesh>
              );
            })}
          </group>
        ))}
      </group>
    </group>
  );
}

// --- Traditional Japanese Stone Lantern (石灯籠 - Tōrō) ---
function JapaneseStoneLantern({ position = [0, 0, 0], scale = 1, isNight, isYukimi = false }) {
  const stoneColor = isNight ? '#334155' : '#64748b';
  const lightColor = isNight ? '#fbbf24' : '#fef08a';

  return (
    <group position={position} scale={scale}>
      {/* Stepped Base / Legs */}
      {isYukimi ? (
        // Yukimi-dōrō (Snow viewing tripod/curved legs)
        <group position={[0, 0.25, 0]}>
          {[-0.35, 0.35].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, (i === 0 ? 0.35 : -0.35)]}>
              <boxGeometry args={[0.16, 0.5, 0.5]} />
              <meshStandardMaterial color={stoneColor} roughness={0.9} flatShading />
            </mesh>
          ))}
        </group>
      ) : (
        // Kasuga-dōrō Stepped Base & Pedestal Column
        <group>
          <mesh position={[0, 0.16, 0]}>
            <boxGeometry args={[0.9, 0.32, 0.9]} />
            <meshStandardMaterial color={stoneColor} roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.22, 0.26, 0.7, 8]} />
            <meshStandardMaterial color={stoneColor} roughness={0.9} flatShading />
          </mesh>
        </group>
      )}

      {/* Middle Platform (Chūdai) */}
      <mesh position={[0, isYukimi ? 0.55 : 1.1, 0]}>
        <boxGeometry args={[0.85, 0.18, 0.85]} />
        <meshStandardMaterial color={stoneColor} roughness={0.9} flatShading />
      </mesh>

      {/* Light Chamber with Shōji lattice (Hibukuro) */}
      <mesh position={[0, isYukimi ? 0.82 : 1.45, 0]}>
        <boxGeometry args={[0.55, 0.45, 0.55]} />
        <meshStandardMaterial
          color={isNight ? '#fef08a' : '#fde047'}
          emissive={isNight ? '#f59e0b' : '#b45309'}
          emissiveIntensity={isNight ? 1.8 : 0.4}
        />
      </mesh>

      {/* Warm Glow Point Light */}
      <pointLight
        position={[0, isYukimi ? 0.82 : 1.45, 0]}
        color={lightColor}
        distance={9}
        intensity={isNight ? 1.4 : 0.45}
      />

      {/* Flared Pagoda Roof (Kasa) with curved corners */}
      <mesh position={[0, isYukimi ? 1.15 : 1.85, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.9, 0.4, 4]} />
        <meshStandardMaterial color={stoneColor} roughness={0.85} flatShading />
      </mesh>

      {/* Jewel Crown Finial (Hōju) */}
      <mesh position={[0, isYukimi ? 1.45 : 2.15, 0]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color={stoneColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

// --- Japanese Bamboo Grove & Fence (竹林 & 竹垣) ---
function BambooGrove({ position = [0, 0, 0], isNight }) {
  const stalkColor = isNight ? '#14532d' : '#22c55e';
  const nodeColor = isNight ? '#052e16' : '#15803d';

  const stalks = useMemo(() => {
    const list = [];
    for (let i = 0; i < 9; i++) {
      const r1 = pseudoRandom(i * 7 + 101);
      const r2 = pseudoRandom(i * 7 + 102);
      const r3 = pseudoRandom(i * 7 + 103);
      const r4 = pseudoRandom(i * 7 + 104);
      const r5 = pseudoRandom(i * 7 + 105);

      list.push({
        x: (r1 - 0.5) * 3.5,
        z: (r2 - 0.5) * 2.2,
        height: 3.5 + r3 * 2.2,
        rotY: r4 * Math.PI,
        tilt: (r5 - 0.5) * 0.08,
      });
    }
    return list;
  }, []);

  return (
    <group position={position}>
      {stalks.map((st, i) => (
        <group key={i} position={[st.x, 0, st.z]} rotation={[0, st.rotY, st.tilt]}>
          {/* Bamboo stalk segments */}
          {[0.8, 1.8, 2.8, 3.8].filter((h) => h < st.height).map((ySeg, sIdx) => (
            <React.Fragment key={sIdx}>
              <mesh position={[0, ySeg, 0]}>
                <cylinderGeometry args={[0.07, 0.08, 0.96, 6]} />
                <meshStandardMaterial color={stalkColor} roughness={0.6} />
              </mesh>
              {/* Joint ring */}
              <mesh position={[0, ySeg + 0.48, 0]}>
                <torusGeometry args={[0.08, 0.02, 6, 8]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color={nodeColor} roughness={0.8} />
              </mesh>
            </React.Fragment>
          ))}
          {/* Leaves cluster at top */}
          <mesh position={[0, st.height, 0]}>
            <coneGeometry args={[0.4, 0.8, 4]} />
            <meshStandardMaterial color={stalkColor} roughness={0.7} flatShading />
          </mesh>
        </group>
      ))}

      {/* Traditional Bamboo Lattice Garden Fence (Yotsume-gaki) */}
      <group position={[0, 0.4, 1.2]}>
        {/* Horizontal bamboo rails */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 4.2, 6]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#854d0e" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 4.2, 6]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#854d0e" roughness={0.8} />
        </mesh>
        {/* Vertical bamboo pickets */}
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((px, idx) => (
          <mesh key={idx} position={[px, 0.25, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.9, 6]} />
            <meshStandardMaterial color="#854d0e" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- Japanese Engawa Pavilion / Temple Veranda (縁側) ---
function EngawaPavilion({ position = [-9.5, 0, -1], isNight, artStyle }) {
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';
  const woodColor = isNight ? '#271b12' : '#573318';
  const roofColor = isNight ? '#111827' : '#1f2937';
  const paperScreenColor = isNight ? '#334155' : '#fef3c7';

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Stone Foundation Blocks */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[5.2, 0.3, 2.2]} />
        <meshStandardMaterial color="#475569" roughness={0.9} flatShading={flat} />
      </mesh>

      {/* Wooden Deck (Engawa polished cedar) */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.0, 0.12, 2.0]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} flatShading={flat} />
      </mesh>

      {/* Back Wall with Japanese Shōji Lattice Screens */}
      <mesh position={[0, 1.7, -0.85]}>
        <boxGeometry args={[4.6, 2.5, 0.08]} />
        <meshStandardMaterial
          color={paperScreenColor}
          emissive={isNight ? '#f59e0b' : '#000000'}
          emissiveIntensity={isNight ? 0.3 : 0}
          roughness={0.9}
        />
      </mesh>
      {/* Black Shōji Wall Framing */}
      <mesh position={[0, 1.7, -0.8]}>
        <boxGeometry args={[4.7, 2.6, 0.04]} />
        <meshStandardMaterial color="#1c1917" wireframe={true} />
      </mesh>

      {/* Wooden Support Columns */}
      {[-2.2, 0, 2.2].map((cx, i) => (
        <mesh key={i} position={[cx, 1.7, 0.8]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2.6, 8]} />
          <meshStandardMaterial color={woodColor} roughness={0.8} />
        </mesh>
      ))}

      {/* Traditional Sweeping Temple Roof (Irimoya Eaves) */}
      <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[5.8, 0.28, 2.8]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} flatShading={flat} />
      </mesh>
      {/* Upper Tier Ridge */}
      <mesh position={[0, 3.48, 0]} castShadow>
        <boxGeometry args={[5.2, 0.26, 2.2]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} flatShading={flat} />
      </mesh>
    </group>
  );
}

// --- Main Japanese Zen Biome Assembly ---
export function ZenBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const flat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  // Natural stepped stone path (Tobi-ishi) crossing toward Torii & Center
  const steppingStones = [
    { x: -0.2, z: 7.6, sx: 1.3, sz: 1.1 },
    { x: -0.6, z: 6.0, sx: 1.4, sz: 1.2 },
    { x: -1.2, z: 4.5, sx: 1.2, sz: 1.3 },
    { x: -2.0, z: 3.2, sx: 1.4, sz: 1.1 },
    { x: -3.2, z: 2.1, sx: 1.3, sz: 1.2 },
    { x: -4.5, z: 1.0, sx: 1.5, sz: 1.3 },
  ];

  return (
    <group>
      {/* 1. Sprawling Panoramic Valley Basin Ground (No floating void) */}
      <ValleyBasinGround isNight={isNight} artStyle={artStyle} />

      {/* 2. Distant Japanese Horizon (Mount Fuji & Deep Skirt) */}
      <MountFujiBackground isNight={isNight} artStyle={artStyle} />

      {/* 3. Miniature Tokyo City Diorama (Tokyo Tower, Skytree, Shinkansen, Rainbow Bridge, Neon Skyline) */}
      <MiniatureTokyo isNight={isNight} artStyle={artStyle} />

      {/* 4. Stone Castle Terrace Foundation (Ishigaki anchoring Zen platform) */}
      <ZenTerraceFoundation isNight={isNight} artStyle={artStyle} />

      {/* 5. Zen Garden Solid Platform Base */}
      <mesh position={[0, -0.9, 0]} receiveShadow>
        <boxGeometry args={[23.4, 1.2, 23.4]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#1c1917'}
          roughness={0.9}
          metalness={0.05}
          flatShading={flat}
        />
      </mesh>

      {/* 3. Main Raked Gravel / White Sand Ground (Karesansui) */}
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
        <boxGeometry args={[22.2, 0.4, 22.2]} />
        <meshStandardMaterial
          color={isNight ? '#1e293b' : '#ede8dd'}
          roughness={0.92}
          metalness={0.02}
          flatShading={flat}
        />
      </mesh>

      {/* 4. Elegant Dark Cedar Wood Border Around Garden */}
      <mesh position={[0, 0.03, 11.0]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.55]} />
        <meshStandardMaterial color={isNight ? '#171412' : '#452a1b'} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.03, -11.0]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.55]} />
        <meshStandardMaterial color={isNight ? '#171412' : '#452a1b'} roughness={0.7} />
      </mesh>
      <mesh position={[11.0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[0.55, 0.22, 21.5]} />
        <meshStandardMaterial color={isNight ? '#171412' : '#452a1b'} roughness={0.7} />
      </mesh>
      <mesh position={[-11.0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[0.55, 0.22, 21.5]} />
        <meshStandardMaterial color={isNight ? '#171412' : '#452a1b'} roughness={0.7} />
      </mesh>

      {/* 5. Concentric Raked Sand Ripple Rings (Karesansui Water Ripples) */}
      <group position={[-4.5, 0.015, -4.5]}>
        {[1.4, 2.2, 3.0].map((radius, rIdx) => (
          <mesh key={rIdx} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.06, radius + 0.06, 28]} />
            <meshBasicMaterial
              color={isNight ? '#0f172a' : '#d5cfbf'}
              transparent
              opacity={0.65}
            />
          </mesh>
        ))}
        {/* Weathered Zen Rock with Moss Cushion */}
        <mesh position={[0, 0.45, 0]} rotation={[0.2, 0.5, 0.1]} castShadow>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color="#475569" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.5, 0.28, 0.4]} rotation={[0.4, 0.1, -0.2]} castShadow>
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#334155" roughness={0.9} flatShading />
        </mesh>
        {/* Vibrant Moss Mound at Base */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.2, 16]} />
          <meshStandardMaterial color={isNight ? '#14532d' : '#4d7c0f'} roughness={0.95} />
        </mesh>
      </group>

      {/* Linear Raked Gravel Patterns */}
      {[-7, -5, -3, 3, 5].map((z, idx) => (
        <mesh key={idx} position={[-2, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[11, 0.14]} />
          <meshBasicMaterial
            color={isNight ? '#0f172a' : '#d5cfbf'}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}

      {/* 6. Authentic Natural Stepping Stones (Tobi-ishi) */}
      {steppingStones.map((s, idx) => (
        <mesh key={idx} position={[s.x, 0.035, s.z]} rotation={[-Math.PI / 2, 0, idx * 0.35]} receiveShadow>
          <planeGeometry args={[s.sx, s.sz]} />
          <meshStandardMaterial
            color={isNight ? '#334155' : '#78716c'}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 7. Grand Japanese Red Torii Gate at Garden Entrance */}
      <ToriiGate
        position={[0, 0, 9.4]}
        rotation={[0, 0, 0]}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 8. Majestic Japanese Sakura / Cherry Blossom Trees */}
      {/* Back-left Blossom Tree */}
      <SakuraTree
        position={[-7.8, 0, -7.8]}
        scale={1.35}
        rotationY={0.6}
        isNight={isNight}
        artStyle={artStyle}
      />
      {/* Back-right Blossom Tree */}
      <SakuraTree
        position={[7.8, 0, -8.2]}
        scale={1.25}
        rotationY={-0.8}
        isNight={isNight}
        artStyle={artStyle}
      />
      {/* Front-left Blossom Accent Tree */}
      <SakuraTree
        position={[-8.2, 0, 6.8]}
        scale={1.05}
        rotationY={1.2}
        isNight={isNight}
        artStyle={artStyle}
      />

      {/* 9. Animated Falling Sakura Petals (Drifting in the breeze) */}
      <FallingSakuraPetals count={65} isNight={isNight} />

      {/* 10. Taiko-bashi Curved Red Bridge & Lotus Koi Pond */}
      <JapaneseBridgeAndPond isNight={isNight} artStyle={artStyle} />

      {/* 11. Traditional Japanese Stone Lanterns (Tōrō) */}
      {/* Lantern at Entrance next to Torii */}
      <JapaneseStoneLantern
        position={[2.6, 0, 8.8]}
        scale={0.9}
        isNight={isNight}
      />
      {/* Lantern at Left Path Corner */}
      <JapaneseStoneLantern
        position={[-2.6, 0, 8.8]}
        scale={0.9}
        isNight={isNight}
      />
      {/* Snow-viewing Lantern (Yukimi-dōrō) nestled beside the Lotus Pond */}
      <JapaneseStoneLantern
        position={[3.8, 0, 3.2]}
        scale={0.85}
        isNight={isNight}
        isYukimi={true}
      />
      {/* Lantern near Zen Rock Garden */}
      <JapaneseStoneLantern
        position={[-7.2, 0, -3.8]}
        scale={0.95}
        isNight={isNight}
      />

      {/* 12. Bamboo Grove & Takegaki Fence along Back Perimeters */}
      <BambooGrove position={[-7.5, 0, -9.5]} isNight={isNight} />
      <BambooGrove position={[0, 0, -10.0]} isNight={isNight} />

      {/* 13. Traditional Japanese Temple Veranda / Engawa Pavilion */}
      <EngawaPavilion
        position={[-9.6, 0, 0]}
        isNight={isNight}
        artStyle={artStyle}
      />
    </group>
  );
}
