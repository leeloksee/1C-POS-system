import React from "react";

const PAYMENT_METHODS = [
  { value: "Credit Card", label: "Credit Card" },
  { value: "PayMe", label: "PayMe" },
  { value: "Octopus", label: "Octopus" },
  { value: "Cash", label: "Cash" },
];

const PaymentMethodSelection = ({ value, onChange, disabled }) => {
  return (
    <div className="mb-4">
      <label className="block text-white font-semibold mb-2">
        Payment Method
      </label>
      <div className="flex">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.value}
            type="button"
            className={`px-2 py-1 text-xs border
              ${
                value === method.value
                  ? "border-gray-100 bg-primary-light text-white"
                  : "text-gray-400 border-gray-500"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={() => !disabled && onChange && onChange(method.value)}
            disabled={disabled}
          >
            {method.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelection;

