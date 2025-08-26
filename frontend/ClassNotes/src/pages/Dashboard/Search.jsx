import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function SearchNotesByTopic() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setStatus("Searching...");

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setNotes(data.notes);
      setStatus(`Found ${data.notes.length} note(s).`);
    } catch (err) {
      setStatus(err.message);
      setNotes([]);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-900"> 
    <Navbar />
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow rounded-xl">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Enter topic (e.g., Differentiation)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        >
          Search Notes
        </button>
      </form>

      <p className="text-center text-sm mb-4">{status}</p>

      {notes.map((note, idx) => (
        <div key={idx} className="border p-4 rounded mb-4 shadow-sm">
          <h3 className="text-lg font-semibold">{note.topic}</h3>
          <p className="mb-2">{note.description}</p>
          <a
            href={note.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline"
            download
          >
            Download PDF
          </a>
        </div>
      ))}
    </div>
  </div> 
  );
}
