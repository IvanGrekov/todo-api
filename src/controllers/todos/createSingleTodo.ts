import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';
import { sendIncorrectTodoFormatError, sendIncorrectTypeError } from 'utils/server.utils';

const createSingleTodo: TController = async (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'create');

        return;
    }

    const { title, description, date, completed } = req.body.todo;
    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof date !== 'string' ||
        typeof completed !== 'boolean'
    ) {
        sendIncorrectTypeError(res);

        return;
    }

    try {
        const resultFromModel = await todosModel.createTodo(req.body.todo);

        // NOTE: Created
        res.statusCode = 201;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default createSingleTodo;
