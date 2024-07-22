import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ConfirmNoModal from "../Modal/ConfirmNoModal";

useState;
const ItemReservation = ({ priceAndAvailability, location }) => {
  const [nightsToAvail, setNightsToAvail] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState(
    priceAndAvailability?.fromDateAvailability || new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    priceAndAvailability?.toDateAvailability || new Date()
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (priceAndAvailability) {
      calculateDifference();
    }
  }, [priceAndAvailability, checkInDate, checkOutDate]);

  const calculateDifference = () => {
    const today = new Date();

    // Parse the date strings or use today's date if they are null/undefined
    const startDate = checkInDate ? new Date(checkInDate) : today;

    const endDate = checkOutDate ? new Date(checkOutDate) : today;

    // Calculate the difference in time
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Convert the time difference to days
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    // Update the state with the calculated difference
    setNightsToAvail(dayDifference + 1);
  };

  // Increment guest count
  const incrementGuests = () =>
    setNumberOfGuests((prevGuests) => prevGuests + 1);

  // Decrement guest count, ensuring it doesn't go below 1
  const decrementGuests = () =>
    setNumberOfGuests((prevGuests) => Math.max(prevGuests - 1, 1));

  //Amount per night
  const totalAmountWithoutTax = priceAndAvailability?.totalPriceWithoutTax || 0;
  const formattedTotalAmount = totalAmountWithoutTax.toLocaleString();

  // Calculate total cost
  const totalCost = totalAmountWithoutTax * (nightsToAvail || 0);
  const formattedTotalCost = totalCost.toLocaleString();

  //Cleaning feess
  const totalCleaningFee =
    (priceAndAvailability?.totalPriceWithoutTax || 0) * 0.05;
  const formattedTotalCleaningFee = totalCleaningFee.toLocaleString();

  //Airbnb service fee
  const totalAirbnbFee = (totalCost || 0) * 0.2;
  const formattedTotalAirbnbFee = totalAirbnbFee.toLocaleString();

  //Excess Guest
  const maxGuestAllowed = priceAndAvailability.preferredNoOfGuest || 1;
  const excessGuest =
    numberOfGuests > maxGuestAllowed ? numberOfGuests - maxGuestAllowed : 0;
  const excessGuestFee = (totalCost / maxGuestAllowed / 10) * excessGuest;
  const formatExcessGuestFee = excessGuestFee.toLocaleString();

  //Overall total
  const overallTotalCost = totalCost + totalCleaningFee + totalAirbnbFee + excessGuestFee;
  const formattedOverallTotalCost = overallTotalCost.toLocaleString();
  const chargeComputationTxt = `₱ ${totalAmountWithoutTax} x ${nightsToAvail} nights`
  return (
    <>
      {showModal && (
        <ConfirmNoModal
          showModal={setShowModal}
          nightsToAvail={nightsToAvail}
          numberOfGuests={numberOfGuests}
          formattedOverallTotalCost={formattedOverallTotalCost}
          location={location}
        />
      )}
      <div className="item-reserve-section">
        <div className="item-reserve-amount">
          <p>₱ {formattedTotalAmount}</p>
          <p>night</p>
        </div>
        <div className="item-reserve-date">
          <div className="item-reserve-first-column">
            <p>CHECK IN</p>
            <DatePicker
              className="item-reserve-date-picker"
              placeholderText="Add dates"
              selected={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
                setCheckOutDate(date); // Reset check-out date when check-in date changes
              }}
              dateFormat="M/d/yyyy"
              minDate={new Date()} // Limit check-in date to today and onwards
            />
          </div>
          <div className="item-reserve-second-column">
            <p>CHECK OUT</p>
            <DatePicker
              className="item-reserve-date-picker"
              placeholderText="Add dates"
              selected={checkOutDate}
              onChange={(date) => {
                setCheckOutDate(date);
              }}
              dateFormat="M/d/yyyy"
              minDate={checkInDate} // Limit check-in date to today and onwards
            />
          </div>
        </div>
        <div className="item-reserve-guest">
          <p>GUEST</p>
          <div>
            <button
              onClick={decrementGuests}
              className="item-reserve-guest-count-button"
            >
              -
            </button>
            <span>
              &nbsp;{numberOfGuests} GUEST{numberOfGuests > 1 ? "S" : ""}&nbsp;
            </span>
            <button
              onClick={incrementGuests}
              className="item-reserve-guest-count-button"
            >
              +
            </button>
          </div>
        </div>
        <div className="item-reserve-button">
          <button onClick={setShowModal}>Reserve</button>
        </div>
        <div className="item-reserve-warning">
          <p>You won't be charged yet</p>
        </div>
        <div className="item-reserve-charge-section">
          <div className="item-reserve-charge-column">
            <p>
              {chargeComputationTxt}
            </p>
            <p>₱ {formattedTotalCost}</p>
          </div>
          <div className="item-reserve-charge-column">
            <p>Cleaning fee</p>
            <p>₱ {formattedTotalCleaningFee}</p>
          </div>
          <div className="item-reserve-charge-column">
            <p>Airbnb service fee</p>
            <p>₱ {formattedTotalAirbnbFee}</p>
          </div>

          {excessGuest > 0 && (
            <div className="item-reserve-charge-column">
              <p>Additional guest fee</p>
              <p>₱ {formatExcessGuestFee}</p>
            </div>
          )}
        </div>
        <div className="item-reserve-charge-total">
          <p>Total before taxes</p>
          <p>₱ {formattedOverallTotalCost}</p>
        </div>
      </div>
    </>
  );
};
export default ItemReservation;
