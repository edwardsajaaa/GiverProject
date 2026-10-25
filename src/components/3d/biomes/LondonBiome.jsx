import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. ELIZABETH TOWER (BIG BEN) ARCHITECTURE (Solidly Anchored on Island Terrace!)
// ============================================================================
function BigBenArchitecture({ position = [-9.2, 0, -9.2], isNight, onInteractiveClick }) {
  const towerColor = isNight ? '#1e293b' : '#64748b';
  const dialGlow = isNight ? '#fef08a' : '#fffbeb';
  const goldTrim = '#d4af37';

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playBell();
        if (onInteractiveClick) onInteractiveClick('bigben');
      }}
      cursor="pointer"
    >
      {/* Westminster Foundation Stone Terrace */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.8, 0.9, 8.8]} />
        <meshStandardMaterial color={isNight ? '#1e2538' : '#e2e8f0'} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[8.9, 0.06, 8.9]} />
        <meshStandardMaterial color={goldTrim} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Tower Shaft (Neo-Gothic Stone Pillars) */}
      <mesh position={[0, 9.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 17.2, 5.2]} />
        <meshStandardMaterial color={towerColor} roughness={0.85} flatShading />
      </mesh>

      {/* Buttress Rib Fluting */}
      {[-2.6, 2.6].map((bx, i) => (
        <mesh key={i} position={[bx, 8.5, 0]} castShadow>
          <boxGeometry args={[0.5, 15, 5.5]} />
          <meshStandardMaterial color={towerColor} roughness={0.9} />
        </mesh>
      ))}

      {/* Clock Chamber Section */}
      <group position={[0, 19.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[5.8, 4.4, 5.8]} />
          <meshStandardMaterial color={isNight ? '#0f172a' : '#334155'} roughness={0.8} />
        </mesh>

        {/* 4 Clock Dials (Glowing Faces) */}
        {[-2.92, 2.92].map((dx, i) => (
          <group key={i} position={[dx, 0, 0]} rotation={[0, dx > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
            <mesh>
              <circleGeometry args={[1.65, 24]} />
              <meshStandardMaterial
                color={dialGlow}
                emissive={dialGlow}
                emissiveIntensity={isNight ? 2.4 : 0.6}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.04]}>
              <ringGeometry args={[1.62, 1.76, 24]} />
              <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
        {[-2.92, 2.92].map((dz, i) => (
          <group key={i} position={[0, 0, dz]} rotation={[0, dz > 0 ? 0 : Math.PI, 0]}>
            <mesh>
              <circleGeometry args={[1.65, 24]} />
              <meshStandardMaterial
                color={dialGlow}
                emissive={dialGlow}
                emissiveIntensity={isNight ? 2.4 : 0.6}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.04]}>
              <ringGeometry args={[1.62, 1.76, 24]} />
              <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Clock Illumination Pointlight at Night */}
        {isNight && (
          <pointLight color="#fef08a" intensity={2.6} distance={14} decay={1.6} />
        )}
      </group>

      {/* Belfry Lantern & Pyramidal Spire Roof */}
      <group position={[0, 22.8, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[4.8, 2.2, 4.8]} />
          <meshStandardMaterial color={isNight ? '#0f172a' : '#1e293b'} roughness={0.8} />
        </mesh>
        {/* Steep Gothic Roof Spire */}
        <mesh position={[0, 4.4, 0]} castShadow>
          <coneGeometry args={[3.2, 4.8, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={isNight ? '#090d16' : '#1e293b'} roughness={0.7} flatShading />
        </mesh>
        {/* Pinnacle Spire & Golden Cross */}
        <mesh position={[0, 7.5, 0]}>
          <cylinderGeometry args={[0.08, 0.22, 2.4, 8]} />
          <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Flanking Westminster Palace Wing */}
      <group position={[5.8, 0, 0]}>
        <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 6.2, 4.6]} />
          <meshStandardMaterial color={towerColor} roughness={0.85} flatShading />
        </mesh>
        {/* Gothic Roof */}
        <mesh position={[0, 7.2, 0]} castShadow>
          <coneGeometry args={[2.8, 2.4, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={isNight ? '#090d16' : '#334155'} roughness={0.7} flatShading />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 2. ICONIC BRITISH RED TELEPHONE KIOSK (K6 - Clickable to Ring!)
// ============================================================================
function LondonRedPhoneBox({ position = [7.5, 0, 6.5], isNight, onInteractiveClick }) {
  const redColor = '#dc2626';
  const warmLight = '#fef08a';

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playPhoneRing();
        if (onInteractiveClick) onInteractiveClick('phonebox');
      }}
      cursor="pointer"
    >
      {/* Stone Paving Plinth */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#475569" roughness={0.85} />
      </mesh>

      {/* Main Red Cast-Iron Frame Body */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshStandardMaterial color={redColor} roughness={0.65} />
      </mesh>

      {/* Glass Windows with Warm Interior Light */}
      {[-0.61, 0.61].map((wx, i) => (
        <mesh key={i} position={[wx, 1.6, 0]}>
          <planeGeometry args={[0.85, 2.0]} />
          <meshStandardMaterial
            color={warmLight}
            emissive={warmLight}
            emissiveIntensity={isNight ? 1.8 : 0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
      <mesh position={[0, 1.6, 0.61]}>
        <planeGeometry args={[0.85, 2.0]} />
        <meshStandardMaterial
          color={warmLight}
          emissive={warmLight}
          emissiveIntensity={isNight ? 1.8 : 0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Curved Domed Roof */}
      <mesh position={[0, 3.15, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.62, 0.4, 12]} />
        <meshStandardMaterial color={redColor} roughness={0.65} />
      </mesh>
      {/* Crown Finial Cap */}
      <mesh position={[0, 3.42, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Warm Interior Lantern Glow */}
      <pointLight
        position={[0, 1.8, 0]}
        color="#fbbf24"
        intensity={isNight ? 1.8 : 0.6}
        distance={5.5}
        decay={1.8}
      />
    </group>
  );
}

// ============================================================================
// 3. RIVER THAMES & VICTORIAN EMBANKMENT WITH SAILING RIVER CLIPPER
// ============================================================================
function ThamesRiverAndEmbankment({ isNight, onInteractiveClick }) {
  const waterColor = isNight ? '#0b2038' : '#2563eb';
  const stoneEmbankment = isNight ? '#1e293b' : '#94a3b8';
  const boatRef = useRef();

  useFrame((state) => {
    if (boatRef.current) {
      const t = state.clock.elapsedTime * 0.35;
      boatRef.current.position.z = Math.sin(t) * 8.5;
      boatRef.current.position.x = 2.4 + Math.cos(t * 0.5) * 0.25;
      boatRef.current.rotation.y = Math.sin(t) > 0 ? 0 : Math.PI;
    }
  });

  return (
    <group>
      {/* River Thames Water Canal Bed */}
      <mesh position={[2.5, -0.05, 0]} receiveShadow>
        <boxGeometry args={[6.8, 0.1, 28.5]} />
        <meshStandardMaterial
          color={waterColor}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Victorian Granite Embankment Wall */}
      <mesh position={[-0.95, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.45, 28.5]} />
        <meshStandardMaterial color={stoneEmbankment} roughness={0.8} />
      </mesh>
      <mesh position={[5.95, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.45, 28.5]} />
        <meshStandardMaterial color={stoneEmbankment} roughness={0.8} />
      </mesh>

      {/* Victorian Cast-Iron Embankment Railing with Dolphins */}
      {[-12, -8, -4, 0, 4, 8, 12].map((rz, idx) => (
        <group key={idx} position={[-0.95, 0.4, rz]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.06, 0.55, 6]} />
            <meshStandardMaterial color="#111827" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Thames Clipper / River Ferry */}
      <group
        ref={boatRef}
        position={[2.5, 0.08, 0]}
        onClick={(e) => {
          e.stopPropagation();
          SoundEngine.playWaterSplash();
          if (onInteractiveClick) onInteractiveClick('boat');
        }}
        cursor="pointer"
      >
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.42, 4.4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[1.65, 0.1, 4.45]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 2.8]} />
          <meshStandardMaterial
            color={isNight ? '#fef08a' : '#e0f2fe'}
            emissive={isNight ? '#fbbf24' : '#000000'}
            emissiveIntensity={isNight ? 1.0 : 0}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Westminster Footbridge Crossing Thames */}
      <group position={[2.5, 0, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.4]} />
          <meshStandardMaterial color={stoneEmbankment} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.16, 2.6]} />
          <meshStandardMaterial color={isNight ? '#261c14' : '#64748b'} roughness={0.7} />
        </mesh>
        {[-1.25, 1.25].map((rz, rIdx) => (
          <mesh key={rIdx} position={[0, 0.95, rz]}>
            <boxGeometry args={[7.2, 0.45, 0.08]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 4. AUTUMN GOLDEN MAPLE TREES & PARK BENCH (Romantic London Walkway)
// ============================================================================
function AutumnMapleTree({ position = [8.5, 0, -4.5], scale = 1, isNight }) {
  const trunk = isNight ? '#251710' : '#452b1e';
  const goldenAutumn = isNight ? '#d97706' : '#f59e0b';
  const amberHighlight = isNight ? '#b45309' : '#fbbf24';

  return (
    <group position={position} scale={scale}>
      {/* Dark Bark Trunk */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.38, 2.8, 8]} />
        <meshStandardMaterial color={trunk} roughness={0.9} flatShading />
      </mesh>
      {/* Golden Maple Leaves Foliage */}
      <group position={[0, 3.4, 0]}>
        <mesh castShadow>
          <dodecahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color={goldenAutumn}
            emissive={isNight ? '#b45309' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
            roughness={0.65}
            flatShading
          />
        </mesh>
        <mesh position={[0.8, 0.8, -0.4]} castShadow>
          <dodecahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial color={amberHighlight} roughness={0.65} flatShading />
        </mesh>
      </group>

      {/* Ring of Fallen Golden Leaves at Tree Base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 2.6, 16]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={isNight ? 0.45 : 0.75} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 5. VICTORIAN GAS LAMPS (Interactive Click to Toggle Light!)
// ============================================================================
function VictorianGasLamp({ position = [0, 0, 0], scale = 1, isNight }) {
  const [lit, setLit] = useState(true);

  return (
    <group
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playClick();
        setLit(!lit);
      }}
      cursor="pointer"
    >
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.28, 0.7, 8]} />
        <meshStandardMaterial color="#111827" metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.65, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 2.2, 8]} />
        <meshStandardMaterial color="#111827" metalness={0.8} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <cylinderGeometry args={[0.32, 0.2, 0.55, 6]} />
        <meshStandardMaterial
          color="#fffbeb"
          emissive={lit ? '#ffb703' : '#000000'}
          emissiveIntensity={lit ? (isNight ? 2.8 : 1.0) : 0}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh position={[0, 3.48, 0]} castShadow>
        <coneGeometry args={[0.42, 0.28, 6]} />
        <meshStandardMaterial color="#111827" metalness={0.8} />
      </mesh>
      {lit && (
        <pointLight
          position={[0, 3.1, 0]}
          color="#ffb703"
          intensity={isNight ? 2.4 : 0.8}
          distance={7.5}
          decay={1.8}
        />
      )}
    </group>
  );
}

// ============================================================================
// 6. FALLING AUTUMN MAPLE LEAVES
// ============================================================================
function FallingGoldenLeaves({ count = 48, isNight }) {
  const leavesRef = useRef();
  const leafData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 28,
      y: Math.random() * 8 + 0.5,
      z: (Math.random() - 0.5) * 28,
      speedY: 0.012 + Math.random() * 0.022,
      speedRot: 0.02 + Math.random() * 0.035,
      sway: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      scale: 0.09 + Math.random() * 0.06,
    }));
  }, [count]);

  useFrame((state) => {
    if (leavesRef.current) {
      const t = state.clock.elapsedTime;
      leavesRef.current.children.forEach((child, i) => {
        const p = leafData[i];
        p.y -= p.speedY;
        if (p.y < 0.05) {
          p.y = 8;
          p.x = (Math.random() - 0.5) * 28;
          p.z = (Math.random() - 0.5) * 28;
        }
        child.position.set(
          p.x + Math.sin(t * p.sway + p.phase) * 0.65,
          p.y,
          p.z + Math.cos(t * p.sway + p.phase) * 0.65
        );
        child.rotation.x += p.speedRot;
        child.rotation.y += p.speedRot * 0.8;
      });
    }
  });

  return (
    <group ref={leavesRef}>
      {leafData.map((p, idx) => (
        <mesh key={idx} scale={p.scale}>
          <planeGeometry args={[1, 1.3]} />
          <meshBasicMaterial
            color={isNight ? '#d97706' : '#f59e0b'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 7. MAIN LONDON BIOME ASSEMBLY (Expanded, Grounded & Interactive!)
// ============================================================================
export function LondonBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161d2c' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const curbColor = isNight ? '#0f172a' : '#475569';

  return (
    <group>
      {/* 1. Expanded Solid Ground Strata Base (30 x 30 Size!) */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[31.6, 1.6, 31.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#7c5e3f'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Foil Ribbon Rim */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[31.8, 0.08, 31.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Main Deckle-Edge Cobblestone Promenade (Expanded 30 x 30 Area!) */}
      <mesh
        position={[0, -0.2, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (onGroundTap) {
            e.stopPropagation();
            onGroundTap(e.point.x, e.point.z);
            SoundEngine.playPop();
          }
        }}
      >
        <boxGeometry args={[30.4, 0.36, 30.4]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.9}
          metalness={0.03}
        />
      </mesh>

      {/* London Granite Pavement Lines */}
      {[-12, -9, -6, -3, 3, 6, 9, 12].map((z, idx) => (
        <mesh key={idx} position={[8.5, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[11, 0.14]} />
          <meshBasicMaterial
            color={isNight ? '#38bdf8' : '#c4b5a0'}
            transparent
            opacity={isNight ? 0.25 : 0.6}
          />
        </mesh>
      ))}

      {/* Carved Curbs */}
      <mesh position={[0, 0.04, 15.1]} receiveShadow>
        <boxGeometry args={[30.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.04, -15.1]} receiveShadow>
        <boxGeometry args={[30.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[15.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 29.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[-15.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 29.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>

      {/* 3. Big Ben on Westminster Embankment Terrace (Firmly Grounded on Island!) */}
      <BigBenArchitecture position={[-9.2, 0, -9.2]} isNight={isNight} />

      {/* 4. British Red Telephone Kiosk (K6 - Clickable to Ring!) */}
      <LondonRedPhoneBox position={[8.5, 0, 6.5]} isNight={isNight} />

      {/* 5. River Thames & Victorian Embankment with Cruising River Boat */}
      <ThamesRiverAndEmbankment isNight={isNight} />

      {/* 6. Autumn Golden Maple Trees (Westminster Garden) */}
      <AutumnMapleTree position={[8.5, 0, -4.5]} scale={1.2} isNight={isNight} />
      <AutumnMapleTree position={[11.5, 0, -10.5]} scale={1.0} isNight={isNight} />
      <AutumnMapleTree position={[-8.5, 0, 5.5]} scale={1.1} isNight={isNight} />

      {/* 7. Romantic Victorian Park Bench */}
      <group position={[6.5, 0, -1.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[2.2, 0.08, 0.65]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.75, -0.3]} castShadow>
          <boxGeometry args={[2.2, 0.6, 0.08]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        {[-0.9, 0.9].map((lx, i) => (
          <mesh key={i} position={[lx, 0.2, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.65]} />
            <meshStandardMaterial color="#111827" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 8. Interactive Victorian Gas Lamps */}
      <VictorianGasLamp position={[6.8, 0, 9.8]} scale={0.95} isNight={isNight} />
      <VictorianGasLamp position={[13.2, 0, 9.8]} scale={0.95} isNight={isNight} />
      <VictorianGasLamp position={[6.8, 0, -11.2]} scale={0.95} isNight={isNight} />
      <VictorianGasLamp position={[13.2, 0, -11.2]} scale={0.95} isNight={isNight} />

      {/* 9. Falling Golden Maple Leaves */}
      <FallingGoldenLeaves count={48} isNight={isNight} />
    </group>
  );
}
