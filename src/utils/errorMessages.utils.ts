import { TTodoId } from 'types/todo';

type TGetNotFoundTodoErrorMessage = (todoId: TTodoId) => string;

export const getNotFoundTodoErrorMessage: TGetNotFoundTodoErrorMessage = (todoId) => {
    return `Todo with id ${todoId} not found`;
};

type TGetIncorrectTodoTypeErrorMessage = (todoId?: TTodoId) => string;

export const getIncorrectTodoTypeErrorMessage: TGetIncorrectTodoTypeErrorMessage = (todoId) => {
    return `Incorrect types of todo${typeof todoId === 'undefined' ? '' : `:${todoId}`} fields`;
};
