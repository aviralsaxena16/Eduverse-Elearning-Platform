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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Game Page
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/home/games/tictac")}
        >
          <Card
            title="Tic Tac Toe"
            url="https://images-cdn.ubuy.co.in/634e9673d2765619b765a602-sulobom-tic-tac-toe-board-game-tic-tac.jpg"
          />
        </div>
        <div
          className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/home/games/rock-paper-scissors")}
        >
          <Card
            title="Rock Paper Scissor"
            url="https://play-lh.googleusercontent.com/Vj7-ZgkYSK0Lbxsbu4-3tI9J_rvUSrMxycN2WZknhFfEVr7aEl0ZhejD4z3rWzgNMqI=w526-h296-rw"
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
