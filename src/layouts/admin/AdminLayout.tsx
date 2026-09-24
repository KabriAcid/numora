import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  DollarSign, 
  Users, 
  CreditCard, 
  User, 
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Pricing Control', href: '/admin/pricing', icon: DollarSign },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Transactions', href: '/admin/transactions', icon: CreditCard },
    { name: 'Profile', href: '/admin/profile', icon: User },
  ];

  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%',
        }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:static lg:translate-x-0 lg:shadow-none border-r border-neutral-200"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-ginto font-bold text-neutral-900">Numora Admin</h2>
                <p className="text-sm text-neutral-500">Control Panel</p>
              </div> 
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Admin Profile */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-neutral-50">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {adminUser.name || 'Admin User'}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {adminUser.role || 'Super Admin'}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full mt-3 flex items-center space-x-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center space-x-2 bg-neutral-50 rounded-2xl px-4 py-2 w-96">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search transactions, users..."
                  className="bg-transparent border-none outline-none flex-1 text-sm placeholder-neutral-400"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-xl hover:bg-neutral-100 transition-colors">
                <Bell className="w-5 h-5 text-neutral-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;