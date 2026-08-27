import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RealTimeAnalytics } from '../ui/TelemetryBadge';
import { AtmosphericEnvironment } from './AtmosphericEnvironment';
import { FloatingIsland } from './FloatingIsland';
import { CentralHeroObject } from './CentralHeroObject';
import { DynamicLights } from './DynamicLights';
import { PlacedObjectWrapper } from './InteractiveObjects';
import { EffectComposer, Bloom, Vignette, ToneMapping, DepthOfField } from '@react-three/postprocessing';
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
  isNight = true,
  timeMode = 'night',
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
  setCentralModalOpen
}) {
  return (
    <Canvas
      shadows={performanceTier === 'high'}
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance", antialias: false }}
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
      <FloatingIsland timeMode={timeMode} onGroundTap={handleGroundTap} />
      
      <CentralHeroObject
        centralObjectType={centralObjectType}
        centralObjectColor={centralObjectColor}
        centralObjectMaterial={centralObjectMaterial}
        centralObjectScale={centralObjectScale}
        centralObjectUrl={centralObjectUrl}
        centralObjectName={centralObjectName}
        setCentralModalOpen={setCentralModalOpen}
      />

      {placedObjects.map((obj) => (
        <PlacedObjectWrapper
          key={obj.id}
          obj={obj}
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

      <EffectComposer disableNormalPass multisampling={performanceTier === 'high' ? 4 : 0}>
        <Bloom 
          luminanceThreshold={0.15} 
          mipmapBlur 
          intensity={performanceTier === 'high' ? 1.8 : 1.2} 
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        {performanceTier === 'high' && (
          <>
            <DepthOfField
              target={[0, 0, 0]}         // Fokus tepat di tengah pulau
              focalLength={0.4}          // Jarak fokus kamera (semakin tinggi, makin sempit area fokusnya)
              bokehScale={8}             // Ukuran blur di background (semakin besar makin nge-blur)
              height={480}               // Resolusi DoF internal untuk performa
            />
            <Vignette
              eskil={false}
              offset={0.3}
              darkness={0.6}
              blendFunction={BlendFunction.NORMAL}
            />
          </>
        )}
      </EffectComposer>
    </Canvas>
  );
}
