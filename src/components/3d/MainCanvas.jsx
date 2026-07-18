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
      camera={{ position: [6, 4, 6], fov: 60 }}
      style={{
        background: isNight ? '#050712' : '#85cbee',
        width: '100%', height: '100%',
        display: 'block',
        transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
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
  );
}
