import React from 'react';

export function DynamicLights({ timeMode = 'night', placedObjects = [], isLowEnd = false }) {
  const isNight = timeMode === 'night';

  if (!isNight) return null;

  return (
    <group>
      {/* Central soft ambient night glow */}
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#38bdf8" distance={15} decay={2} />

      {/* Dynamic light emitters based on placed objects */}
      {!isLowEnd && placedObjects.map((obj) => {
        if (obj.type === 'lamp') {
          return (
            <pointLight
              key={`light-${obj.id}`}
              position={[obj.position[0], obj.position[1] + 1.2, obj.position[2]]}
              intensity={2.2}
              color="#ffd54f"
              distance={8}
              decay={2}
              castShadow={!isLowEnd}
            />
          );
        }
        if (obj.type === 'campfire') {
          return (
            <pointLight
              key={`light-${obj.id}`}
              position={[obj.position[0], obj.position[1] + 0.6, obj.position[2]]}
              intensity={2.8}
              color="#f97316"
              distance={9}
              decay={2}
              castShadow={!isLowEnd}
            />
          );
        }
        if (obj.type === 'crystal' || obj.type === 'pyramid') {
          return (
            <pointLight
              key={`light-${obj.id}`}
              position={[obj.position[0], obj.position[1] + 0.8, obj.position[2]]}
              intensity={1.4}
              color={obj.type === 'crystal' ? '#c084fc' : '#fbbf24'}
              distance={6}
              decay={2}
            />
          );
        }
        return null;
      })}
    </group>
  );
}
