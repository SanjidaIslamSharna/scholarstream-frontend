import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import textLogo from "../assets/textlogo.png";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative p-4 flex justify-center items-center"
      style={{
        backgroundImage: "url('https://i.postimg.cc/kXDCf22q/book-2178586-1920.jpg')",
      }}
    >
      {/* 🔹 Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔹 Login form */}
      <div className="relative w-full h-fit md:w-2/5 max-w-md mx-auto p-8 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl border border-white/30 z-10">
        <Link to="/" className="flex gap-2 items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="h-10"/>
            <img src={textLogo} alt="StudyMate" className="h-6" />
        </Link>
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow">
          Login
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#E59959] placeholder-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#E59959] placeholder-white"
          />
          <button
            type="submit"
            className="bg-[#E59959] text-white px-4 py-2 rounded hover:bg-[#c1804b] transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Login with Google
        </button>

        <p className="mt-4 text-sm text-center text-white/90">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
