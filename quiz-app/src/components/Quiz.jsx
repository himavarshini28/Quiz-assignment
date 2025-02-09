import React, { useEffect, useState , useRef} from "react";
import {useNavigate} from "react-router-dom";

function Quiz() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [Index, setIndex] = useState(0);
  const [selectedOption,setSelectedOption]=useState(null);

  
  const navigate=useNavigate();
  const scoreRef= useRef(0);
  const attemptedRef = useRef(0);
  useEffect(() => {
    const fetchQuizData = async () => {
      const API_URL = "http://localhost:3000/api/quiz";
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching the data", error);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("finisheddddddddddd");
      }
    };
    fetchQuizData();
  }, []);
  if (loading) return <p className="text-center text-xl">Loading.....</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!quizData || quizData.length == 0)
    return <p className="text-center text-xl">Quiz data is not available</p>;
  const currentQuestion = quizData.questions[Index];

  const handleSelectOption=(optionId)=>
  {
    setSelectedOption(optionId);
    console.log(optionId);
  };

  const handleNext =()=>
  {
    
    const selectedAnswer=currentQuestion.options.find((option)=>(
      option.id == selectedOption
    ));
    if(selectedAnswer)
    {
      attemptedRef.current+=1;
    }
    if (selectedAnswer && selectedAnswer.is_correct)
    {
      scoreRef.current+=1;
    }
    if(Index<quizData.questions.length-1)
    {
      setIndex(Index+1);
    }
    else{
   
      navigate("/result",{
        state:{
          score: scoreRef.current,
          attempted : attemptedRef.current,
        }
      })
    
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white px-6 py-4 rounded-lg shadow-md text-center w-[900px] max-w-full">
        <p className="text-2xl font-bold text-gray-800 break-words">
          {currentQuestion.description}
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-4 w-[900px] max-w-full">
        {currentQuestion.options.map((option) => (
          <button
            onClick={()=>handleSelectOption(option.id)}
            key={option.id}
            className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition duration-300 w-full
              ${
                selectedOption === option.id ? " text-white bg-blue-500 " :
                "text-white bg-blue-300  hover:bg-blue-400"
              }
              `}
          >
            {option.description}
          </button>
        ))}
      </div>
      <div className="w-[900px] max-w-full flex justify-end mt-6">
    <button
      onClick={()=>handleNext()}
      className="px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
    >
      {Index < quizData.questions.length - 1 ? "Save & Next" : "Submit"}
    </button>
  </div>
    </div>

  );
}

export default Quiz;
