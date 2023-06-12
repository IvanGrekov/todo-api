import { Transaction } from 'sequelize';

import { TodoModel, sequelize } from 'services/todos-db';
import { ITodo, TTodoId } from 'types/todo';

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

    private async updateTodoQuery(
        { id, title, description, date, completed }: ITodo,
        transaction?: Transaction,
    ): Promise<void> {
        await TodoModel.update(
            { title, description, completed, date },
            {
                where: {
                    id,
                },
                transaction,
            },
        );
    }

    public async createTransaction(): Promise<Transaction> {
        return await sequelize.transaction();
    }

    public async getTodos(): Promise<ITodo[]> {
        try {
            const todos = await TodoModel.findAll({
                order: [['created_at', 'ASC']],
            });

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

    public async createTodo(newTodo: ITodo, transaction?: Transaction): Promise<ITodo> {
        try {
            const todo = await TodoModel.create({ ...newTodo }, { transaction });

            return this.normalize(todo);
        } catch (error) {
            console.error(error);
            throw new Error(`Error while creating todo with title ${newTodo.title}`);
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
        try {
            await this.updateTodoQuery(updatingTodo);
        } catch (error) {
            console.error(error);
            throw new Error(`Error while updating todo with id ${updatingTodo.id}`);
        }
    }

    public async patchTodo(patchingTodo: ITodo, transaction?: Transaction): Promise<void> {
        try {
            await this.updateTodoQuery(patchingTodo, transaction);
        } catch (error) {
            console.error(error);
            throw new Error(`Error while patching todo with id ${patchingTodo.id}`);
        }
    }

    public async deleteTodos(transaction?: Transaction): Promise<void> {
        try {
            await TodoModel.destroy({
                where: {},
                transaction,
            });
        } catch (error) {
            console.error(error);
            throw new Error('Error while deleting todos');
        }
    }
}

export default new TodosModel();
