import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { initializeAuth } from './store/authSlice';
import LoginPage from './components/LoginPage';
import StaffNamePage from './components/StaffNamePage';
import MainPage from './components/MainPage';
import './App.css';

function AppContent() {
  const dispatch = useAppDispatch();
  const { passcode, staffName } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Initialize auth state from cookies on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="App bg-primary text-white">
        <Routes>
          <Route 
            path="/" 
            element={
              passcode && staffName ? 
                <Navigate to="/pos" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/staff-name" 
            element={
              passcode ? 
                <StaffNamePage /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/pos" 
            element={
              passcode && staffName ? 
                <MainPage /> : 
                <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
