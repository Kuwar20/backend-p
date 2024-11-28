import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import { debounce } from 'lodash';

const API_BASE_URL = 'http://localhost:5000/api/notes';

const NoteApp = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [localNote, setLocalNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    // Set local note whenever current note changes
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
            console.error('Error fetching notes:', err);
            setLoading(false);
        }
    };

    const createNewNote = async () => {
        const newNote = {
            title: 'Untitled Note',
            content: '',
        };
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNote),
            });
            const createdNote = await response.json();
            setNotes([createdNote, ...notes]);
            setCurrentNote(createdNote);
            setLocalNote(createdNote);
        } catch (err) {
            console.error('Error creating note:', err);
        }
    };

    // Debounced API call for updating note
    const debouncedUpdate = useCallback(
        debounce(async (id, updates) => {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates),
                });
                const updatedNote = await response.json();

                setNotes((prevNotes) =>
                    prevNotes.map((note) => (note.id === id ? updatedNote : note))
                );
                setCurrentNote(updatedNote);
            } catch (err) {
                console.error('Error updating note:', err);
            }
        }, 1000),
        []
    );

    // Handle local updates immediately while debouncing API calls
    const handleNoteUpdate = (id, updates) => {
        const updatedNote = { ...localNote, ...updates };
        setLocalNote(updatedNote);

        // Update the notes list immediately for UI
        setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === id ? updatedNote : note))
        );

        // Debounce the API call
        debouncedUpdate(id, updatedNote);
    };

    const deleteNote = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
            setNotes(notes.filter((note) => note.id !== id));
            if (currentNote?.id === id) {
                setCurrentNote(null);
                setLocalNote(null);
            }
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-gray-800">Notes</h1>
                        <button
                            onClick={createNewNote}
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${currentNote?.id === note.id ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => setCurrentNote(note)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800 truncate">{note.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 truncate">{note.content}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(note.lastModified).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(note.id);
                                        }}
                                        className="p-1 text-gray-400 hover:text-red-500 rounded"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {localNote ? (
                    <>
                        <div className="p-4 bg-white border-b border-gray-200">
                            <input
                                type="text"
                                value={localNote?.title || ''}
                                onChange={(e) => handleNoteUpdate(localNote.id, { title: e.target.value })}
                                className="w-full text-xl font-bold focus:outline-none"
                                placeholder="Note title"
                            />
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <textarea
                                value={localNote?.content || ''}
                                onChange={(e) => handleNoteUpdate(localNote.id, { content: e.target.value })}
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

export default NoteApp;
