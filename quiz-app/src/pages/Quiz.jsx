import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Quiz() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [Index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const totalTime = 300;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const location = useLocation();
  const navigate = useNavigate();
  const scoreRef = useRef(0);
  const attemptedRef = useRef(0);

  useEffect(() => {
    if (location.state?.reset) {
      scoreRef.current = 0;
      attemptedRef.current = 0;
      setIndex(0);
      setSelectedOption(null);
      setTimeLeft(totalTime);
    }
  }, [location.state]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const fetchQuizData = async () => {
      const API_URL = "http://localhost:5000/api/quiz";
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!quizData || !quizData.questions || quizData.questions.length === 0)
    return <p className="text-center text-xl">Quiz data is not available</p>;

  const currentQuestion = quizData.questions[Index];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    const completionTime = totalTime - timeLeft;
    const username = localStorage.getItem("username") || "Unknown User";
    const participantData = { name: username, score: scoreRef.current, timeTaken: completionTime };
    try {
      await fetch("http://localhost:5000/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participantData),
      });
    } catch (error) {}
    navigate("/result", {
      state: { score: scoreRef.current, attempted: attemptedRef.current, timeTaken: completionTime },
    });
  };

  const handleNext = () => {
    const selectedAnswer = currentQuestion.options.find((option) => option.id === selectedOption);
    if (selectedAnswer) {
      attemptedRef.current += 1;
    }
    if (selectedAnswer && selectedAnswer.is_correct) {
      scoreRef.current += 1;
    }
    if (Index < quizData.questions.length - 1) {
      setIndex(Index + 1);
      setSelectedOption(null);
    } else {
      handleSubmit();
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor((seconds % 3600) % 60);
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div className="w-[900px] max-w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xl font-bold text-red-500 text-center mb-2">{formatTime(timeLeft)}</p>
        <div className="w-[900px] max-w-full bg-gray-700 h-4 rounded-lg overflow-hidden mb-6">
          <motion.div className="h-full bg-cyan-100" initial={{ width: "100%" }} animate={{ width: `${(timeLeft / totalTime) * 100}%` }} transition={{ duration: 1, ease: "linear" }} />
        </div>
      </motion.div>

      <motion.div className="bg-teal-800 px-6 py-6 rounded-lg shadow-md text-center w-[900px] max-w-full" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <p className="text-2xl font-bold text-white break-words">{currentQuestion.description}</p>
      </motion.div>

      <motion.div className="flex flex-col gap-4 mt-4 w-[900px] max-w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        {currentQuestion.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelectOption(option.id)}
            className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 w-full ${
              selectedOption === option.id ? "bg-blue-500 text-white" : "bg-gray-800 hover:bg-gray-600 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.description}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="w-[900px] max-w-full flex justify-end mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.button
          onClick={handleNext}
          className="px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {Index < quizData.questions.length - 1 ? "Save & Next" : "Submit"}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Quiz;
