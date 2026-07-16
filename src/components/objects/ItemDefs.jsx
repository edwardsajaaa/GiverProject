import React from 'react';
import { 
  IconFlower, IconTree, IconRock, IconLamp, IconCrystal, 
  IconMushroom, IconPyramid, IconFountain, IconTower, 
  IconCactus, IconCampfire, IconMonument 
} from '../icons/SvgIcons';

export const ITEM_DEFS = {
  flower: { label: 'Bunga', icon: <IconFlower size={26} />, color: '#ff6b9d' },
  tree: { label: 'Pohon', icon: <IconTree size={26} />, color: '#4caf50' },
  rock: { label: 'Batu', icon: <IconRock size={26} />, color: '#888' },
  lamp: { label: 'Lampu', icon: <IconLamp size={26} />, color: '#ffd54f' },
  crystal: { label: 'Kristal', icon: <IconCrystal size={26} />, color: '#c084fc' },
  mushroom: { label: 'Jamur', icon: <IconMushroom size={26} />, color: '#f472b6' },
  pyramid: { label: 'Piramida', icon: <IconPyramid size={26} />, color: '#fbbf24' },
  fountain: { label: 'Air Mancur', icon: <IconFountain size={26} />, color: '#38bdf8' },
  tower: { label: 'Menara', icon: <IconTower size={26} />, color: '#94a3b8' },
  cactus: { label: 'Kaktus', icon: <IconCactus size={26} />, color: '#22c55e' },
  campfire: { label: 'Api Unggun', icon: <IconCampfire size={26} />, color: '#f97316' },
  monument: { label: 'Monumen', icon: <IconMonument size={26} />, color: '#e2e8f0' },
};
