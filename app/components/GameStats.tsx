'use client';

import { GameState } from '../types/game';

interface GameStatsProps {
  gameState: GameState;
  onResetGame: () => void;
}

export default function GameStats({ gameState, onResetGame }: GameStatsProps) {
  const totalDiscovered = gameState.discoveredRecipes.length;
  const specialPotionsDiscovered = gameState.discoveredRecipes.filter(id => 
    id.includes('godMode') || id.includes('debugPotion') || id.includes('timeWarp') || 
    id.includes('nullPointer') || id.includes('infiniteLoop')
  ).length;

  return (
    <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-6">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">📊</div>
        <h2 className="text-2xl font-bold text-blue-300">Alchemist Stats</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{gameState.totalPotionsCrafted}</div>
          <div className="text-sm text-gray-400">Total Potions Brewed</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{totalDiscovered}</div>
          <div className="text-sm text-gray-400">Recipes Discovered</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">{specialPotionsDiscovered}</div>
          <div className="text-sm text-gray-400">Special Potions Found</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {Math.round((totalDiscovered / 15) * 100)}%
          </div>
          <div className="text-sm text-gray-400">Collection Complete</div>
        </div>
      </div>

      {/* Top Crafted Potions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-3">Most Brewed Potions</h3>
        <div className="space-y-2">
          {Object.entries(gameState.craftedPotions)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([recipeId, count]) => (
              <div key={recipeId} className="flex justify-between items-center bg-gray-800 rounded px-3 py-2">
                <span className="text-white text-sm">{recipeId.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-blue-400 font-medium">{count}</span>
              </div>
            ))}
          {Object.keys(gameState.craftedPotions).length === 0 && (
            <div className="text-gray-400 text-sm text-center py-4">
              No potions brewed yet!
            </div>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            onResetGame();
          }
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
      >
        🔄 Reset Game
      </button>
    </div>
  );
}