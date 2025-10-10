import { Recipe } from "../types/game";

export const RECIPES: { [key: string]: Recipe } = {
  // Standard Potions
  healingPotion: {
    id: "healingPotion",
    name: "Potion of Stack Overflow",
    description: "Heals all your bugs and runtime errors",
    ingredients: { herbs: 2, berries: 1, mushrooms: 1 },
    type: "standard",
    discovered: true,
    hint: "A basic healing potion - your starting recipe"
  },
  manaPotion: {
    id: "manaPotion",
    name: "Potion of RAM Expansion",
    description: "Boosts your mental processing power beyond 8GB",
    ingredients: { water: 2, flowers: 1, crystals: 1 },
    type: "standard",
    discovered: false,
    hint: "Combine water with rare crystals and delicate flowers"
  },
  strengthPotion: {
    id: "strengthPotion",
    name: "Potion of Mechanical Keyboards",
    description: "Your fingers become unstoppable typing machines",
    ingredients: { bones: 1, mushrooms: 2, herbs: 1 },
    type: "standard",
    discovered: false,
    hint: "Ancient bones mixed with fungi and herbs grant strength"
  },
  speedPotion: {
    id: "speedPotion",
    name: "Potion of SSD Performance",
    description: "Makes you faster than NVMe storage",
    ingredients: { flowers: 2, water: 1, berries: 2 },
    type: "standard",
    discovered: false,
    hint: "Light ingredients - flowers, water, and berries for speed"
  },
  invisibilityPotion: {
    id: "invisibilityPotion",
    name: "Potion of Incognito Mode",
    description: "Become invisible like your browsing history",
    ingredients: { crystals: 1, flowers: 1, water: 2 },
    type: "standard",
    discovered: false,
    hint: "Clarity and purity - crystals and water with a touch of beauty"
  },
  fireResistance: {
    id: "fireResistance",
    name: "Potion of Firewall Protection",
    description: "Protects against flame wars and hot takes",
    ingredients: { scales: 1, water: 3, herbs: 1 },
    type: "standard",
    discovered: false,
    hint: "Dragon scales cooled with water and herbs"
  },
  nightVision: {
    id: "nightVision",
    name: "Potion of Dark Mode",
    description: "See clearly in the darkness like a true developer",
    ingredients: { mushrooms: 2, crystals: 1, bones: 1 },
    type: "standard",
    discovered: false,
    hint: "Things that thrive in darkness - fungi, crystals, and bones"
  },
  levitation: {
    id: "levitation",
    name: "Potion of Cloud Computing",
    description: "Defies gravity like your server costs",
    ingredients: { flowers: 3, crystals: 2 },
    type: "standard",
    discovered: false,
    hint: "Light and airy - only flowers and crystals"
  },
  poisonResistance: {
    id: "poisonResistance",
    name: "Potion of Antivirus",
    description: "Immunity to toxic code and malware",
    ingredients: { herbs: 3, berries: 2, water: 1 },
    type: "standard",
    discovered: false,
    hint: "Natural cleansing - herbs, berries, and pure water"
  },
  luck: {
    id: "luck",
    name: "Potion of RNG Blessing",
    description: "Makes random() always work in your favor",
    ingredients: { berries: 1, flowers: 1, crystals: 1, bones: 1 },
    type: "standard",
    discovered: false,
    hint: "A bit of everything - balance brings fortune"
  },

  // Special Hidden Potions
  godMode: {
    id: "godMode",
    name: "Potion of Sudo Privileges",
    description: "Ultimate admin access to reality itself",
    ingredients: { scales: 2, crystals: 3, bones: 2, herbs: 1 },
    type: "special",
    discovered: false,
    hint: "Combine the rarest ingredients with ancient power",
  },
  debugPotion: {
    id: "debugPotion",
    name: "Potion of Console Logging",
    description: "Reveals all hidden variables in the universe",
    ingredients: { water: 4, crystals: 2, mushrooms: 1 },
    type: "special",
    discovered: false,
    hint: "Pure clarity with a touch of mystery",
  },
  timeWarp: {
    id: "timeWarp",
    name: "Potion of Async/Await",
    description: "Manipulates the flow of time and promises",
    ingredients: { flowers: 4, scales: 1, berries: 3 },
    type: "special",
    discovered: false,
    hint: "Beauty and power transcend time",
  },
  nullPointer: {
    id: "nullPointer",
    name: "Potion of Segmentation Fault",
    description: "A dangerous brew that crashes reality",
    ingredients: { bones: 3, crystals: 1, mushrooms: 3 },
    type: "special",
    discovered: false,
    hint: "Death and void combined with earthly growth",
  },
  infiniteLoop: {
    id: "infiniteLoop",
    name: "Potion of Eternal Recursion",
    description: "A potion that brews itself forever",
    ingredients: { herbs: 5, water: 5, berries: 5 },
    type: "special",
    discovered: false,
    hint: "Perfect balance of the most basic elements",
  },
};