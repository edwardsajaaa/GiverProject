import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createStarTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.88)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.28)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

const GALAXY_TEXTURE = createStarTexture();

function createGalaxyData(isLowEnd) {
  const count = isLowEnd ? 16000 : 42000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const arms = 2;
  const radius = 48;

  const colorCore = new THREE.Color('#ffffff');
  const colorInner = new THREE.Color('#ffe0b2');
  const colorArm1 = new THREE.Color('#38bdf8');
  const colorArm2 = new THREE.Color('#c084fc');
  const colorDust = new THREE.Color('#1e3a8a');

  for (let i = 0; i < count; i++) {
    const isCore = i < (isLowEnd ? 4000 : 10000);
    let r, angle, y, mixedColor;

    if (isCore) {
      r = Math.pow(Math.random(), 2.2) * 7.5;
      angle = Math.random() * Math.PI * 2;
      const coreThickness = (1.0 - r / 7.5) * 2.8;
      y = (Math.random() - 0.5) * coreThickness;
      mixedColor = colorCore.clone().lerp(colorInner, (r / 7.5) * 0.8);
    } else {
      r = 4.0 + Math.pow(Math.random(), 1.4) * (radius - 4.0);
      const spinAngle = r * 0.38;
      const armIndex = i % arms;
      const armAngle = ((Math.PI * 2) / arms) * armIndex;
      const dustLaneFactor = Math.sin(r * 0.7 - armAngle) * 0.45;
      angle = armAngle + spinAngle + (Math.random() - 0.5) * (r * 0.16 + 0.3) + dustLaneFactor;
      y = (Math.random() - 0.5) * Math.max(0.2, (1.0 - r / radius) * 1.5);

      const distRatio = Math.min(1, (r - 4.0) / (radius - 4.0));
      mixedColor = colorInner.clone().lerp(armIndex === 0 ? colorArm1 : colorArm2, Math.min(1, distRatio * 1.3));
      if (distRatio > 0.65 && Math.random() < 0.4) {
        mixedColor.lerp(colorDust, (distRatio - 0.65) * 2.5);
      }
    }

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(angle) * r * 0.82;

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }
  return { positions, colors };
}

function createStarsData(isLowEnd) {
  const count = isLowEnd ? 1200 : 3500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ['#ffffff', '#aee2ff', '#ffd2a1', '#e8b5ff', '#9beaff'];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 45 + 28;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const c = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

function CosmicCometItem({ pos, dir, scale = 1.1 }) {
  const groupRef = useRef();
  useEffect(() => {
    if (groupRef.current && dir) {
      const tailDir = new THREE.Vector3(...dir).negate().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      groupRef.current.quaternion.setFromUnitVectors(up, tailDir);
    }
  }, [dir]);

  return (
    <group position={pos} scale={scale}>
      <mesh><sphereGeometry args={[0.38, 32, 32]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh><sphereGeometry args={[1.05, 32, 32]} /><meshBasicMaterial color="#a855f7" transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
      <group ref={groupRef}>
        <mesh position={[0, 4.8, 0]}><coneGeometry args={[0.36, 9.6, 32]} /><meshBasicMaterial color="#c084fc" transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
        <mesh position={[0, 6.2, 0]}><coneGeometry args={[0.65, 12.4, 32]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.38} blending={THREE.AdditiveBlending} /></mesh>
        <mesh position={[0.45, 4.2, 0]} rotation={[0, 0, -0.14]}><coneGeometry args={[0.58, 8.4, 32]} /><meshBasicMaterial color="#fef08a" transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      </group>
    </group>
  );
}

function GalaxySky({ isLowEnd }) {
  const galaxyGroupRef = useRef();
  const starFieldRef = useRef();
  const [shootingStar, setShootingStar] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });
  const [comet, setComet] = useState({ active: false, pos: [0,0,0], speed: [0,0,0] });

  const galaxyData = useMemo(() => createGalaxyData(isLowEnd), [isLowEnd]);
  const starsData = useMemo(() => createStarsData(isLowEnd), [isLowEnd]);

  useFrame((state, delta) => {
    if (galaxyGroupRef.current) galaxyGroupRef.current.rotation.y += delta * 0.035;
    if (starFieldRef.current) starFieldRef.current.rotation.y += delta * 0.004;

    if (!shootingStar.active && Math.random() < 0.008) {
      setShootingStar({
        active: true,
        pos: [(Math.random() - 0.5) * 32 + 18, 18 + Math.random() * 8, -12 + (Math.random() - 0.5) * 18],
        speed: [-(Math.random() * 26 + 18), -(Math.random() * 14 + 8), (Math.random() - 0.5) * 8]
      });
    } else if (shootingStar.active) {
      const [x, y, z] = shootingStar.pos;
      const [vx, vy, vz] = shootingStar.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      if (ny < -5 || nx < -38) setShootingStar(s => ({ ...s, active: false }));
      else setShootingStar(s => ({ ...s, pos: [nx, ny, z + vz * delta] }));
    }

    if (!comet.active && Math.random() < 0.0035) {
      setComet({
        active: true,
        pos: [35 + Math.random() * 10, 22 + Math.random() * 6, -22 + (Math.random() - 0.5) * 15],
        speed: [-(Math.random() * 5 + 3.5), -(Math.random() * 2 + 1.2), -(Math.random() * 1.5 + 0.5)]
      });
    } else if (comet.active) {
      const [x, y, z] = comet.pos;
      const [vx, vy, vz] = comet.speed;
      const nx = x + vx * delta;
      const ny = y + vy * delta;
      if (ny < -10 || nx < -45) setComet(s => ({ ...s, active: false }));
      else setComet(s => ({ ...s, pos: [nx, ny, z + vz * delta] }));
    }
  });

  return (
    <group>
      <points ref={starFieldRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starsData.positions.length / 3} array={starsData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={starsData.colors.length / 3} array={starsData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.38} map={GALAXY_TEXTURE} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <group position={[0, -20, 0]} rotation={[-0.15, 0, 0.05]}>
        <points ref={galaxyGroupRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={galaxyData.positions.length / 3} array={galaxyData.positions} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={galaxyData.colors.length / 3} array={galaxyData.colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.62} map={GALAXY_TEXTURE} vertexColors transparent opacity={0.92} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      </group>

      <group position={[-14, 18, -20]}>
        <mesh><sphereGeometry args={[3.2, 32, 32]} /><meshBasicMaterial color="#ffe57f" transparent opacity={0.25} side={THREE.BackSide} /></mesh>
      </group>

      {shootingStar.active && (
        <group position={shootingStar.pos}>
          <mesh><sphereGeometry args={[0.22, 12, 12]} /><meshBasicMaterial color="#ffffff" /></mesh>
          <mesh><sphereGeometry args={[0.55, 12, 12]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
        </group>
      )}

      {comet.active && <CosmicCometItem pos={comet.pos} dir={comet.speed} scale={1.25} />}
    </group>
  );
}

function DaySky({ isLowEnd }) {
  const cloudsRef = useRef([]);
  const cloudConfigs = useMemo(() => isLowEnd ? [
    { id: 1, pos: [-16, 14, -18], scale: 1.8, speed: 0.25 },
    { id: 2, pos: [14, 16, -14], scale: 2.2, speed: 0.18 },
  ] : [
    { id: 1, pos: [-16, 14, -18], scale: 1.8, speed: 0.25 },
    { id: 2, pos: [14, 16, -14], scale: 2.2, speed: 0.18 },
    { id: 3, pos: [-6, 18, -22], scale: 1.5, speed: 0.3 },
  ], [isLowEnd]);

  useFrame((state, delta) => {
    cloudsRef.current.forEach((el, i) => {
      if (el) {
        el.position.x += cloudConfigs[i].speed * delta;
        if (el.position.x > 30) el.position.x = -30;
      }
    });
  });

  return (
    <group>
      <mesh position={[18, 22, -28]}><sphereGeometry args={[4.2, 32, 32]} /><meshBasicMaterial color="#fff8db" /></mesh>
      {cloudConfigs.map((c, idx) => (
        <group key={c.id} position={c.pos} scale={c.scale} ref={el => cloudsRef.current[idx] = el}>
          <mesh castShadow><sphereGeometry args={[1.2, 10, 10]} /><meshStandardMaterial color="#ffffff" roughness={0.2} /></mesh>
          <mesh position={[1.1, -0.2, 0]} castShadow><sphereGeometry args={[0.9, 10, 10]} /><meshStandardMaterial color="#f0f7ff" roughness={0.2} /></mesh>
          <mesh position={[-1.1, -0.2, 0]} castShadow><sphereGeometry args={[0.95, 10, 10]} /><meshStandardMaterial color="#f0f7ff" roughness={0.2} /></mesh>
        </group>
      ))}
    </group>
  );
}

export function AtmosphericEnvironment({ timeMode, isLowEnd }) {
  const ambientRef = useRef();
  const dirLightRef = useRef();
  const galaxyGroupRef = useRef();
  const dayGroupRef = useRef();
  const progressRef = useRef(timeMode === 'night' ? 0 : 1);

  useFrame((state, delta) => {
    const { scene } = state;
    const isNight = timeMode === 'night';
    const target = isNight ? 0 : 1;
    const lerpSpeed = delta * 3.5;
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, target, lerpSpeed);
    const p = progressRef.current; // 0 (night) to 1 (day)

    // 1. Scene Background & Fog
    const nightBg = new THREE.Color('#050712');
    const dayBg = new THREE.Color('#85cbee');
    const nightFog = new THREE.Color('#060814');
    const dayFog = new THREE.Color('#a2d6f2');

    if (!scene.background || !(scene.background instanceof THREE.Color)) {
      scene.background = nightBg.clone().lerp(dayBg, p);
    } else {
      scene.background.copy(nightBg).lerp(dayBg, p);
    }

    if (!scene.fog) {
      scene.fog = new THREE.Fog(nightFog.clone().lerp(dayFog, p), 18, 48);
    } else {
      scene.fog.color.copy(nightFog).lerp(dayFog, p);
    }

    // 2. Lights
    if (ambientRef.current) {
      const nightAmb = new THREE.Color('#464c80');
      const dayAmb = new THREE.Color('#fff8e7');
      ambientRef.current.color.copy(nightAmb).lerp(dayAmb, p);
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.45, 0.65, p);
    }
    if (dirLightRef.current) {
      const nightSun = new THREE.Color('#b3d4ff');
      const daySun = new THREE.Color('#fff6dd');
      dirLightRef.current.color.copy(nightSun).lerp(daySun, p);
      dirLightRef.current.intensity = THREE.MathUtils.lerp(0.9, 1.9, p);
      dirLightRef.current.position.set(
        THREE.MathUtils.lerp(10, 12, p),
        THREE.MathUtils.lerp(15, 20, p),
        THREE.MathUtils.lerp(10, 8, p)
      );
    }

    // 3. Smooth transition of Galaxy and Day sky groups
    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.visible = p < 0.98;
      galaxyGroupRef.current.position.y = THREE.MathUtils.lerp(0, -35, p);
      const scale = THREE.MathUtils.lerp(1, 0.6, p);
      galaxyGroupRef.current.scale.set(scale, scale, scale);
    }
    if (dayGroupRef.current) {
      dayGroupRef.current.visible = p > 0.02;
      dayGroupRef.current.position.y = THREE.MathUtils.lerp(35, 0, p);
      const scale = THREE.MathUtils.lerp(0.6, 1, p);
      dayGroupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={0.45} color="#464c80" />
      <directionalLight
        ref={dirLightRef}
        position={[10, 15, 10]}
        intensity={0.9}
        color="#b3d4ff"
        castShadow={!isLowEnd}
        shadow-mapSize={[1024, 1024]}
      />

      <group ref={galaxyGroupRef}>
        <GalaxySky isLowEnd={isLowEnd} />
      </group>

      <group ref={dayGroupRef}>
        <DaySky isLowEnd={isLowEnd} />
      </group>
    </group>
  );
}
