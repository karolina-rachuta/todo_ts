import React, { useState } from 'react';


function App() {
    const [note, setNote] = useState("")
    const [notes, setNotes] = useState<string[]>([])

    function handleAddingNote(e: any): any {
        const newNote = note;
        setNotes([...notes, newNote]);
        setNote('')
    }
    return (
        <div>
            <div>
                <label htmlFor="notes">Your notes</label>
                <input type="text" placeholder='todo' name="notes" id="notes" value={note} onChange={(e) => setNote(e.target.value)} />
                <button type="button" onClick={handleAddingNote}>Add</button>
            </div>
            <div>
                <h2>List of todos:</h2>
                <ul>{notes.map((note, index) => (<li key="">{note} <button type="button">-</button><button type='button'>tick</button></li>))}</ul>
            </div>
        </div>
    );
}

export default App;
