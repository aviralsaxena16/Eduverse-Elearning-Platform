//import LandingPage from './components/landingPage/LandingPage';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers/Routers.jsx';
import { AuthProvider } from './context/context.jsx';
const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routers/>
    </BrowserRouter>
    </AuthProvider>    
  )
}

export default App
