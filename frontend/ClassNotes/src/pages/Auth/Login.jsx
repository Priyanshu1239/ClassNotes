import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(form.email)) newErrors.email = 'Invalid email format';

    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
  
      if (data.data?.accessToken) {
        login(data.data.user, data.data.accessToken);
        navigate("/"); // redirect after login
      } else {
        alert("No token received from server");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-pink-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-900 hover:bg-green-600 text-white font-medium transition"
            >
              Login
            </button>
          </form>

          {/* Signup Button */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">New here?</p>
            <button
              onClick={() => navigate('/signup')}
              className="mt-2 w-full py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
