import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

//Theme
type TaskStatus = "new" | "in progress" | "done"; //3 columns

type Task = {
  id: string;
  value: string;
  status: TaskStatus;
  selected: boolean;
};

type SelectedTasks = Record<string, boolean>;
//helpers funcion to updated the status
//ask chatgpt how it can be improve in a smart way as a senior react developer to upgrade this, optimize performance ect

function App() {
  const [task, setTask] = useState<Task | null>(null);
  const [existingTasks, setExistingTasks] = useState<Task[]>([]);
  //const [selectedTasks, setSelectedTasks] = useState<SelectedTasks>({});

  function handleAddingNote(): void {
    if (!task) return;
    setExistingTasks([...existingTasks, task]);
    setTask(null);
  }

  function handleSelect(idToSelect: string, taskSelected: boolean): void {
    // setSelectedTasks(prev => ({ ...prev, [idToSelect]: !prev[idToSelect] }))
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
    const newStatus = e.target.value as TaskStatus;
    setExistingTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }

  function handleDelete(idToDelete: string): void {
    // setExistingTasks(existingTasks.filter((task) => task.id !== idToDelete)); // update
    setExistingTasks((prev) => prev.filter((task) => task.id !== idToDelete)); //what is the difference // based on what was previously there
  }

  function handleDeleteAll() {
    setExistingTasks([]);
  }

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
          // value={task?.value ?? ''}
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
        <div className="task-column">
          <h2>List of new todos:</h2>
          <ul>
            {existingTasks
              .filter((task) => task.status === "new")
              .map((task) => (
                <li
                  key={task.id}
                  className={task.selected ? "todo-item selected" : "todo-item"}
                >
                  <span>{task.value}</span>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => handleSelect(task.id, task.selected)}
                    >
                      select
                    </button>
                    <select
                      className="custom-select"
                      name="selectStatus"
                      defaultValue="new"
                      value={task.status}
                      onChange={(e) => handleChangeTaskStatus(e, task.id)}
                    >
                      <option value="new">New</option>
                      <option value="in progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button type="button" onClick={() => handleDelete(task.id)}>
                      delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="task-column">
          <h2>List of in progress todos:</h2>
          <ul>
            {existingTasks
              .filter((task) => task.status === "in progress")
              .map((inProgressTask) => (
                <li
                  key={inProgressTask.id}
                  className={
                    inProgressTask.selected ? "todo-item selected" : "todo-item"
                  }
                >
                  <span>{inProgressTask.value}</span>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelect(inProgressTask.id, inProgressTask.selected)
                      }
                    >
                      select
                    </button>
                    <select
                      className="custom-select"
                      name="selectStatus"
                      value={inProgressTask.status}
                      onChange={(e) =>
                        handleChangeTaskStatus(e, inProgressTask.id)
                      }
                    >
                      <option value="new">New</option>
                      <option value="in progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDelete(inProgressTask.id)}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="task-column">
          <h2>List of done:</h2>
          <ul>
            {existingTasks
              .filter((task) => task.status === "done")
              .map((doneTask) => (
                <li
                  key={doneTask.id}
                  className={
                    doneTask.selected ? "todo-item selected" : "todo-item"
                  }
                >
                  <span>{doneTask.value}</span>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelect(doneTask.id, doneTask.selected)
                      }
                    >
                      select
                    </button>
                    <select
                      className="custom-select"
                      name="selectStatus"
                      value={doneTask.status}
                      onChange={(e) => handleChangeTaskStatus(e, doneTask.id)}
                    >
                      <option value="new">New</option>
                      <option value="in progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDelete(doneTask.id)}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <button type="button" className="deleteAll" onClick={handleDeleteAll}>
        Delete all
      </button>
    </div>
  );
}

export default App;
