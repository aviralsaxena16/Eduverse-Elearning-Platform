import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© EduVerse. All Rights Reserved.</p>
        <span className="social-links">
          <a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">Instagram</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
