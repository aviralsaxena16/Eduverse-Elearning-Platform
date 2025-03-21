
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import "./FeatureCards.css"; 



const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar/>
      <Body/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
