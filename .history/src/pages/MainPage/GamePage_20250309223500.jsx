/*import Card from "../../components/Cards/Card"
import { useNavigate } from "react-router-dom"
const GamePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Game Page</h1>
      <div onClick={()=>{navigate('/home/games/tictac')}}>
      <Card title="Tic Tac Toe" url='https://images-cdn.ubuy.co.in/634e9673d2765619b765a602-sulobom-tic-tac-toe-board-game-tic-tac.jpg' />
      </div>
      <div onClick={()=>{navigate('/home/games/rock-paper-scissors')}}>
      <Card title="Rock Paper Scissor" url='https://play-lh.googleusercontent.com/Vj7-ZgkYSK0Lbxsbu4-3tI9J_rvUSrMxycN2WZknhFfEVr7aEl0ZhejD4z3rWzgNMqI=w526-h296-rw'
       />
      </div>
    </div>
  )
}

export default GamePage*/
import Card from "../../components/Cards/Card";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className="game-page">
      <h1 className="game-title">Game Page</h1>
      <div className="game-grid">
        <div className="game-card" onClick={() => navigate("/home/games/tictac")}>
          <Card
            title="Tic Tac Toe"
            url="https://images-cdn.ubuy.co.in/634e9673d2765619b765a602-sulobom-tic-tac-toe-board-game-tic-tac.jpg"
          />
        </div>
        <div className="game-card" onClick={() => navigate("/home/games/rock-paper-scissors")}>
          <Card
            title="Rock Paper Scissor"
            url="https://play-lh.googleusercontent.com/Vj7-ZgkYSK0Lbxsbu4-3tI9J_rvUSrMxycN2WZknhFfEVr7aEl0ZhejD4z3rWzgNMqI=w526-h296-rw"
          />
        </div>
      </div>

      <style>{`
        .game-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f8f9fa;
          padding: 40px 20px;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }

        .game-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
          width: ;
          max-width: 600px;
        }

        .game-card {
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }

        .game-card:hover {
          transform: scale(1.05);
        }

        @media (max-width: 600px) {
          .game-title {
            font-size: 2rem;
          }

          .game-grid {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default GamePage;
