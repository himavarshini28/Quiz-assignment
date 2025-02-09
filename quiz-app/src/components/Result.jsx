import React from 'react'
import {useLocation} from 'react-router-dom';
function Result() {

  const location=useLocation();
  const { score, attempted } = location.state || {score:0, attempted:0};
  return (
    <div>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed! 🎉</h1>
      <p className="text-xl font-semibold text-gray-700">Score: {score}</p>
      <p className="text-lg text-gray-600">Questions Attempted: {attempted}</p>
    </div>
    </div>
  )
}

export default Result
