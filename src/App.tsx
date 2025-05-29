import React, { useState } from 'react';
import './App.css';

function App() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState<string[]>([]);
    const [doneTasks, setDoneTasks] = useState<string[]>([]);
    const [hide, setHide] = useState(false);

    function handleAddingNote(): void {
        if (!note.trim()) return;
        setNotes([...notes, note]);
        setNote('');
    }

    function handleDelete(idToDelete: number): void {
        setNotes(notes.filter((_, index) => index !== idToDelete));
    }

    function handleDoneTasks(idDoneTask: number, note: string): void {
        setDoneTasks([...doneTasks, note]);
        setNotes(notes.filter((_, index) => index !== idDoneTask));
    }

    return (
        <div className="app-container">
            <div className="input-section">
                <h1>TODO APP in TypeScript</h1>
                <label htmlFor="notes">Your notes</label>
                <input
                    type="text"
                    placeholder='todo'
                    name="notes"
                    id="notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button type="button" onClick={handleAddingNote}>Add</button>
            </div>

            <div className="todos-section">
                <h2>List of todos:</h2>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index} className="todo-item">
                            <span>{note}</span>
                            <div className="actions">
                                <button type="button" onClick={() => handleDelete(index)}>delete</button>
                                <button type='button' onClick={() => handleDoneTasks(index, note)}>done</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="done-section">
                <button onClick={() => setHide(prev => !prev)}>
                    {hide ? 'Show Done Tasks' : 'Hide Done Tasks'}
                </button>
                {!hide && doneTasks.length > 0 && (
                    <div>
                        <h2>Done tasks:</h2>
                        <ul>
                            {doneTasks.map((task, index) => (
                                <li key={index} className="done-item">{task}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
