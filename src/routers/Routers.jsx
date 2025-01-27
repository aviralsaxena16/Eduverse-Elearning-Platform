import { Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';
import BotPage from '../pages/MainPage/BotPage.jsx';
import GamePage from '../pages/MainPage/GamePage.jsx';
import CoursePage from '../pages/MainPage/CoursePage.jsx';
import QuizPage from '../pages/MainPage/QuizPage/QuizPage.jsx';
import NotificationPage from '../pages/MainPage/NotificationPage.jsx';
import Login from '../pages/LoginPage/Login.jsx';
import Signup from '../pages/SignUp/Signup.jsx';
import Ques from '../pages/MainPage/QuizPage/ques.jsx';
import ChatRoom from '../pages/MainPage/chatroom/ChatRoom.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import VideoDetails from '../pages/MainPage/VideoDetails.jsx';

const Routers = () => {
  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
  
    {/* Main Routes */}
    <Route path="/home" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
    <Route path="/home/notification" element={
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        } />
    <Route path="/home/course" element={
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        } />

<Route path="/home/course/video/:videoID" element={
          <ProtectedRoute>
            <VideoDetails />
          </ProtectedRoute>
        } />
    <Route path="/home/chat" element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        } />
    <Route path="/home/games" element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        } />
    <Route path="/home/quiz" element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } />
    <Route path="/quiz/:id" element={
          <ProtectedRoute>
            <Ques />
          </ProtectedRoute>
        } />
  </Routes>
  );
};

export default Routers;
