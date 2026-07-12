import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ============ CRISP FLAT SVG ICON COMPONENTS (ZERO EMOJIS) ============
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

function IconUndo({ size = 15 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
    </svg>
  );
}

function IconRedo({ size = 15 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14l5-5-5-5" />
      <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
    </svg>
  );
}

function IconAudioOn({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" opacity="0.3" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function IconAudioOff({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" opacity="0.3" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

// ============ WEB AUDIO SOUND ENGINE ============
const SoundEngine = {
  ctx: null,
  osc: null,
  gain: null,
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  },
  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(440, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
      g.gain.setValueAtTime(0.18, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.12);
    } catch { /* ignore audio blocked */ }
  },
  playDelete() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(320, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.18);
      g.gain.setValueAtTime(0.15, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.18);
    } catch { /* ignore audio blocked */ }
  },
  playClick() {
    this.init();
    if (!this.ctx) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(640, this.ctx.currentTime);
      g.gain.setValueAtTime(0.06, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.05);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + 0.05);
    } catch { /* ignore audio blocked */ }
  },
  setAmbient(active, isNight) {
    this.init();
    if (!this.ctx) return;
    try {
      if (!active) {
        if (this.osc) { this.osc.stop(); this.osc.disconnect(); this.osc = null; }
        return;
      }
      if (this.osc) return;
      this.osc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();
      this.osc.type = isNight ? 'sine' : 'triangle';
      this.osc.frequency.setValueAtTime(isNight ? 108 : 164, this.ctx.currentTime);
      this.gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.osc.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.osc.start();
    } catch { /* ignore audio blocked */ }
  }
};

// ============ INVENTORY ITEM DEFINITIONS ============
const ITEM_DEFS = {
  flower: { label: 'Bunga', icon: <IconFlower size={26} />, color: '#ff6b9d' },
  tree: { label: 'Pohon', icon: <IconTree size={26} />, color: '#4caf50' },
  rock: { label: 'Batu', icon: <IconRock size={26} />, color: '#888' },
  lamp: { label: 'Lampu', icon: <IconLamp size={26} />, color: '#ffd54f' },
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

function Flower3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 1, 8]} />
        <meshStandardMaterial color="#2d8a4e" />
      </mesh>
      <group position={[0, 0.35, 0]}>
        <mesh position={[0.15, 0, 0.05]} rotation={[0.3, 0.5, -0.6]} castShadow>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="#3aad5c" roughness={0.6} />
        </mesh>
        <mesh position={[-0.15, 0.1, -0.05]} rotation={[0.4, -0.4, 0.6]} castShadow>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color="#3aad5c" roughness={0.6} />
        </mesh>
      </group>
      <group position={[0, 1.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#ffd700" roughness={0.4} />
        </mesh>
        {Array.from({ length: 6 }).map((_, idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          const px = Math.cos(angle) * 0.22;
          const pz = Math.sin(angle) * 0.22;
          return (
            <mesh key={idx} position={[px, -0.02, pz]} rotation={[0.2 * Math.cos(angle), -angle, 0.2 * Math.sin(angle)]} castShadow>
              <sphereGeometry args={[0.15, 10, 10]} />
              <meshStandardMaterial color="#ff6b9d" roughness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function Tree3D({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.2, 8]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.9} />
      </mesh>
      <group position={[0, 1.6, 0]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <coneGeometry args={[0.65, 1.1, 8]} />
          <meshStandardMaterial color="#4caf50" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <coneGeometry args={[0.9, 1.2, 8]} />
          <meshStandardMaterial color="#388e3c" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow>
          <coneGeometry args={[1.15, 1.3, 8]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function Rock3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial color="#78909c" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[-0.3, 0.18, 0.1]} rotation={[0.5, 1.2, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#90a4ae" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Lamp3D({ position = [0, 0, 0], timeMode = 'night' }) {
  const isNight = timeMode === 'night';
  const pole1Ref = useRef();
  const pole2Ref = useRef();
  const bulbRef = useRef();
  const lightRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    const isNightNow = timeMode === 'night';
    const lerpSpeed = delta * 3.5;
    if (pole1Ref.current) pole1Ref.current.color.lerp(isNightNow ? new THREE.Color('#2d3342') : new THREE.Color('#555555'), lerpSpeed);
    if (pole2Ref.current) pole2Ref.current.color.lerp(isNightNow ? new THREE.Color('#1e222d') : new THREE.Color('#444444'), lerpSpeed);
    if (bulbRef.current) {
      bulbRef.current.emissive.lerp(isNightNow ? new THREE.Color('#ffbe3b') : new THREE.Color('#ffd54f'), lerpSpeed);
      bulbRef.current.emissiveIntensity = THREE.MathUtils.lerp(bulbRef.current.emissiveIntensity, isNightNow ? 3.5 : 1.2, lerpSpeed);
    }
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, isNightNow ? 2.8 : 0.6, lerpSpeed);
      lightRef.current.distance = THREE.MathUtils.lerp(lightRef.current.distance, isNightNow ? 10 : 4, lerpSpeed);
    }
    if (haloRef.current) {
      haloRef.current.opacity = THREE.MathUtils.lerp(haloRef.current.opacity, isNightNow ? 0.18 : 0.0, lerpSpeed);
      haloRef.current.visible = haloRef.current.opacity > 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 2, 8]} />
        <meshStandardMaterial ref={pole1Ref} color={isNight ? '#2d3342' : '#555555'} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.08, 0.25, 8]} />
        <meshStandardMaterial ref={pole2Ref} color={isNight ? '#1e222d' : '#444444'} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial ref={bulbRef} color="#fff8e1" emissive={isNight ? '#ffbe3b' : '#ffd54f'} emissiveIntensity={isNight ? 3.5 : 1.2} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 1.9, 0]} color="#ffcf48" intensity={isNight ? 2.8 : 0.6} distance={isNight ? 10 : 4} decay={2} />
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial ref={haloRef} color="#ffcf48" transparent opacity={isNight ? 0.18 : 0.0} />
      </mesh>
    </group>
  );
}

const OBJECT_COMPONENTS = {
  flower: Flower3D,
  tree: Tree3D,
  rock: Rock3D,
  lamp: Lamp3D,
};

function PlacedObjectWrapper({ obj, deleteMode, selected, onSelect, onDelete, timeMode }) {
  const [hovered, setHovered] = useState(false);
  const Comp = OBJECT_COMPONENTS[obj.type];
  if (!Comp) return null;

  const [ox, , oz] = obj.position;
  const rotY = obj.rotationY || 0;
  const scaleVal = obj.scale || 1;
  const ringColor = deleteMode ? '#ff4444' : selected ? '#4fc3f7' : timeMode === 'night' ? '#8ab4f8' : '#ffffff';
  const showRing = hovered || selected;

  return (
    <group
      position={[ox, 0, oz]}
      rotation={[0, rotY, 0]}
      scale={[scaleVal, scaleVal, scaleVal]}
      onClick={(e) => { e.stopPropagation(); deleteMode ? onDelete(obj.id) : onSelect(obj.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Comp position={[0, 0, 0]} timeMode={timeMode} />
      {showRing && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.65, 0.82, 40]} />
          <meshBasicMaterial color={ringColor} transparent opacity={hovered && deleteMode ? 0.9 : 0.65} />
        </mesh>
      )}
      <mesh position={[0, 0.6, 0]} visible={false}>
        <cylinderGeometry args={[0.9, 0.9, 1.8, 12]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}

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

function createGalaxyData(isLowEnd) {
  const count = isLowEnd ? 16000 : 42000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const arms = 2;
  const radius = 48;

  const colorCore = new THREE.Color('#ffffff');
  const colorInner = new THREE.Color('#ffe0b2');
  const colorArm1 = new THREE.Color('#38bdf8');
  const colorArm2 = new THREE.Color('#c084fc');
  const colorDust = new THREE.Color('#1e3a8a');

  for (let i = 0; i < count; i++) {
    const isCore = i < (isLowEnd ? 4000 : 10000);
    let r, angle, y, mixedColor;

    if (isCore) {
      r = Math.pow(Math.random(), 2.2) * 7.5;
      angle = Math.random() * Math.PI * 2;
      const coreThickness = (1.0 - r / 7.5) * 2.8;
      y = (Math.random() - 0.5) * coreThickness;
      mixedColor = colorCore.clone().lerp(colorInner, (r / 7.5) * 0.8);
    } else {
      r = 4.0 + Math.pow(Math.random(), 1.4) * (radius - 4.0);
      const spinAngle = r * 0.38;
      const armIndex = i % arms;
      const armAngle = ((Math.PI * 2) / arms) * armIndex;
      const dustLaneFactor = Math.sin(r * 0.7 - armAngle) * 0.45;
      angle = armAngle + spinAngle + (Math.random() - 0.5) * (r * 0.16 + 0.3) + dustLaneFactor;
      y = (Math.random() - 0.5) * Math.max(0.2, (1.0 - r / radius) * 1.5);

      const distRatio = Math.min(1, (r - 4.0) / (radius - 4.0));
      mixedColor = colorInner.clone().lerp(armIndex === 0 ? colorArm1 : colorArm2, Math.min(1, distRatio * 1.3));
      if (distRatio > 0.65 && Math.random() < 0.4) {
        mixedColor.lerp(colorDust, (distRatio - 0.65) * 2.5);
      }
    }

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * r * 0.82;

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }
  return { positions, colors };
}

function createStarsData(isLowEnd) {
  const count = isLowEnd ? 1200 : 3500;
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
      <mesh><sphereGeometry args={[0.38, 32, 32]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh><sphereGeometry args={[1.05, 32, 32]} /><meshBasicMaterial color="#a855f7" transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
      <group ref={groupRef}>
        <mesh position={[0, 4.8, 0]}><coneGeometry args={[0.36, 9.6, 32]} /><meshBasicMaterial color="#c084fc" transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
        <mesh position={[0, 6.2, 0]}><coneGeometry args={[0.65, 12.4, 32]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.38} blending={THREE.AdditiveBlending} /></mesh>
        <mesh position={[0.45, 4.2, 0]} rotation={[0, 0, -0.14]}><coneGeometry args={[0.58, 8.4, 32]} /><meshBasicMaterial color="#fef08a" transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      </group>
    </group>
  );
}

function GalaxySky({ isLowEnd }) {
  const galaxyGroupRef = useRef();
  const starFieldRef = useRef();
  const [shootingStar, setShootingStar] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });
  const [comet, setComet] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });

  const galaxyData = useMemo(() => createGalaxyData(isLowEnd), [isLowEnd]);
  const starsData = useMemo(() => createStarsData(isLowEnd), [isLowEnd]);

  useFrame((state, delta) => {
    if (galaxyGroupRef.current) galaxyGroupRef.current.rotation.y += delta * 0.035;
    if (starFieldRef.current) starFieldRef.current.rotation.y += delta * 0.004;

    if (!shootingStar.active && Math.random() < 0.008) {
      setShootingStar({
        active: true,
        pos: [(Math.random() - 0.5) * 32 + 18, 18 + Math.random() * 8, -12 + (Math.random() - 0.5) * 18],
        speed: [-(Math.random() * 26 + 18), -(Math.random() * 14 + 8), (Math.random() - 0.5) * 8]
      });
    } else if (shootingStar.active) {
      const [x, y, z] = shootingStar.pos;
      const [vx, vy, vz] = shootingStar.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      if (ny < -5 || nx < -38) setShootingStar(s => ({ ...s, active: false }));
      else setShootingStar(s => ({ ...s, pos: [nx, ny, z + vz * delta] }));
    }

    if (!comet.active && Math.random() < 0.0035) {
      setComet({
        active: true,
        pos: [35 + Math.random() * 10, 22 + Math.random() * 6, -22 + (Math.random() - 0.5) * 15],
        speed: [-(Math.random() * 5 + 3.5), -(Math.random() * 2 + 1.2), -(Math.random() * 1.5 + 0.5)]
      });
    } else if (comet.active) {
      const [x, y, z] = comet.pos;
      const [vx, vy, vz] = comet.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      if (ny < -10 || nx < -45) setComet(s => ({ ...s, active: false }));
      else setComet(s => ({ ...s, pos: [nx, ny, z + vz * delta] }));
    }
  });

  return (
    <group>
      <points ref={starFieldRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starsData.positions.length / 3} array={starsData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={starsData.colors.length / 3} array={starsData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.38} map={GALAXY_TEXTURE} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <group position={[0, -20, 0]} rotation={[-0.15, 0, 0.05]}>
        <points ref={galaxyGroupRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={galaxyData.positions.length / 3} array={galaxyData.positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={galaxyData.colors.length / 3} array={galaxyData.colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.62} map={GALAXY_TEXTURE} vertexColors transparent opacity={0.92} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      </group>

      <group position={[-14, 18, -20]}>
        <mesh><sphereGeometry args={[3.2, 32, 32]} /><meshBasicMaterial color="#ffe57f" transparent opacity={0.25} side={THREE.BackSide} /></mesh>
      </group>

      {shootingStar.active && (
        <group position={shootingStar.pos}>
          <mesh><sphereGeometry args={[0.22, 12, 12]} /><meshBasicMaterial color="#ffffff" /></mesh>
          <mesh><sphereGeometry args={[0.55, 12, 12]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
        </group>
      )}

      {comet.active && <CosmicCometItem pos={comet.pos} dir={comet.speed} scale={1.25} />}
    </group>
  );
}

function DaySky({ isLowEnd }) {
  const cloudsRef = useRef([]);
  const cloudConfigs = useMemo(() => isLowEnd ? [
    { id: 1, pos: [-16, 14, -18], scale: 1.8, speed: 0.25 },
    { id: 2, pos: [14, 16, -14], scale: 2.2, speed: 0.18 },
  ] : [
    { id: 1, pos: [-16, 14, -18], scale: 1.8, speed: 0.25 },
    { id: 2, pos: [14, 16, -14], scale: 2.2, speed: 0.18 },
    { id: 3, pos: [-6, 18, -22], scale: 1.5, speed: 0.3 },
  ], [isLowEnd]);

  useFrame((state, delta) => {
    cloudsRef.current.forEach((el, i) => {
      if (el) {
        el.position.x += cloudConfigs[i].speed * delta;
        if (el.position.x > 30) el.position.x = -30;
      }
    });
  });

  return (
    <group>
      <mesh position={[18, 22, -28]}><sphereGeometry args={[4.2, 32, 32]} /><meshBasicMaterial color="#fff8db" /></mesh>
      {cloudConfigs.map((c, idx) => (
        <group key={c.id} position={c.pos} scale={c.scale} ref={el => cloudsRef.current[idx] = el}>
          <mesh castShadow><sphereGeometry args={[1.2, 10, 10]} /><meshStandardMaterial color="#ffffff" roughness={0.2} /></mesh>
          <mesh position={[1.1, -0.2, 0]} castShadow><sphereGeometry args={[0.9, 10, 10]} /><meshStandardMaterial color="#f0f7ff" roughness={0.2} /></mesh>
          <mesh position={[-1.1, -0.2, 0]} castShadow><sphereGeometry args={[0.95, 10, 10]} /><meshStandardMaterial color="#f0f7ff" roughness={0.2} /></mesh>
        </group>
      ))}
    </group>
  );
}

function OutdoorGround({ timeMode, onGroundTap }) {
  const topMatRef = useRef();
  const sideMat1Ref = useRef();
  const sideMat2Ref = useRef();
  const ringMatsRef = useRef([]);
  const coneMatsRef = useRef([]);

  useFrame((state, delta) => {
    const isNight = timeMode === 'night';
    const lerpSpeed = delta * 3.5;

    const targetTop = isNight ? new THREE.Color('#131826') : new THREE.Color('#49a85c');
    const targetSide1 = isNight ? new THREE.Color('#0c0f18') : new THREE.Color('#6b5344');
    const targetSide2 = isNight ? new THREE.Color('#06070b') : new THREE.Color('#4a382e');

    if (topMatRef.current) {
      topMatRef.current.color.lerp(targetTop, lerpSpeed);
      topMatRef.current.roughness = THREE.MathUtils.lerp(topMatRef.current.roughness, isNight ? 0.9 : 0.8, lerpSpeed);
      topMatRef.current.metalness = THREE.MathUtils.lerp(topMatRef.current.metalness, isNight ? 0.15 : 0.05, lerpSpeed);
    }
    if (sideMat1Ref.current) sideMat1Ref.current.color.lerp(targetSide1, lerpSpeed);
    if (sideMat2Ref.current) sideMat2Ref.current.color.lerp(targetSide2, lerpSpeed);

    ringMatsRef.current.forEach(mat => {
      if (mat) {
        mat.color.lerp(isNight ? new THREE.Color('#38bdf8') : new THREE.Color('#72d686'), lerpSpeed);
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, isNight ? 0.15 : 0.22, lerpSpeed);
      }
    });

    coneMatsRef.current.forEach((mat, i) => {
      if (mat) {
        const targetColor = isNight ? (i % 2 === 0 ? new THREE.Color('#38bdf8') : new THREE.Color('#e879f9')) : new THREE.Color('#358a47');
        const targetEmissive = isNight ? (i % 2 === 0 ? new THREE.Color('#0284c7') : new THREE.Color('#c026d3')) : new THREE.Color('#000000');
        mat.color.lerp(targetColor, lerpSpeed);
        mat.emissive.lerp(targetEmissive, lerpSpeed);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isNight ? 1.5 : 0, lerpSpeed);
      }
    });
  });

  const isNightInit = timeMode === 'night';
  const radius = 11;

  return (
    <group>
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
        <cylinderGeometry args={[radius, radius, 0.4, 64]} />
        <meshStandardMaterial ref={topMatRef} color={isNightInit ? '#131826' : '#49a85c'} roughness={isNightInit ? 0.9 : 0.8} metalness={isNightInit ? 0.15 : 0.05} />
      </mesh>

      {[3, 6, 9].map((r, idx) => (
        <mesh key={idx} position={[0, 0.01 + idx * 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.04, r + 0.04, 64]} />
          <meshBasicMaterial ref={el => ringMatsRef.current[idx] = el} color={isNightInit ? '#38bdf8' : '#72d686'} transparent opacity={isNightInit ? 0.15 : 0.22} />
        </mesh>
      ))}

      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * (radius - 0.4), 0.18, Math.sin(angle) * (radius - 0.4)]} rotation={[0, -angle, 0]} castShadow>
            <coneGeometry args={[0.15, 0.36, 6]} />
            <meshStandardMaterial ref={el => coneMatsRef.current[i] = el} color={isNightInit ? (i % 2 === 0 ? '#38bdf8' : '#e879f9') : '#358a47'} emissive={isNightInit ? (i % 2 === 0 ? '#0284c7' : '#c026d3') : '#000000'} emissiveIntensity={isNightInit ? 1.5 : 0} roughness={0.6} />
          </mesh>
        );
      })}

      <mesh position={[0, -1.7, 0]} receiveShadow><cylinderGeometry args={[radius, 8.8, 2.6, 64]} /><meshStandardMaterial ref={sideMat1Ref} color={isNightInit ? '#0c0f18' : '#6b5344'} roughness={0.95} /></mesh>
      <mesh position={[0, -4.0, 0]} receiveShadow><cylinderGeometry args={[8.8, 3.8, 2.0, 64]} /><meshStandardMaterial ref={sideMat2Ref} color={isNightInit ? '#06070b' : '#4a382e'} roughness={0.95} /></mesh>
    </group>
  );
}

function CameraResetter({ autoRotate, onResetActive }) {
  const { controls } = useThree();
  const resetProgress = useRef(0);
  const wasAutoRotate = useRef(autoRotate);

  useEffect(() => {
    if (autoRotate && !wasAutoRotate.current) {
      resetProgress.current = 1.0;
      if (onResetActive) onResetActive(true);
    }
    wasAutoRotate.current = autoRotate;
  }, [autoRotate, onResetActive]);

  useFrame((state, delta) => {
    if (!controls || !controls.object) return;
    const cam = controls.object;
    if (autoRotate && resetProgress.current > 0) {
      resetProgress.current = Math.max(0, resetProgress.current - delta * 0.75);
      controls.target.lerp(new THREE.Vector3(0, 0, 0), delta * 7);
      const defaultPos = new THREE.Vector3(6, 4, 6);
      cam.position.lerp(defaultPos, delta * 6.5);
      controls.update();

      if (resetProgress.current === 0 || (cam.position.distanceTo(defaultPos) < 0.05 && controls.target.lengthSq() < 0.005)) {
        resetProgress.current = 0;
        if (onResetActive) onResetActive(false);
      }
    } else if (autoRotate) {
      if (controls.target.lengthSq() > 0.0001) {
        controls.target.set(0, 0, 0);
        controls.update();
      }
    }
  });
  return null;
}

// ============ REAL-TIME ANALYTICS / FPS MONITOR ============
function RealTimeAnalytics({ onFpsUpdate }) {
  const frames = useRef(0);
  const prevTime = useRef(0);
  useFrame(() => {
    if (prevTime.current === 0) prevTime.current = performance.now();
    frames.current++;
    const time = performance.now();
    if (time >= prevTime.current + 1000) {
      const fps = Math.round((frames.current * 1000) / (time - prevTime.current));
      onFpsUpdate(fps);
      frames.current = 0;
      prevTime.current = time;
    }
  });
  return null;
}

// ============ SMOOTH 3D ATMOSPHERIC TRANSITION CONTROLLER ============
function AtmosphericEnvironment({ timeMode, isLowEnd }) {
  const ambientRef = useRef();
  const dirLightRef = useRef();
  const galaxyGroupRef = useRef();
  const dayGroupRef = useRef();
  const progressRef = useRef(timeMode === 'night' ? 0 : 1);

  useFrame((state, delta) => {
    const { scene } = state;
    const isNight = timeMode === 'night';
    const target = isNight ? 0 : 1;
    const lerpSpeed = delta * 3.5;
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, target, lerpSpeed);
    const p = progressRef.current; // 0 (night) to 1 (day)

    // 1. Scene Background & Fog
    const nightBg = new THREE.Color('#050712');
    const dayBg = new THREE.Color('#85cbee');
    const nightFog = new THREE.Color('#060814');
    const dayFog = new THREE.Color('#a2d6f2');

    if (!scene.background || !(scene.background instanceof THREE.Color)) {
      scene.background = nightBg.clone().lerp(dayBg, p);
    } else {
      scene.background.copy(nightBg).lerp(dayBg, p);
    }

    if (!scene.fog) {
      scene.fog = new THREE.Fog(nightFog.clone().lerp(dayFog, p), 18, 48);
    } else {
      scene.fog.color.copy(nightFog).lerp(dayFog, p);
    }

    // 2. Lights
    if (ambientRef.current) {
      const nightAmb = new THREE.Color('#464c80');
      const dayAmb = new THREE.Color('#fff8e7');
      ambientRef.current.color.copy(nightAmb).lerp(dayAmb, p);
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.45, 0.65, p);
    }
    if (dirLightRef.current) {
      const nightSun = new THREE.Color('#b3d4ff');
      const daySun = new THREE.Color('#fff6dd');
      dirLightRef.current.color.copy(nightSun).lerp(daySun, p);
      dirLightRef.current.intensity = THREE.MathUtils.lerp(0.9, 1.9, p);
      dirLightRef.current.position.set(
        THREE.MathUtils.lerp(10, 12, p),
        THREE.MathUtils.lerp(15, 20, p),
        THREE.MathUtils.lerp(10, 8, p)
      );
    }

    // 3. Smooth transition of Galaxy and Day sky groups
    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.visible = p < 0.98;
      galaxyGroupRef.current.position.y = THREE.MathUtils.lerp(0, -35, p);
      const scale = THREE.MathUtils.lerp(1, 0.6, p);
      galaxyGroupRef.current.scale.set(scale, scale, scale);
    }
    if (dayGroupRef.current) {
      dayGroupRef.current.visible = p > 0.02;
      dayGroupRef.current.position.y = THREE.MathUtils.lerp(35, 0, p);
      const scale = THREE.MathUtils.lerp(0.6, 1, p);
      dayGroupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={0.45} color="#464c80" />
      <directionalLight
        ref={dirLightRef}
        position={[10, 15, 10]}
        intensity={0.9}
        color="#b3d4ff"
        castShadow={!isLowEnd}
        shadow-mapSize={[1024, 1024]}
      />

      <group ref={galaxyGroupRef}>
        <GalaxySky isLowEnd={isLowEnd} />
      </group>

      <group ref={dayGroupRef}>
        <DaySky isLowEnd={isLowEnd} />
      </group>
    </group>
  );
}

// ============ MAIN APP COMPONENT ============
export default function App() {
  const [timeMode, setTimeMode] = useState('night');
  const [autoRotate, setAutoRotate] = useState(false);
  const [isCameraResetting, setIsCameraResetting] = useState(false);
  const [speed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [audioActive, setAudioActive] = useState(false);

  // Undo/Redo & Persistence State
  const [historyPast, setHistoryPast] = useState([]);
  const [placedObjects, setPlacedObjectsRaw] = useState(() => {
    try {
      const saved = localStorage.getItem('giver_sandbox_save_v3');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [historyFuture, setHistoryFuture] = useState([]);

  const setPlacedObjects = useCallback((updater) => {
    setPlacedObjectsRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setHistoryPast(p => [...p.slice(-25), prev]);
      setHistoryFuture([]);
      return next;
    });
  }, []);

  // Autosave to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('giver_sandbox_save_v3', JSON.stringify(placedObjects));
    } catch { /* storage full */ }
  }, [placedObjects]);

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast(p => p.slice(0, -1));
    setHistoryFuture(f => [placedObjects, ...f]);
    setPlacedObjectsRaw(previous);
    SoundEngine.playClick();
  }, [historyPast, placedObjects]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture(f => f.slice(1));
    setHistoryPast(p => [...p, placedObjects]);
    setPlacedObjectsRaw(next);
    SoundEngine.playClick();
  }, [historyFuture, placedObjects]);

  // Keyboard Shortcuts Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); handleUndo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const [draggingItem, setDraggingItem] = useState(null);
  const [activePlacementType, setActivePlacementType] = useState(null); // Touch Tap-to-Place
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [webglLost, setWebglLost] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => !localStorage.getItem('giver_sandbox_onboarded_v3'));

  // Performance Tiering
  const isLowEndDevice = useMemo(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) return true;
    return false;
  }, []);
  const [performanceTier, setPerformanceTier] = useState(isLowEndDevice ? 'low' : 'high');

  const handleFpsUpdate = useCallback((newFps) => {
    if (newFps < 42 && performanceTier === 'high') setPerformanceTier('low');
  }, [performanceTier]);

  const sceneRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const isNight = timeMode === 'night';

  const [inventory] = useState(() => ['flower', 'tree', 'rock', 'lamp', ...Array(14).fill(null)]);

  const handleStart = useCallback(() => setPaused(true), []);
  const handleEnd = useCallback(() => setPaused(false), []);

  const handleDragStart = useCallback((e, itemType) => {
    setDraggingItem(itemType);
    e.dataTransfer.setData('itemType', itemType);
  }, []);

  const handleDragEnd = useCallback(() => setDraggingItem(null), []);

  const handleGroundTap = useCallback((x, z) => {
    if (!activePlacementType) return;
    const half = 10;
    const clampedX = Math.max(-half, Math.min(half, x));
    const clampedZ = Math.max(-half, Math.min(half, z));
    setPlacedObjects(prev => [...prev, {
      id: Date.now() + Math.random(),
      type: activePlacementType,
      position: [clampedX, 0, clampedZ],
      rotationY: 0,
      scale: 1,
    }]);
    SoundEngine.playPop();
    setActivePlacementType(null);
  }, [activePlacementType, setPlacedObjects]);

  const handleDeleteObject = useCallback((id) => {
    setPlacedObjects(prev => prev.filter(o => o.id !== id));
    setSelectedId(s => s === id ? null : s);
    SoundEngine.playDelete();
  }, [setPlacedObjects]);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.filter(o => o.id !== selectedId));
    setSelectedId(null);
    SoundEngine.playDelete();
  }, [selectedId, setPlacedObjects]);

  const handleRotateSelected = useCallback((angleDelta) => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.map(o => o.id === selectedId ? { ...o, rotationY: (o.rotationY || 0) + angleDelta } : o));
    SoundEngine.playClick();
  }, [selectedId, setPlacedObjects]);

  const handleScaleSelected = useCallback((scaleDelta) => {
    if (!selectedId) return;
    setPlacedObjects(prev => prev.map(o => o.id === selectedId ? { ...o, scale: Math.max(0.4, Math.min(2.8, (o.scale || 1) + scaleDelta)) } : o));
    SoundEngine.playClick();
  }, [selectedId, setPlacedObjects]);

  const handleResetAll = useCallback(() => {
    if (!resetConfirm) { setResetConfirm(true); setTimeout(() => setResetConfirm(false), 3000); return; }
    setPlacedObjects([]);
    setSelectedId(null);
    setDeleteMode(false);
    setResetConfirm(false);
    SoundEngine.playDelete();
  }, [resetConfirm, setPlacedObjects]);

  const handleExportJson = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ version: "2.0", timeMode, placedObjects }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "giver_sandbox_scene.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    SoundEngine.playPop();
  }, [timeMode, placedObjects]);

  const handleImportJson = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed.placedObjects) setPlacedObjects(parsed.placedObjects);
          if (parsed.timeMode) setTimeMode(parsed.timeMode);
          SoundEngine.playPop();
        } catch { alert('File JSON tidak valid!'); }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [setPlacedObjects]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }, []);

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
      setPlacedObjects(prev => [...prev, {
        id: Date.now() + Math.random(),
        type: itemType,
        position: [Math.max(-half, Math.min(half, intersection.x)), 0, Math.max(-half, Math.min(half, intersection.z))],
        rotationY: 0,
        scale: 1,
      }]);
      SoundEngine.playPop();
    }
  }, [setPlacedObjects]);

  function SceneAccess({ sceneRef: ref }) {
    const { scene, camera } = useThree();
    useEffect(() => { ref.current = { scene, camera }; }, [scene, camera, ref]);
    return null;
  }

  // WebGL Context Lost Listener
  useEffect(() => {
    const handleContextLost = (e) => { e.preventDefault(); setWebglLost(true); };
    window.addEventListener('webglcontextlost', handleContextLost);
    return () => window.removeEventListener('webglcontextlost', handleContextLost);
  }, []);

  return (
    <div style={{
      width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      background: isNight ? '#050712' : '#85cbee', color: isNight ? '#f1f5f9' : '#1e293b',
      overflow: 'hidden', userSelect: 'none',
    }}>
      {/* 1. Modern Minimalist Transparent Overlay Header Toolbar */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0, width: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px',
        background: 'transparent',
        borderBottom: 'none',
        boxShadow: 'none',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 25,
      }}>
        {/* Left: Action & File Tools (Undo, Redo, Ekspor, Impor) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={handleUndo} disabled={historyPast.length === 0} title="Undo (Ctrl+Z)" style={{
            padding: '6px 14px', borderRadius: 8, border: 'none',
            background: historyPast.length ? (isNight ? '#1e293b' : '#f1f5f9') : 'transparent',
            color: historyPast.length ? (isNight ? '#e2e8f0' : '#1e293b') : (isNight ? '#334155' : '#cbd5e1'),
            cursor: historyPast.length ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}><IconUndo size={14} /> Undo</button>

          <button onClick={handleRedo} disabled={historyFuture.length === 0} title="Redo (Ctrl+Y)" style={{
            padding: '6px 14px', borderRadius: 8, border: 'none',
            background: historyFuture.length ? (isNight ? '#1e293b' : '#f1f5f9') : 'transparent',
            color: historyFuture.length ? (isNight ? '#e2e8f0' : '#1e293b') : (isNight ? '#334155' : '#cbd5e1'),
            cursor: historyFuture.length ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}><IconRedo size={14} /> Redo</button>

          <div style={{ width: 1, height: 18, background: isNight ? '#334155' : '#e2e8f0', margin: '0 4px', transition: 'background 0.6s' }} />

          <button onClick={handleExportJson} title="Ekspor scene ke JSON" style={{
            padding: '6px 14px', borderRadius: 8, border: '1px solid ' + (isNight ? '#334155' : '#e2e8f0'),
            background: isNight ? '#1e293b' : '#f8fafc', color: isNight ? '#38bdf8' : '#0284c7',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>💾 Ekspor</button>

          <button onClick={handleImportJson} title="Impor scene dari JSON" style={{
            padding: '6px 14px', borderRadius: 8, border: '1px solid ' + (isNight ? '#334155' : '#e2e8f0'),
            background: isNight ? '#1e293b' : '#f8fafc', color: isNight ? '#c084fc' : '#9333ea',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>📂 Impor</button>
        </div>

        {/* Right: Controls & Time Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => {
              const next = !audioActive;
              setAudioActive(next);
              SoundEngine.setAmbient(next, isNight);
              SoundEngine.playClick();
            }}
            title={audioActive ? 'Mute Ambient Audio' : 'Aktifkan Ambient Audio'}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8,
              background: audioActive ? '#10b981' : (isNight ? '#1e293b' : '#f1f5f9'),
              border: audioActive ? '1px solid #10b981' : '1px solid ' + (isNight ? '#334155' : '#e2e8f0'),
              color: audioActive ? '#ffffff' : (isNight ? '#cbd5e1' : '#475569'), fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {audioActive ? <IconAudioOn size={15} /> : <IconAudioOff size={15} />}
            <span>{audioActive ? 'Audio: ON' : 'Audio: OFF'}</span>
          </button>

          <button
            onClick={() => { setAutoRotate(!autoRotate); SoundEngine.playClick(); }}
            title="Aktifkan atau nonaktifkan putaran otomatis kamera"
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8,
              background: autoRotate ? '#3b82f6' : (isNight ? '#1e293b' : '#f1f5f9'),
              border: autoRotate ? '1px solid #3b82f6' : '1px solid ' + (isNight ? '#334155' : '#e2e8f0'),
              color: autoRotate ? '#ffffff' : (isNight ? '#cbd5e1' : '#475569'), fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {autoRotate ? <IconRotateOn size={15} /> : <IconRotateOff size={15} />}
            <span>{autoRotate ? 'Putar: ON' : 'Putar: OFF'}</span>
          </button>

          {/* Time Switcher Toggle with Smooth Solid Transition */}
          <div style={{
            display: 'flex', alignItems: 'center', background: isNight ? '#1e293b' : '#f1f5f9',
            border: isNight ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: 30, padding: 3,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <button onClick={() => { setTimeMode('day'); SoundEngine.setAmbient(audioActive, false); SoundEngine.playClick(); }} style={{
              padding: '6px 16px', borderRadius: 26, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
              background: !isNight ? '#0ea5e9' : 'transparent',
              color: !isNight ? '#ffffff' : (isNight ? '#94a3b8' : '#64748b'), display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: !isNight ? '0 2px 8px rgba(14,165,233,0.3)' : 'none'
            }}><IconSun size={15} /> Siang</button>
            <button onClick={() => { setTimeMode('night'); SoundEngine.setAmbient(audioActive, true); SoundEngine.playClick(); }} style={{
              padding: '6px 16px', borderRadius: 26, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
              background: isNight ? '#8b5cf6' : 'transparent',
              color: isNight ? '#ffffff' : (isNight ? '#94a3b8' : '#64748b'), display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isNight ? '0 2px 8px rgba(139,92,246,0.3)' : 'none'
            }}><IconGalaxy size={15} /> Galaxy Malam</button>
          </div>

          <button onClick={() => setShowTutorial(true)} title="Bantuan Tutorial" style={{
            width: 32, height: 32, borderRadius: '50%', border: isNight ? '1px solid #334155' : '1px solid #e2e8f0',
            background: isNight ? '#1e293b' : '#f1f5f9', color: isNight ? '#38bdf8' : '#0284c7',
            fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>❓</button>
        </div>
      </header>

      {/* 2. Floating Transform Toolbar when an object is selected */}
      {selectedId && (
        <div style={{
          position: 'absolute', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 40,
          background: isNight ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.95)',
          border: '1.5px solid #38bdf8', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: isNight ? '#38bdf8' : '#0284c7' }}>Objek Terpilih:</span>
          <button onClick={() => handleRotateSelected(-Math.PI / 4)} title="Putar -45°" style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(138,180,248,0.4)', background: isNight ? '#1e293b' : '#f1f5f9', color: isNight ? '#fff' : '#1e293b', cursor: 'pointer', fontWeight: 600, fontSize: 12
          }}>🔄 -45°</button>
          <button onClick={() => handleRotateSelected(Math.PI / 4)} title="Putar +45°" style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(138,180,248,0.4)', background: isNight ? '#1e293b' : '#f1f5f9', color: isNight ? '#fff' : '#1e293b', cursor: 'pointer', fontWeight: 600, fontSize: 12
          }}>🔄 +45°</button>
          <button onClick={() => handleScaleSelected(-0.2)} title="Perkecil (-20%)" style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(138,180,248,0.4)', background: isNight ? '#1e293b' : '#f1f5f9', color: isNight ? '#fff' : '#1e293b', cursor: 'pointer', fontWeight: 600, fontSize: 12
          }}>🔍 - Skala</button>
          <button onClick={() => handleScaleSelected(0.2)} title="Perbesar (+20%)" style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(138,180,248,0.4)', background: isNight ? '#1e293b' : '#f1f5f9', color: isNight ? '#fff' : '#1e293b', cursor: 'pointer', fontWeight: 600, fontSize: 12
          }}>🔍 + Skala</button>
          <button onClick={handleDeleteSelected} style={{
            padding: '5px 12px', borderRadius: 20, border: '1px solid #ef4444', background: 'rgba(239,68,68,0.15)', color: '#ef4444', cursor: 'pointer', fontWeight: 700, fontSize: 12
          }}>🗑️ Hapus</button>
        </div>
      )}

      {/* 3. Tap-to-Place or Dragging Drop Hint Banner */}
      {draggingItem && (
        <div style={{
          position: 'absolute', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px', borderRadius: 40,
          background: '#0ea5e9', color: '#fff', fontWeight: 700, fontSize: 14,
          boxShadow: '0 8px 30px rgba(14,165,233,0.4)', pointerEvents: 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <span>📦 Lepaskan <strong>{ITEM_DEFS[draggingItem]?.label}</strong> ke atas daratan untuk menaruh</span>
        </div>
      )}

      {activePlacementType && !draggingItem && (
        <div style={{
          position: 'absolute', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px', borderRadius: 40,
          background: '#10b981', color: '#fff', fontWeight: 700, fontSize: 14,
          boxShadow: '0 8px 30px rgba(16,185,129,0.4)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <span>💡 Mode Taruh Aktif: Ketuk area daratan untuk meletakkan <strong>{ITEM_DEFS[activePlacementType].label}</strong></span>
          <button onClick={() => setActivePlacementType(null)} style={{
            background: 'rgba(0,0,0,0.25)', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: 20, cursor: 'pointer', fontWeight: 800
          }}>✕ Batal</button>
        </div>
      )}

      {/* 4. Main 3D Canvas Sandbox */}
      <div
        ref={canvasContainerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}
      >
        {webglLost && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(16px)', color: '#fff', flexDirection: 'column', gap: 16
          }}>
            <h2 style={{ color: '#ef4444' }}>⚠️ WebGL Context Lost or Unsupported</h2>
            <p style={{ maxWidth: 420, textAlign: 'center' }}>Koneksi grafis GPU terputus atau driver tidak siap. Klik tombol di bawah untuk memuat ulang sandbox 3D.</p>
            <button onClick={() => window.location.reload()} style={{
              padding: '10px 24px', borderRadius: 30, background: '#38bdf8', border: 'none', color: '#0f172a', fontWeight: 800, cursor: 'pointer'
            }}>🔄 Muat Ulang Sandbox</button>
          </div>
        )}

        <Canvas
          shadows={performanceTier === 'high'}
          camera={{ position: [6, 4, 6], fov: 60 }}
          style={{ background: isNight ? '#050712' : '#85cbee', width: '100%', height: '100%', display: 'block', transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <RealTimeAnalytics onFpsUpdate={handleFpsUpdate} />
          <SceneAccess sceneRef={sceneRef} />
          <AtmosphericEnvironment timeMode={timeMode} isLowEnd={performanceTier === 'low'} />
          <OutdoorGround timeMode={timeMode} onGroundTap={handleGroundTap} />
          <Box />

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

          <CameraResetter autoRotate={autoRotate && !paused} onResetActive={setIsCameraResetting} />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate && !paused && !isCameraResetting}
            autoRotateSpeed={speed * 1.5}
            maxPolarAngle={Math.PI / 2 + 0.15}
            minDistance={1.5}
            maxDistance={38}
            onStart={handleStart}
            onEnd={handleEnd}
          />
        </Canvas>
      </div>

      {/* 5. Bottom Toolbar & Inventory Drawer */}
      <div style={{
        position: 'relative', zIndex: 20, background: isNight ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
        borderTop: isNight ? '1px solid rgba(56,189,248,0.25)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.18)', backdropFilter: 'blur(16px)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Toggle Drawer Button */}
        <button onClick={() => { setInventoryOpen(!inventoryOpen); SoundEngine.playClick(); }} style={{
          position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)',
          background: isNight ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.95)',
          border: isNight ? '1px solid #38bdf8' : '1px solid #0284c7', borderBottom: 'none',
          borderRadius: '16px 16px 0 0', padding: '5px 24px', color: isNight ? '#38bdf8' : '#0284c7',
          fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
        }}>
          <span>{inventoryOpen ? 'Tutup Panel Item' : 'Buka Panel Item'}</span>
          <span style={{ transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><IconChevronUp /></span>
        </button>

        {inventoryOpen && (
          <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            {/* Inventory Slots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {inventory.slice(0, 8).map((itemType, idx) => {
                const item = ITEM_DEFS[itemType];
                return (
                  <div
                    key={idx}
                    draggable={!!item}
                    onDragStart={(e) => item && handleDragStart(e, itemType)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      if (item) {
                        setActivePlacementType(itemType);
                        SoundEngine.playClick();
                      }
                    }}
                    style={{
                      width: 68, height: 68, borderRadius: 16, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 6, cursor: item ? 'pointer' : 'default',
                      background: item ? (isNight ? 'rgba(30,41,59,0.8)' : '#f8fafc') : (isNight ? 'rgba(20,28,44,0.4)' : '#f1f5f9'),
                      border: activePlacementType === itemType ? '2px solid #10b981' : (item ? (isNight ? '1px solid rgba(56,189,248,0.3)' : '1px solid #cbd5e1') : '1px dashed rgba(150,150,150,0.2)'),
                      transition: 'all 0.2s',
                    }}
                    title={item ? `${item.label} (Drag atau Tap untuk menaruh)` : 'Slot Kosong'}
                  >
                    {item ? (
                      <>
                        <div>{item.icon}</div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: isNight ? '#cbd5e1' : '#334155' }}>{item.label}</span>
                      </>
                    ) : (
                      <span style={{ fontSize: 10, color: '#64748b' }}>Kosong</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions (Delete Mode & Reset) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => { setDeleteMode(!deleteMode); setSelectedId(null); SoundEngine.playClick(); }}
                style={{
                  padding: '10px 18px', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 6,
                  background: deleteMode ? '#ef4444' : (isNight ? 'rgba(30,41,59,0.8)' : '#f1f5f9'),
                  color: deleteMode ? '#fff' : (isNight ? '#cbd5e1' : '#334155'), border: deleteMode ? '1.5px solid #b91c1c' : '1px solid rgba(138,180,248,0.3)',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <IconTrash size={16} />
                <span>{deleteMode ? 'Mode Hapus: AKTIF' : 'Mode Hapus: OFF'}</span>
              </button>

              {!resetConfirm ? (
                <button onClick={() => setResetConfirm(true)} title="Reset semua objek di atas pulau" style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 30, border: '1px solid #ef4444',
                  background: 'transparent', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: 13,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <IconReset size={16} /> Reset Semua
                </button>
              ) : (
                <button onClick={handleResetAll} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 30, border: 'none',
                  background: '#dc2626', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 13,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <IconWarning size={16} /> Yakin? (3s)
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 6. Onboarding / Tutorial Overlay Modal */}
      {showTutorial && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(5, 7, 18, 0.85)', backdropFilter: 'blur(14px)'
        }}>
          <div style={{
            maxWidth: 540, width: '90%', background: isNight ? '#0f172a' : '#ffffff',
            border: '2px solid #38bdf8', borderRadius: 24, padding: 28, boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            color: isNight ? '#f1f5f9' : '#1e293b'
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 16px 0', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 10 }}>
              👋 Selamat Datang di GiverSource Sandbox!
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: isNight ? '#cbd5e1' : '#475569', margin: '0 0 20px 0' }}>
              Dunia kreatif interaktif dengan fisika 3D, mode atmosfer siang/malam, dan efek suara real-time tanpa batas!
            </p>

            <div style={{ display: 'grid', gap: 14, margin: '0 0 24px 0', fontSize: 13, lineHeight: 1.5 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>🖥️</span>
                <div><strong>Drag atau Tap (Mobile/HP):</strong> Tarik item dari panel bawah, atau tap item lalu ketuk area daratan untuk menaruh objek.</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>🔄</span>
                <div><strong>Transformasi Objek:</strong> Klik objek yang ditaruh untuk memutar (-/+ 45°) atau mengatur skala (0.8x / 1.2x).</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>💾</span>
                <div><strong>Autosave & Undo:</strong> Tiap perubahan otomatis tersimpan di browser Anda! Gunakan tombol Undo/Redo (Ctrl+Z) atau Ekspor JSON.</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>⚡</span>
                <div><strong>Adaptive FPS & Audio:</strong> Sistem memantau FPS secara real-time dan menyediakan sintesis Web Audio saat mode Audio dinyalakan.</div>
              </div>
            </div>

            <button onClick={() => {
              setShowTutorial(false);
              try { localStorage.setItem('giver_sandbox_onboarded_v3', 'true'); } catch (err) { void err; }
              SoundEngine.playPop();
            }} style={{
              width: '100%', padding: '12px', borderRadius: 30, background: '#0ea5e9',
              border: 'none', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              🚀 Mulai Membangun Dunia!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
