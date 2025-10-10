'use client';

import { useState } from 'react';
import { CraftResult } from '../types/game';

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
      { text: 'Heating cauldron...', duration: 800 },
      { text: 'Mixing ingredients...', duration: 600 },
      { text: 'Channeling magic...', duration: 700 },
      { text: 'Finalizing brew...', duration: 500 },
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
      'Heating cauldron...',
      'Mixing ingredients...',
      'Channeling magic...',
      'Finalizing brew...',
    ];
    return stages[brewingStage] || 'Brew Potion';
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="mb-6 relative z-10">
        <h2 className="text-2xl font-bold text-slate-100 mb-1">
          Brewing Station
        </h2>
        <p className="text-slate-400 text-sm">
          {disabled
            ? 'Add ingredients to begin brewing'
            : 'Ready to create magical potions'}
        </p>
      </div>

      {/* Craft Button */}
      <div className="text-center mb-6 relative z-10">
        <button
          onClick={handleCraft}
          disabled={disabled || isAnimating}
          className={`
            relative px-8 py-4 rounded-lg font-bold text-base transition-all duration-300 transform overflow-hidden w-full
            ${
              disabled
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : isAnimating
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white animate-pulse scale-[1.02] shadow-lg shadow-purple-500/30 border border-purple-500/50'
                  : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-purple-500/30 border border-purple-500/50'
            }
          `}
        >
          {/* Button Text */}
          <span className="relative z-10">
            {isAnimating ? getBrewingText() : 'Brew Potion'}
          </span>

          {/* Brewing Progress Bar */}
          {isAnimating && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-purple-300 animate-pulse"
              style={{ width: `${((brewingStage + 1) / 4) * 100}%` }}
            />
          )}
        </button>

        {disabled && (
          <p className="text-sm text-slate-500 mt-3">
            Add ingredients to the cauldron first
          </p>
        )}
      </div>

      {/* Result Display */}
      {lastResult && (
        <div
          className={`
          relative z-10 p-6 rounded-lg border transition-all duration-500
          ${
            lastResult.success
              ? 'border-emerald-500/50 bg-emerald-950/30 shadow-lg shadow-emerald-500/10'
              : 'border-red-500/50 bg-red-950/30 shadow-lg shadow-red-500/10'
          }
        `}
        >
          {/* Success/Failure Icon */}
          <div className="text-center mb-4">
            <div
              className={`text-5xl mb-3 ${lastResult.success ? 'animate-bounce' : 'animate-pulse'}`}
            >
              {lastResult.success ? '✨' : '💥'}
            </div>

            {/* Result Message */}
            <p
              className={`font-bold text-base mb-3 ${
                lastResult.success ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {lastResult.message}
            </p>
          </div>

          {/* Potion Details */}
          {lastResult.recipe && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg text-slate-100">
                  {lastResult.recipe.name}
                </h4>
                {lastResult.isNewDiscovery && (
                  <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    NEW!
                  </div>
                )}
              </div>

              <p className="text-slate-300 text-sm mb-3">
                {lastResult.recipe.description}
              </p>

              {lastResult.isNewDiscovery && (
                <div className="bg-purple-950/30 border border-purple-500/30 rounded-lg p-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">📖</span>
                    <span className="text-purple-300 font-medium text-sm">
                      Recipe added to your Grimoire!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Subtle Celebration Particles for Success */}
          {lastResult.success && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute top-2 left-4 text-emerald-400 animate-ping">
                ⭐
              </div>
              <div className="absolute top-4 right-6 text-green-400 animate-ping animation-delay-300">
                ✨
              </div>
              <div className="absolute bottom-4 left-8 text-teal-400 animate-ping animation-delay-600">
                💫
              </div>
              <div className="absolute bottom-2 right-4 text-emerald-400 animate-ping animation-delay-900">
                🌟
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
