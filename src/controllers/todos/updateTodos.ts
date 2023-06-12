import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';
import {
    sendIncorrectTodosFormatError,
    getServerError,
    sendIncorrectTypeError,
} from 'utils/server.utils';

const updateTodos: TController = async (req, res) => {
    if (!req.body.todos) {
        sendIncorrectTodosFormatError(res, 'update');

        return;
    }

    if (!Array.isArray(req.body.todos)) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send an array of todos to update todos data'));

        return;
    }

    const transaction = await todosModel.createTransaction();

    try {
        await todosModel.deleteTodos(transaction);

        for (const newTodo of req.body.todos) {
            const { title, description, date, completed } = newTodo;

            if (
                typeof title !== 'string' ||
                typeof description !== 'string' ||
                typeof date !== 'string' ||
                typeof completed !== 'boolean'
            ) {
                sendIncorrectTypeError(res);

                return;
            }

            await todosModel.createTodo(newTodo, transaction);
        }

        await transaction.commit();
        const resultFromModel = await todosModel.getTodos();

        res.statusCode = 200;
        res.send(resultFromModel);
    } catch {
        await transaction.rollback();
        res.sendStatus(500);
    }
};

export default updateTodos;
