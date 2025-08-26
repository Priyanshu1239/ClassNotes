import { useAuth } from "../context/AuthContext";

function NotesPage() {
  const { fetchWithAuth } = useAuth();

  const loadNotes = async () => {
    const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/notes`);
    const data = await res.json();
    console.log("Notes:", data);
  };

  return (
    <button onClick={loadNotes}>
      Load Notes
    </button>
  );
}
