'use client';

import Image from 'next/image';
import { useGameState } from './hooks/useGameState';
import ImprovedCauldron from './components/ImprovedCauldron';
import ImprovedInventory from './components/ImprovedInventory';
import ImprovedCraftingInterface from './components/ImprovedCraftingInterface';
import RecipeBook from './components/RecipeBook';
import StatsModal from './components/StatsModal';
import QuizModal from './components/QuizModal';

export default function Home() {
  const {
    gameState,
    addToCauldron,
    removeFromCauldron,
    clearCauldron,
    craftPotion,
    resetGame,
    addIngredientToInventory,
    recipes
  } = useGameState();

  const cauldronHasIngredients = Object.values(gameState.cauldron).some(amount => amount > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🧙‍♂️</span>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mystic Potion Brewery
              </h1>
              <p className="text-gray-400 text-sm">Master the ancient art of digital alchemy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Action Buttons - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <StatsModal 
          gameState={gameState}
          onResetGame={resetGame}
        />
        <QuizModal 
          onReward={addIngredientToInventory}
        />
        <RecipeBook 
          recipes={recipes}
          discoveredRecipes={gameState.discoveredRecipes}
          craftedPotions={gameState.craftedPotions}
        />
      </div>

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inventory */}
          <div>
            <ImprovedInventory 
              inventory={gameState.inventory}
              onAddToCauldron={addToCauldron}
            />
          </div>

          {/* Middle Column - Cauldron */}
          <div>
            <ImprovedCauldron 
              cauldron={gameState.cauldron}
              onRemoveIngredient={removeFromCauldron}
              onClearCauldron={clearCauldron}
            />
          </div>

          {/* Right Column - Crafting */}
          <div>
            <ImprovedCraftingInterface 
              onCraftPotion={craftPotion}
              disabled={!cauldronHasIngredients}
            />
          </div>
        </div>
      </main>

      {/* Footer with Watermark */}
      <footer className="mt-12 bg-black/30 backdrop-blur-sm border-t border-purple-500/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400 mb-4">
            <p className="text-sm">
              🌟 Craft potions, discover secrets, master the mystical arts 🌟
            </p>
            <p className="text-xs mt-2">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
          
          {/* Watermark */}
          <div className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <Image
              src="/assets/icons/MBlogo.png"
              alt="MoBo Developments"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-xs text-slate-400">
              Developed by <span className="font-semibold text-slate-300">MoBo Developments</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
