import { TTodoId } from 'types/todo';

type TGetNotFoundTodoErrorMessage = (todoId: TTodoId) => string;

export const getNotFoundTodoErrorMessage: TGetNotFoundTodoErrorMessage = (todoId) => {
    return `Todo with id ${todoId} not found`;
};
