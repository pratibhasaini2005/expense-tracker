import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/users/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password reset failed"
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
            Reset Password
          </h1>

          <p className="text-white mt-2">
            Enter your new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">

          <label className="block text-white mb-2">
            New Password
          </label>

          <div className="flex items-center bg-white rounded-xl px-3 mb-5">

            <FaLock className="text-gray-500" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full p-3 outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <label className="block text-white mb-2">
            Confirm Password
          </label>

          <div className="flex items-center bg-white rounded-xl px-3">

            <FaLock className="text-gray-500" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full p-3 outline-none bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;