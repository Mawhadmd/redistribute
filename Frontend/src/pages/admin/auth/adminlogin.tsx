import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import { adminSignIn, verifyToken, getToken } from "../../../lib/api.ts";

export default function AdminLogin() {
  const [masterPassword, setMasterPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  // Check if already authenticated with valid JWT token
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const user = await verifyToken();
          if (user.role === "admin") {
            console.log("Already authenticated as admin, redirecting");
            navigate("/admin");
          }
        } catch (error) {
          // Token invalid, stay on login page
          console.log("Invalid token, staying on login page");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!masterPassword)
      newErrors.masterPassword = "Admin password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setGeneralError("");

    try {
      console.log("Attempting admin login...");
      const result = await adminSignIn(masterPassword);
      console.log("Admin login successful:", result);

      // Token is already stored by adminSignIn API function
      // Store user info
      localStorage.setItem("userInfo", JSON.stringify({ role: "admin" }));

      console.log("Navigating to /admin");
      navigate("/admin");
    } catch (error: any) {
      console.error("Admin login error:", error);
      setGeneralError(
        error.message || "Invalid admin password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Admin Portal</h1>
          <p className="text-gray-400">Sign in to access admin dashboard</p>
        </div>

        <div className="p-8 rounded-2xl shadow-2xl bg-gray-800 border border-gray-700">
          {generalError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-200">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                    errors.masterPassword
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-600 focus:ring-accent/50"
                  }`}
                  disabled={loading}
                  autoFocus
                />
              </div>
              {errors.masterPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.masterPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              <Link to="/" className="text-accent hover:underline">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
