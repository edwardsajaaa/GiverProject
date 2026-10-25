import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. EIFFEL TOWER ON CHAMP-DE-MARS (Firmly Grounded on the Island Terrace!)
// ============================================================================
function EiffelTowerArchitecture({ position = [-8.5, 0, -8.5], isNight, onInteractiveClick }) {
  const beaconRef = useRef();
  const towerColor = isNight ? '#1e293b' : '#64748b';
  const latticeGold = '#d4af37';
  const beaconGlow = '#fef08a';

  useFrame((state) => {
    if (beaconRef.current && isNight) {
      beaconRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playTokyoTowerBeacon();
        if (onInteractiveClick) onInteractiveClick('eiffel');
      }}
      cursor="pointer"
    >
      {/* Stone Champ-de-Mars Terrace Pedestal */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.8, 0.9, 8.8]} />
        <meshStandardMaterial color={isNight ? '#1e2538' : '#e2e8f0'} roughness={0.85} />
      </mesh>
      {/* Gold Rim Contour */}
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[8.9, 0.06, 8.9]} />
        <meshStandardMaterial color={latticeGold} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Tier 1: Wide Arch Legs */}
      <group position={[0, 0.9, 0]}>
        <mesh position={[0, 3.5, 0]} castShadow>
          <cylinderGeometry args={[5.2, 8.2, 7, 4, 1, true]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={towerColor} roughness={0.8} flatShading />
        </mesh>
        {/* Archway Cutout Center */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[3.8, 4.8, 3.8, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshBasicMaterial color={isNight ? '#0b0f19' : '#f1f5f9'} />
        </mesh>
        {/* Tier 1 Observation Platform Balcony */}
        <mesh position={[0, 7.2, 0]} castShadow>
          <boxGeometry args={[7.8, 0.45, 7.8]} />
          <meshStandardMaterial color={latticeGold} metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* Tier 2: Mid Tower Shaft */}
      <group position={[0, 8.5, 0]}>
        <mesh position={[0, 4.2, 0]} castShadow>
          <cylinderGeometry args={[2.8, 5.0, 8.4, 4, 1, true]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={towerColor} roughness={0.8} flatShading />
        </mesh>
        {/* Tier 2 Observation Platform */}
        <mesh position={[0, 8.5, 0]} castShadow>
          <boxGeometry args={[4.6, 0.38, 4.6]} />
          <meshStandardMaterial color={latticeGold} metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* Tier 3: Top Pillar Shaft & Spire */}
      <group position={[0, 17.3, 0]}>
        <mesh position={[0, 5.5, 0]} castShadow>
          <cylinderGeometry args={[0.9, 2.5, 11, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={towerColor} roughness={0.75} flatShading />
        </mesh>
        {/* Pinnacle Dome & Golden Light Beacon */}
        <mesh position={[0, 11.5, 0]}>
          <cylinderGeometry args={[0.15, 0.65, 2.2, 8]} />
          <meshStandardMaterial
            color={latticeGold}
            emissive={isNight ? beaconGlow : '#ffffff'}
            emissiveIntensity={isNight ? 2.5 : 0.6}
            metalness={0.9}
          />
        </mesh>
        {/* Rotating Searchlight Beacon at Night */}
        {isNight && (
          <group ref={beaconRef} position={[0, 12, 0]}>
            <mesh position={[8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[2.6, 16, 8, 1, true]} />
              <meshBasicMaterial
                color="#fef08a"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )}

        {/* Twinkling Golden Champagne Sparkler Lights */}
        {isNight && (
          <pointLight
            position={[0, 8, 0]}
            color="#fef08a"
            intensity={2.8}
            distance={16}
            decay={1.6}
          />
        )}
      </group>
    </group>
  );
}

// ============================================================================
// 2. HAUSSMANN RESIDENTIAL BOULEVARD (Solidly Anchored on Boulevard Sidewalk!)
// ============================================================================
function HaussmannBoulevard({ position = [-8.5, 0, 4.5], isNight, onInteractiveClick }) {
  const limestone = isNight ? '#1e2638' : '#fdfaf6';
  const zincRoof = isNight ? '#101726' : '#576574';
  const windowColor = isNight ? '#fef08a' : '#93c5fd';
  const balconyIron = '#1e293b';

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playBell();
        if (onInteractiveClick) onInteractiveClick('haussmann');
      }}
      cursor="pointer"
    >
      {/* Stone Boulevard Sidewalk Base */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[8.8, 0.4, 6.2]} />
        <meshStandardMaterial color={isNight ? '#1a2233' : '#e2e8f0'} roughness={0.85} />
      </mesh>

      {/* Main 3-Story Haussmann Limestone Facade */}
      <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.2, 4.4, 5.4]} />
        <meshStandardMaterial color={limestone} roughness={0.8} />
      </mesh>

      {/* Ground Floor Boutique / Patisserie Display Windows */}
      {[-2.6, 0, 2.6].map((wx, i) => (
        <group key={i} position={[wx, 1.4, 2.73]}>
          <mesh>
            <planeGeometry args={[1.6, 1.8]} />
            <meshStandardMaterial
              color={isNight ? '#fef08a' : '#ffffff'}
              emissive={isNight ? '#fbbf24' : '#000000'}
              emissiveIntensity={isNight ? 1.2 : 0}
              roughness={0.2}
            />
          </mesh>
          {/* Wooden Arch Frame */}
          <mesh position={[0, 0.95, 0.02]}>
            <boxGeometry args={[1.7, 0.1, 0.05]} />
            <meshStandardMaterial color="#472a1e" />
          </mesh>
        </group>
      ))}

      {/* Second Floor French Balcony (Continuous Wrought Iron Railing) */}
      <mesh position={[0, 2.6, 2.8]}>
        <boxGeometry args={[7.8, 0.35, 0.2]} />
        <meshStandardMaterial color={balconyIron} metalness={0.85} roughness={0.3} />
      </mesh>
      {[-2.6, 0, 2.6].map((wx, i) => (
        <mesh key={i} position={[wx, 3.2, 2.73]}>
          <planeGeometry args={[1.2, 1.4]} />
          <meshStandardMaterial
            color={windowColor}
            emissive={isNight ? '#fef08a' : '#000000'}
            emissiveIntensity={isNight ? 0.9 : 0}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Mansard Roof (Curved French Zinc Eaves) */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[8.4, 1.6, 5.6]} />
        <meshStandardMaterial color={zincRoof} roughness={0.7} flatShading />
      </mesh>
      {/* Mansard Top Cap */}
      <mesh position={[0, 6.4, 0]}>
        <boxGeometry args={[7.4, 0.3, 4.6]} />
        <meshStandardMaterial color={balconyIron} roughness={0.6} />
      </mesh>

      {/* Attic Dormer Windows (Lucarnes) */}
      {[-2.2, 0, 2.2].map((wx, i) => (
        <group key={i} position={[wx, 5.5, 2.82]}>
          <mesh>
            <boxGeometry args={[0.9, 1.1, 0.35]} />
            <meshStandardMaterial color={limestone} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <planeGeometry args={[0.65, 0.75]} />
            <meshBasicMaterial color={isNight ? '#fef08a' : '#93c5fd'} />
          </mesh>
        </group>
      ))}

      {/* Warm Ambient Shopfront Glow at Night */}
      {isNight && (
        <pointLight position={[0, 1.8, 3.5]} color="#fef08a" intensity={2.0} distance={8} decay={1.6} />
      )}
    </group>
  );
}

// ============================================================================
// 3. RIVER SEINE & PONT DES ARTS LOVE-LOCK BRIDGE WITH SAILING BATEAU-MOUCHE
// ============================================================================
function SeineRiverAndPontDesArts({ isNight, onInteractiveClick }) {
  const waterColor = isNight ? '#0c2340' : '#38bdf8';
  const woodDeck = isNight ? '#261c14' : '#85583f';
  const boatRef = useRef();

  useFrame((state) => {
    if (boatRef.current) {
      const t = state.clock.elapsedTime * 0.35;
      boatRef.current.position.z = Math.sin(t) * 7.5;
      boatRef.current.position.x = 2.4 + Math.cos(t * 0.5) * 0.3;
      boatRef.current.rotation.y = Math.sin(t) > 0 ? 0 : Math.PI;
    }
  });

  return (
    <group>
      {/* River Seine Water Canal Bed */}
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

      {/* River Stone Quays (Rive Gauche & Rive Droite Stone Edges) */}
      <mesh position={[-0.95, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.45, 28.5]} />
        <meshStandardMaterial color={isNight ? '#1e293b' : '#cbd5e1'} roughness={0.8} />
      </mesh>
      <mesh position={[5.95, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.35, 0.45, 28.5]} />
        <meshStandardMaterial color={isNight ? '#1e293b' : '#cbd5e1'} roughness={0.8} />
      </mesh>

      {/* Sailing Paris River Cruise Boat (Bateau-Mouche) */}
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
        {/* Hull */}
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.45, 4.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Red Hull Stripe */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[1.65, 0.1, 4.25]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Glass Cabin */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 2.6]} />
          <meshStandardMaterial
            color={isNight ? '#fef08a' : '#bfdbfe'}
            emissive={isNight ? '#fbbf24' : '#000000'}
            emissiveIntensity={isNight ? 1.2 : 0}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* French Tricolor Mini Flag */}
        <mesh position={[0, 0.7, -1.8]}>
          <boxGeometry args={[0.04, 0.35, 0.5]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
      </group>

      {/* Pont des Arts Love-Lock Bridge */}
      <group
        position={[2.5, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          SoundEngine.playHeartChime();
          if (onInteractiveClick) onInteractiveClick('lovelock');
        }}
        cursor="pointer"
      >
        {/* Arched Stone Piers in Water */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.8, 0.8, 1.4]} />
          <meshStandardMaterial color={isNight ? '#1e293b' : '#cbd5e1'} roughness={0.85} />
        </mesh>
        {/* Wooden Deckwalk */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.16, 2.6]} />
          <meshStandardMaterial color={woodDeck} roughness={0.7} />
        </mesh>
        {/* Green Cast-Iron Guard Rails */}
        {[-1.25, 1.25].map((rz, rIdx) => (
          <group key={rIdx} position={[0, 0.95, rz]}>
            <mesh>
              <boxGeometry args={[7.2, 0.45, 0.08]} />
              <meshStandardMaterial color="#166534" metalness={0.7} roughness={0.4} />
            </mesh>
            {/* Colorful Padlocks (Padlocks on the Wire Mesh) */}
            {[-2.8, -1.8, -0.8, 0.2, 1.2, 2.2].map((px, pIdx) => (
              <mesh key={pIdx} position={[px, -0.05, rz > 0 ? 0.06 : -0.06]}>
                <boxGeometry args={[0.15, 0.18, 0.08]} />
                <meshStandardMaterial
                  color={['#dc2626', '#d4af37', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][pIdx % 6]}
                  metalness={0.85}
                  roughness={0.25}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 4. CAFÉ DE PARIS (Sidewalk Bistro with Striped Awning & Tables)
// ============================================================================
function CafeDeParis({ position = [8.5, 0, -3.5], isNight, onInteractiveClick }) {
  const awningRed = '#dc2626';
  const tableMetal = isNight ? '#334155' : '#1e293b';

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        SoundEngine.playBell();
        if (onInteractiveClick) onInteractiveClick('cafe');
      }}
      cursor="pointer"
    >
      {/* Bistro Paved Terrace */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[7.5, 0.3, 6.5]} />
        <meshStandardMaterial color={isNight ? '#1e2638' : '#e2e8f0'} roughness={0.85} />
      </mesh>

      {/* Café Wall Facade */}
      <mesh position={[0, 2.2, -2.8]} castShadow>
        <boxGeometry args={[7.2, 3.8, 0.6]} />
        <meshStandardMaterial color={isNight ? '#251710' : '#573322'} roughness={0.8} />
      </mesh>

      {/* French Script Signboard: CAFÉ DE PARIS */}
      <mesh position={[0, 3.4, -2.48]}>
        <boxGeometry args={[4.2, 0.65, 0.08]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0, 3.4, -2.42]}>
        <planeGeometry args={[3.8, 0.45]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Parisian Striped Canvas Awning (Red & White Stripes) */}
      <mesh position={[0, 2.7, -1.4]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[6.8, 0.08, 2.5]} />
        <meshStandardMaterial color={awningRed} roughness={0.6} />
      </mesh>

      {/* Outdoor Bistro Round Tables & Wicker Chairs */}
      {[
        { x: -2.0, z: 0.8 },
        { x: 1.6, z: 0.8 },
        { x: -0.2, z: 1.8 }
      ].map((tbl, tIdx) => (
        <group key={tIdx} position={[tbl.x, 0.3, tbl.z]}>
          {/* Table Pedestal */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.22, 0.9, 8]} />
            <meshStandardMaterial color={tableMetal} metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Round Marble Table Top */}
          <mesh position={[0, 0.92, 0]} castShadow>
            <cylinderGeometry args={[0.65, 0.65, 0.06, 16]} />
            <meshStandardMaterial color={isNight ? '#cbd5e1' : '#ffffff'} roughness={0.3} />
          </mesh>
          {/* Little Espresso Cup */}
          <mesh position={[0.15, 0.98, 0.1]}>
            <cylinderGeometry args={[0.07, 0.05, 0.09, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* Chairs */}
          {[-0.8, 0.8].map((cx, cIdx) => (
            <group key={cIdx} position={[cx, 0, 0]}>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.06, 8]} />
                <meshStandardMaterial color="#b45309" roughness={0.8} />
              </mesh>
              <mesh position={[cx > 0 ? 0.22 : -0.22, 0.55, 0]}>
                <boxGeometry args={[0.06, 0.55, 0.45]} />
                <meshStandardMaterial color="#b45309" roughness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Potted Boxwood Topiary Spheres */}
      {[-3.2, 3.2].map((px, i) => (
        <group key={i} position={[px, 0.3, 2.2]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.25, 0.6, 8]} />
            <meshStandardMaterial color="#d97706" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <sphereGeometry args={[0.45, 10, 10]} />
            <meshStandardMaterial color="#15803d" roughness={0.65} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 5. PARISIAN STREET GAS LAMPS (Interactive Click to Toggle Light!)
// ============================================================================
function ParisStreetLamp({ position = [0, 0, 0], scale = 1, isNight }) {
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
      {/* Ornate Fluted Cast-Iron Base */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.28, 0.7, 8]} />
        <meshStandardMaterial color="#17202a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Tall Lamp Pole */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 2.2, 8]} />
        <meshStandardMaterial color="#17202a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Glass Lantern Head */}
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
      {/* Dark Iron Lantern Roof & Finial */}
      <mesh position={[0, 3.48, 0]} castShadow>
        <coneGeometry args={[0.42, 0.28, 6]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 3.68, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Golden Gas Light Glow */}
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
// 6. ROMANTIC HOT AIR BALLOONS IN DAYTIME SKY (Montgolfière)
// ============================================================================
function ParisHotAirBalloons({ isNight }) {
  const balloon1 = useRef();
  const balloon2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.2;
    if (balloon1.current) {
      balloon1.current.position.y = 18 + Math.sin(t * 1.5) * 1.2;
      balloon1.current.position.x = -16 + Math.cos(t) * 2.5;
    }
    if (balloon2.current) {
      balloon2.current.position.y = 22 + Math.cos(t * 1.2) * 1.4;
      balloon2.current.position.x = 18 + Math.sin(t * 0.8) * 3.0;
    }
  });

  if (isNight) return null; // Only float in the beautiful sunny daytime sky

  return (
    <group>
      {/* Balloon 1: Red & Gold Striped */}
      <group ref={balloon1} position={[-16, 18, -18]}>
        <mesh castShadow>
          <sphereGeometry args={[2.2, 16, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
        <mesh position={[0, -2.4, 0]}>
          <boxGeometry args={[0.65, 0.5, 0.65]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
      </group>

      {/* Balloon 2: Blue & Yellow */}
      <group ref={balloon2} position={[18, 22, -12]}>
        <mesh castShadow>
          <sphereGeometry args={[1.8, 16, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.6} />
        </mesh>
        <mesh position={[0, -2.0, 0]}>
          <boxGeometry args={[0.55, 0.45, 0.55]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 7. DRIFTING RED ROSE PETALS
// ============================================================================
function FallingRosePetals({ count = 52, isNight }) {
  const petalsRef = useRef();
  const petalData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 28,
      y: Math.random() * 8 + 0.5,
      z: (Math.random() - 0.5) * 28,
      speedY: 0.012 + Math.random() * 0.02,
      speedRot: 0.02 + Math.random() * 0.03,
      sway: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      scale: 0.09 + Math.random() * 0.06,
    }));
  }, [count]);

  useFrame((state) => {
    if (petalsRef.current) {
      const t = state.clock.elapsedTime;
      petalsRef.current.children.forEach((child, i) => {
        const p = petalData[i];
        p.y -= p.speedY;
        if (p.y < 0.05) {
          p.y = 8;
          p.x = (Math.random() - 0.5) * 28;
          p.z = (Math.random() - 0.5) * 28;
        }
        child.position.set(
          p.x + Math.sin(t * p.sway + p.phase) * 0.6,
          p.y,
          p.z + Math.cos(t * p.sway + p.phase) * 0.6
        );
        child.rotation.x += p.speedRot;
        child.rotation.y += p.speedRot * 0.8;
      });
    }
  });

  return (
    <group ref={petalsRef}>
      {petalData.map((p, idx) => (
        <mesh key={idx} scale={p.scale}>
          <planeGeometry args={[1, 1.4]} />
          <meshBasicMaterial
            color={isNight ? '#e11d48' : '#be123c'}
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
// 8. MAIN PARIS BIOME ASSEMBLY (Expanded, Grounded & Interactive!)
// ============================================================================
export function ParisBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const groundColor = isNight ? '#161e2e' : '#FAF7F2';
  const goldTrim = '#d4af37';
  const curbColor = isNight ? '#0f172a' : '#574230';

  // Paris Flagstone Promenade lines
  const promenadePlanks = useMemo(() => [-12, -9, -6, -3, 0, 3, 6, 9, 12], []);

  return (
    <group>
      {/* 1. Hot Air Balloons in Sunny Daytime Sky */}
      <ParisHotAirBalloons isNight={isNight} />

      {/* 2. Expanded Solid Ground Strata Base (30 x 30 Size!) */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[31.6, 1.6, 31.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#8c6d48'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Leaf Contour Ribbon */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[31.8, 0.08, 31.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Main Interactive Promenade Ground Platform (Expanded 30 x 30 Area!) */}
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

      {/* Parisian Cobblestone Paving Lines */}
      {promenadePlanks.map((z, idx) => (
        <mesh key={idx} position={[8.5, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[11, 0.12]} />
          <meshBasicMaterial
            color={isNight ? '#38bdf8' : '#c4b5a0'}
            transparent
            opacity={isNight ? 0.25 : 0.6}
          />
        </mesh>
      ))}

      {/* Carved Parisian Curbs & Perimeter Rails */}
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

      {/* 4. Eiffel Tower on Champ-de-Mars Terrace (Firmly Grounded on Island!) */}
      <EiffelTowerArchitecture position={[-9.2, 0, -9.2]} isNight={isNight} />

      {/* 5. Haussmann Residential Boulevard (Solidly Grounded on Island!) */}
      <HaussmannBoulevard position={[-9.2, 0, 4.8]} isNight={isNight} />

      {/* 6. River Seine & Pont des Arts Love-Lock Bridge with Cruising Bateau-Mouche */}
      <SeineRiverAndPontDesArts isNight={isNight} />

      {/* 7. Café de Paris (Sidewalk Bistro) */}
      <CafeDeParis position={[8.5, 0, -4.5]} isNight={isNight} />

      {/* 8. Interactive Parisian Cast-Iron Street Gas Lamps */}
      <ParisStreetLamp position={[6.8, 0, 9.8]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[13.2, 0, 9.8]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[6.8, 0, -11.2]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[13.2, 0, -11.2]} scale={0.95} isNight={isNight} />
      <ParisStreetLamp position={[-3.8, 0, 11.2]} scale={0.9} isNight={isNight} />

      {/* 9. Romantic Chestnut & Rose Garden Area */}
      <group position={[8.5, 0, 6.5]}>
        {/* Tree Trunk */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.35, 2.8, 8]} />
          <meshStandardMaterial color="#452a1b" roughness={0.85} flatShading />
        </mesh>
        {/* Lush Green Canopy */}
        <mesh position={[0, 3.2, 0]} castShadow>
          <dodecahedronGeometry args={[1.7, 1]} />
          <meshStandardMaterial color={isNight ? '#166534' : '#22c55e'} roughness={0.65} flatShading />
        </mesh>
        {/* Potted Rose Bed */}
        <mesh position={[0, 0.15, 0]} receiveShadow>
          <cylinderGeometry args={[1.4, 1.5, 0.3, 12]} />
          <meshStandardMaterial color={isNight ? '#1e293b' : '#cbd5e1'} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.15, 12]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
        {/* Red Roses in Flower Bed */}
        {[-0.6, 0, 0.6].map((rx, idx) => (
          <mesh key={idx} position={[rx, 0.5, (idx % 2) * 0.4]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* 10. Falling Red Rose Petals Rain */}
      <FallingRosePetals count={52} isNight={isNight} />
    </group>
  );
}
