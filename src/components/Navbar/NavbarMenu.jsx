import React, { useEffect, useState } from "react";
import "../../css/NavbarMenu.css";
import OMG from "../../assets/img/OMG.jpg";
import Icons from "../../assets/img/icons.png";
import Lakefront from "../../assets/img/LakeFront.jpg";
import Beachfront from "../../assets/img/beach-fronts.jpg";
import AmazingPools from "../../assets/img/amazing-pools.jpg";
import AmazingViews from "../../assets/img/amazing-views.jpg";
import Tropical from "../../assets/img/trophical.jpg";
import TinyHomes from "../../assets/img/tiny-homes.jpg";
import Cabins from "../../assets/img/cabins.jpg";
import Rooms from "../../assets/img/rooms.jpg";
import Farms from "../../assets/img/Farms.jpg";
import Mansions from "../../assets/img/mansions.jpg";
import Islands from "../../assets/img/Islands.jpg";
import NationalParks from "../../assets/img/national-parks.jpg";
import Filter from "../../assets/img/filter.png";
import FilterRed from "../../assets/img/filter-red.png";
import FilterModal from "../Modal/FilterModal";

const NavbarMenu = ({
  categorySelected,
  displayAmountWithTax,
  minAmount,
  maxAmount,
  typeOfPlace,
  onFilter,
  setOnFilter
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAmountWithTax, setShowAmountWithTax] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const categories = [
    { src: OMG, alt: "OMG", label: "OMG!", jsonData: "OMGData" },
    { src: Icons, alt: "Icons", label: "Icons", jsonData: "IconData" },
    {
      src: Lakefront,
      alt: "Lakefront",
      label: "Lake Front",
      jsonData: "LakeFrontData",
    },
    {
      src: Beachfront,
      alt: "Beachfront",
      label: "Beachfront",
      jsonData: "BeachFrontData",
    },
    {
      src: AmazingPools,
      alt: "AmazingPools",
      label: "Amazing pools",
      jsonData: "AmazingPoolData",
    },
    {
      src: AmazingViews,
      alt: "AmazingViews",
      label: "Amazing views",
      jsonData: "AmazingViewData",
    },
    {
      src: Tropical,
      alt: "Tropical",
      label: "Tropical",
      jsonData: "TropicalData",
    },
    {
      src: TinyHomes,
      alt: "TinyHomes",
      label: "Tiny homes",
      jsonData: "TinyHomeData",
    },
    { src: Cabins, alt: "Cabins", label: "Cabins", jsonData: "CabinData" },
    { src: Rooms, alt: "Rooms", label: "Rooms", jsonData: "RoomData" },
    { src: Farms, alt: "Farms", label: "Farms", jsonData: "FarmData" },
    {
      src: Mansions,
      alt: "Mansions",
      label: "Mansions",
      jsonData: "MansionData",
    },
    
  ];

  const itemsPerSlide = 8;
  const slideWidth = 100; // width of each slide including padding
  const totalWidth = slideWidth * categories.length;
  const containerWidth = slideWidth * itemsPerSlide *.08;  

  // Use useEffect to update isFiltered when onFilter changes
  useEffect(() => {
      setIsFiltered(onFilter);
  }, [onFilter]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //navigate through menu ex. lakefront, beach, etc..
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0));
  };

  //navigate through menu ex. lakefront, beach, etc..
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerSlide, categories.length - itemsPerSlide)
    );
  };

  const handleIsFiltered = (value) => {
    setIsFiltered(value);
    setOnFilter(value);
  }

  useEffect(() => {
    displayAmountWithTax(showAmountWithTax);
  }, [showAmountWithTax]);
  return (
    <>
      <div className="navbar-menu-container" style={{top : !isScrolled? '11rem' : '5rem'}}>
        <div className="navbar-menu-wrapper" style={{ width: `${containerWidth}vw` }}>
          <ul
            className="navbar-menu"
            style={{
              transform: `translateX(-${currentIndex * slideWidth}px)`,
              width: totalWidth,
            }}
          >
            {categories.map((category, index) => (
              <li
                key={index}
                className="navbar-menu-item"
                onClick={() => categorySelected(category.jsonData)}
              >
                <img src={category.src} alt={category.alt} />
                <p>{category.label}</p>
              </li>
            ))}
          </ul>
          <div className="navbar-controls">
            <button onClick={() => handlePrev()}>&lt;</button>
            <button onClick={() => handleNext()}>&gt;</button>
          </div>
        </div>

        <div className="filter-button">
          <button
            style={{
              backgroundColor: "white",
              color: `${isFiltered ? "red" : "black"}`,
              padding: "0.8rem 1.5rem",
              border: `${isFiltered ? "solid 2px rgb(251, 3, 3)" : "solid 1px black"}`,
            }}
            onClick={() => {setShowFilterModal(!showFilterModal)}}
          >
            <img
              src={isFiltered ? FilterRed : Filter}
              alt="Filter"
              style={{
                width: "1rem",
                height: "1rem",
                backgroundColor: "white",
              }}
            />{" "}
            &nbsp;Filters
          </button>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid gray",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
            }}
          >
            <span className="slider-label">
              Display total before taxes &nbsp;&nbsp;
            </span>

            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={displayAmountWithTax}
                onChange={() => {setShowAmountWithTax(!showAmountWithTax)}}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      {showFilterModal && (
        <FilterModal
          filterMinAmount={(value) => {minAmount(value)}}
          filterMaxAmount={(value) => {maxAmount(value)}}
          filterTypeOfPlace={(value) => {typeOfPlace(value)}}
          showFilterModal={() => {setShowFilterModal(!showFilterModal)}}
          isFiltered={handleIsFiltered}
        />
      )}
    </>
  );
};

export default NavbarMenu;
