import { Ingredient } from '../types/game';

export const INGREDIENTS: { [key: string]: Ingredient } = {
  herbs: {
    id: 'herbs',
    name: 'Mystical Herbs',
    description: 'Common healing herbs found in dark forests',
    rarity: 'common',
    icon: '🌿'
  },
  berries: {
    id: 'berries',
    name: 'Shadow Berries',
    description: 'Dark berries with mysterious properties',
    rarity: 'common',
    icon: '🫐'
  },
  mushrooms: {
    id: 'mushrooms',
    name: 'Gloom Mushrooms',
    description: 'Fungi that grow in the deepest caves',
    rarity: 'uncommon',
    icon: '🍄'
  },
  water: {
    id: 'water',
    name: 'Moonwell Water',
    description: 'Pure water blessed by moonlight',
    rarity: 'common',
    icon: '💧'
  },
  flowers: {
    id: 'flowers',
    name: 'Nightshade Petals',
    description: 'Beautiful but dangerous flower petals',
    rarity: 'uncommon',
    icon: '🌸'
  },
  crystals: {
    id: 'crystals',
    name: 'Void Crystals',
    description: 'Crystals that absorb light itself',
    rarity: 'rare',
    icon: '💎'
  },
  bones: {
    id: 'bones',
    name: 'Ancient Bones',
    description: 'Bones from creatures long forgotten',
    rarity: 'rare',
    icon: '🦴'
  },
  scales: {
    id: 'scales',
    name: 'Dragon Scales',
    description: 'Scales from the last dragons',
    rarity: 'legendary',
    icon: '🐉'
  }
};