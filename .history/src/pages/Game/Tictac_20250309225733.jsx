import React, { useState } from 'react';
import axios from 'axios';
import './tictac.css';

const Tictac = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const winnercheck = (currentBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c]) {
        setWinner(currentBoard[a]);
        return currentBoard[a];
      }
    }
    if (!currentBoard.includes('')) {
      setWinner('Draw');
      return 'Draw';
    }
    return null;
  };

  const handleClick = async (index) => {
    if (board[index] || winner) return;
    let newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    if (winnercheck(newBoard)) return;
    setTurn('O');

    try {
      const response = await axios.post('http://localhost:4507/move', { board: newBoard });
      if (response.data.move !== null) {
        newBoard[response.data.move] = 'O';
        setBoard(newBoard);
        winnercheck(newBoard);
      }
    } catch (error) {
      console.error('Error getting AI move:', error);
    }
    setTurn('X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
    setTurn('X');
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Tic-Tac-Toe <span className="subtitle">vs AI</span></h1>
      <div className="turn-indicator">{winner ? `Game Over!` : `Turn: ${turn}`}</div>
      <div className="board-grid">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''} ${winner && winningCombinations.flat().includes(i) ? 'win' : ''}`}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <div className="winner-message">{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</div>}
      <button className="reset-button" onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Tictac;
