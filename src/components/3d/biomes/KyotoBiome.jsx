import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

// ============================================================================
// 1. DISTANT MOUNT FUJI & ROMANTIC MOON HORIZON (Without jagged spiky cones!)
// ============================================================================
function RomanticFujiHorizon({ isNight }) {
  const moonColor = isNight ? '#fef08a' : '#f43f5e';
  const slopeColor = isNight ? '#131b2e' : '#475569';
  const snowCapColor = isNight ? '#e0e7ff' : '#FAF7F2';
  const goldTrim = '#d4af37';

  return (
    <group position={[-44, -1.8, -44]}>
      {/* Romantic Golden-Silver Full Moon Disc */}
      <mesh position={[-6, 36, -6]}>
        <circleGeometry args={[13, 36]} />
        <meshBasicMaterial
          color={moonColor}
          transparent
          opacity={isNight ? 0.92 : 0.9}
        />
      </mesh>
      {/* Moon Gold Halo Rim */}
      <mesh position={[-6, 36, -5.95]}>
        <ringGeometry args={[12.9, 13.3, 36]} />
        <meshBasicMaterial color={goldTrim} transparent opacity={0.65} />
      </mesh>

      {/* Mount Fuji Majestic Slope */}
      <mesh position={[0, 16, 0]} castShadow={false}>
        <coneGeometry args={[24, 34, 28, 1, true]} />
        <meshStandardMaterial
          color={slopeColor}
          roughness={0.9}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Gold Contour Ridge on Fuji */}
      <mesh position={[0, 24.5, 0]}>
        <ringGeometry args={[10.2, 10.45, 28]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={goldTrim} roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Mount Fuji Handcrafted Snow Crown */}
      <mesh position={[0, 28.5, 0]}>
        <coneGeometry args={[10.4, 11, 28]} />
        <meshStandardMaterial
          color={snowCapColor}
          roughness={0.65}
          metalness={0.1}
          emissive={isNight ? '#818cf8' : '#ffffff'}
          emissiveIntensity={isNight ? 0.28 : 0.05}
          flatShading
        />
      </mesh>

      {/* Soft Mountain Mist Waves (Gentle curved hills, not spiky cones) */}
      {[-24, -8, 8, 24].map((offsetX, idx) => (
        <mesh key={idx} position={[offsetX, 4 + (idx % 2) * 2, -10 + (idx % 3) * 4]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[12, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial
            color={isNight ? '#0b1120' : '#64748b'}
            roughness={0.95}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 2. YASAKA FIVE-TIERED PAGODA (The Iconic Landmark of Kyoto)
// ============================================================================
function YasakaPagoda({ position = [-7.5, 0, -7.5], isNight }) {
  const woodDark = isNight ? '#241611' : '#452b1e';
  const tileRoof = isNight ? '#172033' : '#334155';
  const goldSpire = '#d4af37';
  const amberGlow = '#f59e0b';

  return (
    <group position={position}>
      {/* Stone Foundation Plinth */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.9, 4.8]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#78716c'} roughness={0.9} />
      </mesh>

      {/* Golden Uplight Illuminating the Pagoda Tiers at Night */}
      {isNight && (
        <pointLight
          position={[0, 2.5, 0]}
          color={amberGlow}
          intensity={3.2}
          distance={15}
          decay={1.6}
        />
      )}

      {/* Tier 1 */}
      <group position={[0, 0.9, 0]}>
        {/* Core Sanctuary Room */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[3.2, 2.2, 3.2]} />
          <meshStandardMaterial color={woodDark} roughness={0.8} />
        </mesh>
        {/* Lattice Door Paneling */}
        <mesh position={[0, 1.0, 1.62]}>
          <planeGeometry args={[1.4, 1.8]} />
          <meshStandardMaterial
            color={isNight ? '#fbbf24' : '#fef3c7'}
            emissive={isNight ? '#fbbf24' : '#000000'}
            emissiveIntensity={isNight ? 0.7 : 0}
            roughness={0.5}
          />
        </mesh>
        {/* Roof 1 */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <coneGeometry args={[3.2, 0.8, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[4.6, 0.15, 4.6]} />
          <meshStandardMaterial color={goldSpire} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Tier 2 */}
      <group position={[0, 3.3, 0]}>
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[2.7, 1.8, 2.7]} />
          <meshStandardMaterial color={woodDark} roughness={0.8} />
        </mesh>
        {/* Roof 2 */}
        <mesh position={[0, 2.0, 0]} castShadow>
          <coneGeometry args={[2.8, 0.75, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 1.85, 0]}>
          <boxGeometry args={[4.0, 0.14, 4.0]} />
          <meshStandardMaterial color={goldSpire} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Tier 3 */}
      <group position={[0, 5.3, 0]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2.2, 1.6, 2.2]} />
          <meshStandardMaterial color={woodDark} roughness={0.8} />
        </mesh>
        {/* Roof 3 */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <coneGeometry args={[2.4, 0.7, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 1.65, 0]}>
          <boxGeometry args={[3.5, 0.13, 3.5]} />
          <meshStandardMaterial color={goldSpire} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Tier 4 */}
      <group position={[0, 7.1, 0]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[1.8, 1.4, 1.8]} />
          <meshStandardMaterial color={woodDark} roughness={0.8} />
        </mesh>
        {/* Roof 4 */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <coneGeometry args={[2.0, 0.65, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[3.0, 0.12, 3.0]} />
          <meshStandardMaterial color={goldSpire} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Tier 5 (Top Level) */}
      <group position={[0, 8.7, 0]}>
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[1.4, 1.3, 1.4]} />
          <meshStandardMaterial color={woodDark} roughness={0.8} />
        </mesh>
        {/* Master Top Roof */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <coneGeometry args={[1.7, 0.75, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[2.6, 0.14, 2.6]} />
          <meshStandardMaterial color={goldSpire} metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Sōrin Spire (Bronze Spire with Sacred Rings & Jewel) */}
      <group position={[0, 10.4, 0]}>
        {/* Base Robe */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.22, 0.45, 0.8, 8]} />
          <meshStandardMaterial color={goldSpire} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Spire Rod */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 2.2, 8]} />
          <meshStandardMaterial color={goldSpire} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* 9 Sacred Nine Rings (Kururin) */}
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[0, 1.0 + i * 0.18, 0]}>
            <torusGeometry args={[0.26 - i * 0.015, 0.04, 8, 16]} />
            <meshStandardMaterial color={goldSpire} metalness={0.95} roughness={0.2} />
          </mesh>
        ))}
        {/* Sacred Flame Jewel (Hōju) */}
        <mesh position={[0, 2.6, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial
            color={goldSpire}
            emissive={isNight ? amberGlow : '#ffffff'}
            emissiveIntensity={isNight ? 1.5 : 0.4}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 3. GION TRADITIONAL TRADITIONAL MACHIYA TOWNHOUSE (Warm Glowing Shoji & Chochin)
// ============================================================================
function KyotoMachiyaHouse({ position = [-7.6, 0, 1.2], rotationY = 0, isNight }) {
  const woodFrame = isNight ? '#25150f' : '#452b1e';
  const tileRoof = isNight ? '#162033' : '#334155';
  const warmShoji = isNight ? '#fef08a' : '#fffbeb';
  const shojiEmissive = isNight ? '#fbbf24' : '#000000';

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Stone Foundation Beam */}
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <boxGeometry args={[5.6, 0.36, 4.2]} />
        <meshStandardMaterial color={isNight ? '#334155' : '#78716c'} roughness={0.9} />
      </mesh>

      {/* Ground Floor Main Body */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 2.1, 3.8]} />
        <meshStandardMaterial color={woodFrame} roughness={0.85} />
      </mesh>

      {/* Front Sliding Shoji Screen with Wooden Lattice (Koshi) */}
      <mesh position={[0.6, 1.35, 1.92]}>
        <planeGeometry args={[2.8, 1.7]} />
        <meshStandardMaterial
          color={warmShoji}
          emissive={shojiEmissive}
          emissiveIntensity={isNight ? 1.2 : 0}
          roughness={0.4}
        />
      </mesh>
      {/* Lattice Slats on the Shoji Window */}
      {[-1.0, -0.5, 0, 0.5, 1.0].map((slatX, sIdx) => (
        <mesh key={sIdx} position={[0.6 + slatX, 1.35, 1.93]}>
          <boxGeometry args={[0.04, 1.7, 0.02]} />
          <meshStandardMaterial color={woodFrame} roughness={0.8} />
        </mesh>
      ))}

      {/* Deep Indigo Entrance Noren Fabric Curtain */}
      <mesh position={[-1.4, 1.6, 1.93]}>
        <planeGeometry args={[1.2, 1.0]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
      {/* Noren White Heart Crest */}
      <mesh position={[-1.4, 1.5, 1.94]}>
        <circleGeometry args={[0.18, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Mid Eaves Tile Roof between 1st & 2nd Floor */}
      <mesh position={[0, 2.55, 0.4]} rotation={[0.25, 0, 0]} castShadow>
        <boxGeometry args={[5.6, 0.16, 4.4]} />
        <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
      </mesh>

      {/* Second Floor Floor / Balcony Area */}
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 1.9, 3.4]} />
        <meshStandardMaterial color={woodFrame} roughness={0.85} />
      </mesh>

      {/* Second Floor Glowing Shoji Window */}
      <mesh position={[0, 3.5, 1.72]}>
        <planeGeometry args={[2.4, 1.3]} />
        <meshStandardMaterial
          color={warmShoji}
          emissive={shojiEmissive}
          emissiveIntensity={isNight ? 1.0 : 0}
          roughness={0.4}
        />
      </mesh>

      {/* Main Rooftop Overhang (Kawara Clay Tiles) */}
      <mesh position={[0, 4.65, 0]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[5.6, 0.22, 4.4]} />
        <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 4.65, 0]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[5.6, 0.22, 4.4]} />
        <meshStandardMaterial color={tileRoof} roughness={0.7} flatShading />
      </mesh>
      {/* Rooftop Ridge Beam */}
      <mesh position={[0, 5.25, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 5.8, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color={tileRoof} roughness={0.6} />
      </mesh>

      {/* Hanging Crimson Paper Lanterns (Aka-Chochin) with Warm Point Lights */}
      {[
        { x: -1.8, y: 2.2, z: 2.2 },
        { x: 1.8, y: 2.2, z: 2.2 }
      ].map((lan, lIdx) => (
        <group key={lIdx} position={[lan.x, lan.y, lan.z]}>
          {/* Black Mounting Bracket & Cord */}
          <mesh position={[0, 0.25, -0.2]}>
            <boxGeometry args={[0.04, 0.04, 0.4]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          {/* Crimson Oval Lantern Body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.26, 0.65, 12]} />
            <meshStandardMaterial
              color="#dc2626"
              emissive={isNight ? '#ef4444' : '#7f1d1d'}
              emissiveIntensity={isNight ? 1.6 : 0.2}
              roughness={0.4}
            />
          </mesh>
          {/* Top/Bottom Black Rings */}
          <mesh position={[0, 0.33, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.06, 12]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0, -0.33, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.06, 12]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          {/* Warm Amber Pointlight Casting Glow onto Street */}
          {isNight && (
            <pointLight
              color="#fb923c"
              intensity={1.8}
              distance={6.5}
              decay={1.5}
            />
          )}
        </group>
      ))}

      {/* Interior Amber Ambient Glow Spilling Out */}
      {isNight && (
        <pointLight
          position={[0.6, 1.5, 0.5]}
          color="#fef08a"
          intensity={2.2}
          distance={7.5}
          decay={1.6}
        />
      )}
    </group>
  );
}

// ============================================================================
// 4. FUSHIMI INARI VERMILION TORII GATE (Grand Entrance Portal)
// ============================================================================
function VermilionToriiGate({ position = [0, 0, 8.8], isNight }) {
  const vermilion = '#dc2626';
  const vermilionDark = isNight ? '#991b1b' : '#b91c1c';
  const blackBase = '#111827';
  const goldPlaque = '#d4af37';

  return (
    <group position={position}>
      {/* Left Pillar */}
      <group position={[-2.4, 0, 0]}>
        {/* Stone Pedestal Base (Kamebara) */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.44, 0.6, 12]} />
          <meshStandardMaterial color={blackBase} roughness={0.7} />
        </mesh>
        {/* Main Column */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.32, 4.2, 12]} />
          <meshStandardMaterial color={vermilion} roughness={0.65} />
        </mesh>
      </group>

      {/* Right Pillar */}
      <group position={[2.4, 0, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.44, 0.6, 12]} />
          <meshStandardMaterial color={blackBase} roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.4, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.32, 4.2, 12]} />
          <meshStandardMaterial color={vermilion} roughness={0.65} />
        </mesh>
      </group>

      {/* Lower Cross Tie Beam (Nuki) */}
      <mesh position={[0, 3.4, 0]} castShadow>
        <boxGeometry args={[6.2, 0.28, 0.32]} />
        <meshStandardMaterial color={vermilionDark} roughness={0.65} />
      </mesh>

      {/* Upper Main Lintel Beam (Shimaki & Kasagi) with Curved Sweep */}
      <mesh position={[0, 4.4, 0]} castShadow>
        <boxGeometry args={[7.2, 0.42, 0.52]} />
        <meshStandardMaterial color={vermilion} roughness={0.6} />
      </mesh>
      {/* Black Copper Top Roof Strip with Upturned Eaves */}
      <mesh position={[0, 4.65, 0]}>
        <boxGeometry args={[7.4, 0.12, 0.62]} />
        <meshStandardMaterial color={blackBase} roughness={0.5} />
      </mesh>

      {/* Central Dedication Plaque (Gaku) with Golden Heart */}
      <group position={[0, 3.9, 0]}>
        <mesh>
          <boxGeometry args={[0.65, 0.85, 0.08]} />
          <meshStandardMaterial color={blackBase} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[0.55, 0.75]} />
          <meshStandardMaterial color={goldPlaque} metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Flanking Welcoming Lantern Lights at Night */}
      {isNight && (
        <>
          <pointLight position={[-2.4, 3.6, 0.6]} color="#f59e0b" intensity={1.5} distance={6} />
          <pointLight position={[2.4, 3.6, 0.6]} color="#f59e0b" intensity={1.5} distance={6} />
        </>
      )}
    </group>
  );
}

// ============================================================================
// 5. TAIKO-BASHI CURVED MOON BRIDGE & KOI STREAM WITH FLOATING LANTERNS
// ============================================================================
function TaikoBashiBridgeAndCanal({ isNight }) {
  const waterColor = isNight ? '#0c2340' : '#38bdf8';
  const bridgeRed = '#dc2626';
  const goldCaps = '#d4af37';
  const lanternsRef = useRef();

  // Floating paper water lanterns (Toro-nagashi)
  const floatingLanterns = useMemo(() => [
    { x: 3.2, z: -1.2, phase: 0 },
    { x: 4.8, z: 0.8, phase: 1.8 },
    { x: 3.6, z: 2.6, phase: 3.5 },
    { x: 5.2, z: 4.2, phase: 5.1 },
  ], []);

  useFrame((state) => {
    if (lanternsRef.current) {
      const t = state.clock.elapsedTime;
      lanternsRef.current.children.forEach((child, i) => {
        const item = floatingLanterns[i];
        child.position.y = 0.02 + Math.sin(t * 1.5 + item.phase) * 0.03;
        child.rotation.y = Math.sin(t * 0.5 + item.phase) * 0.15;
      });
    }
  });

  return (
    <group>
      {/* Reflective Water Canal Bed (Runs diagonally across the right side) */}
      <mesh position={[4.2, -0.05, 1.5]} rotation={[-Math.PI / 2, 0, 0.2]} receiveShadow>
        <planeGeometry args={[4.5, 20]} />
        <meshStandardMaterial
          color={waterColor}
          metalness={0.88}
          roughness={0.12}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Floating Paper Water Lanterns (Toro-Nagashi) with Flickering Candle Glow */}
      <group ref={lanternsRef}>
        {floatingLanterns.map((lan, idx) => (
          <group key={idx} position={[lan.x, 0.04, lan.z]}>
            {/* Wooden Floating Base Raft */}
            <mesh position={[0, 0.03, 0]}>
              <boxGeometry args={[0.55, 0.06, 0.55]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            {/* White/Cream Paper Box Lantern */}
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.42, 0.38, 0.42]} />
              <meshStandardMaterial
                color="#fef3c7"
                emissive={isNight ? '#f59e0b' : '#fed7aa'}
                emissiveIntensity={isNight ? 1.6 : 0.5}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Candle Core Flame */}
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#ffedd5" />
            </mesh>
            {/* Water Reflection Pointlight */}
            {isNight && (
              <pointLight
                color="#fbbf24"
                intensity={1.2}
                distance={3.8}
                decay={1.8}
              />
            )}
          </group>
        ))}
      </group>

      {/* Taiko-bashi Curved Vermilion Wooden Bridge */}
      <group position={[4.0, 0, 1.5]} rotation={[0, 0.2, 0]}>
        {/* Curved Planks Deckway */}
        {Array.from({ length: 9 }).map((_, i) => {
          const ratio = (i - 4) / 4; // -1 to 1
          const archY = Math.cos(ratio * Math.PI * 0.45) * 0.55 + 0.1;
          const posZ = ratio * 2.1;
          return (
            <mesh key={i} position={[0, archY, posZ]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 0.12, 0.46]} />
              <meshStandardMaterial color={isNight ? '#991b1b' : bridgeRed} roughness={0.7} />
            </mesh>
          );
        })}

        {/* Curved Handrails (Left & Right) */}
        {[-1.1, 1.1].map((railX, rIdx) => (
          <group key={rIdx} position={[railX, 0, 0]}>
            {/* Railing Posts with Gold Giboshi Caps */}
            {[-1.9, -0.9, 0, 0.9, 1.9].map((postZ, pIdx) => {
              const r = postZ / 1.9;
              const postY = Math.cos(r * Math.PI * 0.45) * 0.55 + 0.5;
              return (
                <group key={pIdx} position={[0, postY, postZ]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
                    <meshStandardMaterial color={bridgeRed} roughness={0.65} />
                  </mesh>
                  {/* Gold Giboshi Onion Cap */}
                  <mesh position={[0, 0.42, 0]}>
                    <sphereGeometry args={[0.09, 10, 10]} />
                    <meshStandardMaterial color={goldCaps} metalness={0.9} roughness={0.2} />
                  </mesh>
                </group>
              );
            })}
          </group>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 6. ILLUMINATED NIGHT SAKURA (Yozakura - Maruyama Park Style)
// ============================================================================
function IlluminatedSakuraTree({ position = [7.2, 0, -7.2], scale = 1, rotationY = 0, isNight }) {
  const trunkColor = isNight ? '#251710' : '#452b1e';
  const pinkCore = isNight ? '#f472b6' : '#fbcfe8';
  const pinkBlossom = isNight ? '#ec4899' : '#f472b6';
  const pinkHighlight = isNight ? '#fda4af' : '#ffe4e6';

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Gnarled Old Trunk */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.55, 2.8, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} flatShading />
      </mesh>
      {/* Branch 1 */}
      <mesh position={[-0.6, 2.8, 0.4]} rotation={[0.4, 0.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 1.8, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      {/* Branch 2 */}
      <mesh position={[0.7, 2.6, -0.3]} rotation={[-0.3, -0.4, -0.6]} castShadow>
        <cylinderGeometry args={[0.16, 0.26, 1.9, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>

      {/* Cloud-like Cherry Blossom Foliage Masses */}
      <group position={[0, 3.8, 0]}>
        {/* Core Mass */}
        <mesh castShadow>
          <dodecahedronGeometry args={[2.0, 1]} />
          <meshStandardMaterial
            color={pinkCore}
            emissive={isNight ? '#ec4899' : '#000000'}
            emissiveIntensity={isNight ? 0.35 : 0}
            roughness={0.7}
            flatShading
          />
        </mesh>
        {/* Left Side Cluster */}
        <mesh position={[-1.4, 0.2, 0.6]} castShadow>
          <dodecahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color={pinkBlossom}
            emissive={isNight ? '#f472b6' : '#000000'}
            emissiveIntensity={isNight ? 0.4 : 0}
            roughness={0.7}
            flatShading
          />
        </mesh>
        {/* Right Side Cluster */}
        <mesh position={[1.5, -0.1, -0.5]} castShadow>
          <dodecahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color={pinkBlossom}
            emissive={isNight ? '#f472b6' : '#000000'}
            emissiveIntensity={isNight ? 0.4 : 0}
            roughness={0.7}
            flatShading
          />
        </mesh>
        {/* Top Highlight Canopy */}
        <mesh position={[0.2, 1.2, 0.1]} castShadow>
          <dodecahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial
            color={pinkHighlight}
            emissive={isNight ? '#fda4af' : '#000000'}
            emissiveIntensity={isNight ? 0.5 : 0}
            roughness={0.65}
            flatShading
          />
        </mesh>
      </group>

      {/* Dedicated Yozakura Night Uplighting Spotlight */}
      {isNight && (
        <pointLight
          position={[0, 0.6, 0]}
          color="#f472b6"
          intensity={2.8}
          distance={10}
          decay={1.6}
        />
      )}

      {/* Scattered Fallen Petals Ring at Tree Base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 2.8, 16]} />
        <meshBasicMaterial
          color={isNight ? '#be185d' : '#fbcfe8'}
          transparent
          opacity={isNight ? 0.5 : 0.75}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// 7. TRADITIONAL KYOTO STONE LANTERNS (Toro & Andon)
// ============================================================================
function KyotoStoneLantern({ position = [0, 0, 0], scale = 1, isNight }) {
  const stone = isNight ? '#334155' : '#78716c';
  const warmAmber = '#f59e0b';

  return (
    <group position={position} scale={scale}>
      {/* Stone Pedestal Base */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.3, 0.7]} />
        <meshStandardMaterial color={stone} roughness={0.9} />
      </mesh>
      {/* Column Pillar */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.7, 8]} />
        <meshStandardMaterial color={stone} roughness={0.85} />
      </mesh>
      {/* Mid Platform Shelf */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.5, 0.35, 0.14, 6]} />
        <meshStandardMaterial color={stone} roughness={0.85} />
      </mesh>
      {/* Light Chamber with Carved Apertures */}
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.42, 6]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive={isNight ? warmAmber : '#fed7aa'}
          emissiveIntensity={isNight ? 1.8 : 0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Umbrella Roof with Upturned Corners (Kasa) */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <coneGeometry args={[0.65, 0.32, 6]} />
        <meshStandardMaterial color={stone} roughness={0.8} />
      </mesh>
      {/* Sacred Top Jewel (Hoju) */}
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={stone} roughness={0.7} />
      </mesh>

      {/* Pointlight Casting Warm Romantic Circle of Light */}
      {isNight && (
        <pointLight
          position={[0, 1.35, 0]}
          color={warmAmber}
          intensity={1.6}
          distance={5.5}
          decay={1.6}
        />
      )}
    </group>
  );
}

// ============================================================================
// 8. ARASHIYAMA BAMBOO PATH (Glowing Slender Bamboo Culms)
// ============================================================================
function ArashiyamaBambooPath({ position = [0, 0, 0], isNight }) {
  const bambooCulms = useMemo(() => [
    { x: -0.6, z: -0.4, h: 4.8 },
    { x: 0.1, z: -0.5, h: 5.4 },
    { x: 0.7, z: -0.3, h: 4.6 },
    { x: -0.4, z: 0.2, h: 5.1 },
    { x: 0.3, z: 0.3, h: 5.6 },
    { x: 0.8, z: 0.1, h: 4.9 },
  ], []);

  const greenBamboo = isNight ? '#15803d' : '#22c55e';

  return (
    <group position={position}>
      {bambooCulms.map((b, idx) => (
        <group key={idx} position={[b.x, 0, b.z]}>
          {/* Bamboo Stalk with Joint Rings */}
          <mesh position={[0, b.h / 2, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.08, b.h, 8]} />
            <meshStandardMaterial color={greenBamboo} roughness={0.5} />
          </mesh>
          {/* Nodes */}
          {[1, 2, 3, 4].map((nodeIdx) => (
            <mesh key={nodeIdx} position={[0, nodeIdx * 1.1, 0]}>
              <torusGeometry args={[0.085, 0.02, 6, 12]} />
              <meshStandardMaterial color="#84cc16" roughness={0.4} />
            </mesh>
          ))}
          {/* Bamboo Leaves at the top */}
          <mesh position={[0.15, b.h - 0.2, 0.1]} rotation={[0.4, 0.6, 0.3]}>
            <coneGeometry args={[0.22, 0.9, 4]} />
            <meshStandardMaterial color="#4ade80" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Gentle Green/Amber Night Glow on Bamboo */}
      {isNight && (
        <pointLight
          position={[0, 1.2, 0]}
          color="#86efac"
          intensity={1.2}
          distance={4.8}
          decay={1.8}
        />
      )}
    </group>
  );
}

// ============================================================================
// 9. ANIMATED FALLING SAKURA PETALS RAIN (Swirling in the Kyoto Breeze)
// ============================================================================
function KyotoSakuraPetals({ count = 56, isNight }) {
  const petalsRef = useRef();
  const petalData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 22,
      y: Math.random() * 8 + 0.5,
      z: (Math.random() - 0.5) * 22,
      speedY: 0.014 + Math.random() * 0.024,
      speedRot: 0.02 + Math.random() * 0.04,
      sway: 0.4 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      scale: 0.08 + Math.random() * 0.06,
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
          p.x = (Math.random() - 0.5) * 22;
          p.z = (Math.random() - 0.5) * 22;
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
    <group ref={petalsRef}>
      {petalData.map((p, idx) => (
        <mesh key={idx} scale={p.scale}>
          <planeGeometry args={[1, 1.35]} />
          <meshBasicMaterial
            color={isNight ? '#f472b6' : '#fbcfe8'}
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
// 10. MAIN KYOTO BLOSSOM ROMANCE BIOME ASSEMBLY
// ============================================================================
export function KyotoBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  // Warm atmospheric indigo-slate ground at night, not pitch black!
  const groundColor = isNight ? '#1e2638' : '#FAF7F2';
  const stoneBorder = isNight ? '#121826' : '#452b1e';
  const goldTrim = '#d4af37';

  // Traditional Kyoto Flagstone Pathway (Ishi-tatami) coordinates
  const flagstones = [
    { x: 0, z: 8.0, sx: 2.2, sz: 1.4 },
    { x: 0.2, z: 6.4, sx: 2.0, sz: 1.3 },
    { x: 0.8, z: 4.8, sx: 2.1, sz: 1.4 },
    { x: 1.8, z: 3.4, sx: 1.9, sz: 1.3 },
    { x: 3.2, z: 2.2, sx: 2.2, sz: 1.4 },
    { x: -1.2, z: 4.2, sx: 1.8, sz: 1.3 },
    { x: -2.8, z: 3.4, sx: 2.0, sz: 1.4 },
    { x: -4.5, z: 2.6, sx: 2.2, sz: 1.4 },
    { x: -3.8, z: -1.0, sx: 2.1, sz: 1.4 },
    { x: -4.8, z: -3.4, sx: 2.2, sz: 1.4 },
  ];

  return (
    <group>
      {/* 1. Distant Serene Mount Fuji Horizon under Romantic Moon */}
      <RomanticFujiHorizon isNight={isNight} />

      {/* 2. Kraft Mineral Pedestal Base */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[23.6, 1.6, 23.6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0f19' : '#8c6d48'}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Gold Trim Foil Ribbon */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[23.8, 0.08, 23.8]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Main Interactive Kyoto Garden Ground Platform */}
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
          roughness={0.88}
          metalness={0.04}
        />
      </mesh>

      {/* Traditional Kyoto Flagstone Pathway (Ishi-tatami) */}
      {flagstones.map((stone, sIdx) => (
        <mesh key={sIdx} position={[stone.x, 0.015, stone.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[stone.sx, stone.sz]} />
          <meshStandardMaterial
            color={isNight ? '#334155' : '#d6d3d1'}
            roughness={0.85}
          />
        </mesh>
      ))}

      {/* Japanese Smoked Cedar Perimeter Edges */}
      <mesh position={[0, 0.04, 11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={stoneBorder} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.04, -11.1]} receiveShadow>
        <boxGeometry args={[22.6, 0.22, 0.45]} />
        <meshStandardMaterial color={stoneBorder} roughness={0.75} />
      </mesh>
      <mesh position={[11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={stoneBorder} roughness={0.75} />
      </mesh>
      <mesh position={[-11.1, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.45, 0.22, 21.8]} />
        <meshStandardMaterial color={stoneBorder} roughness={0.75} />
      </mesh>

      {/* 4. Yasaka Five-Story Pagoda (Majestic Kyoto Silhouette Landmark) */}
      <YasakaPagoda position={[-7.5, 0, -7.5]} isNight={isNight} />

      {/* 5. Gion Traditional Machiya Townhouse with Glowing Shoji & Red Chochin */}
      <KyotoMachiyaHouse position={[-7.6, 0, 1.4]} rotationY={Math.PI / 2} isNight={isNight} />

      {/* 6. Fushimi Inari Vermilion Torii Gate Entrance */}
      <VermilionToriiGate position={[0, 0, 8.8]} isNight={isNight} />

      {/* 7. Taiko-bashi Curved Red Moon Bridge & Koi Canal with Floating Lotus Lanterns */}
      <TaikoBashiBridgeAndCanal isNight={isNight} />

      {/* 8. Yozakura (Illuminated Cherry Blossom Trees at Night) */}
      <IlluminatedSakuraTree position={[7.5, 0, -7.5]} scale={1.25} rotationY={0.6} isNight={isNight} />
      <IlluminatedSakuraTree position={[7.8, 0, 5.8]} scale={1.1} rotationY={-0.8} isNight={isNight} />
      <IlluminatedSakuraTree position={[-1.8, 0, -8.2]} scale={0.95} rotationY={1.2} isNight={isNight} />

      {/* 9. Traditional Kyoto Stone Lanterns (Kasuga Toro) with Warm Candle Hearts */}
      <KyotoStoneLantern position={[-2.8, 0, 8.5]} scale={0.9} isNight={isNight} />
      <KyotoStoneLantern position={[2.8, 0, 8.5]} scale={0.9} isNight={isNight} />
      <KyotoStoneLantern position={[1.8, 0, 3.2]} scale={0.85} isNight={isNight} />
      <KyotoStoneLantern position={[-4.8, 0, -1.2]} scale={0.9} isNight={isNight} />
      <KyotoStoneLantern position={[6.8, 0, -2.8]} scale={0.85} isNight={isNight} />

      {/* 10. Arashiyama Bamboo Grove Walk */}
      <ArashiyamaBambooPath position={[7.4, 0, 1.8]} isNight={isNight} />
      <ArashiyamaBambooPath position={[-3.6, 0, -9.0]} isNight={isNight} />

      {/* 11. Gentle Swirling Sakura Petals Rain */}
      <KyotoSakuraPetals count={56} isNight={isNight} />

      {/* 12. Gentle Ambient Night Romance Light in Kyoto (Hanatoro Lantern Ambiance) */}
      {isNight && (
        <>
          <pointLight
            position={[0, 6, 0]}
            color="#fbcfe8"
            intensity={2.0}
            distance={24}
            decay={1.6}
          />
          <pointLight
            position={[0, 1.8, 2]}
            color="#fed7aa"
            intensity={1.6}
            distance={18}
            decay={1.6}
          />
        </>
      )}
    </group>
  );
}
