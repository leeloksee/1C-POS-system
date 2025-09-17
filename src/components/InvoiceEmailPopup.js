import React, { useState } from 'react';
import './InvoiceEmailPopup.css';

const InvoiceEmailPopup = ({ isOpen, onClose, onSave, currentEmail }) => {
  const [tempEmail, setTempEmail] = useState(currentEmail || '');

  const handleSubmit = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (tempEmail.trim() && !emailRegex.test(tempEmail.trim())) {
      alert("Please enter a valid email address.");
      return;
    }
    
    onSave(tempEmail.trim());
    onClose();
  };

  const handleCancel = () => {
    setTempEmail(currentEmail || '');
    onClose();
  };

  const handleKeyPress = (e) => {
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
    <div className="email-popup-overlay" onClick={handleOverlayClick}>
      <div className="email-popup" onClick={(e) => e.stopPropagation()}>
        <h3>Invoice Email</h3>
        <p>Enter email address for invoice delivery:</p>
        <input
          type="email"
          value={tempEmail}
          onChange={(e) => setTempEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="customer@example.com"
          className="email-input-field"
          autoFocus
        />
        <div className="popup-buttons">
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEmailPopup;
