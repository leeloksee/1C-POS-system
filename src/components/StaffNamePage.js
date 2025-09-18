import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setStaffName, clearError } from "../store/authSlice";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark">
      <div className="w-full max-w-sm bg-primary p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to POS System</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="staffName"
              className="block text-sm font-medium mb-1"
            >
              Enter your name
            </label>
            <input
              type="text"
              id="staffName"
              value={staffNameInput}
              onChange={(e) => setStaffNameInput(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 transition"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200  px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Continue to POS
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffNamePage;
