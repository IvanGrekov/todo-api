import todosModel from 'services/todos-model';
import { TController } from 'types/controllers';

const getTodos: TController = async (_, res) => {
    try {
        res.send(await todosModel.getTodos());
    } catch {
        res.sendStatus(500);
    }
};

export default getTodos;
