import '../../css/ItemView.css';
import { useSelector, useDispatch } from "react-redux";
import { addToWishhlist } from "../../reducer/action.jsx";

const ItemHeader = ({title, initialAmount, handlePopupAlert}) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const currentUrl = window.location.href;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      handlePopupAlert('Link copied to clipboard!');
    });
  };

  const handleAddToWishlist = (item) => {
    dispatch(addToWishhlist(item));
  };

  const handleSaveWishlist = () => {
    const highestId = wishlist.reduce((maxId, item) => Math.max(item.id, maxId), 0);
    const newId = highestId + 1;
    handleAddToWishlist({
      id: newId,
      name: title,
      price: initialAmount,
    });
    handlePopupAlert(`${title} is saved.`);
  };


  return (
    <div className="item-header-container">
      <div className="item-view-title">
        <p>{title}</p>
      </div>
      {/* Buttons */}
      <div className="item-button-container">
        <button
          onClick={copyToClipboard}
        >
          &#9829; Share
        </button>
        <button
          onClick={handleSaveWishlist}
        >
          &#x21A1; Save
        </button>
      </div>
    </div>
  );
};
export default ItemHeader;
