'use client';

import { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';

interface ImprovedCauldronProps {
  cauldron: GameState['cauldron'];
  onRemoveIngredient: (ingredientId: string) => void;
  onClearCauldron: () => void;
}

export default function ImprovedCauldron({ cauldron, onRemoveIngredient, onClearCauldron }: ImprovedCauldronProps) {
  const [bubbleAnimation, setBubbleAnimation] = useState(false);
  const cauldronItems = Object.entries(cauldron).filter(([, amount]) => amount > 0);
  const isEmpty = cauldronItems.length === 0;
  const totalIngredients = cauldronItems.reduce((sum, [, amount]) => sum + amount, 0);

  // Trigger bubble animation when ingredients are added
  useEffect(() => {
    if (!isEmpty) {
      setBubbleAnimation(true);
      const timer = setTimeout(() => setBubbleAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalIngredients, isEmpty]);

  const getCauldronColor = () => {
    if (isEmpty) return 'from-gray-700 to-gray-800';
    
    // Mix colors based on ingredients
    const colors = cauldronItems.map(([ingredientId]) => INGREDIENTS[ingredientId].color);
    if (colors.length === 1) return `from-purple-600 to-purple-800`;
    return 'from-purple-500 via-pink-500 to-purple-700';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-500 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Magical Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-pulse" />
      
      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="text-6xl mb-3 relative">
          🪄
          {bubbleAnimation && (
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
          )}
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mystical Cauldron
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {isEmpty ? 'Awaiting your magical ingredients...' : `Brewing with ${totalIngredients} ingredients`}
        </p>
      </div>

      {/* Cauldron Visual */}
      <div className="relative mb-6">
        <div className="mx-auto w-48 h-32 relative">
          {/* Cauldron Base */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-800 to-gray-700 rounded-b-full border-4 border-gray-600" />
          
          {/* Cauldron Rim */}
          <div className="absolute bottom-16 w-full h-8 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full border-2 border-gray-500" />
          
          {/* Liquid */}
          {!isEmpty && (
            <div className={`absolute bottom-2 left-2 right-2 h-20 bg-gradient-to-t ${getCauldronColor()} rounded-b-full opacity-80 ${bubbleAnimation ? 'animate-pulse' : ''}`}>
              {/* Bubbles */}
              {bubbleAnimation && (
                <>
                  <div className="absolute top-2 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping" />
                  <div className="absolute top-4 right-6 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-300" />
                  <div className="absolute top-6 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping animation-delay-600" />
                </>
              )}
            </div>
          )}
          
          {/* Steam Effect */}
          {!isEmpty && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="text-2xl opacity-60 animate-bounce">💨</div>
            </div>
          )}
        </div>
      </div>

      {/* Contents */}
      <div className="relative z-10">
        {isEmpty ? (
          <div className="text-center text-gray-400 py-8">
            <div className="text-6xl mb-4 opacity-50">🌟</div>
            <p className="text-lg mb-2">The cauldron awaits your ingredients...</p>
            <p className="text-sm">Add ingredients from your inventory to start brewing!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-200 mb-4 text-center">Current Mixture:</h3>
            
            {/* Ingredient List */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cauldronItems.map(([ingredientId, amount]) => {
                const ingredient = INGREDIENTS[ingredientId];
                return (
                  <div 
                    key={ingredientId}
                    className="flex items-center justify-between bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 hover:bg-gray-700/70 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <span className="text-2xl">{ingredient.icon}</span>
                        <div 
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white"
                          style={{ backgroundColor: ingredient.color }}
                        >
                          {amount}
                        </div>
                      </div>
                      <div>
                        <span className="text-white font-medium">{ingredient.name}</span>
                        <div className="text-xs text-gray-400">{ingredient.description}</div>
                      </div>
                    </div>
                    <button 
                      className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded-lg hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => onRemoveIngredient(ingredientId)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            
            {/* Clear Button */}
            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={onClearCauldron}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105"
              >
                🗑️ Clear Cauldron
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Magical Particles */}
      {!isEmpty && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-yellow-400 animate-ping opacity-30">✨</div>
          <div className="absolute top-20 right-12 text-purple-400 animate-ping opacity-20 animation-delay-1000">⭐</div>
          <div className="absolute bottom-20 left-16 text-pink-400 animate-ping opacity-25 animation-delay-2000">💫</div>
        </div>
      )}
    </div>
  );
}