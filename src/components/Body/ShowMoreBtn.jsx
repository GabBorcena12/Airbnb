// ShowMoreButton.js
import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = ({ showAll, onClick, children }) => {
  return (
    <div>
      <h3 style={{ color: 'black', fontWeight: '500' }}>
        {children}
      </h3>
      <button onClick={onClick} className="show-more-button">
        {showAll ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  showAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ShowMoreButton;
