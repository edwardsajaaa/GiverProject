import React, { useRef, Suspense, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { SoundEngine } from '../../utils/SoundEngine';

// Error Boundary khusus untuk menangkap error saat loading model 3D (agar web tidak blank)
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Gagal memuat model 3D kustom:", error, errorInfo);
    setTimeout(() => {
      alert(`⚠️ Gagal memuat file 3D.\n\nDetail Error: ${error.message || error.toString()}\n\nCatatan untuk FBX/OBJ: Pastikan Anda MENGEMBED tekstur (Embed Media) saat ekspor, karena browser tidak dapat membaca file tekstur eksternal di komputer Anda secara otomatis.`);
    }, 500);
  }
  render() {
    if (this.state.hasError) {
      // Tampilkan error fallback (berbeda dari sekadar loading) - Sphere Wireframe Merah
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

// Komponen pemuat Model 3D Custom (GLTF/GLB/OBJ/FBX) yang diupload User
function CustomUploadedModel({ url, fileName, color, materialType, scaleVal }) {
  const groupRef = useRef();
  const nameLower = fileName ? fileName.toLowerCase() : '';
  const urlLower = url ? url.toLowerCase() : '';

  const isObj = nameLower.endsWith('.obj') || urlLower.endsWith('.obj') || urlLower.includes('obj');
  const isFbx = nameLower.endsWith('.fbx') || urlLower.endsWith('.fbx') || urlLower.includes('fbx');
  const loaderClass = isFbx ? FBXLoader : (isObj ? OBJLoader : GLTFLoader);

  const loadedData = useLoader(loaderClass, url, (loader) => {
    if (loaderClass === GLTFLoader) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      loader.setDRACOLoader(dracoLoader);
    }
  });
  const modelScene = useMemo(() => {
    if (!loadedData) return null;
    const raw = (isObj || isFbx) ? loadedData : (loadedData.scene || loadedData);
    if (!raw) return null;

    const cloned = raw.clone(true);
    // Auto-scale dan auto-center agar pas di atas Altar (bounding box ~1.3m)
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = 1.3 / maxDim;
      cloned.scale.setScalar(scaleFactor);
    }
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center.multiplyScalar(cloned.scale.x));

    // Terapkan warna/material kustom pada semua mesh dalam model yang diupload
    cloned.traverse((child) => {
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
        } else {
          // Holographic / Default
          child.material = new THREE.MeshStandardMaterial({
            color: color, roughness: 0.25, metalness: 0.2, emissive: color, emissiveIntensity: 0.3
          });
        }
      }
    });

    return cloned;
  }, [loadedData, isObj, isFbx, color, materialType]);

  return modelScene ? (
    <group scale={[scaleVal, scaleVal, scaleVal]}>
      <primitive object={modelScene} />
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
  setCentralModalOpen
}) {
  const heroRef = useRef();
  const auraRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animasi rotasi halus dan bobbing naik-turun (mengapung di tengah Altar)
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

  // Pemilihan Geometri untuk Preset
  const renderPresetGeometry = () => {
    switch (centralObjectType) {
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.55, 0.22, 32, 64]} />;
      case 'pyramid':
        return <coneGeometry args={[0.75, 1.3, 4]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.75, 0]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />;
      case 'cube':
      default:
        return <boxGeometry args={[1.05, 1.05, 1.05]} />;
    }
  };

  // Pemilihan Material untuk Preset
  const renderPresetMaterial = () => {
    const isHoverScale = hovered ? 1.3 : 1.0;
    switch (centralObjectMaterial) {
      case 'metallic':
        return (
          <meshStandardMaterial
            color={centralObjectColor}
            metalness={0.92}
            roughness={0.12}
            emissive={centralObjectColor}
            emissiveIntensity={hovered ? 0.4 : 0.1}
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
            emissive={centralObjectColor}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        );
      case 'wireframe':
        return (
          <meshStandardMaterial
            color={centralObjectColor}
            wireframe
            emissive={centralObjectColor}
            emissiveIntensity={hovered ? 1.2 : 0.8}
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
            emissive={centralObjectColor}
            emissiveIntensity={hovered ? 0.75 : 0.4}
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
