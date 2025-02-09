import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleStartQuiz = () => {
    if (!username.trim()) {
      alert("Please enter your name to start the quiz.");
      return;
    }
    localStorage.setItem("username", username);
    navigate("/quiz");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <motion.h1
        className="text-4xl font-extrabold text-primary mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Welcome to the Ultimate Learning🚀
      </motion.h1>

      <motion.input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-3 mb-6 text-lg border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 w-80 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      />

      <motion.button
        onClick={handleStartQuiz}
        className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        🚀 Start Quiz
      </motion.button>
    </div>
  );
}

export default Home;
