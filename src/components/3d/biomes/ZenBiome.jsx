import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. DISTANT PAPERCRAFT MOUNT FUJI & WATERCOLOR HORIZON
// ============================================================================
function PapercraftMountFuji({ isNight }) {
  const fujiRef = useRef();
  const sunMoonColor = isNight ? '#fef08a' : '#ef4444';
  const slopeColor = isNight ? '#0d1527' : '#3d4a5d';
  const snowCapColor = isNight ? '#c7d2fe' : '#FAF7F2';
  const goldTrim = '#d4af37';

  return (
    <group position={[-44, -1.8, -44]}>
      {/* Handcrafted Watercolor Sun / Moon Disc */}
      <mesh position={[-4, 34, -4]}>
        <circleGeometry args={[14, 36]} />
        <meshBasicMaterial
          color={sunMoonColor}
          transparent
          opacity={isNight ? 0.88 : 0.95}
        />
      </mesh>
      {/* Sun/Moon Gold Rim Contour */}
      <mesh position={[-4, 34, -3.95]}>
        <ringGeometry args={[13.9, 14.3, 36]} />
        <meshBasicMaterial color={goldTrim} transparent opacity={0.7} />
      </mesh>

      {/* Mount Fuji Main Volcanic Slope (Origami Faceted Cone) */}
      <mesh position={[0, 16, 0]} castShadow={false}>
        <coneGeometry args={[22, 34, 24, 1, true]} />
        <meshStandardMaterial
          color={slopeColor}
          roughness={0.92}
          metalness={0.05}
          flatShading={true}
        />
      </mesh>

      {/* Gold Contour Ridge Line on Fuji */}
      <mesh position={[0, 24.5, 0]}>
        <ringGeometry args={[9.4, 9.65, 24]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial
          color={goldTrim}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Mount Fuji Handcrafted Papercraft Snow Crown */}
      <mesh position={[0, 28.5, 0]}>
        <coneGeometry args={[9.5, 11, 24]} />
        <meshStandardMaterial
          color={snowCapColor}
          roughness={0.65}
          metalness={0.1}
          emissive={isNight ? '#6366f1' : '#ffffff'}
          emissiveIntensity={isNight ? 0.25 : 0.08}
          flatShading={true}
        />
      </mesh>

      {/* Deckle Snow Skirt Teeth (Folded paper snow fringes) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const rad = 9.3;
        const x = Math.cos(angle) * rad;
        const z = Math.sin(angle) * rad;
        return (
          <mesh key={i} position={[x, 22.8, z]} rotation={[0.4, -angle, 0]}>
            <coneGeometry args={[1.2, 2.4, 3]} />
            <meshStandardMaterial
              color={snowCapColor}
              roughness={0.7}
              flatShading={true}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ============================================================================
// 2. LAYERED PAPERCRAFT HILLS & WATERCOLOR BASIN
// ============================================================================
function PapercraftLandscapeBasin({ isNight }) {
  const hillTiers = useMemo(() => {
    const list = [];
    // 3 rings of papercraft hill silhouettes
    const rings = [
      { r: 42, count: 12, heightMin: 7, heightMax: 12, color: isNight ? '#0b1220' : '#4b5563' },
      { r: 52, count: 16, heightMin: 11, heightMax: 18, color: isNight ? '#070c16' : '#374151' },
      { r: 64, count: 20, heightMin: 16, heightMax: 26, color: isNight ? '#04070e' : '#1f2937' },
    ];
    rings.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + (ringIdx * 0.2);
        const dist = ring.r + ((i % 3) * 2.5);
        const h = ring.heightMin + ((i * 3.7) % (ring.heightMax - ring.heightMin));
        const w = 9 + ((i * 2.3) % 6);
        list.push({
          id: `${ringIdx}-${i}`,
          x: Math.cos(angle) * dist,
          z: Math.sin(angle) * dist,
          angle,
          h,
          w,
          color: ring.color,
          y: h / 2 - 4.5,
        });
      }
    });
    return list;
  }, [isNight]);

  return (
    <group position={[0, -2.5, 0]}>
      {/* Handcrafted Parchment Basin Ground (Soft textured paper terrain) */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[75, 82, 1.2, 32]} />
        <meshStandardMaterial
          color={isNight ? '#0a0f1d' : '#e7dfd5'}
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* Gold Foil Rim on Outer Ground Perimeter */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[73.8, 74.8, 48]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* Layered Papercraft Hill Silhouettes */}
      {hillTiers.map((h) => (
        <group key={h.id} position={[h.x, h.y, h.z]} rotation={[0, -h.angle + Math.PI / 2, 0]}>
          <mesh castShadow={false} receiveShadow={false}>
            <coneGeometry args={[h.w, h.h, 4]} />
            <meshStandardMaterial
              color={h.color}
              roughness={0.92}
              flatShading={true}
            />
          </mesh>
          {/* Gold Leaf Contour Peak Highlight on foreground hills */}
          <mesh position={[0, h.h * 0.42, 0]}>
            <coneGeometry args={[h.w * 0.16, h.h * 0.2, 4]} />
            <meshStandardMaterial
              color="#d4af37"
              roughness={0.3}
              metalness={0.85}
              flatShading={true}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 3. FLOATING ORIGAMI SKY LANTERNS (Tōrō Nagashi in the Sky)
// ============================================================================
function FloatingOrigamiSkyLanterns({ isNight }) {
  const lanternsRef = useRef();
  const lanterns = useMemo(() => {
    const list = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 17 + (i % 4) * 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const baseY = 2.5 + (i % 5) * 1.8;
      const speed = 0.6 + (i % 3) * 0.3;
      const phase = i * 0.7;
      list.push({ id: i, x, z, baseY, speed, phase });
    }
    return list;
  }, []);

  useFrame((state) => {
    if (lanternsRef.current) {
      const t = state.clock.elapsedTime;
      lanternsRef.current.children.forEach((child, idx) => {
        const item = lanterns[idx];
        if (item) {
          child.position.y = item.baseY + Math.sin(t * item.speed + item.phase) * 0.45;
          child.rotation.y = t * 0.15 + item.phase;
          child.rotation.z = Math.sin(t * 0.8 + item.phase) * 0.05;
        }
      });
    }
  });

  return (
    <group ref={lanternsRef}>
      {lanterns.map((l) => (
        <group key={l.id} position={[l.x, l.baseY, l.z]}>
          {/* Origami Hexagonal Paper Lantern Body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.28, 0.75, 6]} />
            <meshStandardMaterial
              color="#fffbeb"
              emissive={isNight ? '#f59e0b' : '#fbbf24'}
              emissiveIntensity={isNight ? 1.6 : 0.6}
              roughness={0.4}
            />
          </mesh>
          {/* Gold Leaf Top & Bottom Rims */}
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.05, 6]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.38, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 6]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Hanging Red Silk Tassel */}
          <mesh position={[0, -0.56, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.3, 4]} />
            <meshStandardMaterial color="#dc2626" roughness={0.6} />
          </mesh>
          {/* Warm Candle Light Point */}
          <pointLight
            color="#ffb703"
            intensity={isNight ? 1.4 : 0.4}
            distance={5.5}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 4. SOARING ORIGAMI CRANES (Symbol of Eternal Devotion)
// ============================================================================
function SoaringOrigamiCranes() {
  const crane1Ref = useRef();
  const crane2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4;
    // Crane 1 orbits clockwise
    if (crane1Ref.current) {
      const r = 21;
      crane1Ref.current.position.x = Math.cos(t) * r;
      crane1Ref.current.position.z = Math.sin(t) * r;
      crane1Ref.current.position.y = 8 + Math.sin(t * 2) * 1.2;
      crane1Ref.current.rotation.y = -t - Math.PI / 2;
      crane1Ref.current.rotation.z = Math.sin(t * 6) * 0.25; // Wing flap tilt
    }
    // Crane 2 orbits counter-clockwise at higher altitude
    if (crane2Ref.current) {
      const r = 27;
      const t2 = -t * 0.75 + 1.5;
      crane2Ref.current.position.x = Math.cos(t2) * r;
      crane2Ref.current.position.z = Math.sin(t2) * r;
      crane2Ref.current.position.y = 12 + Math.cos(t2 * 1.8) * 1.5;
      crane2Ref.current.rotation.y = -t2 + Math.PI / 2;
      crane2Ref.current.rotation.z = Math.sin(t2 * 5.5) * 0.22;
    }
  });

  return (
    <>
      {/* Crane 1 */}
      <group ref={crane1Ref}>
        <OrigamiCraneMesh scale={0.75} />
      </group>
      {/* Crane 2 */}
      <group ref={crane2Ref}>
        <OrigamiCraneMesh scale={0.6} />
      </group>
    </>
  );
}

function OrigamiCraneMesh({ scale = 1 }) {
  return (
    <group scale={scale}>
      {/* Body Diamond */}
      <mesh castShadow>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.4}
          metalness={0.1}
          flatShading
        />
      </mesh>
      {/* Wings */}
      <mesh position={[0.7, 0.1, 0]} rotation={[0, 0, 0.35]}>
        <coneGeometry args={[0.6, 1.4, 3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} flatShading />
      </mesh>
      <mesh position={[-0.7, 0.1, 0]} rotation={[0, 0, -0.35]}>
        <coneGeometry args={[0.6, 1.4, 3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} flatShading />
      </mesh>
      {/* Long Slender Neck & Folded Head */}
      <mesh position={[0, 0.45, 0.75]} rotation={[-0.6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.9, 4]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.5} flatShading />
      </mesh>
      {/* Red Crown of Crane */}
      <mesh position={[0, 0.8, 1.05]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} />
      </mesh>
      {/* Tapered Folded Tail */}
      <mesh position={[0, 0.2, -0.85]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.12, 0.9, 3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} flatShading />
      </mesh>
    </group>
  );
}

// ============================================================================
// 5. HANDCRAFTED PAPERCRAFT SAKURA TREE
// ============================================================================
function PapercraftSakuraTree({ position = [0, 0, 0], scale = 1, rotationY = 0, isNight }) {
  const trunkColor = isNight ? '#261b14' : '#543621';
  const pinkCore = isNight ? '#ec4899' : '#f472b6';
  const pinkMid = isNight ? '#f472b6' : '#fda4af';
  const pinkLight = isNight ? '#fbcfe8' : '#fff1f2';
  const goldStamen = '#d4af37';

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Bonsai-Sculpted Wooden Trunk with Organic Elbows */}
      <mesh position={[0, 1.1, 0]} rotation={[0.08, 0, -0.06]} castShadow>
        <cylinderGeometry args={[0.22, 0.38, 2.2, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} flatShading />
      </mesh>
      {/* Main Limb Left */}
      <mesh position={[-0.45, 2.2, 0.2]} rotation={[0.4, 0, 0.55]} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 1.4, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} flatShading />
      </mesh>
      {/* Main Limb Right */}
      <mesh position={[0.55, 2.3, -0.15]} rotation={[-0.35, 0.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 1.5, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} flatShading />
      </mesh>

      {/* Handcrafted Layered Blossom Foliage Clouds */}
      <group position={[0, 2.8, 0]}>
        {/* Central Blossom Cloud */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <dodecahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color={pinkCore}
            roughness={0.65}
            emissive={isNight ? '#be185d' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
            flatShading
          />
        </mesh>
        {/* Left Blossom Cluster */}
        <mesh position={[-1.2, 0.2, 0.4]} castShadow>
          <dodecahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color={pinkMid} roughness={0.65} flatShading />
        </mesh>
        {/* Right Blossom Cluster */}
        <mesh position={[1.2, 0.3, -0.3]} castShadow>
          <dodecahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial color={pinkMid} roughness={0.65} flatShading />
        </mesh>
        {/* Top Highlight Canopy */}
        <mesh position={[0.2, 1.25, 0.1]} castShadow>
          <dodecahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial color={pinkLight} roughness={0.6} flatShading />
        </mesh>

        {/* Origami Petal Starlets Embedded in Foliage */}
        {[
          [-0.8, 1.0, 0.8],
          [0.9, 0.9, 0.6],
          [-0.4, 0.6, -1.0],
          [0.6, 0.2, 1.2],
          [-1.1, -0.1, -0.6]
        ].map((pos, pIdx) => (
          <group key={pIdx} position={pos}>
            <mesh>
              <octahedronGeometry args={[0.26, 0]} />
              <meshStandardMaterial color={pinkLight} roughness={0.4} flatShading />
            </mesh>
            <mesh scale={0.5}>
              <sphereGeometry args={[0.14, 6, 6]} />
              <meshStandardMaterial color={goldStamen} metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Scattered Fallen Petals Ring at Tree Base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 2.6, 16]} />
        <meshBasicMaterial
          color={isNight ? '#be185d' : '#fbcfe8'}
          transparent
          opacity={isNight ? 0.45 : 0.75}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// 6. ANIMATED DRIFTING SAKURA PETALS (Fluttering in the Breeze)
// ============================================================================
function FallingSakuraPetals({ count = 48, isNight }) {
  const petalsRef = useRef();
  const petalData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 8 + 0.5,
      z: (Math.random() - 0.5) * 22,
      speedY: 0.015 + Math.random() * 0.025,
      speedRot: 0.02 + Math.random() * 0.04,
      sway: 0.4 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      scale: 0.08 + Math.random() * 0.06,
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
          p.x + Math.sin(t * p.sway + p.phase) * 0.6,
          p.y,
          p.z + Math.cos(t * p.sway + p.phase) * 0.6
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
          <planeGeometry args={[1, 1.4]} />
          <meshBasicMaterial
            color={isNight ? '#f472b6' : '#fbcfe8'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 7. CRYSTALLINE KOI POND, ARCHED BRIDGE & MINIATURE PAPER BOATS
// ============================================================================
function PondBridgeAndPaperBoats({ isNight }) {
  const boatRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (boatRef.current) {
      boatRef.current.position.x = 4.8 + Math.cos(t * 0.35) * 1.5;
      boatRef.current.position.z = -1.2 + Math.sin(t * 0.35) * 1.8;
      boatRef.current.rotation.y = -t * 0.35 + Math.PI / 2;
      boatRef.current.rotation.z = Math.sin(t * 1.8) * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Crystalline Watercolor Lotus Pond */}
      <group position={[5.2, 0.015, -1.2]}>
        {/* Pond Water Basin */}
        <mesh receiveShadow>
          <cylinderGeometry args={[4.2, 4.4, 0.1, 28]} />
          <meshStandardMaterial
            color={isNight ? '#0b2545' : '#72b6d8'}
            roughness={0.15}
            metalness={0.35}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Polished Pebble Shore Ring */}
        <mesh position={[0, 0.06, 0]}>
          <ringGeometry args={[4.1, 4.5, 28]} />
          <meshStandardMaterial
            color={isNight ? '#334155' : '#78716c'}
            roughness={0.85}
          />
        </mesh>

        {/* Floating Water Lily Pads */}
        {[
          [-1.5, 0.06, 0.8],
          [1.8, 0.06, -1.2],
          [-0.6, 0.06, -1.8],
          [2.2, 0.06, 1.4]
        ].map((pos, i) => (
          <group key={i} position={pos}>
            <mesh rotation={[-Math.PI / 2, 0, i * 0.8]}>
              <circleGeometry args={[0.55, 14, 0, Math.PI * 1.85]} />
              <meshStandardMaterial
                color={isNight ? '#065f46' : '#10b981'}
                roughness={0.7}
              />
            </mesh>
            {/* Pink Water Lily Blossom */}
            <mesh position={[0.1, 0.1, 0.1]}>
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial color="#f472b6" roughness={0.3} flatShading />
            </mesh>
          </group>
        ))}

        {/* Drifting Folded Origami Paper Boat */}
        <group ref={boatRef}>
          {/* Boat Hull */}
          <mesh castShadow>
            <coneGeometry args={[0.35, 0.9, 4]} rotation={[Math.PI / 2, 0, Math.PI / 4]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.4} flatShading />
          </mesh>
          {/* Folded Paper Sail */}
          <mesh position={[0, 0.42, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.28, 0.65, 3]} />
            <meshStandardMaterial color="#fff1f2" roughness={0.5} flatShading />
          </mesh>
          {/* Gold Trim Bow */}
          <mesh position={[0, 0.08, 0.45]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Traditional Taiko-Bashi Arched Crimson Bridge Crossing Pond */}
      <group position={[5.2, 0.35, -1.2]} rotation={[0, 0.45, 0]}>
        {/* Curved Walkway Slats */}
        {Array.from({ length: 9 }).map((_, i) => {
          const frac = (i - 4) / 4; // -1 to 1
          const y = Math.cos(frac * 1.1) * 0.42;
          const z = frac * 1.9;
          const rx = -frac * 0.35;
          return (
            <mesh key={i} position={[0, y, z]} rotation={[rx, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 0.08, 0.38]} />
              <meshStandardMaterial
                color={isNight ? '#7f1d1d' : '#dc2626'}
                roughness={0.65}
              />
            </mesh>
          );
        })}
        {/* Left & Right Vermilion Handrails with Gilded Finials */}
        {[-0.85, 0.85].map((xSide, sIdx) => (
          <group key={sIdx}>
            {/* Railing posts */}
            {[-1.6, -0.8, 0, 0.8, 1.6].map((zPos, pIdx) => {
              const frac = zPos / 1.9;
              const yBase = Math.cos(frac * 1.1) * 0.42;
              return (
                <group key={pIdx} position={[xSide, yBase + 0.3, zPos]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
                    <meshStandardMaterial color="#b91c1c" roughness={0.6} />
                  </mesh>
                  {/* Gilded Post Finial (Giboshi) */}
                  <mesh position={[0, 0.32, 0]}>
                    <sphereGeometry args={[0.07, 8, 8]} />
                    <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 8. GRAND JAPANESE TORII GATE WITH WHITE SHIMENAWA
// ============================================================================
function HandcraftedToriiGate({ position = [0, 0, 9.4], isNight }) {
  const red = isNight ? '#991b1b' : '#dc2626';
  const black = '#18181b';
  const gold = '#d4af37';

  return (
    <group position={position}>
      {/* Dual Main Pillars */}
      {[-1.9, 1.9].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Black Stone Base Ring */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.3, 0.4, 8]} />
            <meshStandardMaterial color={black} roughness={0.8} />
          </mesh>
          {/* Slender Vermilion Column */}
          <mesh position={[0, 2.1, 0]} rotation={[0, 0, x > 0 ? 0.04 : -0.04]} castShadow>
            <cylinderGeometry args={[0.18, 0.22, 3.8, 8]} />
            <meshStandardMaterial color={red} roughness={0.65} />
          </mesh>
          {/* Gold Ring Collar */}
          <mesh position={[0, 3.85, 0]}>
            <cylinderGeometry args={[0.21, 0.21, 0.08, 8]} />
            <meshStandardMaterial color={gold} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Lower Crossbeam (Nuki) */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <boxGeometry args={[4.6, 0.22, 0.24]} />
        <meshStandardMaterial color={red} roughness={0.65} />
      </mesh>

      {/* Upper Main Lintel (Kasagi & Shimaki) with Upward Curved Ends */}
      <mesh position={[0, 4.25, 0]} castShadow>
        <boxGeometry args={[5.6, 0.32, 0.45]} />
        <meshStandardMaterial color={red} roughness={0.65} />
      </mesh>
      {/* Top Black Roof Ridge */}
      <mesh position={[0, 4.45, 0]} castShadow>
        <boxGeometry args={[5.8, 0.12, 0.52]} />
        <meshStandardMaterial color={black} roughness={0.7} />
      </mesh>

      {/* Center Tablet (Gakuzuka) with Gold Border */}
      <mesh position={[0, 3.75, 0]}>
        <boxGeometry args={[0.42, 0.7, 0.16]} />
        <meshStandardMaterial color={black} roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.75, 0.09]}>
        <planeGeometry args={[0.34, 0.6]} />
        <meshStandardMaterial color={gold} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Sacred Straw Rope (Shimenawa) & Zig-zag Paper Streamers (Shide) */}
      <mesh position={[0, 3.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 3.4, 6]} />
        <meshStandardMaterial color="#ca8a04" roughness={0.9} />
      </mesh>
      {[-1.0, 0, 1.0].map((sx, idx) => (
        <mesh key={idx} position={[sx, 2.9, 0.08]} rotation={[0, 0, (idx - 1) * 0.15]}>
          <planeGeometry args={[0.18, 0.38]} />
          <meshStandardMaterial color="#FAF7F2" side={THREE.DoubleSide} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 9. TRADITIONAL JAPANESE STONE LANTERN (Tōrō with Warm Candle Glow)
// ============================================================================
function HandcraftedStoneLantern({ position = [0, 0, 0], scale = 1, isNight }) {
  const stoneColor = isNight ? '#334155' : '#64748b';
  const paperScreen = '#fffbeb';

  return (
    <group position={position} scale={scale}>
      {/* Octagonal Foundation Base */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.3, 6]} />
        <meshStandardMaterial color={stoneColor} roughness={0.85} flatShading />
      </mesh>
      {/* Pedestal Post (Sao) */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, 0.8, 6]} />
        <meshStandardMaterial color={stoneColor} roughness={0.85} flatShading />
      </mesh>
      {/* Middle Platform (Chūdai) */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.28, 0.16, 6]} />
        <meshStandardMaterial color={stoneColor} roughness={0.85} flatShading />
      </mesh>
      {/* Light Chamber (Hibukuro) with Glowing Washi Paper */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.44, 6]} />
        <meshStandardMaterial
          color={paperScreen}
          emissive={isNight ? '#f59e0b' : '#fbbf24'}
          emissiveIntensity={isNight ? 1.8 : 0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Sweeping Hexagonal Roof (Kasa) */}
      <mesh position={[0, 1.82, 0]} castShadow>
        <coneGeometry args={[0.62, 0.35, 6]} />
        <meshStandardMaterial color={stoneColor} roughness={0.8} flatShading />
      </mesh>
      {/* Jewel Finial (Hōju) */}
      <mesh position={[0, 2.06, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Warm Lantern Light */}
      <pointLight
        position={[0, 1.45, 0]}
        color="#ffb703"
        intensity={isNight ? 2.2 : 0.8}
        distance={6}
        decay={2}
      />
    </group>
  );
}

// ============================================================================
// 10. BAMBOO GROVE (Takegaki)
// ============================================================================
function BambooGrove({ position = [0, 0, 0], isNight }) {
  const stalkColor = isNight ? '#064e3b' : '#15803d';
  const nodeColor = isNight ? '#065f46' : '#84cc16';
  const stalks = useMemo(() => [
    { x: -0.8, z: 0.1, h: 4.8 },
    { x: -0.3, z: -0.4, h: 5.6 },
    { x: 0.2, z: 0.2, h: 5.2 },
    { x: 0.7, z: -0.2, h: 4.5 },
    { x: 1.1, z: 0.3, h: 5.0 },
  ], []);

  return (
    <group position={position}>
      {stalks.map((st, sIdx) => (
        <group key={sIdx} position={[st.x, 0, st.z]}>
          {/* Bamboo Sections with Gold/Green Nodes */}
          {Array.from({ length: 6 }).map((_, n) => (
            <React.Fragment key={n}>
              <mesh position={[0, n * 0.8 + 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.06, 0.07, 0.76, 6]} />
                <meshStandardMaterial color={stalkColor} roughness={0.7} flatShading />
              </mesh>
              {/* Gold/Green Ring Node */}
              <mesh position={[0, n * 0.8 + 0.8, 0]}>
                <torusGeometry args={[0.075, 0.015, 4, 8]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color={nodeColor} metalness={0.6} roughness={0.3} />
              </mesh>
            </React.Fragment>
          ))}
          {/* Folded Paper Bamboo Leaves at Crown */}
          <mesh position={[0, st.h, 0]}>
            <coneGeometry args={[0.45, 0.9, 4]} />
            <meshStandardMaterial color={stalkColor} roughness={0.6} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 11. TRADITIONAL ENGAWA TEA VERANDA / SHOJI PAVILION
// ============================================================================
function EngawaTeaPavilion({ position = [-9.5, 0, -1], isNight }) {
  const woodColor = isNight ? '#271b12' : '#573318';
  const roofColor = isNight ? '#0f172a' : '#1f2937';
  const paperScreen = '#fffbeb';

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Stone Footing Pedestal */}
      <mesh position={[0, 0.16, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.32, 2.4]} />
        <meshStandardMaterial color="#475569" roughness={0.85} flatShading />
      </mesh>
      {/* Polished Cedar Veranda Deck */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.0, 0.12, 2.2]} />
        <meshStandardMaterial color={woodColor} roughness={0.65} />
      </mesh>

      {/* Glowing Shōji Lattice Back Wall */}
      <mesh position={[0, 1.7, -0.85]}>
        <boxGeometry args={[4.6, 2.5, 0.08]} />
        <meshStandardMaterial
          color={paperScreen}
          emissive={isNight ? '#f59e0b' : '#fbbf24'}
          emissiveIntensity={isNight ? 0.7 : 0.25}
          roughness={0.8}
        />
      </mesh>
      {/* Black Shōji Lattice Grid */}
      <mesh position={[0, 1.7, -0.8]}>
        <boxGeometry args={[4.7, 2.6, 0.02]} />
        <meshStandardMaterial color="#1c1917" wireframe />
      </mesh>

      {/* Wooden Cedar Support Columns */}
      {[-2.2, 0, 2.2].map((cx, i) => (
        <mesh key={i} position={[cx, 1.7, 0.85]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2.6, 8]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>
      ))}

      {/* Sweeping Tiered Temple Pagoda Eaves */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[5.8, 0.28, 2.8]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} flatShading />
      </mesh>
      {/* Upper Ridge Beam with Gold End Caps */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[5.2, 0.24, 2.2]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} flatShading />
      </mesh>
      {[-2.6, 2.6].map((ex, idx) => (
        <mesh key={idx} position={[ex, 3.5, 0]}>
          <boxGeometry args={[0.1, 0.28, 2.25]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 12. MAIN HANDCRAFTED PAPERCRAFT ZEN BIOME ASSEMBLY
// ============================================================================
export function ZenBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161c2d' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const darkCedar = isNight ? '#171412' : '#452a1b';

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
      {/* 1. Distant Handcrafted Papercraft Mount Fuji */}
      <PapercraftMountFuji isNight={isNight} />

      {/* 2. Layered Papercraft Hills & Watercolor Basin Ground */}
      <PapercraftLandscapeBasin isNight={isNight} />

      {/* 3. Floating Origami Sky Lanterns (Warm Fairy Point Lights) */}
      <FloatingOrigamiSkyLanterns isNight={isNight} />

      {/* 4. Soaring Origami Cranes Circling Overhead */}
      <SoaringOrigamiCranes />

      {/* 5. Handcrafted Pop-Up Zen Island Deck (Multi-Tier Papercraft) */}
      {/* Kraft Paper Base Strata */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[23.6, 1.6, 23.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#8c6d48'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Foil Trim Border Between Strata & Deckle Top */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[23.8, 0.08, 23.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Upper Deckle-Edge Torn Paper Platform (Interactive Placement Ground) */}
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
          roughness={0.92}
          metalness={0.03}
        />
      </mesh>

      {/* Fine Japanese Cedar Framing Rails with Joinery Pegs */}
      <mesh position={[0, 0.04, 11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={darkCedar} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.04, -11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={darkCedar} roughness={0.7} />
      </mesh>
      <mesh position={[11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={darkCedar} roughness={0.7} />
      </mesh>
      <mesh position={[-11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={darkCedar} roughness={0.7} />
      </mesh>

      {/* 6. Concentric Karesansui Raked Sand Ripple Rings & Kintsugi Zen Rock */}
      <group position={[-4.5, 0.015, -4.5]}>
        {[1.4, 2.2, 3.0].map((radius, rIdx) => (
          <mesh key={rIdx} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.06, radius + 0.06, 28]} />
            <meshBasicMaterial
              color={isNight ? '#38bdf8' : '#d5cfbf'}
              transparent
              opacity={isNight ? 0.3 : 0.65}
            />
          </mesh>
        ))}
        {/* Weathered Garden Stone with Gold Kintsugi Veins */}
        <mesh position={[0, 0.45, 0]} rotation={[0.2, 0.5, 0.1]} castShadow>
          <dodecahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial color="#475569" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0, 0.45, 0]} rotation={[0.25, 0.55, 0.15]} scale={1.01}>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color={goldTrim} wireframe metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Vibrant Velvet Moss Base Cushion */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.3, 16]} />
          <meshStandardMaterial color={isNight ? '#14532d' : '#4d7c0f'} roughness={0.95} />
        </mesh>
      </group>

      {/* Linear Raked Gravel Patterns */}
      {[-7, -5, -3, 3, 5].map((z, idx) => (
        <mesh key={idx} position={[-2, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[11, 0.14]} />
          <meshBasicMaterial
            color={isNight ? '#38bdf8' : '#d5cfbf'}
            transparent
            opacity={isNight ? 0.25 : 0.55}
          />
        </mesh>
      ))}

      {/* 7. Natural Stepping Stones (Tobi-ishi) with Gold Foil Rim */}
      {steppingStones.map((s, idx) => (
        <group key={idx} position={[s.x, 0.035, s.z]} rotation={[0, idx * 0.35, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[s.sx * 0.55, 14]} />
            <meshStandardMaterial
              color={isNight ? '#334155' : '#78716c'}
              roughness={0.85}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[s.sx * 0.53, s.sx * 0.56, 14]} />
            <meshStandardMaterial color={goldTrim} metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 8. Grand Japanese Torii Gate with Shimenawa */}
      <HandcraftedToriiGate position={[0, 0, 9.4]} isNight={isNight} />

      {/* 9. Handcrafted Papercraft Sakura Trees (3 Majestic Trees) */}
      <PapercraftSakuraTree
        position={[-7.8, 0, -7.8]}
        scale={1.35}
        rotationY={0.6}
        isNight={isNight}
      />
      <PapercraftSakuraTree
        position={[7.8, 0, -8.2]}
        scale={1.25}
        rotationY={-0.8}
        isNight={isNight}
      />
      <PapercraftSakuraTree
        position={[-8.2, 0, 6.8]}
        scale={1.05}
        rotationY={1.2}
        isNight={isNight}
      />

      {/* 10. Drifting Sakura Petals Wind Gusts */}
      <FallingSakuraPetals count={54} isNight={isNight} />

      {/* 11. Taiko-bashi Curved Red Bridge, Koi Pond & Drifting Paper Boat */}
      <PondBridgeAndPaperBoats isNight={isNight} />

      {/* 12. Handcrafted Toro Stone Lanterns with Candle Warmth */}
      <HandcraftedStoneLantern position={[2.6, 0, 8.8]} scale={0.9} isNight={isNight} />
      <HandcraftedStoneLantern position={[-2.6, 0, 8.8]} scale={0.9} isNight={isNight} />
      <HandcraftedStoneLantern position={[3.8, 0, 3.2]} scale={0.85} isNight={isNight} />
      <HandcraftedStoneLantern position={[-7.2, 0, -3.8]} scale={0.95} isNight={isNight} />

      {/* 13. Bamboo Groves Along Rear Perimeter */}
      <BambooGrove position={[-7.5, 0, -9.5]} isNight={isNight} />
      <BambooGrove position={[0, 0, -10.0]} isNight={isNight} />

      {/* 14. Traditional Japanese Tea Veranda / Engawa Pavilion */}
      <EngawaTeaPavilion position={[-9.6, 0, 0]} isNight={isNight} />
    </group>
  );
}
