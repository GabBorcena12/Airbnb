import React, { useState } from "react";
import AirbnbEasily from "../../assets/img/airbnb-it-easily.png";
import "../../css/OnlineExperience.css";
import MapComponent from "./MapComponent";

const OnlineExperience = () => {
  const [value, setValue] = useState(27782); // Initial value

  // Function to handle the change in slider value
  const handleSliderChange = (event) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="your-home-main-container">
      <div className="your-home-container">
        <div className="your-home-column">
          <div className="your-home-content">
            <div>
              <h1
                style={{
                  color: "#ff385c",
                  fontWeight: "500",
                  lineHeight: "0.5",
                }}
              >
                Airbnb it.
              </h1>
              <h1 style={{ fontWeight: "500", lineHeight: "0.5" }}>
                You could earn
              </h1>
            </div>
            <h1>₱ {value.toLocaleString()}</h1>
            <div className="slider-container">
              <h4 style={{ fontWeight: "400", display:'inline-flex' }}>
                <section style={{textDecoration:'underline', color:'black'}}>{Math.floor(value / 3969)} night{Math.floor(value / 3969) > 1 ? 's' : ''} </section>
                <section style={{color:"#6d6c6c"}}>&nbsp;at an estimated ₱3,969 a night</section>
              </h4>
              <input
                type="range"
                min="3969"
                max="100000" // Max value for the slider
                step={3969} // Adjust step size if needed
                value={value}
                onChange={handleSliderChange}
                className="slider"
              />
              <div className="slider-labels">
                <span>₱ 0</span>
                <span>₱ 100,000</span>
              </div>
            </div>

            <h4 style={{ fontWeight: "400",color:'#6d6c6c' }}>
              Learn how we estimate your earnings
            </h4>
          </div>
        </div>
        <div className="your-home-column">
          <div className="your-home-content-2">
            <div className="your-home-map">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="your-home-container-2">
        <h1>Airbnb it easily with Airbnb Setup</h1>
        <img src={AirbnbEasily} alt="Airbnb it!" className="responsive-image" />
      </div>
    </div>
  );
};

export default OnlineExperience;
