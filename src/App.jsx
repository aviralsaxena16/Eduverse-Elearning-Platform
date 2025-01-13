//import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//import Navbar from './components/landingPage/Navbar';
import MainPage from './pages/MainPage/MainPage';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
