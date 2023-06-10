import express from 'express';

import { TODOS_APP_ENDPOINTS } from 'constants/index';
import createSingleTodo from 'controllers/todos/createSingleTodo';
import deleteSingleTodo from 'controllers/todos/deleteSingleTodo';
import getSingleTodo from 'controllers/todos/getSingleTodo';
import getTodos from 'controllers/todos/getTodos';
import patchSingleTodo from 'controllers/todos/patchSingleTodo';
import patchTodos from 'controllers/todos/patchTodos';
import updateSingleTodo from 'controllers/todos/updateSingleTodo';
import updateTodos from 'controllers/todos/updateTodos';

const { todos, todoId } = TODOS_APP_ENDPOINTS;

const router = express.Router();
router.get(todos, getTodos);
router.get(todoId, getSingleTodo);
router.post(todos, createSingleTodo);
router.patch(todoId, patchSingleTodo);
router.put(todoId, updateSingleTodo);
router.delete(todoId, deleteSingleTodo);
router.patch(todos, patchTodos);
router.put(todos, updateTodos);

export default router;
