export interface User {
    id: string;
    username: string;
}

export interface Task {
    id: string;
    title: string;
    project: string;
    description: string;
    isDone: boolean;
    tags: string;
    date: string;
    time: string;
}

export interface Tag {
    id: string;
    name: string;
}

export interface Project{
    id: string;
    name: string;
}