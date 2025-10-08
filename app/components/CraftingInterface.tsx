'use client';

import { useState } from 'react';
import { CraftResult } from '../types/game';

interface CraftingInterfaceProps {
  onCraftPotion: () => CraftResult;
  disabled: boolean;
}

export default function CraftingInterface({ onCraftPotion, disabled }: CraftingInterfaceProps) {
  const [lastResult, setLastResult] = useState<CraftResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCraft = () => {
    if (disabled) return;
    
    setIsAnimating(true);
    
    // Add a small delay for animation effect
    setTimeout(() => {
      const result = onCraftPotion();
      setLastResult(result);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-900 border-2 border-orange-500 rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">⚗️</div>
        <h2 className="text-2xl font-bold text-orange-300">Brewing Station</h2>
      </div>

      {/* Craft Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleCraft}
          disabled={disabled || isAnimating}
          className={`
            px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform
            ${disabled 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : isAnimating
                ? 'bg-orange-400 text-white animate-pulse scale-105'
                : 'bg-orange-600 hover:bg-orange-700 text-white hover:scale-105 active:scale-95'
            }
          `}
        >
          {isAnimating ? '🌟 Brewing... 🌟' : '🔥 Brew Potion 🔥'}
        </button>
        
        {disabled && (
          <p className="text-sm text-gray-400 mt-2">
            Add ingredients to the cauldron first!
          </p>
        )}
      </div>

      {/* Result Display */}
      {lastResult && (
        <div className={`
          p-4 rounded-lg border-2 animate-fade-in
          ${lastResult.success 
            ? 'border-green-500 bg-green-900/20' 
            : 'border-red-500 bg-red-900/20'
          }
        `}>
          <div className="text-center">
            <div className="text-2xl mb-2">
              {lastResult.success ? '✨' : '💥'}
            </div>
            <p className={`font-medium ${
              lastResult.success ? 'text-green-300' : 'text-red-300'
            }`}>
              {lastResult.message}
            </p>
            
            {lastResult.recipe && (
              <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-white">{lastResult.recipe.name}</h4>
                <p className="text-sm text-gray-400">{lastResult.recipe.description}</p>
                {lastResult.isNewDiscovery && (
                  <div className="mt-2 text-xs text-purple-300 font-medium">
                    🎉 Added to Recipe Grimoire!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}