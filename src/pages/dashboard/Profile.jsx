import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-linear-to-r from-[#154E81] to-[#5EBDDB] rounded-xl p-6 text-white flex items-center gap-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/2kRZ5q0/user.png"}
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />

        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-sm opacity-90">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-xs bg-white/20 rounded-full">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Personal Info</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span> {user?.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Role:</span> {user?.role}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Account Status</h3>
          <p className="text-sm text-gray-600">
            Status: <span className="text-green-600 font-medium">Active</span>
          </p>
          <p className="text-sm text-gray-600">
            Joined: <span className="font-medium">Recently</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
