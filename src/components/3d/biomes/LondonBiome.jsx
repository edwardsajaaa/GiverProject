import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. BIG BEN (ELIZABETH TOWER) & WESTMINSTER SILHOUETTE
// ============================================================================
function BigBenBackground({ isNight }) {
  const clockRef = useRef();
  const towerColor = isNight ? '#0b1426' : '#334155';
  const dialGlow = isNight ? '#fef08a' : '#fffbeb';
  const moonColor = isNight ? '#fef08a' : '#fbcfe8';

  return (
    <group position={[-42, -1.8, -42]}>
      {/* Romantic Mist Moon */}
      <mesh position={[-6, 36, -6]}>
        <circleGeometry args={[12, 32]} />
        <meshBasicMaterial color={moonColor} transparent opacity={isNight ? 0.9 : 0.82} />
      </mesh>

      {/* Elizabeth Tower (Big Ben) Architecture */}
      <group position={[0, 0, 0]}>
        {/* Main Tower Shaft (Neo-Gothic Stone) */}
        <mesh position={[0, 14, 0]} castShadow={false}>
          <boxGeometry args={[8.5, 28, 8.5]} />
          <meshStandardMaterial color={towerColor} roughness={0.9} flatShading />
        </mesh>

        {/* Lower Buttress Fluting */}
        {[-4.2, 4.2].map((bx, i) => (
          <mesh key={i} position={[bx, 8, 0]}>
            <boxGeometry args={[0.8, 16, 9.2]} />
            <meshStandardMaterial color={towerColor} roughness={0.9} />
          </mesh>
        ))}

        {/* Clock Chamber Section */}
        <mesh position={[0, 30, 0]}>
          <boxGeometry args={[9.5, 6.5, 9.5]} />
          <meshStandardMaterial color={isNight ? '#080d19' : '#1e293b'} roughness={0.85} />
        </mesh>

        {/* Glowing Clock Dials (4 Faces) */}
        {[-4.8, 4.8].map((dx, i) => (
          <group key={i} position={[dx, 30, 0]} rotation={[0, dx > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
            <mesh>
              <circleGeometry args={[2.5, 24]} />
              <meshStandardMaterial
                color={dialGlow}
                emissive={dialGlow}
                emissiveIntensity={isNight ? 2.5 : 0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Clock Hands & Gold Bezel */}
            <mesh position={[0, 0, 0.05]}>
              <ringGeometry args={[2.45, 2.65, 24]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
        {[-4.8, 4.8].map((dz, i) => (
          <group key={i} position={[0, 30, dz]} rotation={[0, dz > 0 ? 0 : Math.PI, 0]}>
            <mesh>
              <circleGeometry args={[2.5, 24]} />
              <meshStandardMaterial
                color={dialGlow}
                emissive={dialGlow}
                emissiveIntensity={isNight ? 2.5 : 0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.05]}>
              <ringGeometry args={[2.45, 2.65, 24]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Belfry Chamber (Where Big Ben Bell Hangs) */}
        <mesh position={[0, 35, 0]}>
          <boxGeometry args={[7.8, 4.5, 7.8]} />
          <meshStandardMaterial color={towerColor} roughness={0.85} flatShading />
        </mesh>

        {/* Neo-Gothic Roof Spire with Gilded Pinnacle Needle */}
        <mesh position={[0, 41.5, 0]}>
          <coneGeometry args={[5.2, 9.5, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={isNight ? '#050914' : '#1e293b'} roughness={0.8} flatShading />
        </mesh>
        <mesh position={[0, 47, 0]}>
          <cylinderGeometry args={[0.08, 0.4, 3, 6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
        </mesh>
        <mesh position={[0, 48.6, 0]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* Palace of Westminster Flanking Spires */}
      {[-24, -14, 14, 24].map((px, idx) => (
        <group key={idx} position={[px, 4, (idx % 2) * -6]}>
          <mesh>
            <boxGeometry args={[8, 10, 6]} />
            <meshStandardMaterial color={isNight ? '#070b16' : '#334155'} roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 7.5, 0]}>
            <coneGeometry args={[4.5, 6, 4]} rotation={[0, Math.PI / 4, 0]} />
            <meshStandardMaterial color={isNight ? '#04070e' : '#1f2937'} roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}

      {/* Distant London Eye Observation Wheel Silhouette */}
      <group position={[36, 16, -10]} rotation={[0, -0.4, 0]}>
        <mesh>
          <ringGeometry args={[14, 14.6, 32]} />
          <meshBasicMaterial color={isNight ? '#6366f1' : '#cbd5e1'} transparent opacity={isNight ? 0.45 : 0.3} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 2. ICONIC BRITISH RED TELEPHONE KIOSK (K6)
// ============================================================================
function LondonRedPhoneBox({ position = [5.5, 0, 5.5], isNight }) {
  const redColor = '#dc2626';
  const warmLight = '#fef08a';

  return (
    <group position={position}>
      {/* Stone Paving Plinth */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.16, 1.3]} />
        <meshStandardMaterial color="#475569" roughness={0.85} flatShading />
      </mesh>

      {/* Main Red Cast-Iron Frame Body */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <boxGeometry args={[1.05, 2.6, 1.05]} />
        <meshStandardMaterial color={redColor} roughness={0.65} />
      </mesh>

      {/* Multi-Paned Glass Windows with Warm Interior Light */}
      {[-0.53, 0.53].map((wx, i) => (
        <mesh key={i} position={[wx, 1.45, 0]}>
          <planeGeometry args={[0.75, 1.8]} />
          <meshStandardMaterial
            color={warmLight}
            emissive={warmLight}
            emissiveIntensity={isNight ? 1.6 : 0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
      <mesh position={[0, 1.45, 0.53]}>
        <planeGeometry args={[0.75, 1.8]} />
        <meshStandardMaterial
          color={warmLight}
          emissive={warmLight}
          emissiveIntensity={isNight ? 1.6 : 0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Window Grille Dividers */}
      <mesh position={[0, 1.45, 0.535]} scale={1.01}>
        <boxGeometry args={[0.76, 1.82, 0.02]} />
        <meshStandardMaterial color="#991b1b" wireframe />
      </mesh>

      {/* Domed Roof with Embossed Royal Crown Trim */}
      <mesh position={[0, 2.9, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.54, 0.35, 12]} />
        <meshStandardMaterial color={redColor} roughness={0.65} />
      </mesh>
      <mesh position={[0, 3.12, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Warm Ambient Interior Light */}
      <pointLight position={[0, 1.6, 0]} color="#fef08a" intensity={isNight ? 2.0 : 0.7} distance={5} decay={2} />
    </group>
  );
}

// ============================================================================
// 3. VICTORIA EMBANKMENT RAILING & THAMES GAS LAMPS
// ============================================================================
function VictorianEmbankmentRailing({ isNight }) {
  return (
    <group position={[-9.5, 0, 0]}>
      {/* Stone Parapet Embankment */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[0.6, 0.5, 22.2]} />
        <meshStandardMaterial color={isNight ? '#1e293b' : '#64748b'} roughness={0.85} />
      </mesh>

      {/* Wrought-Iron Decorative River Railing */}
      {[-8, -4, 0, 4, 8].map((rz, idx) => (
        <group key={idx} position={[0, 0.65, rz]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.55, 6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Top Continuous Brass Railing */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 22.2, 6]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function VictorianGasLamp({ position = [0, 0, 0], isNight }) {
  return (
    <group position={position}>
      {/* Fluted Base Pedestal */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.26, 0.7, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Tall Pole */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 2.0, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Crossbar Rest for Lamp Lighter's Ladder */}
      <mesh position={[0, 2.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 6]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Four-Sided Victorian Lantern Glass */}
      <mesh position={[0, 2.85, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.18, 0.6, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial
          color="#fffbeb"
          emissive={isNight ? '#ffb703' : '#fef08a'}
          emissiveIntensity={isNight ? 2.6 : 0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Lantern Roof & Gold Ball */}
      <mesh position={[0, 3.25, 0]} castShadow>
        <coneGeometry args={[0.38, 0.28, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      <mesh position={[0, 3.42, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Warm Ambient Gas Light */}
      <pointLight position={[0, 2.85, 0]} color="#ffb703" intensity={isNight ? 2.5 : 0.8} distance={7} decay={2} />
    </group>
  );
}

// ============================================================================
// 4. ROMANTIC AUTUMN MAPLE TREES & DRIFTING GOLDEN LEAVES
// ============================================================================
function AutumnMapleTree({ position = [0, 0, 0], scale = 1, rotationY = 0, isNight }) {
  const trunkColor = isNight ? '#261b14' : '#452a1b';
  const amber1 = isNight ? '#d97706' : '#f59e0b';
  const amber2 = isNight ? '#b45309' : '#d97706';
  const amberGold = isNight ? '#f59e0b' : '#fef08a';

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Organic Curved Trunk */}
      <mesh position={[0, 1.1, 0]} rotation={[0.07, 0, -0.05]} castShadow>
        <cylinderGeometry args={[0.2, 0.35, 2.2, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[-0.4, 2.1, 0.15]} rotation={[0.35, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.3, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0.45, 2.2, -0.1]} rotation={[-0.3, 0.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.4, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.85} flatShading />
      </mesh>

      {/* Layered Golden Amber Foliage Canopies */}
      <group position={[0, 2.8, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <dodecahedronGeometry args={[1.45, 1]} />
          <meshStandardMaterial color={amber1} roughness={0.65} flatShading />
        </mesh>
        <mesh position={[-1.1, 0.2, 0.3]} castShadow>
          <dodecahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial color={amber2} roughness={0.65} flatShading />
        </mesh>
        <mesh position={[1.1, 0.25, -0.25]} castShadow>
          <dodecahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color={amber2} roughness={0.65} flatShading />
        </mesh>
        <mesh position={[0.15, 1.2, 0.1]} castShadow>
          <dodecahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color={amberGold} roughness={0.6} flatShading />
        </mesh>
      </group>

      {/* Fallen Golden Leaves Ring */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 2.6, 16]} />
        <meshBasicMaterial color={amber1} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

function FallingAutumnLeaves({ count = 46, isNight }) {
  const leavesRef = useRef();
  const leafData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 8 + 0.5,
      z: (Math.random() - 0.5) * 22,
      speedY: 0.015 + Math.random() * 0.022,
      speedRot: 0.02 + Math.random() * 0.04,
      sway: 0.45 + Math.random() * 0.75,
      phase: Math.random() * Math.PI * 2,
      scale: 0.09 + Math.random() * 0.05,
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
          p.x = (Math.random() - 0.5) * 22;
          p.z = (Math.random() - 0.5) * 22;
        }
        child.position.set(
          p.x + Math.sin(t * p.sway + p.phase) * 0.55,
          p.y,
          p.z + Math.cos(t * p.sway + p.phase) * 0.55
        );
        child.rotation.x += p.speedRot;
        child.rotation.y += p.speedRot * 0.7;
      });
    }
  });

  return (
    <group ref={leavesRef}>
      {leafData.map((p, idx) => (
        <mesh key={idx} scale={p.scale}>
          <planeGeometry args={[1, 1.2]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#f59e0b' : '#d97706'}
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
// 5. MAIN LONDON BIOME ASSEMBLY (London Autumn Romance)
// ============================================================================
export function LondonBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161d2c' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const curbColor = isNight ? '#0f172a' : '#475569';

  return (
    <group>
      {/* 1. Distant Elizabeth Tower (Big Ben) & Westminster Silhouette */}
      <BigBenBackground isNight={isNight} />

      {/* 2. Kraft Mineral Strata Pedestal */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[23.6, 1.6, 23.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#7c5e3f'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Foil Ribbon Rim */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[23.8, 0.08, 23.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Main Deckle-Edge Cobblestone Plateau (Interactive Ground) */}
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
        <boxGeometry args={[22.4, 0.36, 22.4]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.9}
          metalness={0.03}
        />
      </mesh>

      {/* London Granite Pavement Lines */}
      {[-8, -5, -2, 2, 5, 8].map((z, idx) => (
        <mesh key={idx} position={[1, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[15, 0.14]} />
          <meshBasicMaterial
            color={isNight ? '#38bdf8' : '#c4b5a0'}
            transparent
            opacity={isNight ? 0.25 : 0.6}
          />
        </mesh>
      ))}

      {/* Carved Curbs */}
      <mesh position={[0, 0.04, 11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.04, -11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>
      <mesh position={[-11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={curbColor} roughness={0.75} />
      </mesh>

      {/* 4. Iconic British Red Telephone Box */}
      <LondonRedPhoneBox position={[5.2, 0, 4.8]} isNight={isNight} />

      {/* 5. Victoria Embankment Thames Railing */}
      <VictorianEmbankmentRailing isNight={isNight} />

      {/* 6. Victorian Gas Lamps */}
      <VictorianGasLamp position={[-7.5, 0, 7.5]} isNight={isNight} />
      <VictorianGasLamp position={[-7.5, 0, -7.5]} isNight={isNight} />
      <VictorianGasLamp position={[8.5, 0, -6.5]} isNight={isNight} />

      {/* 7. Autumn Maple Trees */}
      <AutumnMapleTree position={[-4.5, 0, -6.5]} scale={1.25} rotationY={0.5} isNight={isNight} />
      <AutumnMapleTree position={[7.5, 0, -4.5]} scale={1.15} rotationY={-0.6} isNight={isNight} />
      <AutumnMapleTree position={[-5.2, 0, 6.2]} scale={1.05} rotationY={1.2} isNight={isNight} />

      {/* 8. Romantic Wooden Park Bench */}
      <group position={[1.8, 0, 6.2]} rotation={[0, -0.4, 0]}>
        {/* Bench Planks */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[2.0, 0.08, 0.55]} />
          <meshStandardMaterial color="#3d2516" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.82, -0.22]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[2.0, 0.45, 0.08]} />
          <meshStandardMaterial color="#3d2516" roughness={0.75} />
        </mesh>
        {/* Cast Iron Legs */}
        {[-0.85, 0.85].map((lx, lIdx) => (
          <mesh key={lIdx} position={[lx, 0.22, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.44, 6]} />
            <meshStandardMaterial color="#111827" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 9. Falling Golden Autumn Leaves */}
      <FallingAutumnLeaves count={48} isNight={isNight} />
    </group>
  );
}
