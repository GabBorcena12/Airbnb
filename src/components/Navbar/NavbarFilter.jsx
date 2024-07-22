import "../../css/NavbarFilter.css";
import "react-datepicker/dist/react-datepicker.css";
import NavbarFilterSection from "./NavbarFilterSection";

const NavbarFilter = (props) => {
  return (
    <>
      <div className="navbar-filter-container">
        <NavbarFilterSection
          location={props.location}
          checkInDate={props.checkInDate}
          checkOutDate={props.checkOutDate}
          guestCount={props.guestCount}
          guestSummary={props.guestSummary}
          selectedItem={props.selectedItem}
        />
      </div>
    </>
  );
};

export default NavbarFilter;
