import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';
import { sendIncorrectTodoFormatError } from 'utils/server.utils';
import { generateId } from 'utils/todosModel.utils';

const createSingleTodo: TController = async (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'create');

        return;
    }

    try {
        const id = generateId();
        await todosModel.createTodo({ id, ...req.body.todo });
        const resultFromModel = await todosModel.getSingleTodo(id);

        // NOTE: Created
        res.statusCode = 201;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default createSingleTodo;
