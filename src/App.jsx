//import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers/Routers.jsx';
import { useState } from 'react';
import { loginContext } from './context/context.jsx';
const App = () => {
  return (

    <BrowserRouter>
    <Routers/>
    </BrowserRouter>
  )
}

export default App
