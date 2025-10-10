<div align="center">

<p><img src="/public/assets/icons/MBlogo.png" alt="MoBo Developments Logo" width="150" /></p>

<p><img src="/public/assets/icons/logo.png" alt="Mystic Potion Brewery Logo" width="150" /></p>

# Mystic Potion Brewery

> Interactive potion crafting game with coding quizzes – built with Next.js, TypeScript, and Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8.svg)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

## Features

- 🧪 **Potion Crafting System** - Combine ingredients to discover 15 unique potions
- 📚 **Knowledge Quest** - Answer coding questions to gather ingredients
- 🎯 **Discovery Mechanic** - Experiment to unlock hidden recipes
- 💾 **Progress Tracking** - LocalStorage saves your discoveries and stats
- 🏆 **Achievement System** - Unlock badges for brewing milestones
- 📖 **Recipe Grimoire** - Track discovered and undiscovered potions
- 🎨 **Dark Fantasy Theme** - Immersive UI with custom fonts and animations
- 📱 **Fully Responsive** - Optimized for desktop and mobile devices
- 🔀 **Randomized Quizzes** - Shuffled answers prevent pattern memorization
- ✨ **Visual Feedback** - Animations and effects for all interactions

## Screenshot

<div align="center">
<img src="/public/assets/images/screenshot.png" alt="Mystic Potion Brewery Screenshot" width="900" />
</div>

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mystic-potion-brewery.git
cd mystic-potion-brewery
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## Built With

- **[Next.js](https://nextjs.org)** - React framework for production
- **[React](https://react.dev)** - JavaScript library for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Typed superset of JavaScript
- **[Cinzel Font](https://fonts.google.com/specimen/Cinzel)** - Elegant serif for titles
- **[Inter Font](https://fonts.google.com/specimen/Inter)** - Modern sans-serif for body
- **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** - Monospace for code elements

## Project Structure

```
mystic-potion-brewery/
├── app/
│   ├── components/
│   │   ├── Cauldron.tsx              # Original cauldron component
│   │   ├── CraftingInterface.tsx     # Original crafting interface
│   │   ├── GameStats.tsx             # Original stats component
│   │   ├── ImprovedCauldron.tsx      # Enhanced cauldron with animations
│   │   ├── ImprovedCraftingInterface.tsx  # Enhanced brewing station
│   │   ├── ImprovedInventory.tsx     # Enhanced ingredient inventory
│   │   ├── Inventory.tsx             # Original inventory component
│   │   ├── QuizModal.tsx             # Coding quiz interface
│   │   ├── RecipeBook.tsx            # Recipe grimoire modal
│   │   └── StatsModal.tsx            # Statistics and achievements modal
│   ├── data/
│   │   ├── ingredients.ts            # Ingredient definitions
│   │   ├── quizQuestions.ts          # Coding quiz questions
│   │   └── recipes.ts                # Potion recipe definitions
│   ├── hooks/
│   │   └── useGameState.ts           # Game state management hook
│   ├── types/
│   │   ├── game.ts                   # Game-related TypeScript interfaces
│   │   └── quiz.ts                   # Quiz-related TypeScript interfaces
│   ├── globals.css                   # Global styles and animations
│   ├── layout.tsx                    # Root layout with fonts
│   └── page.tsx                      # Main game page
├── public/
│   └── assets/
│       ├── icons/                    # Logo and icon files
│       ├── images/                   # Background and screenshots
│       └── ingredients/              # Ingredient images
├── docs/
│   ├── FILE_STRUCTURE.md             # Detailed file structure
│   ├── PROJECT_SUMMARY.md            # Project overview
│   └── IMPROVEMENTS.md               # Future enhancement ideas
├── CONTRIBUTING.md                   # Contribution guidelines
└── LICENSE                           # MIT License
```

## Game Mechanics

### Potion Crafting

Combine ingredients in the cauldron to discover potions. Each recipe requires specific ingredients in exact amounts:

```typescript
{
  name: "Potion of Stack Overflow",
  ingredients: { herbs: 2, berries: 1, mushrooms: 1 },
  type: "standard"
}
```

### Ingredient System

8 unique ingredients with varying rarity:
- **Common**: Mystical Herbs, Shadow Berries, Moonwell Water
- **Uncommon**: Gloom Mushrooms, Nightshade Petals
- **Rare**: Void Crystals, Ancient Bones
- **Legendary**: Dragon Scales

### Knowledge Quest (Quiz System)

Answer coding questions to gather ingredients:
- **Easy** (3x common ingredients) - HTML, CSS, JavaScript basics
- **Medium** (2x uncommon ingredients) - React, TypeScript, Git
- **Hard** (1x rare/legendary ingredient) - Advanced concepts, algorithms

### Discovery System

- Start with only 1 known recipe
- Experiment with ingredients to discover new potions
- Hints provided for undiscovered recipes
- 5 special hidden potions require experimentation

## Potion Recipes

### Standard Potions (10)
- **Potion of Stack Overflow** - Healing
- **Potion of RAM Expansion** - Mana restoration
- **Potion of Mechanical Keyboards** - Strength boost
- **Potion of SSD Performance** - Speed enhancement
- **Potion of Incognito Mode** - Invisibility
- **Potion of Firewall Protection** - Fire resistance
- **Potion of Dark Mode** - Night vision
- **Potion of Cloud Computing** - Levitation
- **Potion of Antivirus** - Poison resistance
- **Potion of RNG Blessing** - Luck boost

### Special Hidden Potions (5)
- **Potion of Sudo Privileges** - Ultimate power
- **Potion of Console Logging** - Reveals all secrets
- **Potion of Async/Await** - Time manipulation
- **Potion of Segmentation Fault** - Reality breaker
- **Potion of Eternal Recursion** - Infinite effects

## Quiz Questions

24 coding questions across 3 difficulty levels:
- 8 Easy questions (HTML, CSS, JavaScript basics)
- 8 Medium questions (React, TypeScript, APIs, Git)
- 8 Hard questions (Advanced concepts, algorithms, optimization)

Features:
- Randomized answer order (Fisher-Yates shuffle)
- Anti-repetition system (tracks last 5 questions)
- Detailed explanations for each answer
- Visual reward display on correct answers

## Achievements

- 🧪 **First Brew** - Craft your first potion
- ⚗️ **Apprentice** - Brew 10 potions
- 🔮 **Master Alchemist** - Brew 50 potions
- 📖 **Recipe Hunter** - Discover all standard recipes
- ✨ **Secret Seeker** - Discover a special potion
- 👑 **Completionist** - Discover all recipes

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Building for Production

```bash
npm run build
```

The optimized build will be available in the `.next/` directory.

## Contributing

Contributions, issues, and feature requests are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Guidelines

1. Follow TypeScript best practices
2. Use Tailwind utility classes for styling
3. Maintain component modularity
4. Ensure responsive design compatibility
5. Add proper TypeScript interfaces
6. Test on both desktop and mobile

## Future Enhancements

See [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md) for a detailed list of planned features and improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ingredient images created with AI image generation
- Inspired by classic potion crafting games
- Quiz questions cover fundamental programming concepts
- Built as a learning project for Next.js and TypeScript

---

<div align="center">

<i>"Code Your Spells • Brew Your Knowledge"</i>

<br>

<sub>Built with ❤️ by MoBo Developments</sub>

</div>
