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

    const transaction = await todosModel.createTransaction();

    try {
        for (const todo of req.body.todos) {
            const { id, title, description, date, completed } = todo;

            if (!id) {
                sendIncorrectTypeError(res);

                return;
            }

            if (
                typeof title !== 'string' &&
                typeof description !== 'string' &&
                typeof date !== 'string' &&
                typeof completed !== 'boolean'
            ) {
                sendIncorrectTypeError(res);

                return;
            }

            await todosModel.patchTodo({ id, ...todo }, transaction);
        }

        await transaction.commit();

        res.statusCode = 200;
        res.send(await todosModel.getTodos());
    } catch {
        await transaction.rollback();
        res.sendStatus(500);
    }
};

export default patchTodos;
