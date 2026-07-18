import { useState } from "react";
import { FaUserCircle, FaEnvelope, FaUserTag, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user?.name || "");
const [email, setEmail] = useState(user?.email || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleUpdate = async () => {
  try {
    const { data } = await api.put("/users/profile", {
      name,
      email,
    });

    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Profile Updated Successfully");

    window.location.reload();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Update Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-7xl text-blue-600 mb-4" />

          <h2 className="text-3xl font-bold">
            My Profile
          </h2>

        </div>

        <div className="mt-8 space-y-5">

          <div>
  <label className="block text-gray-500 mb-2">
    Name
  </label>

  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full border rounded-xl p-3"
  />
</div>

          <div>
  <label className="block text-gray-500 mb-2">
    Email
  </label>

  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border rounded-xl p-3"
  />
</div>

          <div className="flex items-center gap-3">
            <FaUserTag className="text-blue-600" />
            <div>
              <p className="text-gray-500">Role</p>
              <h3 className="font-semibold">
                User
              </h3>
            </div>
          </div>

        </div>
        <button
  onClick={handleUpdate}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mt-6"
>
  💾 Save Changes
</button>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;