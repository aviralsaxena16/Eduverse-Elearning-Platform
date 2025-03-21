
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import "./FeatureCards.css"; 

const features = [
  {
    id: 1,
    title: "Interactive Learning",
    description: "Engage with interactive lessons designed to make learning fun and effective.",
    icon: "📚"
  },
  {
    id: 2,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience in their fields.",
    icon: "👨‍🏫"
  },
  {
    id: 3,
    title: "Flexible Schedule",
    description: "Study at your own pace with 24/7 access to all course materials.",
    icon: "🕒"
  },
  {
    id: 4,
    title: "Community Support",
    description: "Join a thriving community of learners and educators for support and collaboration.",
    icon: "👥"
  }
];

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
