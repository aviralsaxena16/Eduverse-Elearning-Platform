import { useState } from "react";
import Game_H1 from "./Game_H1"; 
import "./Game.css";
const Game = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="game-page">
      <h1 className="game-title">Choose a Game to Play</h1>
      {!selectedGame ? (
        <div className="game-options">
          <button className="game-button" onClick={() => setSelectedGame("rock-paper-scissors")}>
            Rock, Paper, Scissors
          </button>
          <button className="game-button" disabled>
            Tic Tac Toe (Coming Soon)
          </button>
        </div>
      ) : (
        <div>
          <button className="back-button" onClick={() => setSelectedGame(null)}>
            ⬅ Back to Game Selection
          </button>
          {selectedGame === "rock-paper-scissors" && <Game_H1 />}
        </div>
      )}
    </div>
  );
};

export default Game;
