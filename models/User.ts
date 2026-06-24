import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.ts";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        freezeTableName: true
    }
);

export default User;