import React, { useState } from "react";
import "../../css/PopupAlert.css";

const PopupAlert = ({ popUpMessage, showAlert }) => {
  const toggleAlert = () => {
    showAlert(false);
  };

  return (
    <>
      <div id="overlay"></div>
      <div>
        <div className="alert">
          <p>{popUpMessage}</p>
          <button className="alert-button" onClick={toggleAlert}>Close</button>
        </div>
      </div>
    </>
  );
};

export default PopupAlert;
