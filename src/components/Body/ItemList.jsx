import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import "../../css/ItemList.css";
import ShowMoreButton from "./ShowMoreBtn";

const ItemList = ({
  data,
  displayAmountWithTax,
  minAmount,
  maxAmount,
  filterTypeOfPlace,
  filterLocation,
  filterCheckInDate,
  filterCheckOutDate,
  filterGuestCount,
  selectedItem,
}) => {
  const [showAll, setShowAll] = useState(false);

  const itemsPerRow = 4;
  const initialItemsToShow = 8;

  // Function to chunk array into arrays of specified size and filter by minAmount and maxAmount
  const chunkArray = (array, size) => {
    if (!array) return [];
    let filteredData = array;

    //Filter Amount
    if (minAmount !== null && maxAmount !== null) {
      filteredData = filteredData.filter((item) => {
        const priceWithTax = item.priceAndAvailability.totalPriceWithTax;
        return priceWithTax >= minAmount && priceWithTax <= maxAmount;
      });
    }

    //Filter Location
    if (filterLocation) {
      filteredData = filteredData.filter((item) => {
        const preferredLocation = item.priceAndAvailability.preferredLocation;
        let location = filterLocation;
        if (filterLocation === "I’m flexible") {
          location = null;
        }
        return preferredLocation === location;
      });
    }

    // Filter Date
    if (filterCheckInDate && filterCheckOutDate) {
      const checkInDate = new Date(filterCheckInDate);
      const checkOutDate = new Date(filterCheckOutDate);

      filteredData = filteredData.filter((item) => {
        const fromDate = new Date(
          item.priceAndAvailability.fromDateAvailability
        );
        const toDate = new Date(item.priceAndAvailability.toDateAvailability);
        return checkInDate >= fromDate && checkOutDate <= toDate;
      });
    }

    //Filter No Of Guest
    if (filterGuestCount) {
      const personCount =
        filterGuestCount.NoOfAdults +
        filterGuestCount.NoOfChildren +
        filterGuestCount.NoOfInfants;
      const petCount = filterGuestCount.NoOfPets;

      if (personCount > 0)
        filteredData = filteredData.filter((item) => {
          const noOfPersonAllowed =
            item.priceAndAvailability.preferredNoOfGuest;
          return noOfPersonAllowed >= personCount;
        });

      if (petCount > 0)
        filteredData = filteredData.filter((item) => {
          const noOfPetAllowed = item.priceAndAvailability.NoOfPetsAllowed;
          return noOfPetAllowed >= petCount;
        });
    }

    //Filter Type Of Place
    if (filterTypeOfPlace) {
      filteredData = filteredData.filter((item) => {
        const preferredTypeOfPlace = item.priceAndAvailability.typeOfPlace;
        if (filterTypeOfPlace === "Any type") {
          return true;
        }
        return preferredTypeOfPlace === filterTypeOfPlace;
      });
    }

    // Reset filters null after filtering
    filterLocation = null;
    filterCheckInDate = null;
    filterCheckOutDate = null;
    filterGuestCount = null;
    minAmount = null;
    maxAmount = null;
    filterTypeOfPlace = null;

    //Create an array with 4 column of data each row
    const chunkedArray = [];
    for (
      let i = 0;
      i < (showAll ? filteredData.length : initialItemsToShow);
      i += size
    ) {
      if (filteredData.length === 0) break;
      chunkedArray.push(filteredData.slice(i, i + size));
    }
    return chunkedArray;
  };

  // Ensure data is defined before attempting to chunk it
  const chunkedData = chunkArray(data, itemsPerRow);

  // Determine whether to show the "Show More" button
  const showMoreButton =
    Array.isArray(data) &&
    data.length > initialItemsToShow &&
    chunkedData.flat().length >= 8;

  return (
    <div className="item-list-container">
      {!chunkedData || chunkedData.length === 0 ? (
        <div
          className="item-list-td"
          style={{ color: "#6a6a6a", padding: "2rem" }}
        >
          No items available.
        </div>
      ) : (
        <table className="item-list-table">
          <tbody>
            {chunkedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, cellIndex) => (
                  <td key={cellIndex} className="item-list-td">
                    <div>
                      <ItemCard
                        item={item}
                        selectedItem={selectedItem}
                        isEmptyCard={false}
                      />
                    </div>
                  </td>
                ))}
                {/* Fill empty cells if row has less than itemsPerRow items */}
                {row.length < itemsPerRow &&
                  Array.from({ length: itemsPerRow - row.length }).map(
                    (_, emptyCellIndex) => (
                      <td
                        key={`empty-${emptyCellIndex}`}
                        className="item-list-td"
                        style={{ border: "none", padding: "8px" }}
                      >
                        <ItemCard isEmptyCard={true} />
                      </td>
                    )
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showMoreButton && (
        <ShowMoreButton showAll={showAll} onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </ShowMoreButton>
      )}
    </div>
  );
};

export default ItemList;
