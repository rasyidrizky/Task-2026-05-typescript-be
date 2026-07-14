import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.ts';
import sequelize from './config/database';

import routes from './routes';
import errorHandler from './middleware/errorHandler.ts';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errorHandler);

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
            console.log(`API Documentation available at http://localhost:${port}/api-docs`);
        });
    } catch(error) {
        console.error('Unable to run server:', error);
    }
}

connect();