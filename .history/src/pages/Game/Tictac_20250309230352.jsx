import React, { useState } from 'react';
import axios from 'axios';
import './tictac.css';

const Tictac = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(true);

  const winnercheck = (board) => {
    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        return board[a];
      }
    }
    if (!board.includes('')) {
      setWinner('Draw');
      return 'Draw';
    }
    return null;
  };

  const handleClick = async (index) => {
    if (!isUserTurn || board[index] || winner) return;

    let newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsUserTurn(false);

    if (winnercheck(newBoard)) return;
    setTurn('O');

    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:4507/move', { board: newBoard });
        if (response.data.move !== null) {
          newBoard[response.data.move] = 'O';
          setBoard([...newBoard]);
          winnercheck(newBoard);
        }
      } catch (error) {
        console.error('Error getting AI move:', error);
      }
      setIsUserTurn(true);
    }, 1000); // AI waits for 1 sec
  };

  const restartGame = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
    setTurn('X');
    setIsUserTurn(true);
  };

  return (
    <div className="game-container">
      <div className="game-board">
        <h1 className="game-title">Tic-Tac-Toe <div className="game-subtitle">vs AI</div></h1>
        <div className="board-grid">
          {board.map((cell, i) => (
            <button key={i} onClick={() => handleClick(i)} className={`cell ${cell}`} disabled={!isUserTurn || cell !== ''}>
              {cell}
            </button>
          ))}
        </div>
        {winner && (
          <div className="winner-container">
          <span className="winner-message">
            {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
          </span>
          <br
          <button onClick={restartGame} className="restart-button">Restart</button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Tictac;
