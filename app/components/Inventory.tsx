'use client';

import { GameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';

interface InventoryProps {
  inventory: GameState['inventory'];
  onAddToCauldron: (ingredientId: string) => boolean;
}

export default function Inventory({ inventory, onAddToCauldron }: InventoryProps) {
  const handleAddIngredient = (ingredientId: string) => {
    const success = onAddToCauldron(ingredientId);
    if (!success) {
      // Could add a toast notification here later
      console.log(`No ${INGREDIENTS[ingredientId].name} left in inventory!`);
    }
  };

  return (
    <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">🎒</div>
        <h2 className="text-2xl font-bold text-green-300">Ingredient Inventory</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(INGREDIENTS).map(([ingredientId, ingredient]) => {
          const amount = inventory[ingredientId] || 0;
          const isAvailable = amount > 0;

          return (
            <button
              key={ingredientId}
              onClick={() => handleAddIngredient(ingredientId)}
              disabled={!isAvailable}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${isAvailable 
                  ? 'border-green-400 bg-gray-800 hover:bg-gray-700 hover:border-green-300 cursor-pointer' 
                  : 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
                }
              `}
            >
              <div className="text-3xl mb-2">{ingredient.icon}</div>
              <div className="text-sm font-medium text-white mb-1">{ingredient.name}</div>
              <div className={`text-xs ${isAvailable ? 'text-green-300' : 'text-gray-500'}`}>
                {amount} available
              </div>
              <div className={`text-xs mt-1 px-2 py-1 rounded ${
                ingredient.rarity === 'common' ? 'bg-gray-600 text-gray-200' :
                ingredient.rarity === 'uncommon' ? 'bg-green-600 text-green-200' :
                ingredient.rarity === 'rare' ? 'bg-blue-600 text-blue-200' :
                'bg-purple-600 text-purple-200'
              }`}>
                {ingredient.rarity}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}