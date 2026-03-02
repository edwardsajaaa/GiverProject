import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useCallback, useEffect } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Box() {
  return (
    <mesh position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f8cff" />
    </mesh>
  );
}

function Room() {
  const floorSize = 20;
  const wallHeight = 8;
  const wallColor = '#e8e0d4';
  const floorColor = '#b8a898';

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial
          color={floorColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Floor grid pattern */}
      <gridHelper args={[floorSize, 20, '#8a7b6b', '#a0917f']} position={[0, 0.005, 0]} />

      {/* Back wall */}
      <mesh position={[0, wallHeight / 2, -floorSize / 2]} receiveShadow>
        <planeGeometry args={[floorSize, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-floorSize / 2, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[floorSize, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh position={[floorSize / 2, wallHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[floorSize, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Front wall (behind camera, partial) */}
      <mesh position={[0, wallHeight / 2, floorSize / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[floorSize, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallHeight, 0]}>
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial color="#f5f0eb" roughness={1} />
      </mesh>

      {/* Baseboard trim - decorative lines at floor-wall junction */}
      <mesh position={[0, 0.15, -floorSize / 2 + 0.05]}>
        <boxGeometry args={[floorSize, 0.3, 0.1]} />
        <meshStandardMaterial color="#6b5e50" />
      </mesh>
      <mesh position={[-floorSize / 2 + 0.05, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[floorSize, 0.3, 0.1]} />
        <meshStandardMaterial color="#6b5e50" />
      </mesh>
      <mesh position={[floorSize / 2 - 0.05, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[floorSize, 0.3, 0.1]} />
        <meshStandardMaterial color="#6b5e50" />
      </mesh>
    </group>
  );
}

function AutoOrbitCamera({ speed = 1, radius = 3, paused, syncAngle }) {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const targetPosRef = useRef([camera.position.x, camera.position.y, camera.position.z]);
  const userHeightRef = useRef(radius * 0.7); // Simpan ketinggian yang dipilih user
  const lerpAlpha = 0.08; // Semakin kecil semakin smooth

  // Sinkronisasi sudut saat user interaksi
  useFrame(() => {
    if (syncAngle.current) {
      const pos = camera.position;
      angleRef.current = Math.atan2(pos.z, pos.x);
      // Set targetPosRef ke posisi kamera terakhir
      targetPosRef.current = [pos.x, pos.y, pos.z];
      // Simpan ketinggian yang dipilih user
      userHeightRef.current = pos.y;
      syncAngle.current = false;
    }
  });

  useFrame((state, delta) => {
    if (paused) return;
    angleRef.current += speed * delta;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    // Gunakan ketinggian yang dipilih user, bukan nilai tetap
    const y = userHeightRef.current;
    // Interpolasi posisi kamera
    targetPosRef.current[0] += (x - targetPosRef.current[0]) * lerpAlpha;
    targetPosRef.current[1] += (y - targetPosRef.current[1]) * lerpAlpha;
    targetPosRef.current[2] += (z - targetPosRef.current[2]) * lerpAlpha;
    camera.position.set(...targetPosRef.current);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function App() {
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const syncAngle = useRef(false);

  // Callback untuk handle interaksi user
  const handleStart = useCallback(() => setPaused(true), []);
  const handleEnd = useCallback(() => {
    setPaused(false);
    syncAngle.current = true;
  }, []);

  const inventoryHeight = 220; // tinggi inventory bar

  return (
    <div style={{
      width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden',
      background: '#2a2520', display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box',
    }}>

      {/* Area Atas - Canvas (full width) */}
      <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}>
        <Canvas
          shadows
          camera={{ position: [5, 3, 5], fov: 60 }}
          style={{ background: 'transparent', width: '100%', height: '100%', display: 'block' }}
        >
          {/* Fog for depth */}
          <fog attach="fog" args={['#d4cfc8', 12, 30]} />

          {/* Lighting setup */}
          <ambientLight intensity={0.4} color="#ffeedd" />
          <directionalLight
            position={[5, 7, 3]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
          />
          {/* Fill light from opposite side */}
          <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#aaccff" />
          {/* Point light simulating room ceiling light */}
          <pointLight position={[0, 7.5, 0]} intensity={0.8} color="#fff5e6" distance={20} decay={2} />

          <Room />
          <Box />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={2}
            maxDistance={12}
            onStart={handleStart}
            onEnd={handleEnd}
          />
          <AutoOrbitCamera speed={speed} radius={5} paused={paused} syncAngle={syncAngle} />
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
          background: 'rgba(40, 40, 46, 0.92)',
          border: '1.5px solid rgba(200,200,200,0.3)',
          borderBottom: 'none',
          borderRadius: '14px 14px 0 0',
          color: '#ccc',
          padding: '6px 28px',
          cursor: 'pointer',
          fontSize: 18,
          letterSpacing: 1,
          backdropFilter: 'blur(8px)',
          transition: 'bottom 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          transform: inventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: 16,
        }}>▲</span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Inventory</span>
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
          borderTop: '2px solid rgba(200,200,200,0.25)',
          background: 'rgba(30, 32, 38, 0.95)',
          backdropFilter: 'blur(12px)',
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
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} style={{
                background: '#1c1f24',
                borderRadius: 12,
                border: '1.5px solid #2a2d33',
                width: '100%',
                height: '100%',
                transition: 'background 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#2a2d36'}
                onMouseLeave={e => e.currentTarget.style.background = '#1c1f24'}
              />
            ))}
          </div>
          {/* Orbit Speed Slider inside inventory */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, paddingTop: 10,
          }}>
            <label htmlFor="speed-slider" style={{ fontSize: 12, color: '#999', whiteSpace: 'nowrap' }}>
              Orbit: {speed.toFixed(2)}x
            </label>
            <input
              id="speed-slider"
              type="range"
              min={0.1}
              max={5}
              step={0.01}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              style={{ width: 160 }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
