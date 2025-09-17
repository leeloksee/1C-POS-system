import React from "react";
import QuantityInput from "./QuantityInput";
import "./ItemRow.css";

const ItemRow = ({ item, quantity, onQuantityChange }) => {
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

  return (
    <tr className={quantity > 0 ? 'has-quantity' : ''}>
      <td className="item-name-cell">
        <div className="item-name-text">{item.name}</div>
      </td>
      <td className="item-price-cell">${item.price.toFixed(2)}</td>
      <td className="item-quantity-cell">
        <QuantityInput
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onQuantityChange={handleDirectQuantityChange}
        />
      </td>
      <td className="item-total-cell">${(item.price * quantity).toFixed(2)}</td>
    </tr>
  );
};

export default ItemRow;
