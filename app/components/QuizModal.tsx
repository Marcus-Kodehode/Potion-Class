'use client';

import { useState } from 'react';
import { QuizQuestion, QuizDifficulty } from '../types/quiz';
import { getRandomQuestion } from '../data/quizQuestions';
import { INGREDIENTS } from '../data/ingredients';

interface QuizModalProps {
  onReward: (ingredientId: string, amount: number) => void;
}

interface ShuffledQuestion extends QuizQuestion {
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
}

export default function QuizModal({ onReward }: QuizModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState<QuizDifficulty | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<ShuffledQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [recentQuestionIds, setRecentQuestionIds] = useState<string[]>([]);

  const getDifficultyRewards = (diff: QuizDifficulty): { ingredientIds: string[], amount: number } => {
    switch (diff) {
      case 'easy':
        return { ingredientIds: ['herbs', 'berries', 'water'], amount: 3 };
      case 'medium':
        return { ingredientIds: ['mushrooms', 'flowers'], amount: 2 };
      case 'hard':
        return { ingredientIds: ['crystals', 'bones', 'scales'], amount: 1 };
    }
  };

  const shuffleOptions = (question: QuizQuestion): ShuffledQuestion => {
    // Create array of indices
    const indices = question.options.map((_, index) => index);
    
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Map shuffled indices to options
    const shuffledOptions = indices.map(i => question.options[i]);
    
    // Find new position of correct answer
    const shuffledCorrectAnswer = indices.indexOf(question.correctAnswer);
    
    return {
      ...question,
      shuffledOptions,
      shuffledCorrectAnswer
    };
  };

  const startQuiz = (diff: QuizDifficulty) => {
    setDifficulty(diff);
    const question = getRandomQuestion(diff, recentQuestionIds);
    if (question) {
      const shuffledQuestion = shuffleOptions(question);
      setCurrentQuestion(shuffledQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      
      // Keep track of recent questions (last 5)
      setRecentQuestionIds(prev => {
        const updated = [...prev, question.id];
        return updated.slice(-5);
      });
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.shuffledCorrectAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct && difficulty) {
      const rewards = getDifficultyRewards(difficulty);
      const randomIngredient = rewards.ingredientIds[Math.floor(Math.random() * rewards.ingredientIds.length)];
      onReward(randomIngredient, rewards.amount);
    }
  };

  const closeQuiz = () => {
    setIsOpen(false);
    setDifficulty(null);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const tryAgain = () => {
    if (difficulty) {
      startQuiz(difficulty);
    }
  };

  const getDifficultyColor = (diff: QuizDifficulty) => {
    switch (diff) {
      case 'easy': return 'from-green-600 to-green-700';
      case 'medium': return 'from-yellow-600 to-orange-600';
      case 'hard': return 'from-red-600 to-purple-600';
    }
  };

  const getDifficultyBorder = (diff: QuizDifficulty) => {
    switch (diff) {
      case 'easy': return 'border-green-500';
      case 'medium': return 'border-yellow-500';
      case 'hard': return 'border-purple-500';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm text-slate-100 p-3 rounded-lg shadow-lg transition-all border border-slate-600/50 hover:border-slate-500/50"
        title="Gather Ingredients"
      >
        <span className="text-xl">📚</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-indigo-500 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">📚</span>
            <h2 className="text-2xl font-bold text-white">Knowledge Quest</h2>
          </div>
          <button
            onClick={closeQuiz}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {!difficulty ? (
            // Difficulty Selection
            <div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Choose Your Challenge</h3>
                <p className="text-gray-400">Answer coding questions to gather ingredients</p>
              </div>

              <div className="space-y-4">
                {/* Easy */}
                <button
                  onClick={() => startQuiz('easy')}
                  className={`w-full p-6 rounded-xl border-2 ${getDifficultyBorder('easy')} bg-gradient-to-r ${getDifficultyColor('easy')} hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white mb-2">🌱 Easy</div>
                      <p className="text-sm text-green-100 mb-3">Basic programming concepts</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-200">Rewards:</span>
                        {['herbs', 'berries', 'water'].map(id => (
                          <span key={id} className="text-lg">{INGREDIENTS[id].icon}</span>
                        ))}
                        <span className="text-xs text-green-200">x3</span>
                      </div>
                    </div>
                    <div className="text-4xl">→</div>
                  </div>
                </button>

                {/* Medium */}
                <button
                  onClick={() => startQuiz('medium')}
                  className={`w-full p-6 rounded-xl border-2 ${getDifficultyBorder('medium')} bg-gradient-to-r ${getDifficultyColor('medium')} hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white mb-2">⚡ Medium</div>
                      <p className="text-sm text-yellow-100 mb-3">Intermediate programming knowledge</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-yellow-200">Rewards:</span>
                        {['mushrooms', 'flowers'].map(id => (
                          <span key={id} className="text-lg">{INGREDIENTS[id].icon}</span>
                        ))}
                        <span className="text-xs text-yellow-200">x2</span>
                      </div>
                    </div>
                    <div className="text-4xl">→</div>
                  </div>
                </button>

                {/* Hard */}
                <button
                  onClick={() => startQuiz('hard')}
                  className={`w-full p-6 rounded-xl border-2 ${getDifficultyBorder('hard')} bg-gradient-to-r ${getDifficultyColor('hard')} hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl font-bold text-white mb-2">🔥 Hard</div>
                      <p className="text-sm text-purple-100 mb-3">Advanced programming concepts</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-purple-200">Rewards:</span>
                        {['crystals', 'bones', 'scales'].map(id => (
                          <span key={id} className="text-lg">{INGREDIENTS[id].icon}</span>
                        ))}
                        <span className="text-xs text-purple-200">x1</span>
                      </div>
                    </div>
                    <div className="text-4xl">→</div>
                  </div>
                </button>
              </div>
            </div>
          ) : currentQuestion ? (
            // Question Display
            <div>
              {/* Difficulty Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(difficulty)} text-white font-bold`}>
                  {difficulty.toUpperCase()}
                </div>
                <button
                  onClick={() => setDifficulty(null)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  ← Change Difficulty
                </button>
              </div>

              {/* Question */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">{currentQuestion.question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.shuffledOptions.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === currentQuestion.shuffledCorrectAnswer;
                  const showCorrect = showResult && isCorrectAnswer;
                  const showWrong = showResult && isSelected && !isCorrectAnswer;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`
                        w-full p-4 rounded-lg border-2 text-left transition-all
                        ${showCorrect ? 'border-green-500 bg-green-900/30' :
                          showWrong ? 'border-red-500 bg-red-900/30' :
                          isSelected ? 'border-indigo-500 bg-indigo-900/30' :
                          'border-gray-700 bg-gray-800 hover:border-gray-600'}
                        ${!showResult ? 'cursor-pointer' : 'cursor-default'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{option}</span>
                        {showCorrect && <span className="text-green-400 text-xl">✓</span>}
                        {showWrong && <span className="text-red-400 text-xl">✗</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Result */}
              {showResult && (
                <div className={`
                  p-6 rounded-xl border-2 mb-6
                  ${isCorrect 
                    ? 'border-green-500 bg-green-900/20' 
                    : 'border-red-500 bg-red-900/20'}
                `}>
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{isCorrect ? '🎉' : '😔'}</div>
                    <h4 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h4>
                    {isCorrect && difficulty && (
                      <p className="text-green-300 mb-3">
                        You earned ingredients! Check your inventory.
                      </p>
                    )}
                  </div>
                  
                  {currentQuestion.explanation && (
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!showResult ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className={`
                      flex-1 py-3 px-6 rounded-lg font-bold transition-all
                      ${selectedAnswer !== null
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <>
                    <button
                      onClick={tryAgain}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-bold transition-all"
                    >
                      Try Another Question
                    </button>
                    <button
                      onClick={closeQuiz}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold transition-all"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No more questions available for this difficulty.</p>
              <button
                onClick={() => setDifficulty(null)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg"
              >
                Choose Another Difficulty
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}