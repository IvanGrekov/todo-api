import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';

const getSingleTodo: TController = async (req, res) => {
    try {
        const { todoId } = req.params;
        const resultFromModel = await todosModel.getSingleTodo(todoId);

        // NOTE: Success
        res.statusCode = 200;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default getSingleTodo;
