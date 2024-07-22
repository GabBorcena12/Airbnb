import "../../css/FilterModal.css";
import React, { useEffect, useState } from "react";

const FilterModal = ({
  showFilterModal,
  filterMinAmount,
  filterMaxAmount,
  filterTypeOfPlace,
  isFiltered,
}) => {
  const [selectedOption, setSelectedOption] = useState("Any type");
  const [minAmount, setMinAmount] = useState(1000);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [errMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (minAmount > maxAmount) {
      setErrorMsg("Max amount must be bigger than minimum amount.");
    } else {
      setErrorMsg(null);
    }
  }, [maxAmount]);

  const handleFilterButton = () => {
    isFiltered(true);
    filterMaxAmount(maxAmount);
    filterMinAmount(minAmount);
    filterTypeOfPlace(selectedOption);
    showFilterModal(false);
  };
  
  const handleClearAll = () => {    
    isFiltered(false);
    filterMaxAmount(null);
    filterMinAmount(null);
    filterTypeOfPlace(null);
    showFilterModal(false);

    //set states to default
    setSelectedOption("Any type");
    setMinAmount(1000);
    setMaxAmount(10000);
  };

  return (
    <>
      <div id="overlay"></div>
      <div id="modal-container">
        <button
          className="modal-close-button"
          onClick={() => {showFilterModal(false)}}
        >
          X
        </button>
        <div className="modal-header">
          <p className="modal-title">Filters</p>
        </div>
        {errMsg && <label style={{ color: "red" }}>{errMsg}</label>}
        <div className="content-container">
          <div className="title">Type of place</div>
          <div className="description">
            Search rooms, entire homes, or any type of place
          </div>
          <div className="content-option-container">
            <div className="content-option">
              {["Any type", "Room", "Entire home"].map((option) => (
                <div
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={option === selectedOption ? "selected" : ""}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="title">Price range</div>
          <div className="description">
            Nightly prices before fees and taxes
          </div>
          <div className="amount-option-container">
            <div className="amount-option">
              <div className="min-amount">
                <p style={{ fontSize: "small" }}>Minimum</p>
                <label>₱</label>
                <input
                  type="number"
                  maxLength="10"
                  onChange={(e) => {setMinAmount(e.target.value)}}
                  value={minAmount}
                />
              </div>
              <div
                style={{ width: "5rem", border: "none", textAlign: "center" }}
              >
                <p>___</p>
              </div>
              <div className="max-amount">
                <p style={{ fontSize: "small" }}>Maximum</p>
                <label>₱</label>
                <input
                  type="number"
                  maxLength="10"
                  onChange={(e) => {setMaxAmount(e.target.value)}}
                  value={maxAmount}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer-container">
          <button className="clear-all-filer" onClick={handleClearAll}>
            Clear all
          </button>
          <button className="show-filtered" onClick={handleFilterButton}>
            Show 1000+ places
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
