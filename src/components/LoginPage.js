import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginSuccess, loginFailure, clearError, loginStart } from "../store/authSlice";
import { API } from "../constant";
import "./LoginPage.css";

const LoginPage = () => {
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    fetch(API, {
      redirect: "follow",
      method: 'POST',
      body: JSON.stringify({ passcode }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
      .then(response => response.text())
      .then(res => {
        const data = JSON.parse(res);
        console.log(data);
        if (data?.success) {
          dispatch(loginSuccess({
            passcode: passcode,
            items: data.items,
            formSubmitUrl: data.formSubmitUrl,
            staffNameEntryId: data.staffNameEntryId,
            totalAmountEntryId: data.totalAmountEntryId,
            itemCountEntryId: data.itemCountEntryId,
            invoiceEmailEntryId: data.invoiceEmailEntryId,
            itemsEntryId: data.itemsEntryId,
          }));
          navigate("/staff-name");
        } else {
          console.log(data);
          dispatch(loginFailure("Invalid passcode. Please try again."));
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>POS System Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="passcode">Passcode:</label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;