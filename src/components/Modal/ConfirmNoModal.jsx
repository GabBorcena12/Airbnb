import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../reducer/action.jsx";
import "../../css/ConfirmNoModal.css";

const ConfirmNoModal = ({
  showModal,
  nightsToAvail,
  numberOfGuests,
  formattedOverallTotalCost,
  location,
}) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  // Function to format number with commas
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Convert formattedOverallTotalCost to a number and add commas
  const overallTotalCostNumber = parseFloat(
    formattedOverallTotalCost.replace(/,/g, "") || 0
  );
  const formattedCostWithCommas = formatNumberWithCommas(
    overallTotalCostNumber.toFixed(2)
  );

  // Handle the case where formattedOverallTotalCost is not a valid number
  const amountToBePaid = !isNaN(overallTotalCostNumber)
    ? `₱ ${formattedCostWithCommas}`
    : "₱ 0.00";

  const handleReservation = () => {
    // Find the highest current id in the cart
    const highestId = cart.reduce((maxId, item) => Math.max(item.id, maxId), 0);
    const newId = highestId + 1;

    handleAddToCart({
      id: newId,
      name: location,
      price: amountToBePaid,
      duration: nightsToAvail,
      guest: numberOfGuests,
    });
    showModal(false);
  };
  return (
    <>
      <div
        id="overlay"
        onClick={() => {
          showModal(false);
        }}
      ></div>
      <div className="modal-container">
        <div className="modal-header">Reservation Confirmation</div>
        <div className="modal-body">
          <p>
            You are reserving {location} for {nightsToAvail} night
            {nightsToAvail > 1 ? "s" : ""}. The total number of guests is{" "}
            {numberOfGuests || 1}.
          </p>
          <div className="modal-footer">
            <button
              className="modal-footer-close-button"
              onClick={() => {
                showModal(false);
              }}
            >
              Close
            </button>
            <button
              className="modal-footer-accept-button"
              onClick={handleReservation}
            >
              {amountToBePaid}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmNoModal;
