import Card from "../../components/Cards/Card";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className="game-page">
      {/* Header Section */}
      <header className="game-header">
        <h1 className="game-title">Welcome to the Game Zone</h1>
        <p className="game-subtitle">
          Enjoy classic and fun games. Click on a game to start playing!
        </p>
      </header>

      {/* Games Section */}
      <div className="game-grid">
        <div
          className="game-card"
          onClick={() => navigate("/home/games/tictac")}
        >
          <Card
            title="Tic Tac Toe"
            url="https://images-cdn.ubuy.co.in/634e9673d2765619b765a602-sulobom-tic-tac-toe-board-game-tic-tac.jpg"
          />
        </div>
        <div
          className="game-card"
          onClick={() => navigate("/home/games/rock-paper-scissors")}
        >
          <Card
            title="Rock Paper Scissors"
            url="https://play-lh.googleusercontent.com/Vj7-ZgkYSK0Lbxsbu4-3tI9J_rvUSrMxycN2WZknhFfEVr7aEl0ZhejD4z3rWzgNMqI=w526-h296-rw"
          />
        </div>
      </div>

      {/* More Games Section */}
      <section className="more-games">
        <h2>More Games Coming Soon!</h2>
        <p>Stay tuned for exciting new games.</p>
      </section>

      <style>{`
        .game-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f4f4f4;
          padding: 40px 20px;
          text-align: center;
        }

        .game-header {
          margin-bottom: 40px;
        }

        .game-title {
          font-size: 2.8rem;
          font-weight: bold;
          color: #05445E;
        }

        .game-subtitle {
          font-size: 1.2rem;
          color: #333;
          margin-top: 10px;
        }

        .game-grid {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1000px;
        }

        .game-card {
          flex: 1;
          max-width: 350px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .game-card:hover {
          transform: scale(1.05);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        }

        .more-games {
          margin-top: 50px;
          padding: 20px;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 600px;
        }

        .more-games h2 {
          color: #066466;
          font-size: 1.8rem;
        }

        .more-games p {
          color: #555;
          font-size: 1.1rem;
        }

        @media (max-width: 600px) {
          .game-title {
            font-size: 2rem;
          }
          .game-grid {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default GamePage;
