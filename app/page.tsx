"use client";

import Image from "next/image";
import { useGameState } from "./hooks/useGameState";
import ImprovedCauldron from "./components/ImprovedCauldron";
import ImprovedInventory from "./components/ImprovedInventory";
import ImprovedCraftingInterface from "./components/ImprovedCraftingInterface";
import RecipeBook from "./components/RecipeBook";
import StatsModal from "./components/StatsModal";
import QuizModal from "./components/QuizModal";

export default function Home() {
  const {
    gameState,
    addToCauldron,
    removeFromCauldron,
    clearCauldron,
    craftPotion,
    resetGame,
    addIngredientToInventory,
    recipes,
  } = useGameState();

  const cauldronHasIngredients = Object.values(gameState.cauldron).some(
    (amount) => amount > 0
  );

  return (
    <div className="h-screen overflow-hidden bg-gray-900 text-white relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/assets/images/BG1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="bg-black/40 backdrop-blur-md border-b border-purple-500/50 p-4 flex-shrink-0 shadow-lg shadow-purple-900/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-lg"></div>
                <Image
                  src="/assets/icons/logo.png"
                  alt="Mystic Potion Brewery"
                  width={56}
                  height={56}
                  className="rounded-lg relative z-10 border-2 border-purple-400/50"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-magical text-glow tracking-wide">
                  Mystic Potion Brewery
                </h1>
                <p className="text-slate-300 text-sm mt-1 font-medium tracking-wider">
                  ✨ Code Your Spells • Brew Your Knowledge ✨
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Floating Action Buttons - Top Right */}
        <div className="fixed top-20 md:top-4 right-4 z-50 flex flex-col md:flex-row gap-2">
          <StatsModal gameState={gameState} onResetGame={resetGame} />
          <QuizModal onReward={addIngredientToInventory} />
          <RecipeBook
            recipes={recipes}
            discoveredRecipes={gameState.discoveredRecipes}
            craftedPotions={gameState.craftedPotions}
          />
        </div>

        {/* Main Game Area */}
        <main className="flex-1 overflow-y-auto max-w-7xl mx-auto p-6 w-full">
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
        <footer className="bg-black/30 backdrop-blur-sm border-t border-purple-500/30 p-6 flex-shrink-0">
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
                Developed by{" "}
                <span className="font-semibold text-slate-300">
                  MoBo Developments
                </span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
