import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// User imports
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

// Admin imports
import AdminLogin from './components/auth/AdminLogin';  
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLayout from './components/layout/AdminLayout';
import Analytics from './components/admin/Analytics';
import PricingControl from './components/admin/PricingControl';
import UserManagement from './components/admin/UserManagement';
import TransactionManagement from './components/admin/TransactionManagement';
import AdminProfile from './components/admin/AdminProfile';

function App() {
  // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  type User = {
    hasTransactionPin: boolean;
    transactionPin?: string;
    // Add other user properties as needed
    [key: string]: any;
  };
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSetPinModal, setShowSetPinModal] = useState(false);

  // Admin state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // User auth check
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
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

    // Admin auth check
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // User handlers

  const handleLogin = (userData: User) => {
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

  const handleSetPin = (pin: string) => {
    // You can use the pin value here if needed, for example, save it to user object
    const updatedUser = { ...user, hasTransactionPin: true, transactionPin: pin };
    setUser(updatedUser);
    localStorage.setItem('vtu_auth', JSON.stringify({ user: updatedUser }));
    setShowSetPinModal(false);
  };

  // Admin handlers
  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('admin_token', 'sample_token');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_token');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Admin routes */}
            <Route
              path="/admin/login"
              element={
                !isAdminAuthenticated ? (
                  <AdminLogin onLogin={handleAdminLogin} />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/admin/*"
              element={
                isAdminAuthenticated ? (
                  <AdminLayout onLogout={handleAdminLogout}>
                    <Routes>
                      <Route index element={<AdminDashboard />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="pricing" element={<PricingControl />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="transactions" element={<TransactionManagement />} />
                      <Route path="profile" element={<AdminProfile />} />
                    </Routes>
                  </AdminLayout>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* User routes */}
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
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
              </>
            )}

            {/* Default route */}
            <Route path="/" element={<Navigate to={isAdminAuthenticated ? "/admin" : (isAuthenticated ? "/dashboard" : "/login")} replace />} />
          </Routes>
        </AnimatePresence>

        {/* User SetPin Modal */}
        {showSetPinModal && (
          <SetPinModal onSetPin={handleSetPin} onClose={() => setShowSetPinModal(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;