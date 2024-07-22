import "../../css/CartModal.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../reducer/action.jsx";

const CartModal = ({ showCartModal }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  return (
    <>
      <div
        id="overlay"
        onClick={() => {
          showCartModal(false);
        }}
      ></div>
      <div className="cart-container">
        <div className="cart-header">Your Booking Summary</div>
        <div className="cart-body">
          {cart.length == 0 && (
            <p className="cart-no-reservation">
              You don't have any reservations yet.
            </p>
          )}
          {cart.length > 0 && (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <div className="cart-first-column">
                    {item.name} - ${item.price}
                  </div>
                  <div className="cart-second-column">
                    <p onClick={() => handleRemoveFromCart(item.id)}>Remove</p>
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
              showCartModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
export default CartModal;
