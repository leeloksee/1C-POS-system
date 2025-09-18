import React, { useState } from "react";
import Cart from "./Cart";

const TopNavBar = ({ total, itemCount, onClickCheckout, cartItems = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);



  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <>
      <div
        className={`w-full bg-primary-light fixed top-0 left-0 shadow-md z-30 transition-all duration-200`}
      >
        <div className="flex items-center justify-between px-4 py-2 max-w-5xl mx-auto h-[56px]">
          {/* Left: Staff Name */}
          <div className="flex-1">
          </div>
          {/* Center: Total and Expand */}
          <div className="flex-1 flex justify-center">
            <div className="">
              <button
                onClick={handleToggleExpanded}
                className={`text-lg font-bold flex items-center gap-2 px-3 font-bold text-white`}
                title={isExpanded ? "Collapse cart" : "Expand cart"}
                type="button"
              >
                <span className="text-xl">{isExpanded ? "⯆" : "⯈"}</span>

                <span className="text-4xl">${total.toFixed(2)}</span>
                <span className="text-base">({itemCount})</span>
              </button>

            </div>
          </div>
          {/* Right: Checkout */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => {
                onClickCheckout();
                setIsExpanded(false);
              }}
              className="btn-secondary"
              type="button"
            >
              Checkout
            </button>
          </div>
        </div>
        {/* Cart Details */}
        {isExpanded && (
          <div className="bg-primary-light border-t border-primary">
            <div className="max-w-5xl mx-auto px-2 py-2">
              <Cart cartItems={cartItems} />
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default TopNavBar;
