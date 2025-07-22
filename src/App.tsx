import React, { useState, useMemo } from "react";
import { isTaskStatus } from "./utils/isTaskStatus";
import TaskColumn from "./components/TaskColumn";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

export type TaskStatus = "new" | "in progress" | "done";

export type Task = {
    id: string;
    value: string;
    status: TaskStatus;
    selected: boolean;
};

function App() {
    const [task, setTask] = useState<Task | null>(null);
    const [existingTasks, setExistingTasks] = useState<Task[]>([]);

    function handleAddingNote(): void {
        if (!task) return;
        setExistingTasks((prev) => [...prev, task]);
        setTask(null);
    }

    function handleSelect(idToSelect: string, taskSelected: boolean): void {
        setExistingTasks((prev) =>
            prev.map((task) =>
                task.id === idToSelect ? { ...task, selected: !taskSelected } : task,
            ),
        );
    }

    function handleChangeTaskStatus(
        e: React.ChangeEvent<HTMLSelectElement>,
        taskId: string,
    ): void {
        const newStatus = e.target.value;
        if (isTaskStatus(newStatus)) {
            setExistingTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task,
                ),
            );
        }
    }

    function handleDelete(idToDelete: string): void {
        setExistingTasks((prev) => prev.filter((task) => task.id !== idToDelete));
    }

    function handleDeleteAll() {
        setExistingTasks([]);
    }

    const todoTasks = useMemo(
        () => existingTasks.filter((task) => task.status === "new"),
        [existingTasks],
    );
    const inProgressTasks = useMemo(
        () => existingTasks.filter((task) => task.status === "in progress"),
        [existingTasks],
    );
    const doneTasks = useMemo(
        () => existingTasks.filter((task) => task.status === "done"),
        [existingTasks],
    );

    return (
        <div className="app-container">
            <div className="input-section">
                <h1>TODO APP in TypeScript</h1>
                <label htmlFor="notes">Your notes</label>
                <input
                    type="text"
                    placeholder="todo"
                    name="tasks"
                    id="tasks"
                    value={task ? task.value : ""}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            value: e.target.value,
                            id: uuidv4(),
                            status: "new",
                            selected: false,
                        })
                    }
                />
                <button type="button" onClick={handleAddingNote}>
                    Add
                </button>
            </div>

            <div className="todos-section">
                <TaskColumn
                    title={"List of new tasks:"}
                    existingTasks={todoTasks}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    onChangeTaskStatus={handleChangeTaskStatus}
                />
                <TaskColumn
                    title={"List of in progress tasks:"}
                    existingTasks={inProgressTasks}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    onChangeTaskStatus={handleChangeTaskStatus}
                />
                <TaskColumn
                    title={"List of done tasks:"}
                    existingTasks={doneTasks}
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                    onChangeTaskStatus={handleChangeTaskStatus}
                />
            </div>
            <button type="button" className="deleteAll" onClick={handleDeleteAll}>
                Delete all
            </button>
        </div>
    );
}
export default App;
