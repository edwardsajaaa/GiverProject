import React from 'react';
import { ParisBiome } from './ParisBiome';
import { KyotoBiome } from './KyotoBiome';
import { LondonBiome } from './LondonBiome';
import { VeniceBiome } from './VeniceBiome';
import { MiniatureTokyo } from './MiniatureTokyo';
import { FloatingIsland } from '../FloatingIsland';
import { CyberCityBiome } from './CyberCityBiome';
import { FantasyBiome } from './FantasyBiome';
import { MountainBiome } from './MountainBiome';
import { ZenBiome } from './ZenBiome';

export function WorldEnvironment({
  biome = 'paris_romantique',
  artStyle = 'lowpoly',
  timeMode = 'night',
  onGroundTap
}) {
  switch (biome) {
    case 'floating_sanctuary':
      return <FloatingIsland timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'tokyo_miniature':
      return <MiniatureTokyo timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'kyoto_blossom':
      return <KyotoBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'zen_garden':
      return <ZenBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'london_romance':
      return <LondonBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'venice_serenade':
      return <VeniceBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'cyber_city':
      return <CyberCityBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'fantasy_realm':
      return <FantasyBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'mountain_peaks':
      return <MountainBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'paris_romantique':
    default:
      return <ParisBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
  }
}
