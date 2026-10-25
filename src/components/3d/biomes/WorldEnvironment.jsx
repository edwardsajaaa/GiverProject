import React from 'react';
import { ParisBiome } from './ParisBiome';
import { KyotoBiome } from './KyotoBiome';
import { LondonBiome } from './LondonBiome';
import { VeniceBiome } from './VeniceBiome';

export function WorldEnvironment({
  biome = 'paris_romantique',
  artStyle = 'lowpoly',
  timeMode = 'night',
  onGroundTap
}) {
  switch (biome) {
    case 'kyoto_blossom':
    case 'zen_garden':
      return <KyotoBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'london_romance':
      return <LondonBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'venice_serenade':
      return <VeniceBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
    case 'paris_romantique':
    default:
      return <ParisBiome timeMode={timeMode} onGroundTap={onGroundTap} artStyle={artStyle} />;
  }
}
