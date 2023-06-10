import { Sequelize, DataTypes, Model } from 'sequelize';

import { ITodo } from 'types/todo';

const dialect = 'postgres';
const host = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || dialect;
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host,
    dialect,
});

const TodoModel = sequelize.define<Model<ITodo>>(
    'Todo',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'todos',
        createdAt: false,
        updatedAt: false,
    },
);

export default TodoModel;
