import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setStaffName, logout, clearError } from "../store/authSlice";
import "./StaffNamePage.css";

const StaffNamePage = () => {
  const [staffNameInput, setStaffNameInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { staffName } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (staffNameInput.trim()) {
      dispatch(setStaffName(staffNameInput.trim()));
      navigate("/pos");
    } else {
      setError("Please enter your name.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="staff-name-page">
      <div className="staff-name-container">
        <h1>Welcome to POS System</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="staffName">Enter your name:</label>
            <input
              type="text"
              id="staffName"
              value={staffNameInput}
              onChange={(e) => setStaffNameInput(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Continue to POS
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffNamePage;
