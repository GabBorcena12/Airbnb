import React, { useState } from "react";
import "../../css/GuestModal.css";

const GuestModal = ({ showModal, guestCount, guestSummary }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [petCount, setPetCount] = useState(0);

  const handleCloseModal = () => {
    const count = {
        NoOfAdults: adultCount,
        NoOfChildren: childrenCount,
        NoOfInfants: infantCount,
        NoOfPets: petCount,
      };
    guestSummary(getGuestSummary());
    guestCount(count);
    showModal(!showModal);
  }

  const getGuestSummary = () => {
    let summary = `${adultCount + childrenCount} guests`;
    if (infantCount > 0) summary += `, ${infantCount} infants`;
    if (petCount > 0) summary += `, ${petCount} pets`;
    return summary;
  };

  const handleShowPopUp = () => {};
  return (
    <>
      <div id="overlay" onClick={() => handleCloseModal()}></div>
      <div className="guest-modal">
        <div className="guest-modal-container">
          <div className="guest-row">
            <div className="first-column">
              <p className="title">Adults</p>
              <p className="subtitle">Ages 13 or above</p>
            </div>
            <div className="second-column">
              <button
                onClick={() =>
                  setAdultCount(adultCount > 0 ? adultCount - 1 : 0)
                }
              >
                -
              </button>
              <span className="count">{adultCount}</span>
              <button onClick={() => setAdultCount(adultCount + 1)}>+</button>
            </div>
          </div>
          <div className="guest-row">
            <div className="first-column">
              <p className="title">Children</p>
              <p className="subtitle">Ages 2 - 12</p>
            </div>
            <div className="second-column">
              <button
                onClick={() =>
                  setChildrenCount(childrenCount > 0 ? adultCount - 1 : 0)
                }
              >
                -
              </button>
              <span className="count">{childrenCount}</span>
              <button onClick={() => setChildrenCount(childrenCount + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="guest-row">
            <div className="first-column">
              <p className="title">Infants</p>
              <p className="subtitle">Under 2</p>
            </div>
            <div className="second-column">
              <button
                onClick={() =>
                  setInfantCount(infantCount > 0 ? adultCount - 1 : 0)
                }
              >
                -
              </button>
              <span className="count">{infantCount}</span>
              <button onClick={() => setInfantCount(infantCount + 1)}>+</button>
            </div>
          </div>

          <div className="guest-row">
            <div className="first-column">
              <p className="title">Pets</p>
              <p
                className="subtitle"
                onClick={handleShowPopUp}
                style={{ textDecoration: "underline" }}
              >
                Bringing a service animal?
              </p>
            </div>
            <div className="second-column">
              <button
                onClick={() => setPetCount(petCount > 0 ? adultCount - 1 : 0)}
              >
                -
              </button>
              <span className="count">{petCount}</span>
              <button onClick={() => setPetCount(petCount + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestModal;
