import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import PaymentMethodSelection from "./PaymentMethodSelection";

const CheckoutPopup = ({
  isOpen,
  onClose,
  total,
  itemCount,
  cartItems = [],
  onConfirm,
  invoiceEmail: initialInvoiceEmail = "",
  onInvoiceEmailChange,
}) => {
  const [email, setEmail] = useState(initialInvoiceEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [remarks, setRemarks] = useState("");
  const { staffName } = useAppSelector((state) => state.auth);

  const [showSuccess, setShowSuccess] = useState(false);

  // Keep local email in sync if popup is reopened with a different value
  React.useEffect(() => {
    setEmail(initialInvoiceEmail || "");
    setError("");
  }, [initialInvoiceEmail, isOpen]);

  if (!isOpen) return null;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (onInvoiceEmailChange) {
      onInvoiceEmailChange(e.target.value);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError("");
    try {
        console.log(email)
        const success = await onConfirm({email, paymentMethod, remarks});
        console.log(success);
        setShowSuccess(success);
    } catch (err) {
      setError(
        err?.message ||
          "An error occurred while confirming checkout. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-primary shadow-lg p-6 w-80 max-w-full max-h-full overflow-y-auto flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-green-400 text-center">Order successfully submitted!</h2>
          <button
            className="btn-primary mt-4"
            onClick={onClose}
            autoFocus
          >
            Continue to next order
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30 ">
      <div className="bg-primary shadow-lg p-6 w-80 max-w-full max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Confirm Checkout</h2>
        <div className="mb-2 text-gray-400 flex flex-row text-xs justify-between">
          <div>
            <span className="font-semibold">Total:</span> ${total?.toFixed(2)} ({itemCount})
          </div>
          <div>
            <span className="font-semibold">Staff: {staffName}</span>
          </div>
        </div>
        <div className="mb-4">
          <ul className=" overflow-y-auto">
            {cartItems.length === 0 ? (
              <li className="text-gray-300 text-sm">No items in cart.</li>
            ) : (
              cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-white text-xs py-1 border-b border-primary-light last:border-b-0"
                >
                  <div class="flex flex-row">
                    <span class="min-w-[20px]">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <PaymentMethodSelection
          value={paymentMethod}
          onChange={setPaymentMethod}
          disabled={isLoading}
        />
        <div className="">
          <label
            className="block text-white font-semibold mb-1"
            htmlFor="checkout-invoice-email"
          >
            Invoice Email
          </label>
          <input
            id="checkout-invoice-email"
            type="email"
            className="w-full px-3 py-2 text-primary mb-6"
            placeholder="Enter invoice email (optional)"
            value={email}
            onChange={handleEmailChange}
            autoComplete="off"
            disabled={isLoading}
          />
        </div>


        <div className="">
          <label
            className="block text-white font-semibold mb-1"
            htmlFor="checkout-remarks"
          >
            Remarks
          </label>
          <textarea
            id="checkout-remarks"
            className="w-full px-3 py-2 text-primary mb-6 resize-none"
            placeholder="Enter remarks (optional)"
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
            rows={2}
            disabled={isLoading}
          />
        </div>
        {error && (
          <div className="mb-3 text-red-300 text-sm font-semibold">{error}</div>
        )}
        <div className="flex justify-end gap-2">
          <button
            className="btn-primary-outline"
            onClick={onClose}
            type="button"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn-secondary"
            onClick={handleConfirm}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <span className="animate-spin inline-block mr-2">⏳</span>
                Confirming...
              </span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;



