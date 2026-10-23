import React, { useRef, Suspense, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import { SoundEngine } from '../../utils/SoundEngine';
import { useGLTF } from '@react-three/drei';

// Error Boundary khusus untuk menangkap error saat loading model 3D (agar web tidak blank)
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_error) {
    void _error;
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Gagal memuat model 3D kustom:", error, errorInfo);
    setTimeout(() => {
      alert(`⚠️ Gagal memuat file 3D.\n\nDetail Error: ${error.message || error.toString()}\n\nDisarankan untuk menggunakan file .GLB yang menggabungkan seluruh mesh dan tekstur.`);
    }, 500);
  }
  render() {
    if (this.state.hasError) {
      return (
        <mesh scale={[1.2, 1.2, 1.2]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ef4444" wireframe opacity={0.8} transparent />
        </mesh>
      );
    }
    return this.props.children;
  }
}

// Komponen pemuat Model 3D Custom (Khusus GLB yang stabil)
function CustomUploadedModel({ url, color, materialType, scaleVal }) {
  // Gunakan useGLTF dari drei yang jauh lebih stabil untuk R3F
  // Note: Hanya mendukung .glb / .gltf yang sifatnya standalone (semua tekstur ter-embed di dalam file)
  const { scene } = useGLTF(url, true, true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);
  });

  const wrapperScene = useMemo(() => {
    if (!scene) return null;
    const cloned = scene.clone(true);
    
    // Auto-scale dan auto-center
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 1.3 / maxDim : 1;

    // Geser ke pusat
    cloned.position.copy(center).multiplyScalar(-1);

    // Buat grup wrapper untuk handle skala agar tidak berantakan
    const wrapper = new THREE.Group();
    wrapper.scale.setScalar(scaleFactor);
    wrapper.add(cloned);

    // Terapkan material: Pertahankan tekstur asli jika 'original' (default untuk uploaded models)
    wrapper.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (materialType === 'wireframe') {
          child.material = new THREE.MeshStandardMaterial({
            color: color, wireframe: true, emissive: color, emissiveIntensity: 0.5
          });
        } else if (materialType === 'metallic') {
          child.material = new THREE.MeshStandardMaterial({
            color: color, metalness: 0.9, roughness: 0.15
          });
        } else if (materialType === 'glass') {
          child.material = new THREE.MeshStandardMaterial({
            color: color, transparent: true, opacity: 0.65, roughness: 0.1, metalness: 0.2
          });
        } else if (materialType === 'holographic') {
          child.material = new THREE.MeshStandardMaterial({
            color: color, roughness: 0.25, metalness: 0.2, emissive: color, emissiveIntensity: 0.3
          });
        }
        // Jika materialType === 'original' (atau tidak di-override), pertahankan material dan tekstur asli model!
      }
    });

    return wrapper;
  }, [scene, color, materialType]);

  return wrapperScene ? (
    <group scale={[scaleVal, scaleVal, scaleVal]}>
      <primitive object={wrapperScene} />
    </group>
  ) : null;
}


// Fallback jika loading model atau error
function FallbackHeroCube({ color, scaleVal }) {
  const meshRef = useRef();
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 2;
  });
  return (
    <mesh ref={meshRef} scale={[scaleVal, scaleVal, scaleVal]} castShadow receiveShadow>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

// Komponen Utama Hero Centerpiece Altar
export function CentralHeroObject({
  centralObjectType = 'cube',
  centralObjectColor = '#4f8cff',
  centralObjectMaterial = 'holographic',
  centralObjectScale = 1.0,
  centralObjectUrl = null,
  centralObjectName = null,
  setCentralModalOpen,
  artStyle = 'lowpoly'
}) {
  const heroRef = useRef();
  const auraRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (heroRef.current) {
      heroRef.current.rotation.y += delta * (hovered ? 0.8 : 0.4);
      const bobbing = Math.sin(state.clock.elapsedTime * 2.2) * 0.08 + 0.55;
      heroRef.current.position.y = THREE.MathUtils.lerp(heroRef.current.position.y, bobbing, delta * 8);
    }
    if (auraRef.current) {
      auraRef.current.rotation.y -= delta * 0.6;
      auraRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  const renderPresetGeometry = () => {
    if (artStyle === 'retro_8bit') {
      return <boxGeometry args={[1.05, 1.05, 1.05]} />;
    }
    switch (centralObjectType) {
      case 'sphere':
        return <sphereGeometry args={[0.7, isFlat ? 8 : 32, isFlat ? 6 : 32]} />;
      case 'torus':
        return <torusGeometry args={[0.55, 0.22, isFlat ? 8 : 32, isFlat ? 12 : 64]} />;
      case 'pyramid':
        return <coneGeometry args={[0.75, 1.3, 4]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.75, 0]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1.2, isFlat ? 6 : 32]} />;
      case 'cube':
      default:
        return <boxGeometry args={[1.05, 1.05, 1.05]} />;
    }
  };

  const renderPresetMaterial = () => {
    const emissiveMult = artStyle === 'synthwave' ? 1.8 : 1.0;
    switch (centralObjectMaterial) {
      case 'metallic':
        return (
          <meshStandardMaterial
            color={centralObjectColor}
            metalness={0.92}
            roughness={0.12}
            flatShading={isFlat}
            emissive={centralObjectColor}
            emissiveIntensity={(hovered ? 2.5 : 1.0) * emissiveMult}
          />
        );
      case 'glass':
        return (
          <meshStandardMaterial
            color={centralObjectColor}
            metalness={0.15}
            roughness={0.08}
            transparent
            opacity={0.72}
            flatShading={isFlat}
            emissive={centralObjectColor}
            emissiveIntensity={(hovered ? 3.0 : 1.5) * emissiveMult}
          />
        );
      case 'wireframe':
        return (
          <meshStandardMaterial
            color={centralObjectColor}
            wireframe
            emissive={centralObjectColor}
            emissiveIntensity={(hovered ? 4.0 : 2.5) * emissiveMult}
          />
        );
      case 'holographic':
      default:
        return (
          <meshStandardMaterial
            color={centralObjectColor}
            metalness={0.3}
            roughness={0.25}
            transparent
            opacity={0.92}
            flatShading={isFlat}
            emissive={centralObjectColor}
            emissiveIntensity={(hovered ? 3.5 : 1.8) * emissiveMult}
          />
        );
    }
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Altar Pedestal Glow Ring di Tanah */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.3, 32]} />
        <meshBasicMaterial color={centralObjectColor} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Main Hero Floating Group */}
      <group
        ref={heroRef}
        position={[0, 0.55, 0]}
        scale={[centralObjectScale, centralObjectScale, centralObjectScale]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
        onPointerDown={(e) => {
          e.stopPropagation();
          SoundEngine.playPop();
          if (setCentralModalOpen) setCentralModalOpen(true);
        }}
      >
        {centralObjectType === 'custom' && centralObjectUrl ? (
          <ModelErrorBoundary key={centralObjectUrl} fallback={<FallbackHeroCube color={centralObjectColor} scaleVal={1.0} />}>
            <Suspense fallback={<FallbackHeroCube color={centralObjectColor} scaleVal={1.0} />}>
              <CustomUploadedModel
                url={centralObjectUrl}
                fileName={centralObjectName}
                color={centralObjectColor}
                materialType={centralObjectMaterial}
                scaleVal={1.0}
              />
            </Suspense>
          </ModelErrorBoundary>
        ) : (
          <mesh castShadow receiveShadow scale={hovered ? [1.08, 1.08, 1.08] : [1, 1, 1]}>
            {renderPresetGeometry()}
            {renderPresetMaterial()}
          </mesh>
        )}

        {/* Outer Wireframe Energy Aura saat Holographic atau Hovered */}
        {(centralObjectMaterial === 'holographic' || hovered) && (
          <mesh ref={auraRef} scale={[1.18, 1.18, 1.18]}>
            {centralObjectType === 'custom' ? <sphereGeometry args={[0.85, 16, 16]} /> : renderPresetGeometry()}
            <meshBasicMaterial color={centralObjectColor} wireframe transparent opacity={hovered ? 0.5 : 0.22} />
          </mesh>
        )}
      </group>
    </group>
  );
}
