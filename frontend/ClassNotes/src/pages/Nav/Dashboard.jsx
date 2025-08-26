import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/notes`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data = await res.json();
        if (Array.isArray(data.notes)) { 
          setNotes(data.notes);
        } else {
          setNotes([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
      }
    };
    fetchNotes();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-2 text-emerald-800">
          {user ? `Welcome, ${user.username}` : "Welcome to the Dashboard"}
        </h1>
        <p className="text-gray-600 mb-8">
          {user
            ? "Here are your personal uploaded notes:"
            : "Login to see your personal notes and manage your uploads."}
        </p>

        {/* Notes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
            {user ? "My Notes" : "Featured Notes"}
          </h2>
          {notes.length === 0 ? (
            <div className="text-gray-500 text-center border p-6 rounded-lg bg-white shadow-sm">
              {user
                ? "You have not uploaded any notes yet."
                : "No notes to display yet."}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {note.topic || "Untitled Note"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {note.description?.slice(0, 100) || "No description."}
                  </p>
                  <a
                    href={note.file}
                    download
                    className="mt-4 inline-block text-emerald-700 hover:underline"
                  >
                    Download Note
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upload Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
            Upload New Note
          </h2>
          <Link
            to="/upload"
            className="inline-block bg-green-900 text-white px-6 py-3 rounded-full font-medium hover:bg-green-800 transition"
          >
            Upload Note
          </Link>
        </section>
      </main>
    </div>
  );
}
