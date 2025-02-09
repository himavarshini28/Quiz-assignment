import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState ,useEffect} from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from './pages/Result';
import "./index.css";

function App() {
  
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <Router>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="bg-background min-h-screen text-white">
        
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Routes>
      
        </div>
      </div>
    </Router>
  );
}


export default App;
