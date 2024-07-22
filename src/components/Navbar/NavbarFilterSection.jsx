import { useState, useEffect } from "react";
import "../../css/NavbarFilter.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MapModal from "../Modal/MapModal";
import GuestModal from "../Modal/GuestModal";

const NavbarFilterSection = ({
  location,
  checkInDate,
  checkOutDate,
  guestCount,
  guestSummary,
}) => {
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCheckInDate, setFilterCheckInDate] = useState(null);
  const [filterCheckOutDate, setFilterCheckOutDate] = useState(null);
  const [filterGuestSummary, setFilterGuestSummary] = useState("");
  const [filterGuestCount, setFilterGuestCount] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleSelectedLocation = (location) => {
    setFilterLocation(location);
    setShowMapModal(false);
  };

  const handleSubmit = () => {
    location(filterLocation);
    checkInDate(filterCheckInDate);
    checkOutDate(filterCheckOutDate);
    guestCount(filterGuestCount);
    guestSummary(filterGuestSummary);
  };

  return (
    <>
      {showMapModal && (
        <MapModal
          showModal={() => setShowMapModal(!showMapModal)}
          selectedLocation={handleSelectedLocation}
        />
      )}
      {showGuestModal && (
        <GuestModal
          showModal={() => setShowGuestModal(!showGuestModal)}
          guestCount={(count) => setFilterGuestCount(count)}
          guestSummary={(summary) => setFilterGuestSummary(summary)}
        />
      )}
      <div className="navbar-filter">
        <div className="navbar-filter-section">
          <div className="title">Where</div>
          <input
            className="description"
            placeholder="Search Destinations"
            value={filterLocation || ""}
            onChange={(e) => setFilterLocation(e.target.value)}
            onFocus={() => setShowMapModal(true)}
          />
        </div>
        <div className="navbar-filter-section">
          <div className="title">Check in</div>
          <DatePicker
            className="description"
            placeholderText="Add dates"
            selected={filterCheckInDate}
            onChange={(date) => {
              setFilterCheckInDate(date);
              setFilterCheckOutDate(null); // Reset check-out date when check-in date changes
            }}
            dateFormat="M/d/yyyy"
            minDate={new Date()} // Limit check-in date to today and onwards
          />
        </div>
        <div className="navbar-filter-section">
          <div className="title">Check out</div>
          <DatePicker
            className="description"
            placeholderText="Add dates"
            selected={filterCheckOutDate}
            onChange={(date) => setFilterCheckOutDate(date)}
            dateFormat="M/d/yyyy"
            minDate={filterCheckInDate || new Date()} // Limit check-out date to check-in date and onwards
          />
        </div>
        <div className="navbar-filter-section">
          <div className="title">Who</div>
          <input
            className="description"
            placeholder="Add guests"
            value={filterGuestSummary || ""}
            onChange={(e) => setFilterGuestSummary(e.target.value)}
            onFocus={() => setShowGuestModal(true)}
          />
        </div>
        <div className="navbar-filter-section">
          <button
            type="submit"
            className="navbar-filter-button"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarFilterSection;
