import { Task } from "./common";

export interface TaskListPayload{
    tasks: Task[];
    nextCursor?: number;
    hasNextPage: boolean;
}

export interface TaskPayload{
    userID: string;
    title: string;
    project: string;
    description: string;
    isDone: boolean;
    tags: string;
    date: string;
    time: string;
}

export interface TaskFilterPayload{
    userID: string;
    title?: string;
    project?: string;
    date?: string;
    time?: string;
    tag?: string;
    isDone?: boolean;
}

export interface TagPayload {
    userID: string;
    name: string;
}

export interface ProjectPayload {
    userID: string;
    name: string;
}

export interface StatePayload {
    userID: string;
    id: string;
    isDone: boolean;
}