import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import MainPage from '../pages/MainPage/MainPage.jsx'
import BotPage from '../pages/MainPage/BotPage.jsx'
import GamePage from '../pages/MainPage/GamePage.jsx'
import CoursePage from '../pages/MainPage/CoursePage.jsx'
import QuizPage from '../pages/MainPage/QuizPage.jsx'
import NotificationPage from '../pages/MainPage/NotificationPage.jsx'

const Routers = () => {
  return (


    <Router>
      <Routes>
        <Route path='/' element={
          isLoggedIn ? (
            <Navigate to="/home" />
          ) : (
            <LandingPage onLogin={() => setIsLoggedIn(true)} />
          )
        }
      /> 

       <Route
        path="/home"
        element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
      />
                
        <Route path='home/notification' element={<NotificationPage />}/>
        <Route path='home/course' element={<CoursePage />} />
        <Route path='home/bot' element={<BotPage/>} />
        <Route path='home/games' element={<GamePage />} />
        <Route path='home/quiz' element={<QuizPage />} />
      </Routes>
    </Router>
    
  )
}

export default Routers

