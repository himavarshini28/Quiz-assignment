import React, { useEffect, useState } from 'react'



 function Quiz() {
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [quizData,setQuizData]=useState([]);
    
    useEffect(()=>{
         const fetchQuizData= async()=>
            {
                const API_URL = "http://localhost:3000/api/quiz"; 
                try{
                const response= await fetch(API_URL);
                if(!response.ok)
                {
                    throw new Error("Failed to fetch data");
                }
                const data=await response.json();
                console.log(data);
                setQuizData(data);
                }
                catch(error)
                {
                    console.error("Error fetching the data",error);
                    setError(error.message);

                }
                finally{
                    setLoading(false);
                    console.log("finisheddddddddddd");
                }
            
            }
            fetchQuizData();            
    },[])
  return (

    <div>
      
    </div>
  )
}

export default Quiz
