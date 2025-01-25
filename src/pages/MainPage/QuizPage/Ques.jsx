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
    }
  }, [quesId, Questions]);

  useEffect(() => {
    if (timeLeft === 0) handleNext();
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (ans === null) {
      alert("Please select an option!");
      return;
    }
    if (ans === Questions[quesId].correct_answer) setScore((prev) => prev + 1);
    if (quesId + 1 < Questions.length) {
      setQuesId((prev) => prev + 1);
      setAns(null);
      setTimeLeft(30);
    } else {
      setIsQuizComplete(true);
    }
  };

  if (Loading) return <h1>Loading...</h1>;
  if (isQuizComplete) {
    return (
      <div className="quiz-container">
        <div className="quiz-completed">
        <h2>Quiz Completed!</h2>
        <h3>Your score: {score} / {Questions.length}</h3>
      </div>
      </div>
    );
  }
  function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz Time</h1>
        <p>Test your knowledge and have fun!</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((quesId + 1) / Questions.length) * 100}%` }}></div>
        </div>
        <p className="timer">Time Left: {timeLeft} seconds</p>
      </header>
      <h3 className="quiz-question">{decodeHtmlEntities(Questions[quesId].question)}</h3>
      <div className="quiz-options">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setAns(option)}
            className={`quiz-option ${ans === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <button className="next-button" onClick={handleNext} disabled={ans === null}>
        Next
      </button>
      <footer className="quiz-footer">
        <p>Good luck! Keep pushing forward! 🎉</p>
      </footer>
    </div>
  );
};

export default Ques;
