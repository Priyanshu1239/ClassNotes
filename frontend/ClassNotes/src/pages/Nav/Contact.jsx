import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // Assuming 'form' is your state with { name, email, subject, message }
      });
  
      const result = await res.json();
      console.log("Form submitted:", result);
  
      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error("Error:", result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50  font-sans text-gray-900">
      <Navbar />
      <div className="max-w-3xl py-16 mx-auto">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Contact Me</h1>
        <p className="text-gray-600 mb-8">
          Have a question, suggestion, or feedback? I’d love to hear from you!
        </p>

        {submitted ? (
          <div className="bg-green-100 border border-green-300 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">Thank you!</h2>
            <p className="text-green-700">Your message has been sent. I’ll get back to you soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-200"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-emerald-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-emerald-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-emerald-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-emerald-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-emerald-700 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
