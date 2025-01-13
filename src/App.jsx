//import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Router from './routers/Routers.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
  
  )
}

export default App
