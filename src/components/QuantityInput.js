import React, { useState } from "react";
import "./QuantityInput.css";

const QuantityInput = ({ quantity, onIncrement, onDecrement, onQuantityChange }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleQuantityClick = () => {
    setInputValue(quantity.toString());
    setShowPopup(true);
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    const newQuantity = parseInt(inputValue);
    
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onQuantityChange(newQuantity);
      setShowPopup(false);
    }
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setInputValue(quantity.toString());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePopupSubmit(e);
    } else if (e.key === 'Escape') {
      handlePopupCancel();
    }
  };

  return (
    <>
      <div className="quantity-input">
        <button 
          className="quantity-btn minus-btn" 
          onClick={onDecrement}
          disabled={quantity <= 0}
        >
          -
        </button>
        <span 
          className="quantity-display clickable" 
          onClick={handleQuantityClick}
          title="Click to edit quantity"
        >
          {quantity}
        </span>
        <button 
          className={`quantity-btn plus-btn ${quantity <= 0 ? 'no-quantity' : ''}`} 
          onClick={onIncrement}
        >
          +
        </button>
      </div>

      {showPopup && (
        <div className="quantity-popup-overlay" onClick={handlePopupCancel}>
          <div className="quantity-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Set Quantity</h3>
            <form onSubmit={handlePopupSubmit}>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                min="0"
                autoFocus
                className="quantity-input-field"
              />
              <div className="popup-buttons">
                <button type="button" onClick={handlePopupCancel} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Set
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuantityInput;
