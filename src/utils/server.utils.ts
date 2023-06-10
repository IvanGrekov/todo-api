import { Response } from 'express';

import { TTodoId } from 'types/todo';
import { getNotFoundTodoErrorMessage } from 'utils/errorMessages.utils';

type TGetServerError = (message: string) => { error: { message: string } };

export const getServerError: TGetServerError = (message) => ({
    error: { message },
});

type TSendTodoNotFoundError = (res: Response, todoId: TTodoId) => void;

export const sendTodoNotFoundError: TSendTodoNotFoundError = (res, todoId) => {
    // NOTE: Not found
    res.statusCode = 404;
    res.send(getServerError(getNotFoundTodoErrorMessage(todoId)));
};

type TSendIncorrectTypeError = (res: Response) => void;

export const sendIncorrectTypeError: TSendIncorrectTypeError = (res) => {
    // NOTE: Bad Request
    res.statusCode = 422;
    res.send(getServerError('Incorrect types of provided fields'));
};

type TSendIncorrectTodoFormatError = (res: Response, action: string) => void;

export const sendIncorrectTodoFormatError: TSendIncorrectTodoFormatError = (res, action) => {
    // NOTE: Bad request
    res.statusCode = 400;
    res.send(
        getServerError(`Please send todo data in format \`{ todo: {...} }\` to ${action} todo`),
    );
};

type TSendIncorrectTodosFormatError = (res: Response, action: string) => void;

export const sendIncorrectTodosFormatError: TSendIncorrectTodosFormatError = (res, action) => {
    // NOTE: Bad request
    res.statusCode = 400;
    res.send(
        getServerError(
            `Please send todos in format \`{ todos: ITodo[] }\` to ${action} several todos, or add todoId param to your url to ${action} single todo`,
        ),
    );
};
