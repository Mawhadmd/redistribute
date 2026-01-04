import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, CheckCircle2, AlertCircle } from "lucide-react";
import { userSignUp, verifyToken, getToken } from "../../lib/api.ts";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          await verifyToken();
          console.log("User already authenticated, redirecting to dashboard");
          navigate("/dashboard");
        } catch (error) {
          // Token invalid, stay on register page
          console.log("Invalid token, staying on register page");
        }
      }
    };
    checkAuth();
  }, [navigate]);
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreedToTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setGeneralError("");

    try {
      const result = await userSignUp(email, password, name);

      // Store user info (token is already stored by API)
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          user: result.user,
          role: result.role,
        })
      );

      navigate("/dashboard");
    } catch (error: any) {
      setGeneralError(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Start Your Free Trial</h1>
          <p className="text-gray-600">
            No credit card required. 14 days free.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {generalError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/50"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/50"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/50"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/50"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 mr-3 w-4 h-4 accent-accent"
                  disabled={loading}
                />
                <span className="text-sm my-2 text-gray-600">
                  I agree to the{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="text-accent hover:underline"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-accent hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-5 h-5" />
              {loading ? "Creating account..." : "Start Free Trial"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Your data is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
}
