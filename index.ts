import express from 'express';

const app = express();
const port = 5000;

import sequelize from './config/database';

app.use(express.json());

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