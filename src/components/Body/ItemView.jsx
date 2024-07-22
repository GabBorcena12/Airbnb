import React, { useEffect, useState } from "react";
import "../../css/ItemView.css";
import ItemRating from "./ItemRating";
import ItemDescription from "./ItemDescription";
import ItemImage from "./ItemImage";
import ItemHeader from "./ItemHeader";
import ItemHost from "./ItemHost";
import ItemReservation from "./ItemReservation";
import ItemPlaceDescription from "./ItemPlaceDescription";
import PopupAlert from "../Modal/PopupAlerlt";

const ItemView = (props) => {
  const [showPopUpAlert, setShowPopUpAlert] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState(false);

  const handlePopupAlert = (message) => {
    setShowPopUpAlert(true);
    setPopUpMessage(message);
  };

  useEffect(() => {
    const handleScroll = () => {
      const itemReserveContainer = document.querySelector(
        ".item-reserve-container"
      );
      const offsetTop = itemReserveContainer.getBoundingClientRect().top;

      if (offsetTop > 20) {
        itemReserveContainer.style.position = "sticky";
        itemReserveContainer.style.top = "6rem";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (    
    <>
    {showPopUpAlert && popUpMessage && (
      <PopupAlert popUpMessage={popUpMessage} showAlert={setShowPopUpAlert} />)}

    <div className="item-view-container">
      {/* Title and buttons */}
      <ItemHeader handlePopupAlert={(message) => {handlePopupAlert(message)}} title={props.selectedItem.location} initialAmount={props.selectedItem.priceAndAvailability.totalPriceWithoutTax} />
      {/* Images section */}
      <ItemImage thumbnails={props.selectedItem.thumbnails} />
      {/* Content title */}
      <div className="item-view-column-container">
        <div className="item-view-first-column">
          <ItemDescription
            description={props.selectedItem.description}
            priceAndAvailability={props.selectedItem.priceAndAvailability}
            roomDetails={props.selectedItem.roomDetails}
          />
          {/*ratings*/}
          <ItemRating ratings={props.selectedItem.ratings}/>
          {/*host*/}
          <ItemHost />
          {/*Description of place*/}
          <ItemPlaceDescription />
        </div>
        <div className="item-view-second-column">
          <div className="item-reserve-container">
            <ItemReservation priceAndAvailability={props.selectedItem.priceAndAvailability} location={props.selectedItem.location}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ItemView;
