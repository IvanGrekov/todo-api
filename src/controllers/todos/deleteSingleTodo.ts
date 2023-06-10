import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';

const deleteSingleTodo: TController = async (req, res) => {
    try {
        const { todoId } = req.params;
        await todosModel.deleteTodo(todoId);

        // NOTE: Success
        res.statusCode = 200;
        res.send(`Todo with id ${todoId} was deleted`);
    } catch {
        res.sendStatus(500);
    }
};

export default deleteSingleTodo;
