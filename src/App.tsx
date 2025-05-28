import React, { useState } from 'react';


function App() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState<string[]>([]);

    function handleAddingNote(e: any): any {
        if (!note) return;
        const newNote = note;
        setNotes([...notes, newNote]);
        setNote('')
    }

    function handleDelete(idToDelete: number) {
        const updatedNotes = notes.filter((_, index) => index !== idToDelete);
        setNotes(updatedNotes);
    }

    function handleDoneTasks(idDoneTask: number) {

    }
    return (
        <div>
            <div>
                <h1>TODO APP IN TS</h1>
                <label htmlFor="notes">Your notes</label>
                <input type="text" placeholder='todo' name="notes" id="notes" value={note} onChange={(e) => setNote(e.target.value)} />
                <button type="button" onClick={handleAddingNote}>Add</button>
            </div>
            <div>
                <h2>List of todos:</h2>
                <ul>{notes.map((note, index) => (<li key={index}>{note} <button type="button" >-</button><button type='button' onClick={() => handleDoneTasks(index)}>tick</button></li>))}</ul>
            </div>
        </div>
    );
}

export default App;
