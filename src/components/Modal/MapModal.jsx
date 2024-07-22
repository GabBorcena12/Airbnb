import "../../css/MapModal.css";
import Europe from "../../assets/img/europe.jpg";
import Flexible from "../../assets/img/flexible.jpg";
import Japan from "../../assets/img/japan.jpg";
import SouthKorea from "../../assets/img/SouthKorea.jpg";
import UnitedStates from "../../assets/img/UnitedStates.jpg";
import Australia from "../../assets/img/Australia.jpg";

const LocationData = [
  {
    src: Flexible,
    description: "I’m flexible",
    alt: "I’m flexible",
  },
  {
    src: Europe,
    description: "Europe",
    alt: "Europe",
  },
  {
    src: Japan,
    description: "Japan",
    alt: "Japan",
  },
  {
    src: UnitedStates,
    description: "United States",
    alt: "United States",
  },
  {
    src: SouthKorea,
    description: "South Korea",
    alt: "South Korea",
  },
  {
    src: Australia,
    description: "Australia",
    alt: "Australia",
  },
];

const MapModal = ({ showModal, selectedLocation }) => {  
  const handleSelection = (description) => {
    selectedLocation(description);
    showModal(!showModal);
  };
  return (
    <>
      <div id="overlay" onClick={() => showModal(!showModal)}></div>
      <div className="map-modal">
        <p className="map-modal-title">Search by region</p>
        <div className="map-modal-container">
          {LocationData.map((location, index) => (
            <div
              className="box"
              key={index}
              onClick={() => handleSelection(location.description)}
            >
              <img src={location.src} alt={location.alt} />
              <p>{location.description}</p>
            </div>
          ))}
          ;
        </div>
      </div>
    </>
  );
};

export default MapModal;
