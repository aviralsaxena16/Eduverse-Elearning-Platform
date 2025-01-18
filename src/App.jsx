//import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Routers.jsx';
import { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import { loginContext } from './context/context.jsx';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
   </loginContext.Provider> 
  )
}

export default App
