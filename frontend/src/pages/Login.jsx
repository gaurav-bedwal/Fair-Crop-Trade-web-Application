import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userRole", res.data.role);
      window.location = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#111a13] font-['Inter'] text-white">
      {/* Left Side: Image & Branding */}
      <div className="hidden lg:block w-1/2 relative bg-[#0d140f]">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="/hero-bg.png"
          alt="Field"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="relative z-20 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-3">
              <svg className="w-5 h-5 text-[#111a13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">FairTrade Portal</span>
          </div>

          {/* Quote */}
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Cultivating a fairer <br />
              future for every harvest.
            </h2>
            <p className="text-gray-300 text-lg opacity-90">
              Connect directly with ethical farmers and buyers across the globe in a transparent marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#111a13]">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">
              Log in to manage your trades and connect with the community.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="farmer@example.com"
                  className="w-full bg-[#1f2f22] border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
                <div className="absolute left-4 top-3.5 text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full bg-[#1f2f22] border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
                <div className="absolute left-4 top-3.5 text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none w-4 h-4 rounded border border-gray-600 checked:bg-green-500 checked:border-green-500 transition-colors cursor-pointer"
                />
                <span className="text-gray-400 group-hover:text-green-400 transition-colors">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-green-500 hover:text-green-400">Forgot Password?</a>
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-green-500 text-[#111a13] font-bold py-3.5 rounded-xl hover:bg-green-400 transition-all shadow-[0_4px_14px_0_rgba(74,222,128,0.39)] hover:shadow-[0_6px_20px_rgba(74,222,128,0.23)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Log In"}
            </button>

            <div className="text-center text-sm text-gray-400">
              New to the platform?{" "}
              <Link to="/signup" className="text-white font-bold hover:text-green-400 hover:underline transition-all">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
