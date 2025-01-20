import { Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';
import BotPage from '../pages/MainPage/BotPage.jsx';
import GamePage from '../pages/MainPage/GamePage.jsx';
import CoursePage from '../pages/MainPage/CoursePage.jsx';
import QuizPage from '../pages/MainPage/QuizPage.jsx';
import NotificationPage from '../pages/MainPage/NotificationPage.jsx';
import Login from '../pages/LoginPage/Login.jsx';
import Signup from '../pages/SignUp/Signup.jsx';

const Routers = () => {
  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
  
    {/* Main Routes */}
    <Route path="/home" element={<MainPage />} />
    <Route path="/home/notification" element={<NotificationPage />} />
    <Route path="/home/course" element={<CoursePage />} />
    <Route path="/home/bot" element={<BotPage />} />
    <Route path="/home/games" element={<GamePage />} />
    <Route path="/home/quiz" element={<QuizPage />} />
  </Routes>
  );
};

export default Routers;
