import React from 'react';
import { FloatingIsland } from '../FloatingIsland';
import { CyberCityBiome } from './CyberCityBiome';
import { MountainBiome } from './MountainBiome';
import { FantasyBiome } from './FantasyBiome';
import { ZenBiome } from './ZenBiome';

export function WorldEnvironment({
  biome = 'floating_island',
  artStyle = 'lowpoly',
  timeMode = 'night',
  onGroundTap
}) {
  switch (biome) {
    case 'cyber_city':
      return <CyberCityBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'mountain_summit':
      return <MountainBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'fantasy_realm':
      return <FantasyBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'zen_garden':
      return <ZenBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'floating_island':
    default:
      return <FloatingIsland timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
  }
}
