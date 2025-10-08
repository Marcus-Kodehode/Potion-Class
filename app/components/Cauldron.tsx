'use client';

import { GameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';

interface CauldronProps {
  cauldron: GameState['cauldron'];
  onRemoveIngredient: (ingredientId: string) => void;
  onClearCauldron: () => void;
}

export default function Cauldron({ cauldron, onRemoveIngredient, onClearCauldron }: CauldronProps) {
  const cauldronItems = Object.entries(cauldron).filter(([, amount]) => amount > 0);
  const isEmpty = cauldronItems.length === 0;

  return (
    <div className="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 min-h-[300px] relative overflow-hidden">
      {/* Cauldron Visual */}
      <div className="text-center mb-4">
        <div className="text-6xl mb-2">🪄</div>
        <h2 className="text-2xl font-bold text-purple-300">Mystical Cauldron</h2>
      </div>

      {/* Bubbling Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {!isEmpty && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-600/20 to-transparent animate-pulse" />
        )}
      </div>

      {/* Contents */}
      <div className="relative z-10">
        {isEmpty ? (
          <div className="text-center text-gray-400 py-8">
            <p className="text-lg">The cauldron awaits your ingredients...</p>
            <p className="text-sm mt-2">Add ingredients to start brewing!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-200 mb-3">Current Mixture:</h3>
            {cauldronItems.map(([ingredientId, amount]) => {
              const ingredient = INGREDIENTS[ingredientId];
              return (
                <div 
                  key={ingredientId}
                  className="flex items-center justify-between bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => onRemoveIngredient(ingredientId)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{ingredient.icon}</span>
                    <div>
                      <span className="text-white font-medium">{ingredient.name}</span>
                      <span className="text-purple-300 ml-2">x{amount}</span>
                    </div>
                  </div>
                  <button 
                    className="text-red-400 hover:text-red-300 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveIngredient(ingredientId);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            
            <button
              onClick={onClearCauldron}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Clear Cauldron
            </button>
          </div>
        )}
      </div>
    </div>
  );
}