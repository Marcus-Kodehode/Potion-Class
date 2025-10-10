import { Ingredient } from '../types/game';

export const INGREDIENTS: { [key: string]: Ingredient } = {
  herbs: {
    id: 'herbs',
    name: 'Mystical Herbs',
    description: 'Common healing herbs found in dark forests',
    rarity: 'common',
    icon: '🌿',
    image: '/assets/ingredients/herbs.webp',
    color: '#10b981' // emerald-500
  },
  berries: {
    id: 'berries',
    name: 'Shadow Berries',
    description: 'Dark berries with mysterious properties',
    rarity: 'common',
    icon: '🫐',
    image: '/assets/ingredients/berries.webp',
    color: '#6366f1' // indigo-500
  },
  mushrooms: {
    id: 'mushrooms',
    name: 'Gloom Mushrooms',
    description: 'Fungi that grow in the deepest caves',
    rarity: 'uncommon',
    icon: '🍄',
    image: '/assets/ingredients/mushrooms.webp',
    color: '#8b5cf6' // violet-500
  },
  water: {
    id: 'water',
    name: 'Moonwell Water',
    description: 'Pure water blessed by moonlight',
    rarity: 'common',
    icon: '💧',
    image: '/assets/ingredients/water.webp',
    color: '#06b6d4' // cyan-500
  },
  flowers: {
    id: 'flowers',
    name: 'Nightshade Petals',
    description: 'Beautiful but dangerous flower petals',
    rarity: 'uncommon',
    icon: '🌸',
    image: '/assets/ingredients/flower.webp',
    color: '#ec4899' // pink-500
  },
  crystals: {
    id: 'crystals',
    name: 'Void Crystals',
    description: 'Crystals that absorb light itself',
    rarity: 'rare',
    icon: '💎',
    image: '/assets/ingredients/crystals.webp',
    color: '#3b82f6' // blue-500
  },
  bones: {
    id: 'bones',
    name: 'Ancient Bones',
    description: 'Bones from creatures long forgotten',
    rarity: 'rare',
    icon: '🦴',
    image: '/assets/ingredients/bones.webp',
    color: '#6b7280' // gray-500
  },
  scales: {
    id: 'scales',
    name: 'Dragon Scales',
    description: 'Scales from the last dragons',
    rarity: 'legendary',
    icon: '🐉',
    image: '/assets/ingredients/scales.webp',
    color: '#f59e0b' // amber-500
  }
};
