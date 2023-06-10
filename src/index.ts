import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import indexRouter from 'routes';
import todosRouter from 'routes/todos';

console.clear();

const PORT = process.env.PORT || 4001;
const server = express();

server.use(
    cors({
        // NOTE: not required
        origin: '*',
    }),
);

server.use(indexRouter);
server.use(express.json(), todosRouter);

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});

export default server;
