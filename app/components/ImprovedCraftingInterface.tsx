"use client";

import { useState, useEffect } from "react";
import { CraftResult } from "../types/game";

interface ImprovedCraftingInterfaceProps {
  onCraftPotion: () => CraftResult;
  disabled: boolean;
}

export default function ImprovedCraftingInterface({
  onCraftPotion,
  disabled,
}: ImprovedCraftingInterfaceProps) {
  const [lastResult, setLastResult] = useState<CraftResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [brewingStage, setBrewingStage] = useState(0);

  const handleCraft = () => {
    if (disabled) return;

    setIsAnimating(true);
    setBrewingStage(0);
    setLastResult(null);

    // Multi-stage brewing animation
    const stages = [
      { text: "🔥 Heating cauldron...", duration: 800 },
      { text: "⚗️ Mixing ingredients...", duration: 600 },
      { text: "✨ Channeling magic...", duration: 700 },
      { text: "🌟 Finalizing brew...", duration: 500 },
    ];

    let currentStage = 0;
    const nextStage = () => {
      if (currentStage < stages.length) {
        setBrewingStage(currentStage);
        setTimeout(() => {
          currentStage++;
          nextStage();
        }, stages[currentStage].duration);
      } else {
        // Brewing complete
        const result = onCraftPotion();
        setLastResult(result);
        setIsAnimating(false);
        setBrewingStage(0);
      }
    };

    nextStage();
  };

  const getBrewingText = () => {
    const stages = [
      "🔥 Heating cauldron...",
      "⚗️ Mixing ingredients...",
      "✨ Channeling magic...",
      "🌟 Finalizing brew...",
    ];
    return stages[brewingStage] || "🔥 Brew Potion 🔥";
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-orange-500 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Magical Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-900/20" />

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="text-5xl mb-3 relative">
          ⚗️
          {isAnimating && (
            <div className="absolute -top-2 -right-2 text-2xl animate-spin">
              🌟
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Brewing Station
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {disabled
            ? "Add ingredients to begin brewing"
            : "Ready to create magical potions"}
        </p>
      </div>

      {/* Craft Button */}
      <div className="text-center mb-6 relative z-10">
        <button
          onClick={handleCraft}
          disabled={disabled || isAnimating}
          className={`
            relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform overflow-hidden
            ${
              disabled
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : isAnimating
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse scale-105 shadow-lg shadow-orange-500/50"
                : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/50"
            }
          `}
        >
          {/* Button Background Effect */}
          {!disabled && !isAnimating && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
          )}

          {/* Button Text */}
          <span className="relative z-10">
            {isAnimating ? getBrewingText() : "🔥 Brew Potion 🔥"}
          </span>

          {/* Brewing Progress Bar */}
          {isAnimating && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-yellow-400 animate-pulse"
              style={{ width: `${((brewingStage + 1) / 4) * 100}%` }}
            />
          )}
        </button>

        {disabled && (
          <p className="text-sm text-gray-400 mt-3 animate-bounce">
            ⬆️ Add ingredients to the cauldron first! ⬆️
          </p>
        )}
      </div>

      {/* Result Display */}
      {lastResult && (
        <div
          className={`
          relative z-10 p-6 rounded-xl border-2 animate-fade-in transform transition-all duration-500
          ${
            lastResult.success
              ? "border-green-500 bg-gradient-to-br from-green-900/30 to-emerald-900/30 shadow-lg shadow-green-500/20"
              : "border-red-500 bg-gradient-to-br from-red-900/30 to-pink-900/30 shadow-lg shadow-red-500/20"
          }
        `}
        >
          {/* Success/Failure Icon */}
          <div className="text-center mb-4">
            <div
              className={`text-6xl mb-3 ${
                lastResult.success ? "animate-bounce" : "animate-pulse"
              }`}
            >
              {lastResult.success ? "✨" : "💥"}
            </div>

            {/* Result Message */}
            <p
              className={`font-bold text-lg mb-3 ${
                lastResult.success ? "text-green-300" : "text-red-300"
              }`}
            >
              {lastResult.message}
            </p>
          </div>

          {/* Potion Details */}
          {lastResult.recipe && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-xl text-white">
                  {lastResult.recipe.name}
                </h4>
                {lastResult.isNewDiscovery && (
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    NEW!
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-sm mb-3">
                {lastResult.recipe.description}
              </p>

              {lastResult.isNewDiscovery && (
                <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📖</span>
                    <span className="text-purple-300 font-medium text-sm">
                      Recipe added to your Grimoire!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Celebration Particles for Success */}
          {lastResult.success && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-2 left-4 text-yellow-400 animate-ping">
                ⭐
              </div>
              <div className="absolute top-4 right-6 text-green-400 animate-ping animation-delay-300">
                ✨
              </div>
              <div className="absolute bottom-4 left-8 text-blue-400 animate-ping animation-delay-600">
                💫
              </div>
              <div className="absolute bottom-2 right-4 text-purple-400 animate-ping animation-delay-900">
                🌟
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ambient Magical Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 text-orange-400 animate-ping opacity-20">
          🔥
        </div>
        <div className="absolute bottom-16 left-8 text-red-400 animate-ping opacity-15 animation-delay-2000">
          ⚡
        </div>
        <div className="absolute top-1/2 left-4 text-yellow-400 animate-ping opacity-10 animation-delay-4000">
          ✨
        </div>
      </div>
    </div>
  );
}
