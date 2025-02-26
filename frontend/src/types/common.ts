export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    name: string;
}

export interface UserEntity {
    user: User[];
    isLoggedIn: boolean;
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