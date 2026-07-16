import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RealTimeAnalytics } from '../ui/TelemetryBadge';
import { AtmosphericEnvironment } from './AtmosphericEnvironment';
import { FloatingIsland, Box } from './FloatingIsland';
import { DynamicLights } from './DynamicLights';
import { PlacedObjectWrapper } from './InteractiveObjects';

function SceneAccess({ sceneRef }) {
  const { scene, camera } = useThree();
  useEffect(() => {
    if (sceneRef) sceneRef.current = { scene, camera };
  }, [scene, camera, sceneRef]);
  return null;
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
  setIsCameraResetting,
  speed = 1,
  handleStart,
  handleEnd,
  isCameraResetting = false
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
  );
}
