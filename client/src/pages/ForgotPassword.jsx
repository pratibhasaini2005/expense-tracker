import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/users/forgot-password", {
        email,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
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
            Forgot Password
          </h1>

          <p className="text-white mt-2">
            Enter your registered email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">

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
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/"
            className="text-white underline hover:text-gray-200"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;