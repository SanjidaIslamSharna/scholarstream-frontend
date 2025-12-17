import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiMenu,
  FiUser,
  FiBook,
  FiUsers,
  FiBarChart2,
  FiLogOut,
  FiClipboard,
  FiStar,
} from "react-icons/fi";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const menuByRole = {
    Admin: [
      { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
      { name: "Add Scholarship", path: "/dashboard/add-scholarship", icon: <FiBook /> },
      { name: "Manage Scholarships", path: "/dashboard/manage-scholarships", icon: <FiClipboard /> },
      { name: "Manage Users", path: "/dashboard/manage-users", icon: <FiUsers /> },
      { name: "Analytics", path: "/dashboard/analytics", icon: <FiBarChart2 /> },
    ],
    Moderator: [
      { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
      { name: "Applications", path: "/dashboard/manage-applications", icon: <FiClipboard /> },
      { name: "Reviews", path: "/dashboard/reviews", icon: <FiStar /> },
    ],
    Student: [
      { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
      { name: "My Applications", path: "/dashboard/my-applications", icon: <FiClipboard /> },
      { name: "My Reviews", path: "/dashboard/my-reviews", icon: <FiStar /> },
    ],
  };

  const menus = menuByRole[user?.role] || [];

  return (
    <div
      className={`max-h-screen bg-[#0f172a] text-white flex flex-col transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
        {!collapsed && <h1 className="text-lg font-bold">Dashboard</h1>}
        <button onClick={() => setCollapsed(!collapsed)}>
          <FiMenu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm
              ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4 flex items-center gap-3">
        <img
          src={user?.photoURL || "https://i.ibb.co/2kR1Y5C/avatar.png"}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
        {!collapsed && (
          <div className="flex-1">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        )}
        <button onClick={logout} className="text-red-400">
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
