import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-6 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="text-xl font-bold text-emerald-700">ClassNote</div>

      <div className="flex space-x-6 font-medium text-gray-700">
        {/* Home */}
        <RouterLink
          to="/"
          className={`hover:text-emerald-600 transition cursor-pointer ${
            location.pathname === "/"
              ? "bg-green-100 text-green-900 rounded-md shadow px-2 py-1"
              : ""
          }`}
        >
          Home
        </RouterLink>


        {/* Dashboard */}
        <RouterLink
          to="/dashboard"
          className={`hover:text-emerald-600 transition cursor-pointer ${
            location.pathname === "/dashboard"
              ? "bg-green-100 text-green-900 rounded-md shadow px-2 py-1"
              : ""
          }`}
        >
          Dashboard
        </RouterLink>

        {/* Benefits */}
        <RouterLink
          to="/search"
          className={`hover:text-emerald-600 transition cursor-pointer ${
            location.pathname === "/search"
              ? "bg-green-100 text-green-900 rounded-md shadow px-2 py-1"
              : ""
          }`}
        >
          Search
        </RouterLink>

        {/* Contact */}
        <RouterLink
          to="/contact"
          className={`hover:text-emerald-600 transition cursor-pointer ${
            location.pathname === "/contact"
              ? "bg-green-100 text-green-900 rounded-md shadow px-2 py-1"
              : ""
          }`}
        >
          Contact
        </RouterLink>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-800 font-medium">Hi, {user.username}</span>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <RouterLink
          to="/login"
          className="bg-green-900 text-white px-5 py-2 rounded-full font-medium hover:bg-green-800 transition"
        >
          Login/Signup ↗
        </RouterLink>
      )}
    </nav>
  );
}

export default Navbar;
