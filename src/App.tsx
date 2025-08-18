import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import Dashboard from './components/dashboard/Dashboard';
import AirtimePage from './components/services/AirtimePage';
import DataPage from './components/services/DataPage';
import TVSubscriptionPage from './components/services/TVSubscriptionPage';
import ElectricityPage from './components/services/ElectricityPage';
import EducationPage from './components/services/EducationPage';
import AirtimeToCashPage from './components/services/AirtimeToCashPage';
import BettingPage from './components/services/BettingPage';
import WalletPage from './components/wallet/WalletPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import ProfilePage from './components/profile/ProfilePage';
import LoadingScreen from './components/ui/LoadingScreen';
import SetPinModal from './components/modals/SetPinModal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSetPinModal, setShowSetPinModal] = useState(false);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const savedAuth = localStorage.getItem('vtu_auth');
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUser(authData.user);
        if (!authData.user.hasTransactionPin) {
          setShowSetPinModal(true);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('vtu_auth', JSON.stringify({ user: userData }));
    if (!userData.hasTransactionPin) {
      setShowSetPinModal(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('vtu_auth');
  };

  const handleSetPin = (pin) => {
    const updatedUser = { ...user, hasTransactionPin: true };
    setUser(updatedUser);
    localStorage.setItem('vtu_auth', JSON.stringify({ user: updatedUser }));
    setShowSetPinModal(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#EFF9F0]">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/airtime" element={<AirtimePage user={user} onLogout={handleLogout} />} />
            <Route path="/data" element={<DataPage user={user} onLogout={handleLogout} />} />
            <Route path="/tv" element={<TVSubscriptionPage user={user} onLogout={handleLogout} />} />
            <Route path="/electricity" element={<ElectricityPage user={user} onLogout={handleLogout} />} />
            <Route path="/education" element={<EducationPage user={user} onLogout={handleLogout} />} />
            <Route path="/airtime-to-cash" element={<AirtimeToCashPage user={user} onLogout={handleLogout} />} />
            <Route path="/betting" element={<BettingPage user={user} onLogout={handleLogout} />} />
            <Route path="/wallet" element={<WalletPage user={user} onLogout={handleLogout} />} />
            <Route path="/transactions" element={<TransactionsPage user={user} onLogout={handleLogout} />} />
            <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        )}
        
        {showSetPinModal && (
          <SetPinModal onSetPin={handleSetPin} onClose={() => setShowSetPinModal(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;