
import Navbar2 from '../../components/Navbar2/Navbar2.jsx';
import BotPage from './BotPage.jsx';
import axios from 'axios'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
const MainPage = () => {
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:4507/home')
    .then(res=>{
      if(res.data != 'Success'){
        navigate('/login')
      }
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div>
        <Navbar2/>
        <BotPage/>
    </div>
  )
}

export default MainPage