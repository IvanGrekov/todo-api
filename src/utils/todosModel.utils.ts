import { TTodos, TTodoId } from 'types/todo';

type TGetServerError = (message: string) => { error: { message: string } };

export const getServerError: TGetServerError = (message) => ({
    error: { message },
});

type TGenerateId = () => number;

export const generateId: TGenerateId = () => {
    return +`${Math.random() * Math.random()}`.replace(/[0.]/g, '');
};

type TgenerateStringifiedDate = (date: string | Date) => string;

export const generateStringifiedDate: TgenerateStringifiedDate = (date) => {
    return new Date(date).toISOString();
};

type TGetTodoIndex = (todos: TTodos, id: TTodoId) => number;

export const getTodoIndex: TGetTodoIndex = (todos, id) => {
    return todos.findIndex((todo) => todo.id === id);
};
