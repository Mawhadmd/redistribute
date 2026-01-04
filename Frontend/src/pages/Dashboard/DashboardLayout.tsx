import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Workflow,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Video,
  Calendar,
  CreditCard,
  RefreshCcw,
} from "lucide-react";
import { signOut, verifyToken, getToken } from "../../lib/api.ts";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [trialExpired, setTrialExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        // Verify token with backend
        const user = await verifyToken();
        console.log("User authenticated:", user.email);
        setUserRole(user.role || "user");
        setDaysRemaining(user.daysRemaining || 0);
        setIsAuthorized(true);
      } catch (error: any) {
        console.error("Auth check failed:", error);

        // Check if trial expired (402 status)
        if (error.response?.status === 402 || error.trialExpired) {
          setTrialExpired(true);
          setLoading(false);
          return;
        }

        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Video, label: "Uploads", path: "/dashboard/uploads" },
    { icon: Workflow, label: "Workflows", path: "/dashboard/workflows" },
 
  ];

  const handleLogout = async () => {
    try {
      // Sign out from backend
      await signOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Clear all auth data (token is already removed by signOut)
    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  // Show trial expired screen
  if (trialExpired) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Trial Period Ended
            </h1>
            <p className="text-gray-600 mb-6">
              Your 14-day trial has expired. Please upgrade to continue using
              the service.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/pricing")}
                className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
              >
                View Pricing Plans
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen relative bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex gap-1 font-bold text-xl items-center justify-center">
            <RefreshCcw className="text-accent size-6" />
            <h2>
              {" "}
              <Link to="/">Redistribute.io</Link>
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            {userRole !== "admin" && (
              <div className="hidden sm:block text-sm text-gray-600">
                <span className="font-medium">{daysRemaining} days</span> left
                in trial
              </div>
            )}
            <Link
              to="/pricing"
              className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90 transition"
            >
              {userRole === "admin" ? "Pricing" : "Upgrade"}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
