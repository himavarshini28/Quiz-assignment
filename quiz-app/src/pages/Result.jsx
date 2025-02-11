import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Leaderboard from "../components/Leaderboard.jsx";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, attempted } = location.state || { score: 0, attempted: 0 };

  const handleRestart = () => {
    navigate("/quiz", { state: { reset: true } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#001f1f] text-white p-6 mb-0 pb-0"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-6xl text-yellow-400 mb-6 drop-shadow-lg"
      >
        <FaTrophy />
      </motion.div>

      <motion.h1
        className="text-4xl font-extrabold text-[#00cccc] neon-text mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        Quiz Completed! 🎉
      </motion.h1>

      <motion.p
        className="text-2xl font-semibold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
      >
        Score: <span className="text-[#00cccc]">{score}</span>
      </motion.p>

      <motion.p
        className="text-lg text-gray-300 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
      >
        Questions Attempted: <span className="text-[#00cccc]">{attempted}</span>
      </motion.p>

      <motion.button
        onClick={handleRestart}
        className="px-6 py-3 text-lg font-semibold text-white bg-[#00cccc] rounded-lg shadow-md hover:bg-[#009999] transition duration-300 transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
      >
        Restart Quiz
      </motion.button>

      <Leaderboard />
    </motion.div>
  );
}

export default Result;
