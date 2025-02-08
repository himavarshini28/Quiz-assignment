import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Welcome to the Quiz App</h1>
        <button
          onClick={() => navigate("/quiz")}
          className="w-full px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 md:w-auto md:px-8"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;
