import React, { useState, useEffect } from 'react';

const InvoiceEmailPopup = ({ isOpen, onClose, onSave, currentEmail }) => {
  const [tempEmail, setTempEmail] = useState(currentEmail || '');
  useEffect(() => {
    setTempEmail(currentEmail);
  }, [currentEmail])

  const handleSubmit = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (tempEmail.trim() && !emailRegex.test(tempEmail.trim())) {
      alert("Please enter a valid email address.");
      return;
    }
    
    onSave(tempEmail.trim());
    setTempEmail('');
    onClose();
  };

  const handleCancel = () => {
    setTempEmail(currentEmail || '');
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-primary p-6 shadow-lg max-w-sm w-[90%] animate-[popupSlideIn_0.3s_ease-out] "
        onClick={e => e.stopPropagation()}
      >
        <h3 className="mb-2 text-lg font-semibold">Invoice Email</h3>
        <p className="mb-4 text-sm">Enter email address for invoice delivery</p>
        <input
          type="email"
          value={tempEmail}
          onChange={e => setTempEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="customer@example.com"
          className="w-full px-3 py-2 text-primary mb-6"
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="btn-primary-outline"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        {/* Tailwind can't animate custom keyframes unless defined in tailwind.config.js, so fallback to inline style above */}
        <style>
          {`
            @keyframes popupSlideIn {
              from { opacity: 0; transform: translateY(-20px);}
              to { opacity: 1; transform: translateY(0);}
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default InvoiceEmailPopup;
