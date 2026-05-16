export default function Sidebar(props) {
    function getNoteTitle(note) {
        const firstLine = note.body.split("\n").find(line => line.trim())
        return firstLine ? firstLine.replace(/^#+\s*/, "") : "Untitled Note"
    }

    function getNotePreview(note) {
        const lines = note.body.split("\n").map(line => line.replace(/^#+\s*/, "").trim())
        return lines.find(line => line && line !== getNoteTitle(note)) || "No additional text yet."
    }

    function formatUpdatedAt(timestamp) {
        if (!timestamp) return "Just now"

        return new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }).format(timestamp)
    }

    const noteElements = props.notes.map(note => (
        <div
            role="button"
            tabIndex="0"
            key={note.id}
            className={`note-list-item ${note.id === props.currentNote.id ? "selected-note" : ""}`}
            onClick={() => props.setCurrentNoteId(note.id)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    props.setCurrentNoteId(note.id)
                }
            }}
        >
            <span className="note-list-content">
                <span className="text-snippet">{getNoteTitle(note)}</span>
                <span className="note-preview">{getNotePreview(note)}</span>
                <span className="note-date">{formatUpdatedAt(note.updatedAt)}</span>
            </span>
            <button
                type="button"
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
                <div>
                    <p className="sidebar-kicker">{props.totalNotes} saved</p>
                    <h3>My Notes</h3>
                </div>
                <button className="new-note" onClick={props.newNote} title="Create New Note">
                    <span>+</span>
                </button>
            </div>
            <div className="notes-search">
                <input
                    type="search"
                    placeholder="Search notes"
                    value={props.searchTerm}
                    onChange={(event) => props.setSearchTerm(event.target.value)}
                />
            </div>
            <div className="note-list">
                {props.notes.length > 0 ? noteElements : (
                    <div className="no-results">
                        <h4>No matches</h4>
                        <p>Try a different search or create a fresh note.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
