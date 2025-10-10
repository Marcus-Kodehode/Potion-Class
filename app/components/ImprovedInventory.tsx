"use client";

import { useState } from "react";
import Image from "next/image";
import { GameState } from "../types/game";
import { INGREDIENTS } from "../data/ingredients";

interface ImprovedInventoryProps {
  inventory: GameState["inventory"];
  onAddToCauldron: (ingredientId: string) => boolean;
}

export default function ImprovedInventory({
  inventory,
  onAddToCauldron,
}: ImprovedInventoryProps) {
  const [hoveredIngredient, setHoveredIngredient] = useState<string | null>(
    null
  );

  const handleAddIngredient = (ingredientId: string) => {
    const success = onAddToCauldron(ingredientId);
    if (success) {
      const button = document.getElementById(`ingredient-${ingredientId}`);
      if (button) {
        button.classList.add("animate-pulse");
        setTimeout(() => button.classList.remove("animate-pulse"), 300);
      }
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-slate-600/60";
      case "uncommon":
        return "border-emerald-600/60";
      case "rare":
        return "border-blue-600/60";
      case "legendary":
        return "border-amber-500/70 shadow-lg shadow-amber-500/20";
      default:
        return "border-slate-600/60";
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-1">
          Ingredient Inventory
        </h2>
        <p className="text-slate-400 text-sm">
          Click to add ingredients to your cauldron
        </p>
      </div>

      {/* Ingredient Grid */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(INGREDIENTS).map(([ingredientId, ingredient]) => {
          const amount = inventory[ingredientId] || 0;
          const isAvailable = amount > 0;
          const isHovered = hoveredIngredient === ingredientId;

          return (
            <div
              key={ingredientId}
              className="relative"
              onMouseEnter={() => setHoveredIngredient(ingredientId)}
              onMouseLeave={() => setHoveredIngredient(null)}
            >
              <button
                id={`ingredient-${ingredientId}`}
                onClick={() => handleAddIngredient(ingredientId)}
                disabled={!isAvailable}
                className={`
                  w-full aspect-square rounded-lg border transition-all duration-300 relative overflow-hidden group
                  ${
                    isAvailable
                      ? `${getRarityBorder(
                          ingredient.rarity
                        )} hover:scale-[1.02] cursor-pointer transform hover:shadow-xl`
                      : "border-slate-800 cursor-not-allowed opacity-40"
                  }
                `}
              >
                {/* Background Image */}
                {ingredient.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={ingredient.image}
                      alt={ingredient.name}
                      fill
                      className={`object-cover ${
                        !isAvailable ? "grayscale" : ""
                      }`}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Subtle dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  </div>
                )}

                {/* Legendary Subtle Glow */}
                {ingredient.rarity === "legendary" && isAvailable && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/10 animate-pulse-slow" />
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 z-10">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    {/* Rarity Badge */}
                    <div
                      className={`
                      px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md
                      ${
                        ingredient.rarity === "common"
                          ? "bg-slate-800/80 text-slate-300 border border-slate-600/50"
                          : ingredient.rarity === "uncommon"
                          ? "bg-emerald-900/80 text-emerald-300 border border-emerald-600/50"
                          : ingredient.rarity === "rare"
                          ? "bg-blue-900/80 text-blue-300 border border-blue-600/50"
                          : "bg-amber-900/80 text-amber-300 border border-amber-600/50"
                      }
                    `}
                    >
                      {ingredient.rarity}
                    </div>

                    {/* Amount Badge */}
                    <div
                      className={`
                      px-2.5 py-1 rounded-md text-sm font-bold backdrop-blur-md border
                      ${
                        isAvailable
                          ? "bg-slate-900/90 text-slate-100 border-slate-600/50"
                          : "bg-slate-900/60 text-slate-600 border-slate-700/30"
                      }
                    `}
                    >
                      {amount}
                    </div>
                  </div>

                  {/* Name - Bottom */}
                  <div className="text-slate-100 font-semibold text-sm text-shadow-lg">
                    {ingredient.name}
                  </div>
                </div>

                {/* Hover Effect - Subtle Plus */}
                {isAvailable && (
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                    <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600 flex items-center justify-center">
                      <span className="text-slate-200 font-bold text-xl">
                        +
                      </span>
                    </div>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700/50">
                      <span className="text-slate-500 font-bold text-xs">
                        OUT OF STOCK
                      </span>
                    </div>
                  </div>
                )}
              </button>

              {/* Hover Tooltip */}
              {isHovered && isAvailable && (
                <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                  <div className="bg-slate-900/98 backdrop-blur-md border border-slate-700/70 rounded-lg shadow-2xl p-3 min-w-[220px]">
                    <div className="text-sm text-slate-100 font-bold mb-1">
                      {ingredient.name}
                    </div>
                    <div className="text-xs text-slate-400 mb-2">
                      {ingredient.description}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">
                        Stock: {amount}
                      </span>
                      <div
                        className={`text-xs px-2 py-0.5 rounded ${
                          ingredient.rarity === "common"
                            ? "bg-slate-700 text-slate-300"
                            : ingredient.rarity === "uncommon"
                            ? "bg-emerald-700 text-emerald-300"
                            : ingredient.rarity === "rare"
                            ? "bg-blue-700 text-blue-300"
                            : "bg-amber-700 text-amber-300"
                        }`}
                      >
                        {ingredient.rarity}
                      </div>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900/98"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <div className="text-sm text-slate-400 text-center">
          Total Ingredients:{" "}
          <span className="text-slate-200 font-bold">
            {Object.values(inventory).reduce((sum, amount) => sum + amount, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
