

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f8cff" />
    </mesh>
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
  const syncAngle = useRef(false);

  // Callback untuk handle interaksi user
  const handleStart = useCallback(() => setPaused(true), []);
  const handleEnd = useCallback(() => {
    setPaused(false);
    syncAngle.current = true;
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', border: 'none', position: 'relative' }}>
      <Canvas camera={{ position: [3, 3, 3], fov: 60 }} style={{ background: '#181c20', width: '100vw', height: '100vh', display: 'block' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <Box />
        <OrbitControls
          enablePan={false}
          onStart={handleStart}
          onEnd={handleEnd}
        />
        <AutoOrbitCamera speed={speed} radius={3} paused={paused} syncAngle={syncAngle} />
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(30,30,30,0.8)', padding: '16px', borderRadius: '8px', color: '#fff', zIndex: 10 }}>
        <label htmlFor="speed-slider">Kecepatan Orbit: {speed.toFixed(2)}</label>
        <input
          id="speed-slider"
          type="range"
          min={0.1}
          max={5}
          step={0.01}
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          style={{ width: '200px', marginLeft: '10px' }}
        />
      </div>
    </div>
  );
}
