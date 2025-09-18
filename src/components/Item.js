import React from "react";
import QuantityInput from "./QuantityInput";

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
    <div
      className={`bg-gray-300 overflow-hidden transition-transform transition-shadow duration-200 flex flex-col h-full border-2 ${
        quantity > 0 ? "border-green-600 bg-green-200 " : "border-transparent bg-gray-100 "
      }`}
    >
      <div className="w-full h-[120px] bg-primary overflow-hidden flex items-center justify-center">
        <img
          onClick={handleImageClick}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>
      <div className="p-1 flex-1 flex flex-col justify-between">
        <h3 className="text-xs font-semibold text-gray-800 m-0 leading-tight">{item.name}</h3>
        <p className="text-xs font-bold text-gray-400 m-0">${item.price.toFixed(2)}</p>
      </div>
      <div className="p-0">
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
