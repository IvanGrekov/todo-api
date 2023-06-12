import { Sequelize, DataTypes } from 'sequelize';

const dialect = 'postgres';
const host = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || dialect;
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host,
    dialect,
});

export const TodoModel = sequelize.define(
    'Todo',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'todos',
        updatedAt: false,
    },
);

sequelize.sync();
