import React, { useState, useEffect } from "react";
import "../../css/ItemCard.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Function to format date range
const formatDateRange = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const options = { month: "long", day: "2-digit" };
  const formattedFrom = from.toLocaleDateString("en-US", options);
  const formattedTo = to.toLocaleDateString("en-US", options);

  const fromMonth = formattedFrom.split(" ")[0];
  const fromDay = from.getDate().toString().padStart(2, "0");

  const toMonth = formattedTo.split(" ")[0];
  const toDay = to.getDate().toString().padStart(2, "0");

  if (from.toDateString() === to.toDateString()) {
    return `${fromMonth} ${fromDay}`;
  }

  if (fromMonth === toMonth) {
    return `${fromMonth} ${fromDay}-${toDay}`;
  }

  return `${fromMonth} ${fromDay} - ${toMonth} ${toDay}`;
};

const ItemCard = ({ item, isEmptyCard, selectedItem }) => {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    if (!isEmptyCard) {
      const loadImages = async () => {
        const images = await Promise.all(
          item.thumbnails.map(thumbnail =>
            import(`../../assets/img/${thumbnail.src}.png`).then(image => image.default)
          )
        );
        setLoadedImages(images);
      };
      loadImages();
    }
  }, [isEmptyCard, item]);

  const formattedPrice = isEmptyCard
    ? null
    : parseFloat(
        item.displayAmountWithTax
          ? item.priceAndAvailability.totalPriceWithoutTax
          : item.priceAndAvailability.totalPriceWithTax
      ).toLocaleString();

  const formattedAmount = `${
    formattedPrice ? "₱" + formattedPrice + " per night" : ""
  }`;

  const fromDate = isEmptyCard
    ? null
    : item.priceAndAvailability.fromDateAvailability;
  const toDate = isEmptyCard
    ? null
    : item.priceAndAvailability.toDateAvailability;
  const formattedDateRange = isEmptyCard
    ? null
    : formatDateRange(fromDate, toDate);
  const description = isEmptyCard ? null : item.description2;
  const shouldShowDescription = description
    ? description.toLowerCase().includes("coming") ||
      description.toLowerCase().includes("sold out")
    : null;

  return (
    <div className="item-container">
      <div className="item-picture">
        {!isEmptyCard && (
          <Carousel>
            {item.thumbnails.map((thumbnail, index) => (
              <div key={index}>
                <img
                  className="item-src"
                  src={loadedImages[index]}
                  alt={thumbnail.description}
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div onClick={() => selectedItem(item)}>
        <div className="item-location">{item.location}</div>
        <div className="item-description">{item.description}</div>
        {shouldShowDescription && (
          <div className="item-description-2">{item.description2}</div>
        )}
        <div className="item-description-2">{formattedDateRange}</div>
        <div className="item-amount">{formattedAmount}</div>
      </div>
    </div>
  );
};

export default ItemCard;
