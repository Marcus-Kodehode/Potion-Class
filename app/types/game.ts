export interface Ingredient {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  icon: string; // emoji for now
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: { [ingredientId: string]: number };
  type: 'standard' | 'special';
  discovered: boolean;
  hint?: string;
}

export interface GameState {
  inventory: { [ingredientId: string]: number };
  cauldron: { [ingredientId: string]: number };
  discoveredRecipes: string[];
  craftedPotions: { [recipeId: string]: number };
  totalPotionsCrafted: number;
}

export interface CraftResult {
  success: boolean;
  recipe?: Recipe;
  message: string;
  isNewDiscovery?: boolean;
}