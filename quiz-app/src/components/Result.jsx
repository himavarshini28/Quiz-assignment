import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
function Result() {

  const location=useLocation();
  const navigate = useNavigate();
  const { score, attempted } = location.state || {score:0, attempted:0};
  const handleRestart = ()=>
  {
      navigate("/quiz",{state:{reset:true}})
  }
  return (
    <div>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed! 🎉</h1>
      <p className="text-xl font-semibold text-gray-700">Score: {score}</p>
      <p className="text-lg text-gray-600">Questions Attempted: {attempted}</p>
      <button
      onClick={()=>handleRestart()}
      className="px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
    >
      Restart
    </button>
    </div>
    
    </div>
  )
}

export default Result
