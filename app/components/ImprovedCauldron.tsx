'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';

interface ImprovedCauldronProps {
  cauldron: GameState['cauldron'];
  onRemoveIngredient: (ingredientId: string) => void;
  onClearCauldron: () => void;
}

export default function ImprovedCauldron({
  cauldron,
  onRemoveIngredient,
  onClearCauldron,
}: ImprovedCauldronProps) {
  const [bubbleAnimation, setBubbleAnimation] = useState(false);
  const cauldronItems = Object.entries(cauldron).filter(
    ([, amount]) => amount > 0
  );
  const isEmpty = cauldronItems.length === 0;
  const totalIngredients = cauldronItems.reduce(
    (sum, [, amount]) => sum + amount,
    0
  );

  useEffect(() => {
    if (!isEmpty) {
      setBubbleAnimation(true);
      const timer = setTimeout(() => setBubbleAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalIngredients, isEmpty]);

  const getCauldronColor = () => {
    if (isEmpty) return 'from-slate-700 to-slate-800';
    return 'from-purple-600 via-violet-600 to-purple-700';
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="mb-6 relative z-10">
        <h2 className="text-2xl font-bold text-slate-100 mb-1">
          Mystical Cauldron
        </h2>
        <p className="text-slate-400 text-sm">
          {isEmpty
            ? 'Awaiting your magical ingredients...'
            : `Brewing with ${totalIngredients} ingredients`}
        </p>
      </div>

      {/* Cauldron Visual */}
      <div className="relative mb-6">
        <div className="mx-auto w-48 h-32 relative">
          {/* Cauldron Base */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-800 to-slate-700 rounded-b-full border-4 border-slate-600" />

          {/* Cauldron Rim */}
          <div className="absolute bottom-16 w-full h-8 bg-gradient-to-t from-slate-700 to-slate-600 rounded-full border-2 border-slate-500" />

          {/* Liquid */}
          {!isEmpty && (
            <div
              className={`absolute bottom-2 left-2 right-2 h-20 bg-gradient-to-t ${getCauldronColor()} rounded-b-full opacity-80 ${bubbleAnimation ? 'animate-pulse' : ''}`}
            >
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
          <div className="text-center text-slate-400 py-8">
            <div className="text-6xl mb-4 opacity-30">🌟</div>
            <p className="text-base mb-2">The cauldron awaits...</p>
            <p className="text-sm text-slate-500">
              Add ingredients from your inventory
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-300 mb-3">
              Current Mixture:
            </h3>

            {/* Ingredient List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {cauldronItems.map(([ingredientId, amount]) => {
                const ingredient = INGREDIENTS[ingredientId];
                return (
                  <div
                    key={ingredientId}
                    className="flex items-center justify-between bg-slate-800/70 backdrop-blur-sm rounded-lg p-2 hover:bg-slate-700/70 transition-all duration-200 group border border-slate-700/50"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {/* Ingredient Image */}
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-600">
                        {ingredient.image ? (
                          <Image
                            src={ingredient.image}
                            alt={ingredient.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl bg-slate-700">
                            {ingredient.icon}
                          </div>
                        )}
                        {/* Amount Badge */}
                        <div
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-white border border-slate-900"
                          style={{ backgroundColor: ingredient.color }}
                        >
                          {amount}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <span className="text-slate-100 font-medium text-sm truncate block">
                          {ingredient.name}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 ml-2"
                      onClick={() => onRemoveIngredient(ingredientId)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Clear Button */}
            <div className="pt-4 border-t border-slate-700/50">
              <button
                onClick={onClearCauldron}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 px-4 rounded-lg transition-all duration-200 font-medium border border-slate-600/50 hover:border-slate-500/50"
              >
                Clear Cauldron
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Magical Particles */}
      {!isEmpty && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-10 left-10 text-purple-400 animate-ping">
            ✨
          </div>
          <div className="absolute top-20 right-12 text-violet-400 animate-ping animation-delay-1000">
            ⭐
          </div>
          <div className="absolute bottom-20 left-16 text-purple-400 animate-ping animation-delay-2000">
            💫
          </div>
        </div>
      )}
    </div>
  );
}
