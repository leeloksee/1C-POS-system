import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";
import "./TopNavBar.css";


const TopNavBar = ({ total, itemCount, onClickCheckout, cartItems = [] }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { staffName } = useAppSelector((state) => state.auth);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStaffNameClick = () => {
    setShowLogoutPopup(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutPopup(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogoutConfirm();
    } else if (e.key === 'Escape') {
      handleLogoutCancel();
    }
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatCartItems = () => {
    if (cartItems.length === 0) {
      return <div className="cart-item-text">No items in cart</div>;
    }
    
    return cartItems.map((item, index) => (
      <div key={index} className="cart-item-text">
        <span className="item-name">{item.name}</span>
        <span className="item-quantity">x{item.quantity}</span>
        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    ));
  };

  return (
    <>
      <div className={`top-nav-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="nav-content">
          <div className="nav-left">
            <span 
              className="staff-name clickable" 
              onClick={handleStaffNameClick}
              title="Click to logout"
            >
              Staff: {staffName}
            </span>
          </div>
          <div className="nav-center">
            <div className="total-display">
              <button 
                onClick={handleToggleExpanded} 
                className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
                title={isExpanded ? "Collapse cart" : "Expand cart"}
              >
                {isExpanded ? '⯆' : '⯈'}
              </button>
              <span className="total-amount">${total.toFixed(2)}</span>
              <span className="item-count">({itemCount})</span>

            </div>
          </div>
          <div className="nav-right">
            <button onClick={onClickCheckout} className="checkout-btn">Checkout</button>

          </div>
        </div>
        
        {isExpanded && (
          <div className="cart-details">
            <div className="cart-items-list">
              {formatCartItems()}
            </div>
          </div>
        )}
      </div>

      {showLogoutPopup && (
        <div className="logout-popup-overlay" onClick={handleLogoutCancel}>
          <div className="logout-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="popup-buttons">
              <button 
                type="button" 
                onClick={handleLogoutCancel} 
                className="cancel-btn"
                onKeyDown={handleKeyPress}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleLogoutConfirm} 
                className="logout-confirm-btn"
                onKeyDown={handleKeyPress}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default TopNavBar;
