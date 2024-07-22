import "../../css/CartModal.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishtlist } from "../../reducer/action.jsx";

const WishlistModal = ({ showWishlist }) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  
  const handleRemoveFromWishList = (itemId) => {
    dispatch(removeFromWishtlist(itemId));
  };
  return (
    <>
      <div
        id="overlay"
        onClick={() => {
          showWishlist(false);
        }}
      ></div>
      <div className="cart-container">
        <div className="cart-header">Your Wishlist</div>
        <div className="cart-body">
          {wishlist.length == 0 && (
            <p className="cart-no-reservation">
              You don't have any wishlist yet.
            </p>
          )}
          {wishlist.length > 0 && (
            <ul>
              {wishlist.map((item) => (
                <li key={item.id}>
                  <div className="cart-first-column">
                    {item.name} - ${item.price}
                  </div>
                  <div className="cart-second-column">
                    <p onClick={() => handleRemoveFromWishList(item.id)}>Remove</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-footer">
          <button
            className="cart-footer-close-button"
            onClick={() => {
              showWishlist(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
export default WishlistModal;
