import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';
import { sendIncorrectTodosFormatError, getServerError } from 'utils/server.utils';

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

    try {
        await todosModel.replaceTodos(req.body.todos);
        const resultFromModel = await todosModel.getTodos();

        res.statusCode = 200;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default updateTodos;
