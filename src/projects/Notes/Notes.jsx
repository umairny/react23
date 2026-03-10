import { useState, useEffect } from "react"
import Sidebar from "./comp/Sidebar"
import Editor from "./comp/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import './notes.css'
import "react-mde/lib/styles/css/react-mde-all.css";

export default function Notes() {
    const [notes, setNotes] = useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
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
                    newArray.unshift({ ...oldNote, body: text })
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

    return (
        <main className="notes-container glass">
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[25, 75]}
                        direction="horizontal"
                        className="notes-split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={findCurrentNote()}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={findCurrentNote()}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="notes-empty-state">
                        <div className="empty-content">
                            <h1 className="gradient-text">Capture your thoughts</h1>
                            <p>Start your journey by creating your first note.</p>
                            <button
                                className="btn btn-primary new-note-btn"
                                onClick={createNewNote}
                            >
                                <span className="plus-icon">+</span>
                                <span className="btn-text">Create New Note</span>
                            </button>
                        </div>
                    </div>
            }
        </main>
    )
}
