import React from 'react';
import '../../css/ItemView.css';

const ItemDescription = ({ description, priceAndAvailability, roomDetails }) => {
  // Create constants for each part of the description
  const guestsText = priceAndAvailability.preferredNoOfGuest > 0 ? `${priceAndAvailability.preferredNoOfGuest} Guests` : '';
  const petsText = priceAndAvailability.NoOfPetsAllowed > 0 ? `${priceAndAvailability.NoOfPetsAllowed} Pets Allowed` : '';
  const bedsText = roomDetails.NoOfBed > 0 ? `${roomDetails.NoOfBed} Beds` : '';
  const bedroomsText = roomDetails.NoOfBedroom > 0 ? `${roomDetails.NoOfBedroom} Bedrooms` : '';
  const bathroomsText = roomDetails.NoOfBathroom > 0 ? `${roomDetails.NoOfBathroom} Bath` : '';

  return (
    <>
      <div className="item-content-title">
        <h2>{description}</h2>
        <p>
          {/* Join all parts with · separator, and trim the trailing · */}
          {[guestsText, petsText, bedsText, bedroomsText, bathroomsText].filter(Boolean).join(' · ')}
        </p>
      </div>
    </>
  );
};

export default ItemDescription;
