import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
//css
import "./App.css";
//compomnents
import NavbarFilter from "./components/Navbar/NavbarFilter";
import NavbarMain from "./components/Navbar/NavbarMain";
import NavbarMenu from "./components/Navbar/NavbarMenu";
import ItemList from "./components/Body/ItemList";
import Footer from "./components/Footer/Footer";
import ItemView from "./components/Body/ItemView";
import LoginModal from "./components/Modal/LoginModal";

//json data
import LakeFrontData from "../src/data/lakefront.json";
import IconData from "../src/data/icon.json";
import OMGData from "../src/data/omg.json";
import BeachFrontData from "../src/data/beachfront.json";
import AmazingPoolData from "../src/data/amazingpool.json";
import LoadingScreen from "./components/Modal/LoadingScreen";
import OnlineExperience from "./components/Others/OnlineExperience";

const App = () => {
  const [mergeData, setMergeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [typeOfPlace, setTypeOfPlace] = useState(null);
  const [displayAmountWithTax, setDisplayAmountWithTax] = useState(false);
  const [data, setData] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCheckInDate, setFilterCheckInDate] = useState("");
  const [filterCheckOutDate, setFilterCheckOutDate] = useState("");
  const [filterGuestCount, setFilterGuestCount] = useState("");
  const [filterGuestSummary, setFilterGuestSummary] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); 
  const [isLoading, setIsLoading] = useState(true);
  const [onFilter, setOnFilter] = useState(false);
  const [isOnlineExp, setIsOnlineExp] = useState(false);

  useEffect(() => {    
    if (!isAuthenticated)
      setShowLoginPage(true);
  }, [isAuthenticated])

  useEffect(() => {
    //set loading to true when selecting categories or onload
    if(mergeData && selectedCategory)      
      setIsLoading(true);

    //set loading to false to close Loading Screen component
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [selectedCategory]); 

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

  useEffect(() => {       
    const time = setTimeout(() => {
      setMergeData([
        ...OMGData,
        ...IconData,
        ...LakeFrontData,
        ...BeachFrontData,
        ...AmazingPoolData,
      ]);
    }, 2000)
  }, []);

  useEffect(() => {
    setData(getDataForCategory());
  }, [selectedCategory, mergeData]);

  // Mapping object to map category names to their respective data
  const categoryDataMap = {
    LakeFrontData: LakeFrontData,
    IconData: IconData,
    OMGData: OMGData,
    BeachFrontData: BeachFrontData,
    AmazingPoolData: AmazingPoolData,
  };

  // Function to determine which data to pass based on selectedCategory
  const getDataForCategory = () => {
    // If selectedCategory exists in the mapping, return the corresponding data; otherwise, return null
    return selectedCategory ? categoryDataMap[selectedCategory] : mergeData;
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <NavbarMain        
        categorySelected={setSelectedCategory}
        location={setFilterLocation}
        checkInDate={setFilterCheckInDate}
        checkOutDate={setFilterCheckOutDate}
        typeOfPlace={setTypeOfPlace}
        minAmount={setMinAmount}
        maxAmount={setMaxAmount}
        guestCount={setFilterGuestCount}
        guestSummary={setFilterGuestSummary}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem} // Pass setSelectedItem as onSelectItem
        showLoginPage={setShowLoginPage}
        onFilter={setOnFilter}
        onOnlineExp={setIsOnlineExp}
      />

      {!isOnlineExp && !selectedItem && !isScrolled && (
        <NavbarFilter
          location={setFilterLocation}
          checkInDate={setFilterCheckInDate}
          checkOutDate={setFilterCheckOutDate}
          guestCount={setFilterGuestCount}
          guestSummary={setFilterGuestSummary}
          selectedItem={setSelectedItem}
        />
      )}
      {!isOnlineExp && !selectedItem && (
        <NavbarMenu
          categorySelected={setSelectedCategory}
          displayAmountWithTax={setDisplayAmountWithTax}
          typeOfPlace={setTypeOfPlace}
          minAmount={setMinAmount}
          maxAmount={setMaxAmount}
          onFilter={onFilter}
          setOnFilter={setOnFilter}
        />
      )}
      {isOnlineExp && <OnlineExperience />}
      {!isOnlineExp && selectedItem && <ItemView selectedItem={selectedItem} />}
      {!isOnlineExp && !selectedItem && (
        <ItemList
          data={data}
          displayAmountWithTax={displayAmountWithTax}
          minAmount={minAmount}
          maxAmount={maxAmount}
          filterTypeOfPlace={typeOfPlace}
          filterLocation={filterLocation}
          filterCheckInDate={filterCheckInDate}
          filterCheckOutDate={filterCheckOutDate}
          filterGuestCount={filterGuestCount}
          selectedItem={setSelectedItem}
        />
      )}
      <Footer />
      {!isLoading && showLoginPage && <LoginModal showLoginModal={() => {setShowLoginPage(!showLoginPage)}}/>}
    </>
  );
};

export default App;
