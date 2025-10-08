'use client';

import { useState } from 'react';
import { GameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';

interface ImprovedInventoryProps {
  inventory: GameState['inventory'];
  onAddToCauldron: (ingredientId: string) => boolean;
}

export default function ImprovedInventory({ inventory, onAddToCauldron }: ImprovedInventoryProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const handleAddIngredient = (ingredientId: string) => {
    const success = onAddToCauldron(ingredientId);
    if (success) {
      // Add some visual feedback
      const button = document.getElementById(`ingredient-${ingredientId}`);
      if (button) {
        button.classList.add('animate-pulse');
        setTimeout(() => button.classList.remove('animate-pulse'), 300);
      }
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-600 to-gray-700';
      case 'uncommon': return 'from-green-600 to-green-700';
      case 'rare': return 'from-blue-600 to-blue-700';
      case 'legendary': return 'from-purple-600 to-purple-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400';
      case 'uncommon': return 'border-green-400';
      case 'rare': return 'border-blue-400';
      case 'legendary': return 'border-purple-400 shadow-purple-400/50';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-500 rounded-xl p-6 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-3 animate-bounce">🎒</div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Alchemists Satchel
        </h2>
        <p className="text-gray-400 text-sm mt-1">Click ingredients to add them to your cauldron</p>
      </div>

      {/* Ingredient Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(INGREDIENTS).map(([ingredientId, ingredient]) => {
          const amount = inventory[ingredientId] || 0;
          const isAvailable = amount > 0;
          const isSelected = selectedIngredient === ingredientId;

          return (
            <div
              key={ingredientId}
              className="relative group"
              onMouseEnter={() => setSelectedIngredient(ingredientId)}
              onMouseLeave={() => setSelectedIngredient(null)}
            >
              <button
                id={`ingredient-${ingredientId}`}
                onClick={() => handleAddIngredient(ingredientId)}
                disabled={!isAvailable}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-300 text-center relative overflow-hidden
                  ${isAvailable 
                    ? `${getRarityBorder(ingredient.rarity)} bg-gradient-to-br ${getRarityGradient(ingredient.rarity)} hover:scale-105 hover:shadow-lg cursor-pointer transform` 
                    : 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
                  }
                  ${isSelected ? 'ring-2 ring-white/50' : ''}
                  ${ingredient.rarity === 'legendary' ? 'shadow-lg' : ''}
                `}
              >
                {/* Rarity Glow Effect */}
                {ingredient.rarity === 'legendary' && isAvailable && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse rounded-xl" />
                )}
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                    {ingredient.icon}
                  </div>
                  <div className="text-sm font-bold text-white mb-1 truncate">
                    {ingredient.name}
                  </div>
                  <div className={`text-lg font-bold mb-2 ${isAvailable ? 'text-green-300' : 'text-gray-500'}`}>
                    {amount}
                  </div>
                  
                  {/* Rarity Badge */}
                  <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                    ingredient.rarity === 'common' ? 'bg-gray-700 text-gray-200' :
                    ingredient.rarity === 'uncommon' ? 'bg-green-700 text-green-200' :
                    ingredient.rarity === 'rare' ? 'bg-blue-700 text-blue-200' :
                    'bg-purple-700 text-purple-200'
                  }`}>
                    {ingredient.rarity.toUpperCase()}
                  </div>
                </div>

                {/* Add Effect */}
                {isAvailable && (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">+</span>
                  </div>
                )}
              </button>

              {/* Tooltip */}
              {isSelected && (
                <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-xl min-w-[200px]">
                  <div className="text-sm text-white font-medium mb-1">{ingredient.name}</div>
                  <div className="text-xs text-gray-400 mb-2">{ingredient.description}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Available: {amount}</span>
                    <div className={`text-xs px-2 py-1 rounded ${
                      ingredient.rarity === 'common' ? 'bg-gray-600 text-gray-200' :
                      ingredient.rarity === 'uncommon' ? 'bg-green-600 text-green-200' :
                      ingredient.rarity === 'rare' ? 'bg-blue-600 text-blue-200' :
                      'bg-purple-600 text-purple-200'
                    }`}>
                      {ingredient.rarity}
                    </div>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <div className="text-sm text-gray-400 text-center">
          Total Ingredients: {Object.values(inventory).reduce((sum, amount) => sum + amount, 0)}
        </div>
      </div>
    </div>
  );
}