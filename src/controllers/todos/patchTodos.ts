import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';
import {
    sendIncorrectTodosFormatError,
    getServerError,
    sendIncorrectTypeError,
} from 'utils/server.utils';

const patchTodos: TController = async (req, res) => {
    if (!req.body.todos) {
        sendIncorrectTodosFormatError(res, 'patch');

        return;
    }

    if (Array.isArray(req.body.todos) && !req.body.todos.length) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send a not empty array of todos to modify several todos'));

        return;
    }

    try {
        for (const todo of req.body.todos) {
            const { id } = todo;

            if (!id) {
                sendIncorrectTypeError(res);

                return;
            }

            await todosModel.patchTodo({ id, ...todo });
        }

        res.statusCode = 200;
        res.send(await todosModel.getTodos());
    } catch {
        res.sendStatus(500);
    }
};

export default patchTodos;
