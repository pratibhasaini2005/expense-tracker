import {
  FaWallet,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-8 py-4">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-3">
          <FaWallet className="text-blue-600 text-3xl" />

          <h1 className="text-xl md:text-2xl font-bold text-blue-600">
            Expense Tracker
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">

          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-gray-700" />

            <span className="font-semibold text-center">
              {user?.name}
            </span>
          </div>
          <Link
  to="/profile"
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
>
  Profile
</Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;