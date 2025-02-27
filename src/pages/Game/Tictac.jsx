import React, { useState } from 'react';
import axios from 'axios';
import './tictac.css';  // Import the CSS file

const Tictac = () => {
  const [board, setBoard] = useState(['','','','','','','','','']);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const winnercheck = (board) => {
    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for(let i = 0; i < winningCombinations.length; i++) {
      const [a,b,c] = winningCombinations[i];
      if(board[a] && board[a]===board[b] && board[b]===board[c]) {
        setWinner(board[a]);
        return winner;
      }
    }
    return null;
  };

  const handleClick = async (index) => {
    if (board[index] || winner) {
      return;
    }
    let newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    if (winnercheck(newBoard)) {
      alert(`You won!`);
      return;
    }
    setTurn('O');

    try {
      const response = await axios.post('http://localhost:4507/move', { 
        board: newBoard 
      });
      if (response.data.move !== null) {
        const aiBoard = [...newBoard];
        aiBoard[response.data.move] = 'O';
        setBoard(aiBoard);
        
        if (winnercheck(aiBoard)) {
          alert('AI won!');
        }
      }
    } catch (error) {
      console.error('Error getting AI move:', error);
    }
  };

  return (
    <div className="game-container">
      <div className="game-board">
        <h1 className="game-title">
          Tic-Tac-Toe
          <div className="game-subtitle">vs AI</div>
        </h1>
        
        <div className="board-grid">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`}
            >
              {cell}
            </button>
          ))}
        </div>

        {winner && (
          <div className="winner-message">
            {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tictac;