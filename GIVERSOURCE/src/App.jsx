

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f8cff" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', border: 'none' }}>
      <Canvas camera={{ position: [3, 3, 3], fov: 60 }} style={{ background: '#181c20', width: '100vw', height: '100vh', display: 'block' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <Box />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
