import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import indexRouter from 'routes';

dotenv.config();
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

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});

export default server;
