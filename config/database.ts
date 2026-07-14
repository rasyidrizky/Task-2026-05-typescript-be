import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('task_db', 'postgres', 'Witherboss', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false 
});

export default sequelize;