import { useState, useEffect } from "react"
import Sidebar from "./comp/Sidebar"
import Editor from "./comp/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import './notes.css'
import "react-mde/lib/styles/css/react-mde-all.css";

function getStoredNotes() {
    try {
        return JSON.parse(localStorage.getItem("notes")) || []
    } catch {
        return []
    }
}

export default function Notes() {
    const [notes, setNotes] = useState(getStoredNotes)
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    useEffect(() => {
        if (notes.length === 0) {
            setCurrentNoteId("")
            return
        }

        if (!notes.some(note => note.id === currentNoteId)) {
            setCurrentNoteId(notes[0].id)
        }
    }, [notes, currentNoteId])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Untitled note\n\nStart writing here...",
            updatedAt: Date.now()
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        // Put the most recently-modified note at the top
        setNotes(oldNotes => {
            const newArray = []
            for (let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if (oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text, updatedAt: Date.now() })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    const currentNote = findCurrentNote()
    const filteredNotes = notes.filter(note => {
        return note.body.toLowerCase().includes(searchTerm.trim().toLowerCase())
    })

    return (
        <main className="notes-page">
            {
                notes.length > 0
                    ?
                    <div className="notes-shell">
                        <Split
                            sizes={[28, 72]}
                            minSize={[250, 420]}
                            gutterSize={10}
                            direction="horizontal"
                            className="notes-split"
                        >
                            <Sidebar
                                notes={filteredNotes}
                                totalNotes={notes.length}
                                currentNote={currentNote}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                setCurrentNoteId={setCurrentNoteId}
                                newNote={createNewNote}
                                deleteNote={deleteNote}
                            />
                            {
                                currentNoteId &&
                                currentNote &&
                                <Editor
                                    currentNote={currentNote}
                                    updateNote={updateNote}
                                />
                            }
                        </Split>
                    </div>
                    :
                    <div className="notes-empty-state">
                        <div className="empty-content">
                            <p className="empty-kicker">Markdown notes</p>
                            <h1>Capture your thoughts</h1>
                            <p>Start with one clean note. Your drafts are saved locally in this browser.</p>
                            <button
                                className="btn btn-primary new-note-btn"
                                onClick={createNewNote}
                            >
                                Create New Note
                            </button>
                        </div>
                    </div>
            }
        </main>
    )
}
