import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from '../assets/textlogo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeClass = "text-primary font-semibold";
  const normalClass = "text-gray-700 hover:text-primary";

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            <img src={Logo} alt="ScholarStream Logo" className="h-10" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/scholarships"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              All Scholarships
            </NavLink>

            {!isLoggedIn ? (
              <>
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-primary text-primary rounded-md transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary rounded-md transition"
                  >
                    Register
                  </Link>
                </div>
              </>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-9 h-9 rounded-full cursor-pointer border"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-3 gap-3">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/scholarships" onClick={() => setMenuOpen(false)}>
              All Scholarships
            </NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button className="text-left">Logout</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
