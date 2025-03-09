import Card from "../../components/Cards/Card"
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

export default GamePage