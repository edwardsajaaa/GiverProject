import React from 'react';

export function DynamicLights({ timeMode = 'night', placedObjects = [], isLowEnd = false }) {
  const isNight = timeMode === 'night';

  if (!isNight) return null;

  // Filter accent lights (crystal / pyramid) capped to max 4 to preserve GPU fillrate
  const glowingObjects = isLowEnd ? [] : placedObjects
    .filter(obj => obj.type === 'crystal' || obj.type === 'pyramid')
    .slice(0, 4);

  return (
    <group>
      {/* Central soft ambient night glow without shadows */}
      <pointLight position={[0, 4, 0]} intensity={0.9} color="#38bdf8" distance={22} decay={2} />

      {/* Subtle ambient fill for crystals & pyramids only (no shadows) */}
      {!isLowEnd && glowingObjects.map((obj) => (
        <pointLight
          key={`accent-light-${obj.id}`}
          position={[obj.position[0], obj.position[1] + 0.8, obj.position[2]]}
          intensity={2.0}
          color={obj.type === 'crystal' ? '#c084fc' : '#fbbf24'}
          distance={5}
          decay={2}
        />
      ))}
    </group>
  );
}
