import React from "react";
import QuantityInput from "./QuantityInput";

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
    <tr
      className={`transition-colors md:text-sm text-xs text-gray-800 ${
        quantity > 0 ? "bg-green-100" : "bg-gray-100"
      }`}
    >
      <td className="px-1 py-2">
        <div className="font-bold">{item.name}</div>
        <div className="text-gray-400 ml-2">${item.price.toFixed(2)}</div>
      </td>
      <td className="px-1 py-2">
        <QuantityInput
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onQuantityChange={handleDirectQuantityChange}
        />
      </td>
      <td className="px-1 py-2 font-semibold whitespace-nowrap">
        ${(item.price * quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default ItemRow;
