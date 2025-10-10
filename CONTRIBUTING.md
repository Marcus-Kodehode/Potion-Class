# Contributing to Mystic Potion Brewery

First off, thank you for considering contributing to Mystic Potion Brewery! It's people like you that make this project such a great learning tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if relevant
- **Specify your environment** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any similar features** in other applications if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Development Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper interfaces for all data structures
- Avoid using `any` type unless absolutely necessary
- Use type inference where appropriate

### React/Next.js

- Use functional components with hooks
- Keep components small and focused
- Use `'use client'` directive only when necessary
- Follow Next.js 15 best practices

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme and design patterns
- Ensure responsive design (mobile-first approach)
- Test on multiple screen sizes

### Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow the existing code structure

### Testing

- Test your changes on both desktop and mobile
- Verify localStorage functionality
- Check all modals and interactions
- Ensure no console errors

## Project Structure

```
app/
├── components/     # React components
├── data/          # Static data (recipes, ingredients, questions)
├── hooks/         # Custom React hooks
├── types/         # TypeScript interfaces
└── utils/         # Utility functions
```

## Adding New Features

### Adding New Ingredients

1. Add ingredient definition to `app/data/ingredients.ts`
2. Add ingredient image to `public/assets/ingredients/`
3. Update initial inventory in `app/hooks/useGameState.ts`

### Adding New Potions

1. Add recipe to `app/data/recipes.ts`
2. Include ingredients, name, description, and hint
3. Set `discovered: false` for new recipes
4. Test the recipe in-game

### Adding Quiz Questions

1. Add questions to `app/data/quizQuestions.ts`
2. Include question, options, correct answer, and explanation
3. Set appropriate difficulty level
4. Ensure answer shuffling works correctly

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests after the first line

Examples:
```
Add new potion recipe for debugging
Fix quiz answer shuffling algorithm
Update ingredient images for better clarity
```

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing.

## Recognition

Contributors will be recognized in the project README and release notes.

Thank you for contributing! 🧪✨
