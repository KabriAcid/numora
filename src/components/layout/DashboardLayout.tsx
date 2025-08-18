import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Phone,
  Wifi,
  Tv,
  Zap,
  GraduationCap,
  ArrowRightLeft,
  Target,
  Wallet,
  History,
  User,
  Menu,
  X,
  Bell,
  LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { path: "/airtime", label: "Buy Airtime", icon: Phone },
    { path: "/data", label: "Buy Data", icon: Wifi },
    { path: "/tv", label: "Pay Bills", icon: Tv },
    { path: "/electricity", label: "Electricity", icon: Zap },
    { path: "/education", label: "Education", icon: GraduationCap },
    {
      path: "/airtime-to-cash",
      label: "Airtime to Cash",
      icon: ArrowRightLeft,
    },
    { path: "/betting", label: "Betting", icon: Target },
    { path: "/wallet", label: "Wallet", icon: Wallet },
    { path: "/transactions", label: "Transactions", icon: History },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const mobileNavigationItems = [
    { path: "/dashboard", label: "Home", icon: LayoutDashboard },
    { path: "/wallet", label: "Wallet", icon: Wallet },
    { path: "/transactions", label: "History", icon: History },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#EFF9F0]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-xl">
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#13070C] rounded-lg flex items-center justify-center mr-3">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#13070C]">Numora</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-2xl transition-all duration-200 w-full text-left ${
                      isActive(item.path)
                        ? "bg-[#EFF9F0] text-[#13070C] shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#13070C]"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive(item.path)
                          ? "text-[#13070C]"
                          : "text-gray-400 group-hover:text-[#13070C]"
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="px-2 pb-4">
              <button
                onClick={onLogout}
                className="group flex items-center px-3 py-3 text-sm font-medium rounded-2xl transition-all duration-200 w-full text-left text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-400 group-hover:text-red-600" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 flex z-40 ${
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 mb-4">
              <div className="w-8 h-8 bg-[#13070C] rounded-lg flex items-center justify-center mr-3">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#13070C]">Numora</span>
            </div>
            <nav className="px-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-2xl transition-all duration-200 w-full text-left ${
                      isActive(item.path)
                        ? "bg-[#EFF9F0] text-[#13070C] shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#13070C]"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive(item.path)
                          ? "text-[#13070C]"
                          : "text-gray-400 group-hover:text-[#13070C]"
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="px-2 pb-4">
            <button
              onClick={onLogout}
              className="group flex items-center px-3 py-3 text-sm font-medium rounded-2xl transition-all duration-200 w-full text-left text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-400 group-hover:text-red-600" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm lg:hidden">
          <button
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#13070C] lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-semibold text-[#13070C]">
                {navigationItems.find((item) => item.path === location.pathname)
                  ?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-400 hover:text-[#13070C] hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-20 lg:pb-8">{children}</main>

        {/* Mobile bottom navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="flex">
            {mobileNavigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                    isActive(item.path) ? "text-[#13070C]" : "text-gray-500"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 mb-1 ${
                      isActive(item.path) ? "text-[#13070C]" : "text-gray-400"
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
