import TodoModel from 'services/todos-db';
import { ITodo, TTodos, TTodoId } from 'types/todo';
import { getIncorrectTodoTypeErrorMessage } from 'utils/errorMessages.utils';

class TodosModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private normalize(todo: any): ITodo {
        const { id, title, description, date, completed } = todo;

        return {
            id,
            title,
            description,
            date,
            completed,
        };
    }

    private async updateTodoQuery({
        id,
        title,
        description,
        date,
        completed,
    }: ITodo): Promise<void> {
        await TodoModel.update(
            { title, description, completed, date },
            {
                where: {
                    id,
                },
            },
        );
    }

    private async insertTodoQuery({
        id,
        title,
        description,
        date,
        completed,
    }: ITodo): Promise<void> {
        await TodoModel.create({ id, title, description, date, completed });
    }

    public async getTodos(): Promise<ITodo[]> {
        try {
            const todos = await TodoModel.findAll();

            return todos.map(this.normalize);
        } catch (error) {
            console.error(error);
            throw new Error('Error while getting todos');
        }
    }

    public async getSingleTodo(id: TTodoId): Promise<ITodo> {
        try {
            const todo = await TodoModel.findByPk(id);

            if (!todo) {
                throw new Error(`Todo with id ${id} not found`);
            }

            return this.normalize(todo);
        } catch (error) {
            console.error(error);
            throw new Error(`Error while getting todo with id ${id}`);
        }
    }

    public async createTodo({ id, title, description, date, completed }: ITodo): Promise<void> {
        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof date !== 'string' ||
            typeof completed !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        try {
            await this.insertTodoQuery({ id, title, description, date, completed });
        } catch (error) {
            console.error(error);
            throw new Error(`Error while creating todo with title ${title}`);
        }
    }

    public async deleteTodo(id: TTodoId): Promise<void> {
        try {
            await TodoModel.destroy({
                where: {
                    id,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error(`Error while deleting todo with id ${id}`);
        }
    }

    public async updateTodo(updatingTodo: ITodo): Promise<void> {
        const { id, title, description, date, completed } = updatingTodo;

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof completed !== 'boolean' ||
            typeof date !== 'string'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        try {
            await this.updateTodoQuery(updatingTodo);
        } catch (error) {
            console.error(error);
            throw new Error(`Error while updating todo with id ${id}`);
        }
    }

    public async patchTodo(patchingTodo: ITodo): Promise<void> {
        const { id, title, description, date, completed } = patchingTodo;

        if (
            typeof title !== 'string' &&
            typeof description !== 'string' &&
            typeof date !== 'string' &&
            typeof completed !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        try {
            await this.updateTodoQuery(patchingTodo);
        } catch (error) {
            console.error(error);
            throw new Error(`Error while patching todo with id ${id}`);
        }
    }

    public async replaceTodos(newTodos: TTodos): Promise<void> {
        try {
            await TodoModel.destroy({
                where: {},
            });

            for (const newTodo of newTodos) {
                const { id, title, description, date, completed } = newTodo;

                if (
                    !['string', 'number'].includes(typeof id) ||
                    typeof title !== 'string' ||
                    typeof description !== 'string' ||
                    typeof date !== 'string' ||
                    typeof completed !== 'boolean'
                ) {
                    throw new Error(getIncorrectTodoTypeErrorMessage(id));
                }

                await this.insertTodoQuery({ id, title, description, date, completed });
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error while replacing todos');
        }
    }
}

export default new TodosModel();
