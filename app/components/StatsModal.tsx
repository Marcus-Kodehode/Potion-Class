"use client";

import { useState } from "react";
import { GameState } from "../types/game";
import { RECIPES } from "../data/recipes";

interface StatsModalProps {
  gameState: GameState;
  onResetGame: () => void;
}

export default function StatsModal({
  gameState,
  onResetGame,
}: StatsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalDiscovered = gameState.discoveredRecipes.length;
  const specialPotionsDiscovered = gameState.discoveredRecipes.filter((id) => {
    const recipe = RECIPES[id];
    return recipe && recipe.type === "special";
  }).length;

  const totalRecipes = Object.keys(RECIPES).length;
  const completionPercentage = Math.round(
    (totalDiscovered / totalRecipes) * 100
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm text-slate-100 p-3 rounded-lg shadow-lg transition-all border border-slate-600/50 hover:border-slate-500/50"
        title="Alchemist Stats"
      >
        <span className="text-xl">📊</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center md:p-4">
      <div className="bg-gray-900 border-2 border-blue-500 md:rounded-lg max-w-2xl w-full h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl font-bold text-white">
              Alchemist Statistics
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 md:max-h-[calc(90vh-80px)]">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-500/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {gameState.totalPotionsCrafted}
              </div>
              <div className="text-sm text-gray-300">Total Potions Brewed</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {totalDiscovered}
              </div>
              <div className="text-sm text-gray-300">Recipes Discovered</div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-500/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">
                {specialPotionsDiscovered}
              </div>
              <div className="text-sm text-gray-300">Special Potions Found</div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {completionPercentage}%
              </div>
              <div className="text-sm text-gray-300">Collection Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm text-blue-400 font-medium">
                {totalDiscovered} / {totalRecipes}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Top Crafted Potions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Most Brewed Potions
            </h3>
            <div className="space-y-2">
              {Object.entries(gameState.craftedPotions)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([recipeId, count], index) => {
                  const recipe = RECIPES[recipeId];
                  return (
                    <div
                      key={recipeId}
                      className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-3 border border-gray-700"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                          ${
                            index === 0
                              ? "bg-yellow-600 text-yellow-100"
                              : index === 1
                              ? "bg-gray-400 text-gray-900"
                              : index === 2
                              ? "bg-amber-700 text-amber-100"
                              : "bg-gray-600 text-gray-300"
                          }
                        `}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {recipe?.name || recipeId}
                          </div>
                          <div className="text-xs text-gray-400">
                            {recipe?.type || "unknown"}
                          </div>
                        </div>
                      </div>
                      <div className="text-blue-400 font-bold text-lg">
                        {count}
                      </div>
                    </div>
                  );
                })}
              {Object.keys(gameState.craftedPotions).length === 0 && (
                <div className="text-gray-400 text-sm text-center py-8 bg-gray-800/50 rounded-lg">
                  <div className="text-4xl mb-2">🧪</div>
                  <p>No potions brewed yet!</p>
                  <p className="text-xs mt-1">
                    Start brewing to see your stats here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
              <span className="text-2xl mr-2">🎖️</span>
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <AchievementBadge
                title="First Brew"
                description="Craft your first potion"
                unlocked={gameState.totalPotionsCrafted >= 1}
                icon="🧪"
              />
              <AchievementBadge
                title="Apprentice"
                description="Brew 10 potions"
                unlocked={gameState.totalPotionsCrafted >= 10}
                icon="⚗️"
              />
              <AchievementBadge
                title="Master Alchemist"
                description="Brew 50 potions"
                unlocked={gameState.totalPotionsCrafted >= 50}
                icon="🔮"
              />
              <AchievementBadge
                title="Recipe Hunter"
                description="Discover all standard recipes"
                unlocked={totalDiscovered >= 10}
                icon="📖"
              />
              <AchievementBadge
                title="Secret Seeker"
                description="Discover a special potion"
                unlocked={specialPotionsDiscovered >= 1}
                icon="✨"
              />
              <AchievementBadge
                title="Completionist"
                description="Discover all recipes"
                unlocked={totalDiscovered >= totalRecipes}
                icon="👑"
              />
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to reset all progress? This cannot be undone!"
                  )
                ) {
                  onResetGame();
                  setIsOpen(false);
                }
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
            >
              🔄 Reset All Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({
  title,
  description,
  unlocked,
  icon,
}: {
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}) {
  return (
    <div
      className={`
      p-3 rounded-lg border transition-all duration-300
      ${
        unlocked
          ? "bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-500/50"
          : "bg-gray-800/50 border-gray-700 opacity-50"
      }
    `}
    >
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-2xl">{unlocked ? icon : "🔒"}</span>
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-bold truncate ${
              unlocked ? "text-yellow-300" : "text-gray-500"
            }`}
          >
            {title}
          </div>
        </div>
      </div>
      <div
        className={`text-xs ${unlocked ? "text-gray-300" : "text-gray-600"}`}
      >
        {description}
      </div>
    </div>
  );
}
