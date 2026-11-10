import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function DynamicLights({ timeMode = 'night', placedObjects = [], isLowEnd = false }) {
  const isNight = timeMode === 'night';
  const campfireFlickerRef = useRef();

  useFrame(({ clock }) => {
    if (campfireFlickerRef.current) {
      const t = clock.getElapsedTime() * 12;
      campfireFlickerRef.current.intensity = 2.4 + Math.sin(t) * 0.4 + Math.sin(t * 2.3) * 0.3;
    }
  });

  // Filter glowing objects (lamp, campfire, crystal, pyramid, fountain) capped to 6 for 60fps performance
  const glowingObjects = isLowEnd ? [] : placedObjects
    .filter(obj => ['lamp', 'campfire', 'crystal', 'pyramid', 'fountain'].includes(obj.type))
    .slice(0, 6);

  const getObjectLightConfig = (type) => {
    switch (type) {
      case 'lamp':
        return { color: '#fef08a', intensity: 2.2, distance: 7, heightOffset: 1.4 };
      case 'campfire':
        return { color: '#f97316', intensity: 2.8, distance: 8, heightOffset: 0.6 };
      case 'crystal':
        return { color: '#c084fc', intensity: 2.0, distance: 6, heightOffset: 0.8 };
      case 'fountain':
        return { color: '#38bdf8', intensity: 1.6, distance: 6, heightOffset: 0.5 };
      case 'pyramid':
      default:
        return { color: '#fbbf24', intensity: 1.8, distance: 6, heightOffset: 0.8 };
    }
  };

  return (
    <group>
      {/* Cinematic Rim / Bounce Light for Depth Separation */}
      {isNight ? (
        <>
          {/* Subtle Violet Moonlight Rim */}
          <directionalLight position={[-14, 16, -14]} intensity={0.55} color="#818cf8" />
          {/* Central Soft Ambient Glow */}
          <pointLight position={[0, 3.5, 0]} intensity={0.9} color="#38bdf8" distance={22} decay={2} />
        </>
      ) : (
        <>
          {/* Warm Sunlight Rim & Ground Bounce for Ambient GI */}
          <directionalLight position={[0, -8, 0]} intensity={0.3} color="#fde68a" />
          <directionalLight position={[-16, 12, -14]} intensity={0.4} color="#bae6fd" />
        </>
      )}

      {/* Dynamic Interactive Object Emitters (Night Mode) */}
      {isNight && !isLowEnd && glowingObjects.map((obj) => {
        const config = getObjectLightConfig(obj.type);
        const isCampfire = obj.type === 'campfire';
        return (
          <pointLight
            key={`accent-light-${obj.id}`}
            ref={isCampfire ? campfireFlickerRef : undefined}
            position={[obj.position[0], obj.position[1] + config.heightOffset, obj.position[2]]}
            intensity={config.intensity}
            color={config.color}
            distance={config.distance}
            decay={2}
          />
        );
      })}
    </group>
  );
}
