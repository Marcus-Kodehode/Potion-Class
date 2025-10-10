import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // EASY QUESTIONS (Common ingredients: herbs, berries, water)
  {
    id: 'easy_1',
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for web pages.'
  },
  {
    id: 'easy_2',
    question: 'Which symbol is used for single-line comments in JavaScript?',
    options: ['#', '//', '/* */', '<!--'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: '// is used for single-line comments in JavaScript.'
  },
  {
    id: 'easy_3',
    question: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Sheets'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'CSS stands for Cascading Style Sheets, used to style HTML elements.'
  },
  {
    id: 'easy_4',
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'The <a> tag (anchor tag) is used to create hyperlinks in HTML.'
  },
  {
    id: 'easy_5',
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: ['variable x = 5;', 'var x = 5;', 'v x = 5;', 'declare x = 5;'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'var, let, or const are used to declare variables in JavaScript.'
  },
  {
    id: 'easy_6',
    question: 'Which of these is NOT a programming language?',
    options: ['Python', 'Java', 'HTML', 'C++'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'HTML is a markup language, not a programming language.'
  },
  {
    id: 'easy_7',
    question: 'What does API stand for?',
    options: [
      'Application Programming Interface',
      'Advanced Programming Integration',
      'Automated Program Interaction',
      'Application Process Integration'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: 'API stands for Application Programming Interface.'
  },
  {
    id: 'easy_8',
    question: 'Which operator is used for equality comparison in JavaScript?',
    options: ['=', '==', '===', 'equals()'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '=== is the strict equality operator in JavaScript (checks value and type).'
  },

  // MEDIUM QUESTIONS (Uncommon ingredients: mushrooms, flowers)
  {
    id: 'medium_1',
    question: 'What is a closure in JavaScript?',
    options: [
      'A way to close browser windows',
      'A function that has access to variables in its outer scope',
      'A method to end a program',
      'A type of loop'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'A closure is a function that retains access to variables from its outer scope even after the outer function has returned.'
  },
  {
    id: 'medium_2',
    question: 'What does the "async" keyword do in JavaScript?',
    options: [
      'Makes code run faster',
      'Creates a synchronous function',
      'Returns a Promise',
      'Stops code execution'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'The async keyword makes a function return a Promise and allows the use of await inside it.'
  },
  {
    id: 'medium_3',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Binary search has O(log n) time complexity as it divides the search space in half each iteration.'
  },
  {
    id: 'medium_4',
    question: 'What is the difference between "let" and "var" in JavaScript?',
    options: [
      'No difference',
      'let is block-scoped, var is function-scoped',
      'var is newer than let',
      'let is faster than var'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'let is block-scoped (limited to the block where it\'s defined), while var is function-scoped.'
  },
  {
    id: 'medium_5',
    question: 'What is the purpose of the "useEffect" hook in React?',
    options: [
      'To create visual effects',
      'To handle side effects and lifecycle events',
      'To improve performance',
      'To style components'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'useEffect handles side effects like data fetching, subscriptions, and DOM manipulation in React.'
  },
  {
    id: 'medium_6',
    question: 'What does REST stand for in REST API?',
    options: [
      'Remote Execution State Transfer',
      'Representational State Transfer',
      'Rapid Execution Service Technology',
      'Resource Execution State Technology'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'REST stands for Representational State Transfer, an architectural style for APIs.'
  },
  {
    id: 'medium_7',
    question: 'What is the purpose of "git rebase"?',
    options: [
      'To delete branches',
      'To reapply commits on top of another base',
      'To create a new repository',
      'To undo all changes'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'git rebase reapplies commits on top of another base tip, creating a linear history.'
  },
  {
    id: 'medium_8',
    question: 'What is TypeScript?',
    options: [
      'A new programming language',
      'A JavaScript framework',
      'A superset of JavaScript with static typing',
      'A database language'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'TypeScript is a superset of JavaScript that adds static type definitions.'
  },

  // HARD QUESTIONS (Rare/Legendary ingredients: crystals, bones, scales)
  {
    id: 'hard_1',
    question: 'What is the output of: console.log(0.1 + 0.2 === 0.3)?',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'Due to floating-point precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.'
  },
  {
    id: 'hard_2',
    question: 'What is a higher-order function?',
    options: [
      'A function with high priority',
      'A function that takes or returns another function',
      'A function that runs faster',
      'A function with many parameters'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'A higher-order function is a function that takes one or more functions as arguments or returns a function.'
  },
  {
    id: 'hard_3',
    question: 'What is the difference between "==" and "===" in JavaScript?',
    options: [
      'No difference',
      '== checks type, === doesn\'t',
      '=== checks type and value, == only checks value',
      '=== is deprecated'
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: '=== (strict equality) checks both type and value, while == (loose equality) performs type coercion.'
  },
  {
    id: 'hard_4',
    question: 'What is memoization in programming?',
    options: [
      'A way to remember passwords',
      'Caching function results to avoid recalculation',
      'A memory management technique',
      'A type of database'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'Memoization is an optimization technique that caches function results to avoid expensive recalculations.'
  },
  {
    id: 'hard_5',
    question: 'What is the Virtual DOM in React?',
    options: [
      'A fake DOM for testing',
      'A lightweight copy of the real DOM kept in memory',
      'A new browser feature',
      'A database structure'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'The Virtual DOM is a lightweight representation of the real DOM that React uses to optimize updates.'
  },
  {
    id: 'hard_6',
    question: 'What is the purpose of "debouncing" in JavaScript?',
    options: [
      'To fix bugs',
      'To limit the rate at which a function executes',
      'To improve security',
      'To compress code'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'Debouncing delays function execution until after a specified time has passed since the last invocation.'
  },
  {
    id: 'hard_7',
    question: 'What is a race condition?',
    options: [
      'A performance competition',
      'When multiple operations compete for resources',
      'A type of loop',
      'A sorting algorithm'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'A race condition occurs when multiple operations access shared resources concurrently, leading to unpredictable results.'
  },
  {
    id: 'hard_8',
    question: 'What is the difference between "null" and "undefined" in JavaScript?',
    options: [
      'They are the same',
      'null is intentional absence, undefined is uninitialized',
      'undefined is newer',
      'null is for objects only'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'null represents intentional absence of value, while undefined means a variable has been declared but not assigned.'
  }
];

// Helper function to get random question by difficulty
export function getRandomQuestion(difficulty: 'easy' | 'medium' | 'hard', excludeIds: string[] = []): QuizQuestion | null {
  const availableQuestions = QUIZ_QUESTIONS.filter(
    q => q.difficulty === difficulty && !excludeIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}