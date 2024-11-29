import React, { useCallback, useEffect, useState } from "react";
import { Trash2, Plus, Search } from "lucide-react";
import { create, debounce } from "lodash";

const API_BASE_URL = "http://localhost:5000/api/notes";

const Notes2 = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [localNote, setLocalNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setLocalNote(currentNote);
  }, [currentNote]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setNotes(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setLoading(false);
    }
  };

  const createNewNote = async () => {
    const newNote = {
      title: "Untitled Note",
      content: "",
    };
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      const createdNote = await response.json();
      setNotes([createdNote, ...notes]);
      setCurrentNote(createdNote);
      setLocalNote(createdNote);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const deleteNode = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== id));
      if (currentNote?.id === id) {
        setCurrentNote(null);
        setLocalNote(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const debouncedUpdate = useCallback(
    debounce(async (id, updates) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        const updatedNote = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === id ? updatedNote : note))
        );
        setCurrentNote(updatedNote);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }, 1000),
    []
  );

  const handleNoteUpdate = (id, updates) => {
    const updatedNote = { ...localNote, ...updates };
    setLocalNote(updatedNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updatedNote : note))
    );

    debouncedUpdate(id, updatedNote);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">Notes</h1>
            <button
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
              onClick={createNewNote}
            >
              <Plus size={22} />
            </button>
          </div>
          <div className="relative">
            <Search
              size={20}
              className="absolute top-2.5 left-3 text-gray-400 "
            />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-4 text-gray-500">Loading notes...</p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${currentNote?.id === note.id ? "bg-blue-50" : ""
                  }`}
                onClick={() => setCurrentNote(note)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 truncate">
                      {note.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {note.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(note.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(note.id);
                    }}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {localNote ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200">
              <input
                type="text"
                value={localNote?.title || ""}
                onChange={(e) =>
                  handleNoteUpdate(localNote.id, { title: e.target.value })
                }
                className="w-full text-xl font-bold focus:outline-none"
                placeholder="Note title"
              />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <textarea
                value={localNote?.content || ""}
                onChange={(e) =>
                  handleNoteUpdate(localNote.id, { content: e.target.value })
                }
                className="w-full h-full p-4 focus:outline-none resize-none"
                placeholder="Start writing your note here..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p>Select a note or create a new one</p>
              <button
                onClick={createNewNote}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes2;
