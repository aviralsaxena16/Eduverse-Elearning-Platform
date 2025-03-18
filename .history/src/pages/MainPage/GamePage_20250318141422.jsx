import Card from "../../components/Cards/Card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className="game-page">
      {/* Header Section */}
      
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <header className="game-header">
        <h1 className="game-title">Welcome to the Game Zone</h1>
        <p className="game-subtitle">
          Enjoy classic and fun games. Click on a game to start playing!
        </p>
      </header>

      {/* Games Section */}
      <div className="game-grid">
        {[ 
          { title: "Tic Tac Toe", url: "https://images-cdn.ubuy.co.in/634e9673d2765619b765a602-sulobom-tic-tac-toe-board-game-tic-tac.jpg", path: "/home/games/tictac" },
          { title: "Rock Paper Scissors", url: "https://img.gamemonetize.com/bf1w3zr5zll9e9zeh0wre7wawys460th/512x512.jpg", path: "/home/games/rock-paper-scissors" }
        ].map((game, index) => (
          <motion.div
            key={index}
            className="game-card"
            onClick={() => navigate(game.path)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card title={game.title} url={game.url} />
            <div className="game-card-overlay">
              <div className="play-button">Play Now</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Games Section */}
      <motion.section 
        className="more-games"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="glow-effect"></div>
        <h2>More Games Coming Soon!</h2>
        <p>Stay tuned for exciting new games.</p>
        <div className="coming-soon-games">
          <div className="coming-soon-item">
            <div className="coming-soon-placeholder"></div>
            <span>Memory Match</span>
          </div>
          <div className="coming-soon-item">
            <div className="coming-soon-placeholder"></div>
            <span>Snake Game</span>
          </div>
          <div className="coming-soon-item">
            <div className="coming-soon-placeholder"></div>
            <span>Sudoku</span>
          </div>
        </div>
      </motion.section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Russo+One&display=swap');

        .game-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #0f0c29;
          position: relative;
          overflow: hidden;
          padding: 40px 20px;
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }

        .stars, .twinkling {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .stars {
          background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center;
        }

        .twinkling {
          background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center;
          animation: move-background 70s linear infinite;
        }

        @keyframes move-background {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1000px 0;
          }
        }

        .game-header {
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
          padding: 30px;
          background: rgba(15, 12, 41, 0.7);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 800px;
        }

        .game-title {
          font-size: 3.5rem;
          font-weight: bold;
          font-family: 'Russo One', sans-serif;
          color: #fff;
          text-shadow: 0 0 10pxrgb(48, 64, 213), 0 0 20px #6357ff, 0 0 30px #6357ff;
          letter-spacing: 2px;
          margin-bottom: 15px;
          background: linear-gradient(to right, #c31432, #240b36);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
         
        }

        @keyframes glow {
          0% {
            text-shadow: 0 0 10px rgba(99, 87, 255, 0.5);
          }
          100% {
            text-shadow: 0 0 20px rgba(99, 87, 255, 1), 0 0 30px rgba(99, 87, 255, 0.8), 0 0 40px rgba(99, 87, 255, 0.6);
          }
        }

       

        .game-grid {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1200px;
          position: relative;
          z-index: 2;
          perspective: 1000px;
        }

        .game-card {
          flex: 1;
          min-width: 280px;
          max-width: 400px;
          cursor: pointer;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(99, 87, 255, 0.5);
          position: relative;
          transform-style: preserve-3d;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .game-card:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
          z-index: 1;
        }

        .game-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .game-card:hover .game-card-overlay {
          opacity: 1;
        }

        .play-button {
          background: linear-gradient(135deg, #c31432 0%, #240b36 100%);
          color: white;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1.2rem;
          letter-spacing: 1px;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .game-card:hover .play-button {
          transform: translateY(0);
          opacity: 1;
        }

        .more-games {
          margin-top: 80px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 800px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .glow-effect {
          position: absolute;
          top: -50px;
          left: -50px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(99, 87, 255, 0.8) 0%, rgba(99, 87, 255, 0) 70%);
          border-radius: 50%;
          filter: blur(30px);
          animation: float 6s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(calc(100% + 50px), calc(100% + 50px));
          }
        }

        .more-games h2 {
          color: #fff;
          font-size: 2.2rem;
          font-family: 'Russo One', sans-serif;
          margin-bottom: 20px;
          text-shadow: 0 0 10px rgba(99, 87, 255, 0.5);
        }

        .more-games p {
          color: #e0e0e0;
          font-size: 1.2rem;
          margin-bottom: 30px;
        }

        .coming-soon-games {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .coming-soon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .coming-soon-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .coming-soon-placeholder:after {
          content: "?";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 40px;
          color: rgba(255, 255, 255, 0.3);
        }

        .coming-soon-item span {
          color: #e0e0e0;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .game-title {
            font-size: 2.5rem;
          }
          
          .game-header {
            padding: 20px;
            margin-bottom: 40px;
          }
          
          .game-subtitle {
            font-size: 1.1rem;
          }
          
          .game-grid {
            flex-direction: column;
            align-items: center;
            gap: 30px;
          }
          
          .game-card {
            width: 100%;
          }
          
          .more-games {
            padding: 30px 20px;
            margin-top: 60px;
          }
          
          .coming-soon-games {
            gap: 20px;
          }
          
          .coming-soon-placeholder {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 480px) {
          .game-title {
            font-size: 2rem;
          }
          
          .game-header {
            padding: 15px;
          }
          
          .game-subtitle {
            font-size: 1rem;
          }
          
          .more-games h2 {
            font-size: 1.8rem;
          }
          
          .more-games p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GamePage;