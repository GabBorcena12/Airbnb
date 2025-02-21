import "../../css/NavbarMain.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { logoutUser } from "../../reducer/action.jsx";
import NavbarFilterSection from "./NavbarFilterSection";
import CartModal from "../Modal/CartModal";
import PopupAlert from "../Modal/PopupAlerlt.jsx";
import WishlistModal from "../Modal/WishlistModal.jsx";
import Logo from "../../assets/img/logo-with-description.png";

const NavbarMain = ({
  location,
  checkInDate,
  checkOutDate,
  guestCount,
  guestSummary,
  selectedItem,
  onSelectItem,
  showLoginPage,
  categorySelected,
  minAmount,
  maxAmount,
  typeOfPlace,
  onFilter,
  onOnlineExp
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showPopUpAlert, setShowPopUpAlert] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState(false);
  const [isOnlineExp, setIsOnlineExp] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Assuming you have a user object in your Redux state

  const showPopupAlert = (message) => {
    setShowPopUpAlert(true);
    setPopUpMessage(message);
  };

  const handleLogout = () => {
    dispatch(logoutUser(user));
    navigateToLoginPage(); // Navigate to login page
    setShowAccount(false);
  };

  const handleWishList = () => {
    setShowWishlist(!showWishlist);
    setShowAccount(false);
  };

  useEffect(() => {
    onOnlineExp(isOnlineExp);
  }, [isOnlineExp])
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

  //listener to close account dropdown
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccount(false);
      }
    };

    if (showAccount) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccount]);
  return (
    <Router>
      {showPopUpAlert && popUpMessage && (
        <PopupAlert popUpMessage={popUpMessage} showAlert={setShowPopUpAlert} />
      )}
      <div
        className="navbar-main-container"
        style={{ borderBottom: selectedItem ? "solid #e5dada 1px" : "none" }}
      >
        <div>
          <img
            className="navbar-main-logo"
            src={Logo}
            alt="airbnb"
            onClick={() => {
              onSelectItem(null);
              categorySelected(null);
              location(null);
              checkInDate(null);
              checkOutDate(null);
              guestCount(null);
              guestSummary(null);
              minAmount(null);
              maxAmount(null);
              typeOfPlace(null);
              onFilter(false);
            }}
          />
        </div>
        {!isOnlineExp && isScrolled && (
          <div style={{ paddingLeft: "9rem" }}>
            <NavbarFilterSection
              location={location}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guestCount={guestCount}
              guestSummary={guestSummary}
            />
          </div>
        )}
        <div style={{ display: !isOnlineExp && isScrolled ? "none" : "block" }}>
          <ul className="navbar-main-ul">
            <li>
              <Link
                to="Airbnb/"
                className="navbar-main-button"
                onClick={() => {
                  onSelectItem(null);
                  categorySelected(null);
                  location(null);
                  checkInDate(null);
                  checkOutDate(null);
                  guestCount(null);
                  guestSummary(null);
                  minAmount(null);
                  maxAmount(null);
                  typeOfPlace(null);
                  onFilter(false);
                  setIsOnlineExp(false);
                }}
              >
                Stays
              </Link>
            </li>
            <li>
              <Link
                to="Airbnb/"
                className="navbar-main-button"
                onClick={() => {
                  onSelectItem(null);
                  categorySelected("IconData");
                  location(null);
                  checkInDate(null);
                  checkOutDate(null);
                  guestCount(null);
                  guestSummary(null);
                  minAmount(null);
                  maxAmount(null);
                  typeOfPlace(null);
                  onFilter(false);
                  setIsOnlineExp(false);
                }}
              >
                Experiences
              </Link>
            </li>
            <li>
              <Link
                to="Airbnb/online-experience"
                className="navbar-main-button"
                onClick={() => {setIsOnlineExp(true)}}
              >
                Online Experience
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            {user && (
              <li
                className="navbar-menu-li"
                style={{ color: "black", fontWeight: 450 }}
                onClick={() => {
                  setShowCart(!showCart);
                }}
              >
                Reservations
              </li>
            )}
            {user ? (
              <>
                <li
                  className="navbar-menu-li"
                  onClick={() => {
                    setShowAccount(!showAccount);
                  }}
                >
                  Welcome,
                  <p style={{ color: "#ff385c", margin: "0.3rem" }}>
                    {user.username}
                  </p>
                </li>
                {showAccount && (
                  <div ref={dropdownRef} className="dropdown-menu-container">
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-menu-li"
                        onClick={() => {
                          showPopupAlert("This feature is not yet supported.");
                          setShowAccount(false);
                        }}
                      >
                        Account Settings
                      </li>
                      <li className="dropdown-menu-li" onClick={handleWishList}>
                        Wishlist
                      </li>
                      <li className="dropdown-menu-li" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <li
                  className="navbar-menu-li"
                  to="/login"
                  onClick={() => {
                    showLoginPage(true);
                  }}
                >
                  Login
                </li>

                <li
                  className="navbar-menu-li"
                  to="/signup"
                  onClick={() => {
                    showPopupAlert("This feature is not yet supported.");
                  }}
                >
                  Sign up
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="Airbnb/online-experience" element={<Outlet />}/>
        <Route path="Airbnb/" element={<Outlet />}/>
      </Routes>
      {user && showCart && <CartModal showCartModal={setShowCart} />}
      {user && showWishlist && <WishlistModal showWishlist={setShowWishlist} />}
    </Router>
  );
};

export default NavbarMain;
