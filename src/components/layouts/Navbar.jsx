import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import textLogo from "../../assets/textlogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // Avatar generator
  const getAvatar = () => {
    if (user?.photoURL) return user.photoURL;
    if (user?.displayName) {
      return `https://via.placeholder.com/40/60AEA0/FFFFFF?text=${user.displayName
        .slice(0, 2)
        .toUpperCase()}`;
    }
    return `https://via.placeholder.com/40/60AEA0/FFFFFF?text=US`;
  };

  // Common NavLink styles
  const linkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-[#E59959] transition"
      : "hover:text-[#E59959] transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full mx-auto px-4 md:px-20 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="StudyMate Logo" className="w-10 h-10" />
          <img src={textLogo} alt="StudyMate" className="h-6" />
        </Link>

        {/* Hamburger for mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <X className="w-6 h-6 text-[#E59959]" />
          ) : (
            <Menu className="w-6 h-6 text-[#E59959]" />
          )}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/find-partners" className={linkClass}>
            Find Partners
          </NavLink>

          {user ? (
            <>
              <NavLink to="/create-partner-profile" className={linkClass}>
                Create Partner Profile
              </NavLink>

              <NavLink to="/myconnections" className={linkClass}>
                My Connections
              </NavLink>

              <div className="flex items-center gap-3 relative group">
                <img
                  src={getAvatar()}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                {/* Hover name */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {user.displayName || "User"}
                </span>
                <button
                  onClick={logout}
                  className="ml-2 bg-[#E59959] px-3 py-1 text-white rounded hover:bg-[#E59959] transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login/Register
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md flex flex-col px-6 py-4 space-y-2">
          <NavLink to="/" end onClick={() => setIsOpen(false)} className={linkClass}>
            Home
          </NavLink>

          <NavLink
            to="/find-partners"
            onClick={() => setIsOpen(false)}
            className={linkClass}
          >
            Find Partners
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/create-partner-profile"
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                Create Partner Profile
              </NavLink>

              <NavLink
                to="/myconnections"
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                My Connections
              </NavLink>

              <div className="flex items-center gap-2 mt-2">
                <img
                  src={getAvatar()}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user.displayName || "User"}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="mt-2 bg-[#E59959] text-white px-3 py-1 rounded w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={linkClass}
            >
              Login/Register
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
