import { useState } from "react";
import {
  FaUserCircle,
  FaUserTag,
  FaSignOutAlt,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const { data } = await api.put("/users/profile", {
        name,
        email,
      });

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Profile Updated Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-6">

      <div className="w-full max-w-md rounded-3xl border border-white/30 bg-slate-900/20 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-8">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-7xl text-white drop-shadow-lg mb-4" />

          <h1 className="text-3xl font-bold text-white">
            Hi, {name} 👋
          </h1>

          <p className="text-white/70 mt-2 text-center">
            Manage your profile information
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <div>
            <label className="block text-white font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-white/15 border border-white/40 px-4 py-3 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-white/15 border border-white/40 px-4 py-3 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 p-4">
            <FaUserTag className="text-white text-xl" />

            <div>
              <p className="text-white/70 text-sm">
                Role
              </p>

              <h3 className="text-white font-semibold">
                User
              </h3>
            </div>
          </div>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-cyan-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            }`}
          >
            <FaSave />
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 hover:scale-[1.02] transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;