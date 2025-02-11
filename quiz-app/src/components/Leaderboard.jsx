import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [highestScore, setHighestScore] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Unknown User";

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://quiz-assignment-bkbt.vercel.app/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data);
        const userScores = data.filter((entry) => entry.name === username);
        if (userScores.length > 0) {
          const maxScore = Math.max(...userScores.map((entry) => entry.score));
          setHighestScore(maxScore);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-[#001f1f] text-white mt-6 pt-4">
      <h1 className="text-4xl font-extrabold text-[#009999] neon-text mb-6">
        🏆 Leaderboard
      </h1>

      {highestScore !== null && (
        <p className="text-lg font-semibold text-[#009999] mb-4">
          Your Highest Score: {highestScore}
        </p>
      )}

      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-[600px] max-w-full border border-[#009999]">
        <table className="min-w-full text-center border border-[#009999]">
          <thead className="bg-[#009999] text-gray-900">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 5).map((entry, index) => (
              <tr key={index} className="border-b border-[#009999] hover:bg-[#002626]">
                <td className="px-4 py-2 font-bold text-[#009999]">{index + 1}</td>
                <td className="px-4 py-2">{entry.name}</td>
                <td className="px-4 py-2 font-semibold text-[#009999]">{entry.score}</td>
                <td className="px-4 py-2">{entry.timeTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-[#009999] rounded-lg shadow-md hover:bg-[#009999] transition duration-300 transform hover:scale-105"
      >
        🔙 Back to Home
      </button>
    </div>
  );
}

export default Leaderboard;
