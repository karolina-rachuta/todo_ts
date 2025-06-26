import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

type TaskStatus = 'new' | 'in progress' | 'done' //3 columns

type Task = {
    id: string,
    value: string,
    status: TaskStatus
}

type SelectedTasks = Record<string, boolean>
//helpers fincion to updated the status
//ask chatgpt how it can be improve in a smart way as a senior react developer to upgrade this, optimize performance ect

function App() {
    const [task, setTask] = useState<Task | null>(null);
    const [existingTasks, setExistingTasks] = useState<Task[]>([]);
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);
    const [hide, setHide] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<SelectedTasks>({});


    function handleAddingNote(): void {
        if (!task) return;
        setExistingTasks([...existingTasks, task]);
        setTask(null); //fixed clearing the input

    }

    function handleSelect(idToSelect: string): void {
        setSelectedTasks(prev => ({ ...prev, [idToSelect]: !prev[idToSelect] }))
    }

    function handleDelete(idToDelete: string): void {
        // setExistingTasks(existingTasks.filter((task) => task.id !== idToDelete)); // update 
        setExistingTasks(prev => prev.filter((task) => task.id !== idToDelete)); //what is the difference // based on what was previously there
    }

    function handleDoneTasks(idDoneTask: string, value: string): void {
        setDoneTasks([...doneTasks, { id: idDoneTask, value: value, status: 'done' }]);
        setExistingTasks(existingTasks.filter((task) => task.id !== idDoneTask));
    }

    return (
        <div className="app-container">
            <div className="input-section">
                <h1>TODO APP in TypeScript</h1>
                <label htmlFor="notes">Your notes</label>
                <input
                    type="text"
                    placeholder='todo'
                    name="tasks"
                    id="tasks"
                    // value={task?.value ?? ''}
                    value={task ? task.value : ''}
                    onChange={(e) => setTask({ ...task, value: e.target.value, id: uuidv4(), status: 'done' })}
                />
                <button type="button" onClick={handleAddingNote}>Add</button>
            </div>

            <div className="todos-section">
                <h2>List of todos:</h2>
                <ul>
                    {existingTasks.map((task) => (
                        <li key={task.id} className={selectedTasks[task.id] ? "todo-item selected" : "todo-item"}>
                            <span>{task.value}</span>
                            <div className="actions">
                                <button type="button" onClick={() => handleSelect(task.id)}>selected</button>
                                <button type="button" onClick={() => handleDelete(task.id)}>delete</button>
                                <button type='button' onClick={() => handleDoneTasks(task.id, task.value)}>done</button>
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
                            {doneTasks.map(({ id, value }) => (
                                <li key={id} className="done-item">{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
