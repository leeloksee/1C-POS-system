import React, { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import TopNavBar from "./TopNavBar";
import Item from "./Item";
import ItemRow from "./ItemRow";
import InvoiceEmailPopup from "./InvoiceEmailPopup";
import { API } from "../constant";
import { loginSuccess } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../store/hooks';
import "./MainPage.css";

const MainPage = () => {
  const [cart, setCart] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const { staffName, staffNameEntryId, totalAmountEntryId, itemCountEntryId, invoiceEmailEntryId, itemsEntryId, items, formSubmitUrl, passcode } = useAppSelector((state) => state.auth);
  const [invoiceEmail, setInvoiceEmail] = useState('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  useEffect(() => {
    console.log(items, passcode);
    if (items.length > 0) {
      return;
    }
    if (items.length === 0 && passcode) {
      fetch(API, {
        redirect: "follow",
        method: 'POST',
        body: JSON.stringify({ passcode }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })
        .then(response => response.text())
        .then(res => {
          const data = JSON.parse(res);
          if (data.success) {
            dispatch(loginSuccess({
              items: data.items,
              formSubmitUrl: data.formSubmitUrl,
              staffNameEntryId: data.staffNameEntryId,
              totalAmountEntryId: data.totalAmountEntryId,
              itemCountEntryId: data.itemCountEntryId,
              invoiceEmailEntryId: data.invoiceEmailEntryId,
              itemsEntryId: data.itemsEntryId,
            }));
          } else {
            console.log(data);
            navigate('/login');
          }
        });
    } else if (!passcode) {
      navigate('/login');
    }
  }, [items]);
  // Calculate total and item count
  const total = Object.entries(cart).reduce((sum, [itemId, quantity]) => {
    const item = items.find(item => item.id === itemId);
    return sum + (item ? item.price * quantity : 0);
  }, 0);

  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  // Format cart items for display
  const cartItems = Object.entries(cart)
    .filter(([itemId, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => {
      const item = items.find(item => item.id === itemId);
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCart(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  const handleViewModeToggle = () => {
    setViewMode(prev => prev === 'grid' ? 'table' : 'grid');
  };

  const handleEmailButtonClick = () => {
    setShowEmailPopup(true);
  };

  const handleEmailSave = (email) => {
    setInvoiceEmail(email);
  };

  const handleEmailPopupClose = () => {
    setShowEmailPopup(false);
  };

  const handleSubmit = async () => {
    if (itemCount === 0) {
      alert("Please add items to cart before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formData = new FormData();
      
      // Add staff name from Redux store
      if (staffNameEntryId) {
        formData.append(`entry.${staffNameEntryId}`, staffName || 'Unknown');
      }
      if (totalAmountEntryId) {
        formData.append(`entry.${totalAmountEntryId}`, total.toFixed(2));
      }
      if (itemCountEntryId) {
      formData.append(`entry.${itemCountEntryId}`, itemCount);
      }
      if (invoiceEmailEntryId) {
        formData.append(`entry.${invoiceEmailEntryId}`, invoiceEmail);
      }
      Object.entries(cart).forEach(([itemId, quantity]) => {
        if (quantity > 0) {
          const item = items.find(item => item.id === itemId);
          if (item) {
            formData.append(`entry.${item.id}`, quantity);
            if (itemsEntryId) {
              formData.append(`entry.${itemsEntryId}`, `${item.name} x${quantity} - $${(item.price * quantity).toFixed(2)}`);
            }
          }
        }
      });

      // Replace this URL with your actual Google Form URL
      const GOOGLE_FORM_URL = formSubmitUrl;


      // Submit the form data to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      
      alert(`Order submitted successfully!\nTotal: $${total.toFixed(2)}\nItems: ${itemCount}\nInvoice Email: ${invoiceEmail}`);
      
      // Reset cart
      setCart({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-page">
      <TopNavBar total={total} itemCount={itemCount} onClickCheckout={handleSubmit} cartItems={cartItems} />
      
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto 8px auto", padding: "0 8px" }}>
       <button className="add-invoice-email-btn" onClick={handleEmailButtonClick}>
         {invoiceEmail ? `${invoiceEmail} (Edit)` : 'No Invoice Email (Add)'}
       </button>
      <div className="view-toggle-container">
        <button
          type="button"
          className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={handleViewModeToggle}
          title={`Switch to ${viewMode === 'grid' ? 'table' : 'grid'} view`}
        >
          {viewMode === 'grid' ? 'Table View' : 'Grid View'}
        </button>
        <button
          type="button"
          className="reset-button"
          disabled={isSubmitting || itemCount === 0}
          onClick={() => setCart({})}
          title="Reset all quantities"
        >
          Reset
        </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="items-grid">
          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              quantity={cart[item.id] || 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      ) : (
        <div className="items-table-container">
          <table className="items-table">
            <tbody>
              {items.map(item => (
                <ItemRow
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] || 0}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Email Popup */}
      <InvoiceEmailPopup
        isOpen={showEmailPopup}
        onClose={handleEmailPopupClose}
        onSave={handleEmailSave}
        currentEmail={invoiceEmail}
      />
    </div>
  );
};

export default MainPage;
