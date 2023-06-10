export type TTodoId = string | number;

export interface ITodo {
    id: TTodoId;
    title: string;
    description: string;
    date: string;
    completed: boolean;
}

export type TTodos = ITodo[];
