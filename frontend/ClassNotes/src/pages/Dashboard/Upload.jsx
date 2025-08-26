import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function UploadNotes() {
  const navigate = useNavigate();
  const { user, token, fetchWithAuth, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [user, token, navigate]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    university: "",
    course: "",
    branch: "",
    subject: "",
    topic: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    data.append("file", file);

    try {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (res.status === 401) {
        // fallback if refresh token also failed
        setStatus("Session expired. Redirecting to login...");
        setTimeout(() => logout(), 2000);
        return;
      }

      if (!res.ok) {
        const error = await res.json();
        setStatus("Upload failed: " + (error.message || res.statusText));
        return;
      }

      // ✅ success
      setStatus("✅ Upload successful!");
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        university: "",
        course: "",
        branch: "",
        subject: "",
        topic: "",
        description: "",
      });
      setFile(null);
    } catch (err) {
      setStatus("Upload error: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 p-8 mt-10 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Notes</h2>

      {status && (
        <p
          className={`mb-4 text-sm ${
            status.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
        />

        {/* University, Course, Branch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="university"
            placeholder="University"
            value={formData.university}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Subject, Topic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
