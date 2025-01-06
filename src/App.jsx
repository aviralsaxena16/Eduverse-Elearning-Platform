import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/landingPage/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
