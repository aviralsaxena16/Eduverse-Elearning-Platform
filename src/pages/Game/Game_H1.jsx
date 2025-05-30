import { useState } from "react";
import "./Game_H1.css";
import rock from '../../assets/rock.png'
import paper from '../../assets/paper.png'
import scissor from '../../assets/scissor.png'

const Game_H1 = () => {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [message, setMessage] = useState("Play your move!");

  const choices = ["rock", "paper", "scissor"];

  const generateCompChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const playGame = (userChoice) => {
    const compChoice = generateCompChoice();
    console.log("User choice:", userChoice);
    console.log("Computer choice:", compChoice);

    if (userChoice === compChoice) {
      setMessage("It's a draw! Play again.");
    } else {
      let userWin = false;
      if (userChoice === "rock") {
        userWin = compChoice === "scissor";
      } else if (userChoice === "paper") {
        userWin = compChoice === "rock";
      } else {
        userWin = compChoice === "paper";
      }

      if (userWin) {
        setUserScore(userScore + 1);
        setMessage(`You won! Your ${userChoice} beats ${compChoice}`);
      } else {
        setCompScore(compScore + 1);
        setMessage(`You lose! ${compChoice} beats your ${userChoice}`);
      }
    }
  };
  
  return (
    <div className="game-container">
      <h1 className="game-title">Rock, Paper, Scissors Game!</h1>
      <div className="choices-container">
        
          <button className="choice-button" onClick={() => playGame('rock')}>
            <img src={rock} className="choice-image" />
          </button>
          <button className="choice-button" onClick={() => playGame('paper')}>
            <img src={paper} className="choice-image" />
          </button>
          <button className="choice-button" onClick={() => playGame('scissor')}>
            <img src={scissor} className="choice-image" />
          </button>
        
      </div>
      <div className="score-container">
        <div className="score">
          <p>{userScore}</p>
          <p>You</p>
        </div>
        <div className="score">
          <p>{compScore}</p>
          <p>Computer</p>
        </div>
      </div>
      <div className="message-container">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Game_H1;
