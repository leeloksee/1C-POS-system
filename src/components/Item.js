import React from "react";
import QuantityInput from "./QuantityInput";
import "./Item.css";

const Item = ({ item, quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(item.id, quantity - 1);
    }
  };

  const handleDirectQuantityChange = (newQuantity) => {
    onQuantityChange(item.id, newQuantity);
  };

  const handleImageClick = () => {
    onQuantityChange(item.id, quantity + 1);
  };

  return (
    <div className="item-card" style={{ borderColor: quantity > 0 ? "#27ae60" : "transparent" }}>
      <div className="item-image">
        <img onClick={handleImageClick} src={item.image} alt={item.name} />
      </div>
      <div className="item-info">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="item-controls">
        <QuantityInput
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onQuantityChange={handleDirectQuantityChange}
        />
      </div>
    </div>
  );
};

export default Item;
