import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/login", {
        email,
        password,
      });

      login(response.data.user, response.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  
};

return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Expense Tracker
          </h1>

          <p className="text-white mt-2">
            Welcome Back 👋
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <div className="mb-5">

            <label className="block text-white mb-2">
              Email
            </label>

            <div className="flex items-center bg-white rounded-xl px-3">

              <FaEnvelope className="text-gray-500" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

          </div>

          <div className="mb-6">

            <label className="block text-white mb-2">
              Password
            </label>

            <div className="flex items-center bg-white rounded-xl px-3">

              <FaLock className="text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>

            </div>

          </div>
                 
                
                <div className="flex justify-start mb-4">
  <Link
    to="/forgot-password"
    className="text-white text-sm hover:underline"
  >
    Forgot Password?
  </Link>
</div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-white">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-white font-bold underline hover:text-gray-200"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;