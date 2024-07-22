import React from 'react';
import '../../css/Footer.css'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
      <div>© 2024 Airbnb, Inc.</div>
        <a className='airbnb-text' href='https://github.com/GabBorcena12/'>Github.com/GabBorcena12</a>
      </div>
      <div className="footer-right">
        <div>English(US)</div>
        <div>₱ PHP</div>
        <div>Terms</div>
        <div>Sitemap</div>
        <div>Privacy</div>
        <div>Your Privacy Choices</div>
      </div>
    </div>
  );
};

export default Footer;
