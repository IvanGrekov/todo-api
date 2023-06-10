import { TODOS_APP_ENDPOINTS } from 'constants/index';
import { TController } from 'types/controllers';

const getIndex: TController = (_, res) => {
    res.write("<h1>Hello, it's Todo Web Api</h1>");
    res.write('</br>');
    res.write('<h2>The endpoints list is bellow</h2>');
    res.write('</br>');
    res.end(
        `<ul>${Object.values(TODOS_APP_ENDPOINTS).map(
            (endpoint) => `<li>${endpoint}</li>`,
        )}</ul>`.replace(',', ''),
    );
};

export default getIndex;
