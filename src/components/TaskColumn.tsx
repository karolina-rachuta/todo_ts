import { Task } from '../App';

function TaskColumn({ title, existingTasks, handleSelect, handleDelete, handleChangeTaskStatus }: { title: string, existingTasks: Task[]; handleSelect: (id: string, selected: boolean) => void; handleDelete: (id: string) => void; handleChangeTaskStatus: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void }) {

    return (
        <div className="task-column">
            <h2>{title}</h2>
            <ul>
                {existingTasks.map((task) => (
                    <li key={task.id} className={task.selected ? "todo-item selected" : "todo-item"}>
                        <span>{task.value}</span>
                        <div className="actions">
                            <button type="button" onClick={() => handleSelect(task.id, task.selected)}>select</button>
                            <select className="custom-select" name="selectStatus" value={task.status} onChange={(e) => handleChangeTaskStatus(e, task.id)}>
                                <option value="new">New</option>
                                <option value="in progress">In progress</option>
                                <option value="done">Done</option>
                            </select>
                            <button type="button" onClick={() => handleDelete(task.id)}>delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskColumn;