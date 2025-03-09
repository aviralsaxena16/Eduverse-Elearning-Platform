import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './quiz_ques.css';

const Ques = () => {
  const { id } = useParams();
  const [quesId, setQuesId] = useState(0);
  const [score, setScore] = useState(0);
  const [Questions, setQuestions] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [ans, setAns] = useState(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`);
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (Questions.length > 0) {
      const options = [Questions[quesId].correct_answer, ...Questions[quesId].incorrect_answers];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
      setIsAnswerRevealed(false);
    }
  }, [quesId, Questions]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsAnswerRevealed(true);
      // Wait 2 seconds before moving to next question when time runs out
      setTimeout(() => handleNext(), 2000);
    }
    
   
    const timer = setInterval(() => {
      if (timeLeft > 0 && !isAnswerRevealed) {
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isAnswerRevealed]);

  const handleOptionClick = (option) => {
    if (isAnswerRevealed) return;
    setAns(option);
    setIsCorrect(option === Questions[quesId].correct_answer);
  };

  const handleNext = () => {
    if (ans === null && !isAnswerRevealed) {
      alert("Please select an option!");
      return;
    }
    
    if (!isAnswerRevealed) {
      setIsAnswerRevealed(true);
      setShowFeedback(true);
      
      if (ans === Questions[quesId].correct_answer) {
        setScore(prev => prev + 1);
      }
      
      // Wait 2 seconds before moving to next question
      setTimeout(() => {
        moveToNextQuestion();
      }, 2000);
      
      return;
    }
    
    moveToNextQuestion();
  };
  
  const moveToNextQuestion = () => {
    setShowFeedback(false);
    
    if (quesId + 1 < Questions.length) {
      setQuesId(prev => prev + 1);
      setAns(null);
      setTimeLeft(30);
      setIsAnswerRevealed(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const getTimerClassName = () => {
    if (timeLeft <= 5) return "timer danger";
    if (timeLeft <= 10) return "timer warning";
    return "timer";
  };

  function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  if (Loading) return (
    <div className="quiz-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading questions...</p>
      </div>
    </div>
  );
  
  // Replace your existing quiz completion return statement with this:
if (isQuizComplete) {
  return (
    <div className="quiz-container">
      <div className="quiz-completed">
        <h2>Quiz Completed!</h2>
        <div className="score-value">{score} / {Questions.length}</div>
        <h3>
          {score === Questions.length 
            ? "Perfect Score! 🏆" 
            : score >= Questions.length * 0.7 
              ? "Great Job! 🎉" 
              : score >= Questions.length * 0.5 
                ? "Good Effort! 👍" 
                : "Keep Learning! 📚"}
        </h3>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz Time</h1>
        <p>Test your knowledge and have fun!</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((quesId + 1) / Questions.length) * 100}%` }}></div>
        </div>
        <div className={getTimerClassName()}>
          Time Left: {timeLeft} seconds
        </div>
      </header>
      
      <h3 className="quiz-question">{decodeHtmlEntities(Questions[quesId].question)}</h3>
      
      <div className="quiz-options">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className={`quiz-option 
              ${ans === option ? 'selected' : ''} 
              ${isAnswerRevealed && option === Questions[quesId].correct_answer ? 'correct' : ''} 
              ${isAnswerRevealed && ans === option && option !== Questions[quesId].correct_answer ? 'incorrect' : ''}
              ${isAnswerRevealed ? 'disabled' : ''}`}
            disabled={isAnswerRevealed}
          >
            {decodeHtmlEntities(option)}
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct! Well done! 👏' : `Incorrect! The correct answer is: ${decodeHtmlEntities(Questions[quesId].correct_answer)}`}
        </div>
      )}
      
      <button 
        className="next-button" 
        onClick={handleNext} 
        disabled={ans === null && !isAnswerRevealed}
      >
        {isAnswerRevealed ? 'Continue' : 'Submit Answer'}
      </button>
      
      <footer className="quiz-footer">
        <p>Question {quesId + 1} of {Questions.length} • Score: {score}</p>
      </footer>
    </div>
  );
};

export default Ques;