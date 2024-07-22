import React, { useState, useEffect } from "react";
import "../../css/LoginModal.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/action.jsx";

const LoginModal = ({ showLoginModal }) => {
  const [username, setUsername] = useState("");
  const [socialMediaAccount, setSocialMediaAccount] = useState("");
  const [socialMediaLogos, setSocialMediaLogos] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const loadImages = async () => {
      const logos = await Promise.all([
        import(`../../assets/img/logo-facebook.png`).then(image => ({ name: 'facebook', src: image.default })),
        import(`../../assets/img/logo-google.png`).then(image => ({ name: 'google', src: image.default })),
        import(`../../assets/img/logo-apple.png`).then(image => ({ name: 'apple', src: image.default })),
        import(`../../assets/img/logo-email.png`).then(image => ({ name: 'email', src: image.default }))
      ]);

      const logoMap = logos.reduce((acc, logo) => {
        acc[logo.name] = logo.src;
        return acc;
      }, {});

      setSocialMediaLogos(logoMap);
    };

    loadImages();
  }, []);

  const handleLogin = (e) => {
    const isValid = username !== "" && socialMediaAccount !== "";
    if (isValid) {
      e.preventDefault();
      // Dispatch an action to update the Redux state with user data
      const currentDateTime = new Date().toLocaleString();
      const userData = {
        username,
        socialMediaAccount,
        datetime: currentDateTime,
      };

      dispatch(loginUser(userData));

      // Clear input values after login
      setUsername("");
      setSocialMediaAccount("");
      showLoginModal(false);
    }
  };

  const handleButtonLogin = (username, smAccount) => {
    setUsername(username);
    setSocialMediaAccount(smAccount);
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container">
        <div className="login-modal-header">
          <button
            className="login-close-button"
            onClick={() => {
              showLoginModal(false);
            }}
          >
            ×
          </button>
          <h2>Login or sign up</h2>
        </div>
        <div className="login-modal-body">
          <div className="login-welcome-label">Welcome to Airbnb</div>
          <div className="login-country-code"></div>
        </div>
        <div className="login-social-media">
          <button onClick={() => handleButtonLogin('Gab', 'Facebook')}>
            {socialMediaLogos.facebook && (
              <img
                src={socialMediaLogos.facebook}
                className="login-social-media-button-logo"
                alt="Facebook Logo"
              />
            )}
            Continue with Facebook
          </button>
        </div>
        <div className="login-social-media">
          <button onClick={() => handleButtonLogin('Anjelica', 'Google')}>
            {socialMediaLogos.google && (
              <img
                src={socialMediaLogos.google}
                className="login-social-media-button-logo"
                alt="Google Logo"
              />
            )}
            Continue with Google
          </button>
        </div>
        <div className="login-social-media">
          <button onClick={() => handleButtonLogin('Miguel', 'Apple')}>
            {socialMediaLogos.apple && (
              <img
                src={socialMediaLogos.apple}
                className="login-social-media-button-logo"
                alt="Apple Logo"
              />
            )}
            Continue with Apple
          </button>
        </div>
        <div className="login-social-media">
          <button onClick={() => handleButtonLogin('Dianne', 'Microsoft')}>
            {socialMediaLogos.email && (
              <img
                src={socialMediaLogos.email}
                className="login-social-media-button-logo"
                alt="Email Logo"
              />
            )}
            Continue with email
          </button>
        </div>
        <div className="login-terms-and-agreement">
          <p>
            We’ll call or text you to confirm your number. Standard message and
            data rates apply.
          </p>{" "}
          <p style={{ fontWeight: "500", textDecoration: "underline" }}>
            Privacy Policy
          </p>
        </div>
        <div className="login-modal-footer">
          <button className="login-button" onClick={(e) => handleLogin(e)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
