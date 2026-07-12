import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ============ CRISP FLAT SVG ICON COMPONENTS ============
function IconFlower({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.2" fill="#ffd700" />
      <circle cx="12" cy="5" r="3.2" fill="#ff6b9d" />
      <circle cx="12" cy="19" r="3.2" fill="#ff6b9d" />
      <circle cx="5" cy="12" r="3.2" fill="#ff6b9d" />
      <circle cx="19" cy="12" r="3.2" fill="#ff6b9d" />
      <circle cx="7" cy="7" r="3.2" fill="#ff6b9d" />
      <circle cx="17" cy="7" r="3.2" fill="#ff6b9d" />
      <circle cx="7" cy="17" r="3.2" fill="#ff6b9d" />
      <circle cx="17" cy="17" r="3.2" fill="#ff6b9d" />
    </svg>
  );
}

function IconTree({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2L3 12h3.5l-3 7h13l-3-7H17L12 2z" fill="#4caf50" />
      <path d="M10 19h4v3h-4z" fill="#8B5E3C" />
    </svg>
  );
}

function IconRock({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 16l3.5-9 5.5-3 6.5 5 1.5 7-6.5 5-7-1.5z" fill="#78909c" />
      <path d="M7.5 7l5.5-3 6.5 5-3 7-5.5 2z" fill="#b0bec5" opacity="0.4" />
    </svg>
  );
}

function IconLamp({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M11 14h2v8h-2z" fill="#555" />
      <path d="M8.5 10l3.5-7 3.5 7z" fill="#374151" />
      <circle cx="12" cy="11" r="3.5" fill="#ffd54f" />
      <circle cx="12" cy="11" r="5" fill="#ffd54f" opacity="0.35" />
      <path d="M12 3v-1M6.5 6l-1-1M17.5 6l1-1" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSun({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5.2" fill="#ffb300" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M6.7 17.3l-1.77 1.77M19.07 4.93L17.3 6.7" stroke="#ff8f00" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconGalaxy({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-30 12 12)" fill="url(#galaxyGrad)" opacity="0.85" />
      <circle cx="12" cy="12" r="3.2" fill="#fff" />
      <circle cx="5" cy="8" r="1.2" fill="#38bdf8" />
      <circle cx="19" cy="16" r="1.3" fill="#c084fc" />
      <defs>
        <linearGradient id="galaxyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconRotateOn({ size = 15 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function IconRotateOff({ size = 15 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="1.2" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function IconTrash({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
    </svg>
  );
}

function IconReset({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function IconWarning({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconChevronUp({ size = 14 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

// ============ INVENTORY ITEM DEFINITIONS ============
const ITEM_DEFS = {
  flower: { label: 'Bunga', icon: <IconFlower size={26} />, dragSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2" fill="#ffd700"/><circle cx="12" cy="5" r="3.2" fill="#ff6b9d"/><circle cx="12" cy="19" r="3.2" fill="#ff6b9d"/><circle cx="5" cy="12" r="3.2" fill="#ff6b9d"/><circle cx="19" cy="12" r="3.2" fill="#ff6b9d"/><circle cx="7" cy="7" r="3.2" fill="#ff6b9d"/><circle cx="17" cy="7" r="3.2" fill="#ff6b9d"/><circle cx="7" cy="17" r="3.2" fill="#ff6b9d"/><circle cx="17" cy="17" r="3.2" fill="#ff6b9d"/></svg>', color: '#ff6b9d' },
  tree: { label: 'Pohon', icon: <IconTree size={26} />, dragSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 2L3 12h3.5l-3 7h13l-3-7H17L12 2z" fill="#4caf50"/><path d="M10 19h4v3h-4z" fill="#8B5E3C"/></svg>', color: '#4caf50' },
  rock: { label: 'Batu', icon: <IconRock size={26} />, dragSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M4 16l3.5-9 5.5-3 6.5 5 1.5 7-6.5 5-7-1.5z" fill="#78909c"/><path d="M7.5 7l5.5-3 6.5 5-3 7-5.5 2z" fill="#b0bec5" opacity="0.4"/></svg>', color: '#888' },
  lamp: { label: 'Lampu', icon: <IconLamp size={26} />, dragSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M11 14h2v8h-2z" fill="#555"/><path d="M8.5 10l3.5-7 3.5 7z" fill="#374151"/><circle cx="12" cy="11" r="3.5" fill="#ffd54f"/><path d="M12 3v-1M6.5 6l-1-1M17.5 6l1-1" stroke="#ffd54f" stroke-width="2" stroke-linecap="round"/></svg>', color: '#ffd54f' },
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

// ============ HELPER: Smoothly Reset Camera Target and Position when Auto-Rotate turns ON ============
function CameraResetter({ autoRotate }) {
  const { controls } = useThree();
  const resetProgress = useRef(0);
  const wasAutoRotate = useRef(autoRotate);

  useEffect(() => {
    if (autoRotate && !wasAutoRotate.current) {
      resetProgress.current = 1.0; // Start smooth transition back to center & default height/distance
    }
    wasAutoRotate.current = autoRotate;
  }, [autoRotate]);

  useFrame((state, delta) => {
    if (!controls || !controls.object) return;
    const cam = controls.object;
    if (autoRotate && resetProgress.current > 0) {
      resetProgress.current = Math.max(0, resetProgress.current - delta * 0.65);
      
      // 1. Smoothly lerp target back to exact center (0, 0, 0)
      controls.target.lerp(new THREE.Vector3(0, 0, 0), delta * 6.5);
      
      // 2. Smoothly lerp camera height toward default y = 4 if it drifted far up/down
      const newY = THREE.MathUtils.lerp(cam.position.y, 4, delta * 5);
      
      // 3. Smoothly normalize camera distance toward ~8.5 if panned away or zoomed way out/in
      const center = new THREE.Vector3(0, 0, 0);
      const currentDist = cam.position.distanceTo(center);
      if (Math.abs(currentDist - 8.5) > 0.25) {
        const targetDist = THREE.MathUtils.lerp(currentDist, 8.5, delta * 4.5);
        const dir = cam.position.clone().sub(center).normalize();
        const nextPos = center.clone().add(dir.multiplyScalar(targetDist));
        cam.position.set(nextPos.x, newY, nextPos.z);
      } else {
        cam.position.set(cam.position.x, newY, cam.position.z);
      }
      controls.update();
    } else if (autoRotate) {
      // While autoRotate is ON, keep target firmly locked at center (0,0,0)
      if (controls.target.lengthSq() > 0.0001) {
        controls.target.set(0, 0, 0);
        controls.update();
      }
    }
  });
  return null;
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

// ============ HELPER: Generate Soft Round Star Canvas Texture ============
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.88)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.28)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

const GALAXY_TEXTURE = createStarTexture();

function createGalaxyData() {
  const count = 42000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const arms = 2; // Andromeda has 2 prominent swirling spiral branches
  const radius = 48; // Large horizontal span stretching far across cosmic floor

  const colorCore = new THREE.Color('#ffffff'); // Brilliant white core
  const colorInner = new THREE.Color('#ffe0b2'); // Warm golden/peach inner bulge
  const colorArm1 = new THREE.Color('#38bdf8'); // Sapphire cyan blue arms
  const colorArm2 = new THREE.Color('#c084fc'); // Electric lavender / purple arms
  const colorDust = new THREE.Color('#1e3a8a'); // Deep cosmic blue dust lane edge

  for (let i = 0; i < count; i++) {
    const isCore = i < 10000;
    let r, angle, y, mixedColor;

    if (isCore) {
      r = Math.pow(Math.random(), 2.2) * 7.5;
      angle = Math.random() * Math.PI * 2;
      const coreThickness = (1.0 - r / 7.5) * 2.8;
      y = (Math.random() - 0.5) * coreThickness;
      const coreRatio = r / 7.5;
      mixedColor = colorCore.clone().lerp(colorInner, coreRatio * 0.8);
    } else {
      r = 4.0 + Math.pow(Math.random(), 1.4) * (radius - 4.0);
      const spinAngle = r * 0.38;
      const armIndex = i % arms;
      const armAngle = ((Math.PI * 2) / arms) * armIndex;
      
      const dustLaneFactor = Math.sin(r * 0.7 - armAngle) * 0.45;
      const randomOffset = (Math.random() - 0.5) * (r * 0.16 + 0.3) + dustLaneFactor;

      angle = armAngle + spinAngle + randomOffset;
      const discThickness = Math.max(0.2, (1.0 - r / radius) * 1.5);
      y = (Math.random() - 0.5) * discThickness; // Flat horizontal profile in XZ plane

      const distRatio = Math.min(1, (r - 4.0) / (radius - 4.0));
      mixedColor = colorInner.clone();
      if (armIndex === 0) {
        mixedColor.lerp(colorArm1, Math.min(1, distRatio * 1.3));
      } else {
        mixedColor.lerp(colorArm2, Math.min(1, distRatio * 1.3));
      }
      if (distRatio > 0.65 && Math.random() < 0.4) {
        mixedColor.lerp(colorDust, (distRatio - 0.65) * 2.5);
      }
    }

    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r * 0.82; // Elliptical horizontal projection

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }
  return { positions, colors };
}

function createStarsData() {
  const count = 3500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ['#ffffff', '#aee2ff', '#ffd2a1', '#e8b5ff', '#9beaff'];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 45 + 28;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
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

// ============ CELESTIAL HELPER COMPONENTS FOR NIGHT SKY ============

// Fast streaking meteor with realistic backward tail aligned to velocity vector
function MeteorItem({ pos, speed, length = 4.2 }) {
  const meshRef = useRef();
  useEffect(() => {
    if (meshRef.current && speed) {
      const dir = new THREE.Vector3(...speed).normalize();
      const tailDir = dir.clone().negate(); // Tail streams backward
      const up = new THREE.Vector3(0, 1, 0);
      meshRef.current.quaternion.setFromUnitVectors(up, tailDir);
    }
  }, [speed]);

  return (
    <group position={pos}>
      {/* Meteor Head Core */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Glowing Aura around Head */}
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Streaking Tail aligned precisely backward along trajectory */}
      <group ref={meshRef}>
        <mesh position={[0, length / 2, 0]}>
          <coneGeometry args={[0.16, length, 16]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.75} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Outer diffuse tail */}
        <mesh position={[0, (length * 1.2) / 2, 0]}>
          <coneGeometry args={[0.32, length * 1.2, 16]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

// Majestic slow-moving comet with icy nucleus and double tail (Gas + Dust)
function CosmicCometItem({ pos, dir, scale = 1.1 }) {
  const groupRef = useRef();
  useEffect(() => {
    if (groupRef.current && dir) {
      const tailDir = new THREE.Vector3(...dir).negate().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      groupRef.current.quaternion.setFromUnitVectors(up, tailDir);
    }
  }, [dir]);

  return (
    <group position={pos} scale={scale}>
      {/* Comet Nucleus */}
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Coma (Inner & Outer Halo) */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Double Tail System aligned backward */}
      <group ref={groupRef}>
        {/* Ion/Gas Tail: straight, sharp, bright violet-blue */}
        <mesh position={[0, 4.8, 0]}>
          <coneGeometry args={[0.36, 9.6, 32]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 6.2, 0]}>
          <coneGeometry args={[0.65, 12.4, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.38} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Dust Tail: wider, golden-white, angled slightly */}
        <mesh position={[0.45, 4.2, 0]} rotation={[0, 0, -0.14]}>
          <coneGeometry args={[0.58, 8.4, 32]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

// 1. Galaxy Starfield & Swirling Spiral for Night Mode
function GalaxySky() {
  const galaxyGroupRef = useRef();
  const starFieldRef = useRef();
  const [shootingStar, setShootingStar] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });
  const [comet, setComet] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });

  useFrame((state, delta) => {
    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.rotation.y += delta * 0.035; // Smooth horizontal rotation
    }
    if (starFieldRef.current) {
      starFieldRef.current.rotation.y += delta * 0.004;
    }

    // 1. Fast Shooting Star / Meteor animation
    if (!shootingStar.active && Math.random() < 0.008) {
      const startX = (Math.random() - 0.5) * 32 + 18;
      const startY = 18 + Math.random() * 8;
      const startZ = -12 + (Math.random() - 0.5) * 18;
      setShootingStar({
        active: true,
        pos: [startX, startY, startZ],
        speed: [-(Math.random() * 26 + 18), -(Math.random() * 14 + 8), (Math.random() - 0.5) * 8]
      });
    } else if (shootingStar.active) {
      const [x, y, z] = shootingStar.pos;
      const [vx, vy, vz] = shootingStar.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      const nz = z + vz * delta;
      if (ny < -5 || nx < -38) {
        setShootingStar(s => ({ ...s, active: false }));
      } else {
        setShootingStar(s => ({ ...s, pos: [nx, ny, nz] }));
      }
    }

    // 2. Majestic Slow-Moving Comet animation
    if (!comet.active && Math.random() < 0.0035) {
      const startX = 35 + Math.random() * 10;
      const startY = 22 + Math.random() * 6;
      const startZ = -22 + (Math.random() - 0.5) * 15;
      setComet({
        active: true,
        pos: [startX, startY, startZ],
        speed: [-(Math.random() * 5 + 3.5), -(Math.random() * 2 + 1.2), -(Math.random() * 1.5 + 0.5)]
      });
    } else if (comet.active) {
      const [x, y, z] = comet.pos;
      const [vx, vy, vz] = comet.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      const nz = z + vz * delta;
      if (ny < -10 || nx < -45) {
        setComet(s => ({ ...s, active: false }));
      } else {
        setComet(s => ({ ...s, pos: [nx, ny, nz] }));
      }
    }
  });

  return (
    <group>
      {/* Background stars dome extending across sky and abyss below */}
      <points ref={starFieldRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={STARS_DATA.positions.length / 3} array={STARS_DATA.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={STARS_DATA.colors.length / 3} array={STARS_DATA.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.38} map={GALAXY_TEXTURE} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* Swirling Andromeda Galaxy Spiral positioned HORIZONTALLY right underneath the floating island */}
      <group position={[0, -20, 0]} rotation={[-0.15, 0, 0.05]}>
        <points ref={galaxyGroupRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={GALAXY_DATA.positions.length / 3} array={GALAXY_DATA.positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={GALAXY_DATA.colors.length / 3} array={GALAXY_DATA.colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.62} map={GALAXY_TEXTURE} vertexColors transparent opacity={0.92} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
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

      {/* Fast Shooting Meteor with aligned tail */}
      {shootingStar.active && (
        <MeteorItem pos={shootingStar.pos} speed={shootingStar.speed} length={4.5} />
      )}

      {/* Majestic Slow-Moving Comet with double tail */}
      {comet.active && (
        <CosmicCometItem pos={comet.pos} dir={comet.speed} scale={1.15} />
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
          {autoRotate ? <IconRotateOn size={16} /> : <IconRotateOff size={16} />}
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
          <IconSun size={16} />
          <span>Siang</span>
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
          <IconGalaxy size={16} />
          <span>Galaxy Malam</span>
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
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {ITEM_DEFS[draggingItem]?.icon}
              <span>Drop <strong>{ITEM_DEFS[draggingItem]?.label}</strong> ke tanah</span>
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

          {/* Smooth Camera Resetter when Auto-Rotate turns ON */}
          <CameraResetter autoRotate={autoRotate && !paused} />

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
          display: 'inline-flex',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <IconChevronUp size={14} />
        </span>
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
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {def.icon}
                      </div>
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
                  display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <IconTrash size={15} />
                <span>{deleteMode ? 'Mode Hapus: ON' : 'Mode Hapus'}</span>
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
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.2s',
                  }}
                >
                  <IconTrash size={14} />
                  <span>Hapus Dipilih</span>
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
                {autoRotate ? <IconRotateOn size={14} /> : <IconRotateOff size={14} />}
                <span>{autoRotate ? 'Putar Kamera: ON' : 'Putar Kamera: OFF'}</span>
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
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                animation: resetConfirm ? 'pulse 0.6s infinite alternate' : 'none',
              }}
            >
              {resetConfirm ? <IconWarning size={15} /> : <IconReset size={15} />}
              <span>{resetConfirm ? 'Konfirmasi Reset?' : 'Reset Semua'}</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

