'use client';

import { useState } from 'react';
import { Recipe, GameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';

interface RecipeBookProps {
  recipes: { [key: string]: Recipe };
  discoveredRecipes: string[];
  craftedPotions: GameState['craftedPotions'];
}

export default function RecipeBook({ recipes, discoveredRecipes, craftedPotions }: RecipeBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'standard' | 'special'>('standard');

  const discoveredRecipeObjects = discoveredRecipes.map(id => recipes[id]).filter(Boolean);
  const standardRecipes = discoveredRecipeObjects.filter(recipe => recipe.type === 'standard');
  const specialRecipes = discoveredRecipeObjects.filter(recipe => recipe.type === 'special');

  const undiscoveredSpecialRecipes = Object.values(recipes).filter(
    recipe => recipe.type === 'special' && !discoveredRecipes.includes(recipe.id)
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
      >
        <span className="text-2xl">📖</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-amber-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-amber-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">📖</span>
            <h2 className="text-2xl font-bold text-white">Recipe Grimoire</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('standard')}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeTab === 'standard'
                ? 'bg-gray-800 text-amber-300 border-b-2 border-amber-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Standard Potions ({standardRecipes.length})
          </button>
          <button
            onClick={() => setActiveTab('special')}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeTab === 'special'
                ? 'bg-gray-800 text-purple-300 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Special Potions ({specialRecipes.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'standard' && (
            <div className="space-y-4">
              {standardRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} craftedCount={craftedPotions[recipe.id] || 0} />
              ))}
            </div>
          )}

          {activeTab === 'special' && (
            <div className="space-y-4">
              {specialRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} craftedCount={craftedPotions[recipe.id] || 0} />
              ))}
              
              {undiscoveredSpecialRecipes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Unknown Potions</h3>
                  <div className="space-y-3">
                    {undiscoveredSpecialRecipes.map(recipe => (
                      <div key={recipe.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">❓</span>
                          <span className="text-gray-400 font-medium">Unknown Potion</span>
                        </div>
                        {recipe.hint && (
                          <p className="text-sm text-purple-300 italic">Hint: {recipe.hint}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, craftedCount }: { recipe: Recipe; craftedCount: number }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{recipe.name}</h3>
          <p className="text-sm text-gray-400">{recipe.description}</p>
        </div>
        <div className="text-right">
          <div className={`px-2 py-1 rounded text-xs ${
            recipe.type === 'standard' ? 'bg-blue-600 text-blue-200' : 'bg-purple-600 text-purple-200'
          }`}>
            {recipe.type}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Crafted: {craftedCount}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-300">Required Ingredients:</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(recipe.ingredients).map(([ingredientId, amount]) => {
            const ingredient = INGREDIENTS[ingredientId];
            return (
              <div key={ingredientId} className="flex items-center space-x-1 bg-gray-700 rounded px-2 py-1">
                <span className="text-sm">{ingredient.icon}</span>
                <span className="text-sm text-white">{ingredient.name}</span>
                <span className="text-sm text-gray-400">x{amount}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}