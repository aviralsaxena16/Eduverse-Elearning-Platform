//import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//import Navbar from './components/landingPage/Navbar';
import Navbar2 from './pages/MainPage/Navbar2/Navbar2';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar2/>}></Route>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
