import React, { useState } from "react";

export default function HerbQuiz({ herb }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: `What is the primary AYUSH system that ${herb.name} is associated with?`,
      options: ["Ayurveda", "Yoga", "Unani", "Siddha"],
      correctAnswer: herb.ayushSystem,
    },
    {
      question: `Which of the following is NOT a medicinal use of ${herb.name}?`,
      options: [
        ...herb.medicinalUses.slice(0, 3),
        "Cures all diseases", // Incorrect option
      ],
      correctAnswer: "Cures all diseases",
    },
    {
      question: `What is a key characteristic of ${herb.name}?`,
      options: [
        herb.shortDescription,
        "It only grows in Antarctica",
        "Its a type of fungus",
        "Its artificially created in labs",
      ],
      correctAnswer: herb.shortDescription,
    },
    {
      question: `How many medicinal uses are listed for ${herb.name}?`,
      options: ["1", "2", "3", "4"],
      correctAnswer: herb.medicinalUses.length.toString(),
    },
  ];

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setShowScore(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  if (!showQuiz) {
    return (
      <button
        onClick={startQuiz}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Take Quiz
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-4">
            Your score: {score} out of {questions.length}
          </p>
          <button
            onClick={startQuiz}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2 mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="block w-full text-left bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
