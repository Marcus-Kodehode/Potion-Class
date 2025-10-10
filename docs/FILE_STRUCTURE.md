# File Structure

Detailed overview of the Mystic Potion Brewery project structure.

## Root Directory

```
mystic-potion-brewery/
├── app/                    # Next.js app directory
├── public/                 # Static assets
├── docs/                   # Documentation
├── .next/                  # Build output (generated)
├── node_modules/           # Dependencies (generated)
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License
├── README.md              # Project documentation
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
└── eslint.config.mjs      # ESLint configuration
```

## App Directory (`app/`)

### Components (`app/components/`)

#### Original Components (Legacy)
- `Cauldron.tsx` - Basic cauldron interface
- `CraftingInterface.tsx` - Simple brewing interface
- `GameStats.tsx` - Basic statistics display
- `Inventory.tsx` - Simple ingredient list

#### Improved Components (Current)
- `ImprovedCauldron.tsx` - Enhanced cauldron with:
  - Visual liquid representation
  - Bubble animations
  - Ingredient images
  - Remove functionality
- `ImprovedCraftingInterface.tsx` - Enhanced brewing with:
  - Multi-stage brewing animation
  - Progress bar
  - Result display with effects
  - Success/failure feedback
- `ImprovedInventory.tsx` - Enhanced inventory with:
  - Ingredient images
  - Rarity indicators
  - Hover tooltips
  - Stock management

#### Modal Components
- `QuizModal.tsx` - Knowledge Quest interface:
  - Difficulty selection
  - Question display
  - Answer shuffling
  - Result feedback
  - Reward display
- `RecipeBook.tsx` - Recipe Grimoire:
  - Discovered recipes
  - Undiscovered hints
  - Crafting statistics
  - Tabbed interface
- `StatsModal.tsx` - Statistics dashboard:
  - Progress tracking
  - Achievement badges
  - Top brewed potions
  - Reset functionality

### Data (`app/data/`)

- `ingredients.ts` - Ingredient definitions:
  ```typescript
  {
    id: string
    name: string
    description: string
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
    icon: string
    image: string
    color: string
  }
  ```

- `recipes.ts` - Potion recipes:
  ```typescript
  {
    id: string
    name: string
    description: string
    ingredients: { [ingredientId: string]: number }
    type: 'standard' | 'special'
    discovered: boolean
    hint?: string
  }
  ```

- `quizQuestions.ts` - Quiz questions:
  ```typescript
  {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    difficulty: 'easy' | 'medium' | 'hard'
    explanation: string
  }
  ```

### Hooks (`app/hooks/`)

- `useGameState.ts` - Main game state management:
  - Inventory management
  - Cauldron operations
  - Recipe discovery
  - Potion crafting
  - LocalStorage persistence
  - Statistics tracking

### Types (`app/types/`)

- `game.ts` - Game-related interfaces:
  - `Ingredient`
  - `Recipe`
  - `GameState`
  - `CraftResult`

- `quiz.ts` - Quiz-related interfaces:
  - `QuizQuestion`
  - `QuizDifficulty`
  - `QuizReward`
  - `QuizResult`

### Root Files

- `globals.css` - Global styles:
  - Tailwind imports
  - Custom animations
  - Font definitions
  - Utility classes

- `layout.tsx` - Root layout:
  - Font configuration (Cinzel, Inter, JetBrains Mono)
  - Metadata
  - HTML structure

- `page.tsx` - Main game page:
  - Game state initialization
  - Layout structure
  - Component composition
  - Background image

## Public Directory (`public/`)

### Assets (`public/assets/`)

#### Icons (`public/assets/icons/`)
- `logo.png` - Main game logo
- `MBlogo.png` - MoBo Developments logo

#### Images (`public/assets/images/`)
- `BG1.png` - Background image
- `screenshot.png` - Game screenshot (for README)

#### Ingredients (`public/assets/ingredients/`)
- `herbs.webp` - Mystical Herbs image
- `berries.webp` - Shadow Berries image
- `mushrooms.webp` - Gloom Mushrooms image
- `water.webp` - Moonwell Water image
- `flower.webp` - Nightshade Petals image
- `crystals.webp` - Void Crystals image
- `bones.webp` - Ancient Bones image
- `scales.webp` - Dragon Scales image

## Documentation (`docs/`)

- `FILE_STRUCTURE.md` - This file
- `PROJECT_SUMMARY.md` - Project overview and architecture
- `IMPROVEMENTS.md` - Future enhancement ideas
- `notes.md` - Development notes

## Configuration Files

### TypeScript (`tsconfig.json`)
- Compiler options
- Path aliases
- Module resolution

### Tailwind CSS (`tailwind.config.ts`)
- Theme customization
- Plugin configuration
- Content paths

### Next.js (`next.config.ts`)
- Build configuration
- Image optimization
- Environment variables

### ESLint (`eslint.config.mjs`)
- Code quality rules
- Next.js specific rules
- TypeScript rules

## Build Output (`.next/`)

Generated during build process:
- Compiled pages
- Static assets
- Server functions
- Cache files

## Dependencies (`node_modules/`)

Installed packages:
- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- And more...

## Key File Relationships

```
page.tsx
├── uses → useGameState.ts
├── renders → ImprovedInventory.tsx
├── renders → ImprovedCauldron.tsx
├── renders → ImprovedCraftingInterface.tsx
├── renders → RecipeBook.tsx
├── renders → StatsModal.tsx
└── renders → QuizModal.tsx

useGameState.ts
├── imports → ingredients.ts
├── imports → recipes.ts
└── manages → localStorage

QuizModal.tsx
├── imports → quizQuestions.ts
└── calls → useGameState.addIngredientToInventory()

RecipeBook.tsx
├── imports → recipes.ts
└── imports → ingredients.ts
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `ImprovedCauldron.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useGameState.ts`)
- **Types**: camelCase (e.g., `game.ts`)
- **Data**: camelCase (e.g., `ingredients.ts`)
- **Styles**: kebab-case (e.g., `globals.css`)
- **Config**: kebab-case (e.g., `tailwind.config.ts`)

## Import Patterns

```typescript
// External libraries
import { useState } from 'react';
import Image from 'next/image';

// Types
import { GameState } from '../types/game';

// Data
import { INGREDIENTS } from '../data/ingredients';

// Components
import ImprovedCauldron from './components/ImprovedCauldron';

// Hooks
import { useGameState } from './hooks/useGameState';
```
