import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, LogIn, RefreshCcw } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      // Store logged in user
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: user.email, name: user.name })
      );
      navigate("/dashboard");
    } else {
      setErrors({ ...errors, password: "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to your account to continue</p>
        </div>
        <div className=" gap-1 hidden sm:flex font-bold text-2xl items-center justify-center absolute mt-14 top-0 left-0 p-4">
          <RefreshCcw className="text-accent size-9" />
          <h2>
            {" "}
            <Link to="/">Redistribute.io</Link>
          </h2>
        </div>
        <div className="p-2 absolute top-0 left-0 right-0 shadow-sm h-14 bg-accent/50 text-md md:text-2xl flex justify-center items-center font-semibold">
          You don't need to enter any details, This is a demo
        </div>
        <div className=" p-8 rounded-2xl shadow ">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-accent/50"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 accent-accent"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Link to={"/dashboard"}>
              <button
                type="submit"
                className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Log In
              </button>
            </Link>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-accent font-semibold hover:underline"
              >
                Start free trial
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="text-sm">
            <Link
              to="/privacy-policy"
              className="text-accent hover:underline mr-3"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">·</span>
            <Link
              to="/terms-of-service"
              className="text-accent hover:underline ml-3"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
