export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div 
            key={note.id}
            className={`note-list-item ${note.id === props.currentNote.id ? "selected-note" : ""}`}
            onClick={() => props.setCurrentNoteId(note.id)}
        >
            <h4 className="text-snippet">{note.body.split("\n")[0] || "Untitled Note"}</h4>
            <button
                className="delete-btn"
                onClick={(event) => props.deleteNote(event, note.id)}
                aria-label="Delete note"
            >
                <span className="delete-icon">✕</span>
            </button>
        </div>
    ))

    return (
        <section className="sidebar">
            <div className="sidebar--header">
                <h3>My Notes</h3>
                <button className="new-note" onClick={props.newNote} title="Create New Note">
                    <span>+</span>
                    <span className="btn-text">New Note</span>
                </button>
            </div>
            <div className="note-list">
                {noteElements}
            </div>
        </section>
    )
}
