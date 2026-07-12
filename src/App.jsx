import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ============ INVENTORY ITEM DEFINITIONS ============
const ITEM_DEFS = {
  flower: { label: 'Bunga', emoji: '🌸', color: '#ff6b9d' },
  tree: { label: 'Pohon', emoji: '🌳', color: '#4caf50' },
  rock: { label: 'Batu', emoji: '🪨', color: '#888' },
  lamp: { label: 'Lampu', emoji: '💡', color: '#ffd54f' },
};

// ============ 3D OBJECTS ============

function Box() {
  return (
    <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f8cff" roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

// 3D Flower - Stylized procedural flower
function Flower3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  const petalCount = 6;
  const petalColor = '#ff6b9d';
  const centerColor = '#ffd700';
  const stemColor = '#2d8a4e';
  const leafColor = '#3aad5c';

  // Gentle sway animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 1, 8]} />
        <meshStandardMaterial color={stemColor} />
      </mesh>

      {/* Leaves */}
      <group position={[0, 0.35, 0]}>
        <mesh position={[0.15, 0, 0.05]} rotation={[0.3, 0.5, -0.6]} castShadow>
          <sphereGeometry args={[0.12, 8, 6]} />
          <meshStandardMaterial color={leafColor} />
        </mesh>
        <mesh position={[-0.13, -0.1, 0.05]} rotation={[0.3, -0.4, 0.5]} castShadow>
          <sphereGeometry args={[0.1, 8, 6]} />
          <meshStandardMaterial color={leafColor} />
        </mesh>
      </group>

      {/* Flower head */}
      <group position={[0, 1.05, 0]}>
        {/* Petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (i / petalCount) * Math.PI * 2;
          const px = Math.cos(angle) * 0.18;
          const pz = Math.sin(angle) * 0.18;
          return (
            <mesh key={i} position={[px, 0, pz]} rotation={[0, -angle, 0.3]} castShadow>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshStandardMaterial color={petalColor} roughness={0.4} />
            </mesh>
          );
        })}
        {/* Center */}
        <mesh castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={centerColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Tree - Simple stylized tree
function Tree3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.02;
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.9} />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <coneGeometry args={[0.7, 1.0, 8]} />
        <meshStandardMaterial color="#2d8a4e" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[0.5, 0.8, 8]} />
        <meshStandardMaterial color="#3aad5c" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial color="#4cca6a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 3D Rock
function Rock3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <dodecahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#777" roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh position={[0.25, 0.12, 0.15]} castShadow>
        <dodecahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial color="#888" roughness={0.95} metalness={0.05} />
      </mesh>
    </group>
  );
}

// 3D Lamp - Street lamp style (reacts to Day / Night mode)
function Lamp3D({ position = [0, 0, 0], timeMode = 'night' }) {
  const isNight = timeMode === 'night';
  const bulbEmissive = isNight ? '#ffbe3b' : '#ffd54f';
  const bulbIntensity = isNight ? 3.5 : 1.2;
  const lightIntensity = isNight ? 2.8 : 0.6;
  const lightDistance = isNight ? 10 : 4;

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 2, 8]} />
        <meshStandardMaterial color={isNight ? '#2d3342' : '#555'} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Lamp head */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.08, 0.25, 8]} />
        <meshStandardMaterial color={isNight ? '#1e222d' : '#444'} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Light bulb */}
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#fff8e1" emissive={bulbEmissive} emissiveIntensity={bulbIntensity} />
      </mesh>
      {/* Point light */}
      <pointLight position={[0, 1.9, 0]} color="#ffcf48" intensity={lightIntensity} distance={lightDistance} decay={2} />
      
      {/* Subtle night glow halo around lamp head */}
      {isNight && (
        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ffcf48" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  );
}

// Component map for rendering placed objects
const OBJECT_COMPONENTS = {
  flower: Flower3D,
  tree: Tree3D,
  rock: Rock3D,
  lamp: Lamp3D,
};

// Wrapper for placed objects — handles click, hover, selection ring
function PlacedObjectWrapper({ obj, deleteMode, selected, onSelect, onDelete, timeMode }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered
      ? deleteMode ? 'not-allowed' : 'pointer'
      : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered, deleteMode]);

  const Comp = OBJECT_COMPONENTS[obj.type];
  if (!Comp) return null;

  const [ox, , oz] = obj.position;
  const ringColor = deleteMode ? '#ff4444' : selected ? '#4fc3f7' : timeMode === 'night' ? '#8ab4f8' : '#ffffff';
  const showRing = hovered || selected;

  return (
    <group
      onClick={(e) => { e.stopPropagation(); deleteMode ? onDelete(obj.id) : onSelect(obj.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Comp position={obj.position} timeMode={timeMode} />
      {showRing && (
        <mesh position={[ox, 0.02, oz]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.65, 0.82, 40]} />
          <meshBasicMaterial color={ringColor} transparent opacity={hovered && deleteMode ? 0.9 : 0.65} />
        </mesh>
      )}
      {/* Invisible hit area */}
      <mesh position={[ox, 0.6, oz]} visible={false}>
        <cylinderGeometry args={[0.9, 0.9, 1.8, 12]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}

// ============ HELPER: Expose Three.js state ============
function SceneAccess({ sceneRef }) {
  const state = useThree();
  useEffect(() => {
    if (sceneRef) sceneRef.current = state;
  }, [state, sceneRef]);
  return null;
}

// ============ OUTDOOR & GALAXY SCENE DATA CREATION (Outside Render) ============

function createGalaxyData() {
  const count = 4500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const arms = 3;
  const radius = 22;

  const colorCore = new THREE.Color('#fff9c4');
  const colorArm1 = new THREE.Color('#ff007f'); // Magenta
  const colorArm2 = new THREE.Color('#00ffff'); // Cyan
  const colorArm3 = new THREE.Color('#8a2be2'); // Violet / Purple

  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 1.5) * radius;
    const spinAngle = r * 0.45;
    const armIndex = i % arms;
    const armAngle = ((Math.PI * 2) / arms) * armIndex;
    const randomOffset = (Math.random() - 0.5) * (r * 0.35 + 0.3);

    const angle = armAngle + spinAngle + randomOffset;
    const x = Math.cos(angle) * r;
    const y = (Math.random() - 0.5) * (3 - r * 0.1);
    const z = Math.sin(angle) * r;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    let mixedColor = colorCore.clone();
    const distRatio = Math.min(1, r / radius);
    if (armIndex === 0) mixedColor.lerp(colorArm1, distRatio);
    else if (armIndex === 1) mixedColor.lerp(colorArm2, distRatio);
    else mixedColor.lerp(colorArm3, distRatio);

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }
  return { positions, colors };
}

function createStarsData() {
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ['#ffffff', '#aee2ff', '#ffd2a1', '#e8b5ff', '#9beaff'];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 40 + 25;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 2;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const c = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

const GALAXY_DATA = createGalaxyData();
const STARS_DATA = createStarsData();

// ============ OUTDOOR & GALAXY SCENE COMPONENTS ============

// 1. Galaxy Starfield & Swirling Spiral for Night Mode
function GalaxySky() {
  const galaxyGroupRef = useRef();
  const starFieldRef = useRef();
  const [shootingStar, setShootingStar] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });

  // Animate galaxy rotation and shooting stars
  useFrame((state, delta) => {
    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.rotation.y += delta * 0.04;
      galaxyGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    if (starFieldRef.current) {
      starFieldRef.current.rotation.y += delta * 0.005;
    }

    // Random shooting star
    if (!shootingStar.active && Math.random() < 0.006) {
      const startX = (Math.random() - 0.5) * 30;
      const startY = 18 + Math.random() * 8;
      const startZ = -15 + (Math.random() - 0.5) * 20;
      setShootingStar({
        active: true,
        pos: [startX, startY, startZ],
        speed: [-(Math.random() * 25 + 15), -(Math.random() * 15 + 8), (Math.random() - 0.5) * 10]
      });
    } else if (shootingStar.active) {
      const [x, y, z] = shootingStar.pos;
      const [vx, vy, vz] = shootingStar.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      const nz = z + vz * delta;
      if (ny < 0 || nx < -35) {
        setShootingStar(s => ({ ...s, active: false }));
      } else {
        setShootingStar(s => ({ ...s, pos: [nx, ny, nz] }));
      }
    }
  });

  return (
    <group>
      {/* Background stars dome */}
      <points ref={starFieldRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={STARS_DATA.positions.length / 3} array={STARS_DATA.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={STARS_DATA.colors.length / 3} array={STARS_DATA.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.16} vertexColors transparent opacity={0.9} sizeAttenuation />
      </points>

      {/* Swirling Galaxy Spiral tilted across the sky */}
      <group position={[0, 16, -15]} rotation={[0.45, 0, 0.3]}>
        <points ref={galaxyGroupRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={GALAXY_DATA.positions.length / 3} array={GALAXY_DATA.positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={GALAXY_DATA.colors.length / 3} array={GALAXY_DATA.colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.22} vertexColors transparent opacity={0.85} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
      </group>

      {/* Glowing Moon */}
      <group position={[-14, 18, -20]}>
        <mesh castShadow>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshStandardMaterial color="#f0f6ff" roughness={0.8} emissive="#c8e0ff" emissiveIntensity={0.35} />
        </mesh>
        {/* Soft lunar halo */}
        <mesh>
          <sphereGeometry args={[2.6, 32, 32]} />
          <meshBasicMaterial color="#64b5f6" transparent opacity={0.15} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial color="#3f51b5" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Shooting Star */}
      {shootingStar.active && (
        <group position={shootingStar.pos}>
          <mesh>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh rotation={[0, 0, -0.4]} position={[0.6, 0.3, 0]}>
            <coneGeometry args={[0.1, 2.5, 8]} />
            <meshBasicMaterial color="#80d8ff" transparent opacity={0.6} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 2. Sunny Sky & Drifting Clouds for Day Mode
function DaySky() {
  const cloudsRef = useRef([]);

  const cloudConfigs = useMemo(() => [
    { id: 1, pos: [-15, 14, -18], scale: 1.2, speed: 0.6 },
    { id: 2, pos: [8, 16, -15], scale: 1.5, speed: 0.4 },
    { id: 3, pos: [-4, 18, -24], scale: 1.8, speed: 0.3 },
    { id: 4, pos: [18, 13, -12], scale: 1.0, speed: 0.7 },
    { id: 5, pos: [-22, 12, -8], scale: 0.9, speed: 0.5 },
  ], []);

  useFrame((state, delta) => {
    cloudsRef.current.forEach((cloud, i) => {
      if (cloud) {
        cloud.position.x += cloudConfigs[i].speed * delta;
        if (cloud.position.x > 26) cloud.position.x = -26;
        cloud.position.y += Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.004;
      }
    });
  });

  return (
    <group>
      {/* Golden Sun */}
      <group position={[16, 19, -18]}>
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" />
        </mesh>
        {/* Sun aura */}
        <mesh>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial color="#ffe57f" transparent opacity={0.25} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[4.0, 32, 32]} />
          <meshBasicMaterial color="#ffab00" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Drifting Low-Poly Clouds */}
      {cloudConfigs.map((c, idx) => (
        <group key={c.id} position={c.pos} scale={c.scale} ref={el => cloudsRef.current[idx] = el}>
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[1.2, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[1.1, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.9, 10, 10]} />
            <meshStandardMaterial color="#f0f7ff" roughness={0.2} />
          </mesh>
          <mesh position={[-1.1, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.95, 10, 10]} />
            <meshStandardMaterial color="#f0f7ff" roughness={0.2} />
          </mesh>
          <mesh position={[0.5, 0.5, -0.3]} castShadow>
            <sphereGeometry args={[0.85, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 3. Outdoor Ground Landscape (Island Terrain)
function OutdoorGround({ timeMode }) {
  const isNight = timeMode === 'night';
  const radius = 11;

  // Colors based on mode
  const topColor = isNight ? '#131826' : '#49a85c';
  const ringColor = isNight ? '#38bdf8' : '#72d686';
  const sideColor1 = isNight ? '#0c0f18' : '#6b5344';
  const sideColor2 = isNight ? '#06070b' : '#4a382e';

  return (
    <group>
      {/* 1. Main Placement Cylinder Disc (top surface exactly at Y = 0) */}
      {/* height 0.4 positioned at y = -0.2 => top face is Y = 0 */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[radius, radius, 0.4, 64]} />
        <meshStandardMaterial
          color={topColor}
          roughness={isNight ? 0.9 : 0.8}
          metalness={isNight ? 0.15 : 0.05}
        />
      </mesh>

      {/* 2. Concentric Polar Rings for clean, aesthetic placement reference without square grid clipping */}
      {[3, 6, 9].map((r, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <ringGeometry args={[r - 0.03, r + 0.03, 64]} />
          <meshBasicMaterial color={ringColor} transparent opacity={isNight ? 0.35 : 0.25} />
        </mesh>
      ))}

      {/* Polar axis crosshairs */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[18, 0.05]} />
        <meshBasicMaterial color={ringColor} transparent opacity={isNight ? 0.3 : 0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.005, 0]}>
        <planeGeometry args={[18, 0.05]} />
        <meshBasicMaterial color={ringColor} transparent opacity={isNight ? 0.3 : 0.2} />
      </mesh>

      {/* 3. Outer Glowing Boundary Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
        <ringGeometry args={[10.7, 10.95, 64]} />
        <meshBasicMaterial color={isNight ? '#60a5fa' : '#88d49e'} transparent opacity={isNight ? 0.85 : 0.6} />
      </mesh>

      {/* 4. Perimeter Decorative Crystals/Cones */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const rPos = 10.85;
        const x = Math.cos(angle) * rPos;
        const z = Math.sin(angle) * rPos;
        return (
          <mesh key={i} position={[x, 0.18, z]} rotation={[0, -angle, 0]} castShadow>
            <coneGeometry args={[0.15, 0.36, 6]} />
            <meshStandardMaterial
              color={isNight ? (i % 2 === 0 ? '#38bdf8' : '#e879f9') : '#358a47'}
              emissive={isNight ? (i % 2 === 0 ? '#0284c7' : '#c026d3') : '#000000'}
              emissiveIntensity={isNight ? 1.5 : 0}
              roughness={0.6}
            />
          </mesh>
        );
      })}

      {/* 5. Floating Island Cliff Sides underneath (strictly below Y = -0.4) */}
      <mesh position={[0, -1.7, 0]} receiveShadow>
        <cylinderGeometry args={[radius, 8.8, 2.6, 64]} />
        <meshStandardMaterial color={sideColor1} roughness={0.95} />
      </mesh>
      <mesh position={[0, -4.0, 0]} receiveShadow>
        <cylinderGeometry args={[8.8, 3.8, 2.0, 64]} />
        <meshStandardMaterial color={sideColor2} roughness={0.95} />
      </mesh>
    </group>
  );
}

export default function App() {
  const [timeMode, setTimeMode] = useState('night'); // 'night' (galaxy) or 'day' (siang)
  const [autoRotate, setAutoRotate] = useState(false); // Player controls whether camera auto-rotates or is 100% free
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [placedObjects, setPlacedObjects] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const sceneRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [inventory] = useState(() => {
    const slots = Array(18).fill(null);
    slots[0] = 'flower';
    slots[1] = 'tree';
    slots[2] = 'rock';
    slots[3] = 'lamp';
    return slots;
  });

  const handleStart = useCallback(() => setPaused(true), []);
  const handleEnd = useCallback(() => setPaused(false), []);

  const handleDragStart = useCallback((e, itemType) => {
    setDraggingItem(itemType);
    e.dataTransfer.setData('itemType', itemType);
    const dragEl = document.createElement('div');
    dragEl.textContent = ITEM_DEFS[itemType]?.emoji || '📦';
    dragEl.style.fontSize = '36px';
    dragEl.style.position = 'absolute';
    dragEl.style.top = '-100px';
    document.body.appendChild(dragEl);
    e.dataTransfer.setDragImage(dragEl, 20, 20);
    setTimeout(() => document.body.removeChild(dragEl), 0);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingItem(null);
  }, []);

  const handleDeleteObject = useCallback((id) => {
    setPlacedObjects(prev => prev.filter(o => o.id !== id));
    setSelectedId(s => s === id ? null : s);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.filter(o => o.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const handleResetAll = useCallback(() => {
    if (!resetConfirm) { setResetConfirm(true); setTimeout(() => setResetConfirm(false), 3000); return; }
    setPlacedObjects([]);
    setSelectedId(null);
    setDeleteMode(false);
    setResetConfirm(false);
  }, [resetConfirm]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const itemType = e.dataTransfer.getData('itemType');
    if (!itemType || !sceneRef.current || !canvasContainerRef.current) return;

    const rect = canvasContainerRef.current.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const { camera } = sceneRef.current;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    const hit = raycaster.ray.intersectPlane(floorPlane, intersection);

    if (hit) {
      const half = 10;
      intersection.x = Math.max(-half, Math.min(half, intersection.x));
      intersection.z = Math.max(-half, Math.min(half, intersection.z));

      setPlacedObjects(prev => [...prev, {
        id: Date.now() + Math.random(),
        type: itemType,
        position: [intersection.x, 0, intersection.z],
      }]);
    }

    setDraggingItem(null);
  }, []);

  const inventoryHeight = 220;
  const isNight = timeMode === 'night';

  return (
    <div style={{
      width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden',
      background: isNight ? '#060814' : '#87ceeb', display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box', transition: 'background 0.5s ease',
    }}>

      {/* Floating Day/Night Mode Switcher UI at Top Center / Right */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 24,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Camera Auto-Rotate Toggle Button */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title="Aktifkan atau nonaktifkan putaran otomatis kamera"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: autoRotate
              ? (isNight ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'linear-gradient(135deg, #10b981, #059669)')
              : (isNight ? 'rgba(20, 24, 40, 0.88)' : 'rgba(255, 255, 255, 0.88)'),
            border: autoRotate
              ? (isNight ? '1.5px solid #60a5fa' : '1.5px solid #34d399')
              : (isNight ? '1.5px solid rgba(138, 180, 248, 0.4)' : '1.5px solid rgba(0, 0, 0, 0.12)'),
            borderRadius: 50,
            padding: '7px 16px',
            color: autoRotate ? '#ffffff' : (isNight ? '#cbd5e1' : '#334155'),
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: autoRotate
              ? (isNight ? '0 4px 18px rgba(59, 130, 246, 0.45)' : '0 4px 18px rgba(16, 185, 129, 0.4)')
              : (isNight ? '0 8px 32px rgba(0, 180, 255, 0.25)' : '0 8px 32px rgba(0, 0, 0, 0.12)'),
            backdropFilter: 'blur(12px)',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span style={{ fontSize: 15 }}>{autoRotate ? '🔄' : '⏸️'}</span>
          <span>{autoRotate ? 'Putar: ON' : 'Putar: OFF'}</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: isNight ? 'rgba(20, 24, 40, 0.88)' : 'rgba(255, 255, 255, 0.88)',
          border: isNight ? '1.5px solid rgba(138, 180, 248, 0.4)' : '1.5px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 50,
          padding: '6px 8px',
          boxShadow: isNight ? '0 8px 32px rgba(0, 180, 255, 0.25)' : '0 8px 32px rgba(0, 0, 0, 0.12)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}>
        <button
          onClick={() => setTimeMode('day')}
          style={{
            padding: '8px 18px',
            borderRadius: 40,
            border: 'none',
            background: !isNight ? 'linear-gradient(135deg, #ffcc00, #ff9900)' : 'transparent',
            color: !isNight ? '#ffffff' : '#8899aa',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.3s',
            boxShadow: !isNight ? '0 4px 14px rgba(255, 153, 0, 0.4)' : 'none',
          }}
        >
          <span>☀️</span> Siang
        </button>
        <button
          onClick={() => setTimeMode('night')}
          style={{
            padding: '8px 18px',
            borderRadius: 40,
            border: 'none',
            background: isNight ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
            color: isNight ? '#ffffff' : '#667788',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.3s',
            boxShadow: isNight ? '0 4px 14px rgba(139, 92, 246, 0.45)' : 'none',
          }}
        >
          <span>🌌</span> Galaxy Malam
        </button>
        </div>
      </div>

      {/* Area Atas - Canvas (full width) */}
      <div
        ref={canvasContainerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          flex: 1, position: 'relative', width: '100%', minHeight: 0,
          border: draggingItem ? '2px dashed rgba(100,200,255,0.6)' : '2px solid transparent',
          transition: 'border 0.2s',
          boxSizing: 'border-box',
        }}
      >
        {/* Drop hint overlay */}
        {draggingItem && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              background: isNight ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.9)',
              border: isNight ? '1px solid #38bdf8' : '1px solid #4ade80',
              borderRadius: 16, padding: '14px 28px',
              color: isNight ? '#fff' : '#1e293b', fontSize: 15, fontWeight: 600, letterSpacing: 0.5,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}>
              Drop {ITEM_DEFS[draggingItem]?.emoji} {ITEM_DEFS[draggingItem]?.label} ke tanah
            </div>
          </div>
        )}

        <Canvas
          shadows
          camera={{ position: [6, 4, 6], fov: 60 }}
          style={{ background: isNight ? '#050712' : '#85cbee', width: '100%', height: '100%', display: 'block' }}
        >
          <SceneAccess sceneRef={sceneRef} />

          {/* Dynamic Fog for outdoor depth */}
          <fog attach="fog" args={[isNight ? '#060814' : '#a2d6f2', 18, 48]} />

          {/* Lighting setup based on Day / Night mode */}
          {isNight ? (
            <>
              {/* Galaxy & Moonlight */}
              <ambientLight intensity={0.45} color="#464c80" />
              <directionalLight
                position={[-12, 16, -15]}
                intensity={0.9}
                color="#b3d4ff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
                shadow-normalBias={0.04}
                shadow-camera-far={60}
                shadow-camera-left={-16}
                shadow-camera-right={16}
                shadow-camera-top={16}
                shadow-camera-bottom={-16}
              />
              <pointLight position={[0, 8, 0]} intensity={1.2} color="#a855f7" distance={25} decay={2} />
              <GalaxySky />
            </>
          ) : (
            <>
              {/* Sunny Daylight */}
              <ambientLight intensity={0.65} color="#fff8e7" />
              <directionalLight
                position={[14, 18, -14]}
                intensity={1.9}
                color="#fff6dd"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
                shadow-normalBias={0.04}
                shadow-camera-far={60}
                shadow-camera-left={-16}
                shadow-camera-right={16}
                shadow-camera-top={16}
                shadow-camera-bottom={-16}
              />
              <directionalLight position={[-6, 6, 6]} intensity={0.4} color="#bfe8ff" />
              <DaySky />
            </>
          )}

          <OutdoorGround timeMode={timeMode} />
          <Box />

          {/* Render all placed objects */}
          {placedObjects.map((obj) => (
            <PlacedObjectWrapper
              key={obj.id}
              obj={obj}
              deleteMode={deleteMode}
              selected={selectedId === obj.id}
              onSelect={setSelectedId}
              onDelete={handleDeleteObject}
              timeMode={timeMode}
            />
          ))}

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate && !paused}
            autoRotateSpeed={speed * 1.5}
            maxPolarAngle={Math.PI / 2 + 0.15}
            minDistance={1.5}
            maxDistance={38}
            onStart={handleStart}
            onEnd={handleEnd}
          />
        </Canvas>
      </div>

      {/* Toggle Button - Inventory */}
      <button
        onClick={() => setInventoryOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: inventoryOpen ? inventoryHeight : 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: isNight ? 'rgba(25, 28, 40, 0.92)' : 'rgba(40, 40, 46, 0.92)',
          border: isNight ? '1.5px solid rgba(138, 180, 248, 0.3)' : '1.5px solid rgba(200,200,200,0.3)',
          borderBottom: 'none',
          borderRadius: '14px 14px 0 0',
          color: '#eee',
          padding: '6px 28px',
          cursor: 'pointer',
          fontSize: 16,
          letterSpacing: 0.5,
          backdropFilter: 'blur(10px)',
          transition: 'bottom 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.2)',
        }}
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: 14,
        }}>▲</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Inventory</span>
      </button>

      {/* Bottom Bar - Inventory Grid */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: inventoryHeight,
        transform: inventoryOpen ? 'translateY(0)' : `translateY(${inventoryHeight}px)`,
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: inventoryOpen ? 'auto' : 'none',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderTop: isNight ? '2px solid rgba(138, 180, 248, 0.25)' : '2px solid rgba(200,200,200,0.25)',
          background: isNight ? 'rgba(15, 18, 28, 0.96)' : 'rgba(30, 32, 38, 0.95)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '14px 24px 10px 24px',
        }}>
          {/* Inventory Grid */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(9, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 10,
          }}>
            {inventory.map((item, i) => {
              const def = item ? ITEM_DEFS[item] : null;
              return (
                <div
                  key={i}
                  draggable={!!item}
                  onDragStart={item ? (e) => handleDragStart(e, item) : undefined}
                  onDragEnd={handleDragEnd}
                  style={{
                    background: isNight ? '#131722' : '#1c1f24',
                    borderRadius: 12,
                    border: item ? `1.5px solid ${def?.color || '#2a2d33'}55` : '1.5px solid rgba(255,255,255,0.06)',
                    width: '100%',
                    height: '100%',
                    transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                    cursor: item ? 'grab' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    userSelect: 'none',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = item ? (isNight ? '#1c2234' : '#282c34') : '#2a2d36';
                    if (item) e.currentTarget.style.transform = 'scale(1.06)';
                    if (item) e.currentTarget.style.boxShadow = `0 0 14px ${def?.color || '#fff'}44`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isNight ? '#131722' : '#1c1f24';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {def && (
                    <>
                      <span style={{ fontSize: 26, lineHeight: 1 }}>{def.emoji}</span>
                      <span style={{ fontSize: 9, color: isNight ? '#a1a8b8' : '#888', fontWeight: 600, letterSpacing: 0.3 }}>
                        {def.label}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {/* Toolbar: Delete & Reset buttons */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 8, paddingTop: 10,
          }}>
            {/* Left: Delete controls */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => { setDeleteMode(d => !d); setSelectedId(null); }}
                title="Mode Hapus: klik object di scene untuk menghapus"
                style={{
                  padding: '5px 14px',
                  borderRadius: 8,
                  border: deleteMode ? '1.5px solid #ff4444' : '1.5px solid #444',
                  background: deleteMode ? 'rgba(255,68,68,0.22)' : 'rgba(255,255,255,0.05)',
                  color: deleteMode ? '#ff6b6b' : '#aaa',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>🗑️</span>
                {deleteMode ? 'Mode Hapus: ON' : 'Mode Hapus'}
              </button>

              {selectedId && !deleteMode && (
                <button
                  onClick={handleDeleteSelected}
                  title="Hapus object yang dipilih"
                  style={{
                    padding: '5px 14px',
                    borderRadius: 8,
                    border: '1.5px solid #ff8a65',
                    background: 'rgba(255,138,101,0.18)',
                    color: '#ff8a65',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5,
                    transition: 'all 0.2s',
                  }}
                >
                  ✕ Hapus Dipilih
                </button>
              )}

              {placedObjects.length > 0 && (
                <span style={{ fontSize: 11, color: isNight ? '#8892b0' : '#555' }}>
                  {placedObjects.length} object{placedObjects.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Center: Camera Auto-Rotate controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 14,
                  border: autoRotate ? (isNight ? '1.5px solid #60a5fa' : '1.5px solid #10b981') : '1.5px solid rgba(150,150,150,0.3)',
                  background: autoRotate ? (isNight ? 'rgba(59,130,246,0.25)' : 'rgba(16,185,129,0.2)') : 'transparent',
                  color: autoRotate ? (isNight ? '#93c5fd' : '#059669') : (isNight ? '#8892b0' : '#666'),
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.3s',
                }}
              >
                <span>{autoRotate ? '🔄' : '⏸️'}</span>
                {autoRotate ? 'Putar Kamera: ON' : 'Putar Kamera: OFF'}
              </button>

              {autoRotate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label htmlFor="speed-slider" style={{ fontSize: 12, color: isNight ? '#94a3b8' : '#666', whiteSpace: 'nowrap', fontWeight: 500 }}>
                    Speed: {speed.toFixed(1)}x
                  </label>
                  <input
                    id="speed-slider"
                    type="range"
                    min={0.2}
                    max={4}
                    step={0.1}
                    value={speed}
                    onChange={e => setSpeed(Number(e.target.value))}
                    style={{ width: 110, cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>

            {/* Right: Reset button */}
            <button
              onClick={handleResetAll}
              title={resetConfirm ? 'Klik sekali lagi untuk konfirmasi reset' : 'Hapus semua object di scene'}
              style={{
                padding: '5px 16px',
                borderRadius: 8,
                border: resetConfirm ? '1.5px solid #f44336' : '1.5px solid #444',
                background: resetConfirm ? 'rgba(244,67,54,0.25)' : 'rgba(255,255,255,0.05)',
                color: resetConfirm ? '#f44336' : '#aaa',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                animation: resetConfirm ? 'pulse 0.6s infinite alternate' : 'none',
              }}
            >
              {resetConfirm ? '⚠️ Konfirmasi Reset?' : '↺ Reset Semua'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

