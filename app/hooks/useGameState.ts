'use client';

import { useState, useEffect } from 'react';
import { GameState, CraftResult } from '../types/game';
import { RECIPES } from '../data/recipes';
import { INGREDIENTS } from '../data/ingredients';

const INITIAL_STATE: GameState = {
  inventory: {
    herbs: 10,
    berries: 8,
    mushrooms: 5,
    water: 15,
    flowers: 6,
    crystals: 3,
    bones: 2,
    scales: 1
  },
  cauldron: {},
  discoveredRecipes: ['healingPotion'], // Start with only one recipe
  craftedPotions: {},
  totalPotionsCrafted: 0
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('potionGame');
    if (saved) {
      try {
        setGameState(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('potionGame', JSON.stringify(gameState));
  }, [gameState]);

  const addIngredientToInventory = (ingredientId: string, amount: number = 1) => {
    setGameState(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [ingredientId]: (prev.inventory[ingredientId] || 0) + amount
      }
    }));
  };

  const addToCauldron = (ingredientId: string): boolean => {
    if (gameState.inventory[ingredientId] > 0) {
      setGameState(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [ingredientId]: prev.inventory[ingredientId] - 1
        },
        cauldron: {
          ...prev.cauldron,
          [ingredientId]: (prev.cauldron[ingredientId] || 0) + 1
        }
      }));
      return true;
    }
    return false;
  };

  const removeFromCauldron = (ingredientId: string): boolean => {
    if (gameState.cauldron[ingredientId] > 0) {
      setGameState(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [ingredientId]: prev.inventory[ingredientId] + 1
        },
        cauldron: {
          ...prev.cauldron,
          [ingredientId]: prev.cauldron[ingredientId] - 1
        }
      }));
      return true;
    }
    return false;
  };

  const clearCauldron = () => {
    setGameState(prev => {
      const newInventory = { ...prev.inventory };
      Object.entries(prev.cauldron).forEach(([ingredientId, amount]) => {
        newInventory[ingredientId] = (newInventory[ingredientId] || 0) + amount;
      });
      
      return {
        ...prev,
        inventory: newInventory,
        cauldron: {}
      };
    });
  };

  const craftPotion = (): CraftResult => {
    // Check if cauldron matches any recipe
    for (const recipe of Object.values(RECIPES)) {
      const matches = Object.entries(recipe.ingredients).every(([ingredientId, requiredAmount]) => {
        return gameState.cauldron[ingredientId] === requiredAmount;
      });

      // Also check that cauldron doesn't have extra ingredients
      const cauldronIngredients = Object.keys(gameState.cauldron).filter(id => gameState.cauldron[id] > 0);
      const recipeIngredients = Object.keys(recipe.ingredients);
      const hasExtraIngredients = cauldronIngredients.some(id => !recipeIngredients.includes(id));

      if (matches && !hasExtraIngredients) {
        const isNewDiscovery = !gameState.discoveredRecipes.includes(recipe.id);
        
        setGameState(prev => ({
          ...prev,
          cauldron: {},
          discoveredRecipes: isNewDiscovery 
            ? [...prev.discoveredRecipes, recipe.id]
            : prev.discoveredRecipes,
          craftedPotions: {
            ...prev.craftedPotions,
            [recipe.id]: (prev.craftedPotions[recipe.id] || 0) + 1
          },
          totalPotionsCrafted: prev.totalPotionsCrafted + 1
        }));

        return {
          success: true,
          recipe,
          message: isNewDiscovery 
            ? `🎉 NEW DISCOVERY! You've brewed ${recipe.name}!`
            : `✨ Successfully brewed ${recipe.name}!`,
          isNewDiscovery
        };
      }
    }

    return {
      success: false,
      message: "💥 The mixture bubbles and fizzles... Nothing useful was created. Try a different combination!"
    };
  };

  const resetGame = () => {
    setGameState(INITIAL_STATE);
    localStorage.removeItem('potionGame');
  };

  return {
    gameState,
    addToCauldron,
    removeFromCauldron,
    clearCauldron,
    craftPotion,
    resetGame,
    addIngredientToInventory,
    ingredients: INGREDIENTS,
    recipes: RECIPES
  };
}