import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import AdminNav from "./AdminNav.tsx";
import { verifyToken, getToken } from "../../lib/api.ts";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check if we're on the login page
    if (location.pathname === "/admin/login") {
      setLoading(false);
      setIsAuthorized(true);
      return;
    }

    const checkAuth = async () => {
      try {
        const token = getToken();

        if (!token) {
          console.log("No token found, redirecting to admin login");
          navigate("/admin/login");
          setLoading(false);
          return;
        }

        // Verify token with backend
        const user = await verifyToken();

        // Check if user has admin role
        if (user.role === "admin") {
          console.log("Admin authenticated successfully");
          setIsAuthorized(true);
        } else {
          console.log("User is not admin, redirecting to admin login");
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Admin auth check failed:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sm:hidden flex justify-center items-center text-3xl h-screen w-full">
        Please access this page from a PC
      </div>
      <div className="hidden sm:flex w-full">
        <AdminNav />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
