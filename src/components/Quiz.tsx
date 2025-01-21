import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const quizQuestions = [
  {
    question: "What’s your ideal date night?",
    options: ["Candlelit dinner", "Movie night", "Stargazing", "Adventure sports"],
  },
  {
    question: "Which color describes your mood today?",
    options: ["Pink", "Gold", "Purple", "Blue"],
  },
  {
    question: "What’s your favorite way to relax?",
    options: ["Music", "Reading", "Long walks", "Cooking"],
  },
];

const songResults = {
  CandlelitDinnerPinkMusic: {
    song: "Perfect",
    artist: "Ed Sheeran",
    message: "Your song is 'Perfect' by Ed Sheeran—just like you, it's timeless and romantic.",
  },
  MovieNightGoldReading: {
    song: "All of Me",
    artist: "John Legend",
    message: "Your song is 'All of Me' by John Legend—deep and heartfelt, just like your bond.",
  },
  StargazingPurpleLongWalks: {
    song: "Yellow",
    artist: "Coldplay",
    message: "Your song is 'Yellow' by Coldplay—a perfect blend of calm and beauty.",
  },
  AdventureSportsBlueCooking: {
    song: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    message: "Your song is 'Uptown Funk'—fun, vibrant, and full of energy, just like you!",
  },
};

function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<null | { song: string; artist: string; message: string }>(null);

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers, answer.replace(/\s+/g, "")]; // Remove spaces to match keys
    setAnswers(updatedAnswers);

    if (currentQuestion === quizQuestions.length - 1) {
      const key = updatedAnswers.join("") as keyof typeof songResults; // Fixed key typing
      setResult(songResults[key] || null);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 text-white p-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
        {result ? (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Your Song Match</h2>
            <p className="text-xl">
              <span className="font-semibold">{result.song}</span> by {result.artist}
            </p>
            <p className="text-lg text-purple-200">{result.message}</p>
            <button
              onClick={resetQuiz}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-all"
            >
              Take the Quiz Again
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {quizQuestions[currentQuestion].question}
            </h2>
            <div className="grid gap-4">
              {quizQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 text-right">
              <span className="text-purple-200 text-sm">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizSection;
