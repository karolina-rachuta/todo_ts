import { Task } from "../App";

function TaskColumn({
    title,
    existingTasks,
    onSelect,
    onDelete,
    onChangeTaskStatus,
}: {
    title: string;
    existingTasks: Task[];
    onSelect: (id: string, selected: boolean) => void;
    onDelete: (id: string) => void;
    onChangeTaskStatus: (
        e: React.ChangeEvent<HTMLSelectElement>,
        id: string,
    ) => void;
}) {
    return (
        <div className="task-column">
            <h2>{title}</h2>
            <ul>
                {existingTasks.map((task) => (
                    <li
                        key={task.id}
                        className={task.selected ? "todo-item selected" : "todo-item"}
                    >
                        <span>{task.value}</span>
                        <div className="actions">
                            <button
                                type="button"
                                onClick={() => onSelect(task.id, task.selected)}
                            >
                                select
                            </button>
                            <select
                                className="custom-select"
                                name="selectStatus"
                                value={task.status}
                                onChange={(e) => onChangeTaskStatus(e, task.id)}
                            >
                                <option value="new">New</option>
                                <option value="in progress">In progress</option>
                                <option value="done">Done</option>
                            </select>
                            <button type="button" onClick={() => onDelete(task.id)}>
                                delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskColumn;
