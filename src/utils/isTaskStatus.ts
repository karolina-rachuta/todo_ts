import { TaskStatus } from '../App';

const TASK_STATUSES: TaskStatus[] = ['new', 'in progress', 'done'];

export const isTaskStatus = (status: string): status is TaskStatus => {
    return TASK_STATUSES.findIndex((t) => t === status) > -1;
};
