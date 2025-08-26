// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to refresh");

      const data = await res.json();

      if (data?.accessToken) {
        setToken(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        return { token: data.accessToken };
      }
    } catch (err) {
      console.error("Refresh failed:", err);
      logout();
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchWithAuth = async (url, options = {}) => {
    let res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshRes = await refreshAccessToken();

      if (refreshRes?.token) {
        res = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${refreshRes.token}`,
          },
          credentials: "include",
        });
      }
    }

    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
