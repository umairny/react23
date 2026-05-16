import { useState } from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    const title = currentNote.body.split("\n").find(line => line.trim())?.replace(/^#+\s*/, "") || "Untitled Note"
    const wordCount = currentNote.body.trim()
        ? currentNote.body.trim().split(/\s+/).length
        : 0
    const characterCount = currentNote.body.length

    return (
        <section className="pane editor">
            <div className="editor-topbar">
                <div>
                    <p className="editor-kicker">Editing</p>
                    <h2>{title}</h2>
                </div>
                <div className="editor-meta" aria-label="Note statistics">
                    <span>{wordCount} words</span>
                    <span>{characterCount} chars</span>
                </div>
            </div>
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
