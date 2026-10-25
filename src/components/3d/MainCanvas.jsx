import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RealTimeAnalytics } from '../ui/TelemetryBadge';
import { AtmosphericEnvironment } from './AtmosphericEnvironment';
import { WorldEnvironment } from './biomes/WorldEnvironment';
import { DynamicLights } from './DynamicLights';
import { PlacedObjectWrapper } from './InteractiveObjects';
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

function SceneAccess({ sceneRef }) {
  const { scene, camera } = useThree();
  useEffect(() => {
    if (sceneRef) sceneRef.current = { scene, camera };
  }, [scene, camera, sceneRef]);
  return null;
}

export function MainCanvas({
  performanceTier = 'high',
  timeMode = 'day',
  handleFpsUpdate,
  sceneRef,
  handleGroundTap,
  placedObjects = [],
  deleteMode = false,
  selectedId = null,
  setSelectedId,
  transformMode = 'translate',
  setPlacedObjects,
  handleDeleteObject,
  autoRotate = true,
  paused = false,
  speed = 1,
  handleStart,
  handleEnd,
  centralObjectType = 'cube',
  centralObjectColor = '#4f8cff',
  centralObjectMaterial = 'holographic',
  centralObjectScale = 1.0,
  centralObjectUrl = null,
  centralObjectName = null,
  setCentralModalOpen,
  biome = 'paris_romantique',
  artStyle = 'lowpoly'
}) {
  return (
    <Canvas
      shadows={performanceTier === 'high'}
      dpr={performanceTier === 'high' ? [1, 1.25] : 1}
      gl={{ 
        powerPreference: "high-performance", 
        antialias: false,
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping 
      }}
      camera={{ position: [14, 8, 14], fov: 60 }}
      style={{
        background: 'transparent',
        width: '100%', height: '100%',
        display: 'block',
      }}
    >
      <RealTimeAnalytics onFpsUpdate={handleFpsUpdate} />
      <SceneAccess sceneRef={sceneRef} />
      <AtmosphericEnvironment timeMode={timeMode} isLowEnd={performanceTier === 'low'} />
      <DynamicLights timeMode={timeMode} placedObjects={placedObjects} isLowEnd={performanceTier === 'low'} />
      <WorldEnvironment biome={biome} artStyle={artStyle} timeMode={timeMode} onGroundTap={handleGroundTap} />


      {placedObjects.map((obj) => (
        <PlacedObjectWrapper
          key={obj.id}
          obj={obj}
          artStyle={artStyle}
          deleteMode={deleteMode}
          selected={selectedId === obj.id}
          onSelect={setSelectedId}
          onDelete={handleDeleteObject}
          timeMode={timeMode}
          transformMode={transformMode}
          setPlacedObjects={setPlacedObjects}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate && !paused}
        autoRotateSpeed={speed * 1.5}
        maxPolarAngle={Math.PI / 2 + 0.15}
        minDistance={1.5}
        maxDistance={80}
        onStart={handleStart}
        onEnd={handleEnd}
      />

      {/* Hanya aktifkan EffectComposer jika mode GPU 'high' untuk menghemat daya GPU drastis */}
      {performanceTier === 'high' && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.88}
            luminanceSmoothing={0.15}
            blendFunction={BlendFunction.SCREEN}
          />
          <Vignette eskil={false} offset={0.12} darkness={0.4} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
