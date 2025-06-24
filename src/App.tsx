import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: number | string,
    value: string,
}

type selectedTasks = {
    [id: Task["id"]]: boolean
}

function App() {
    const [task, setTask] = useState<Task>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [doneTasks, setDoneTasks] = useState<Task[]>([]);
    const [hide, setHide] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<selectedTasks>({});

    function handleAddingNote(): void {
        if (!task) return;
        setTasks([...tasks, task]);
        setTask({ id: 0, value: '' });
    }

    function handleSelect(idToSelect: number | string): void {
        setSelectedTasks(prev => ({ ...prev, [idToSelect]: !prev[idToSelect] }))
    }

    function handleDelete(idToDelete: number | string): void {
        setTasks(tasks.filter((task) => task.id !== idToDelete));
    }

    function handleDoneTasks(idDoneTask: number | string, value: string): void {
        setDoneTasks([...doneTasks, { id: idDoneTask, value: value }]);
        setTasks(tasks.filter((task) => task.id !== idDoneTask));
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
                    value={task?.value}
                    onChange={(e) => setTask({ ...task, value: e.target.value, id: uuidv4() })}
                />
                <button type="button" onClick={handleAddingNote}>Add</button>
            </div>

            <div className="todos-section">
                <h2>List of todos:</h2>
                <ul>
                    {tasks.map((task) => (
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
