import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.ts";

class Contact extends Model {
    declare id: number;
    declare user_id: number;
    declare name: string;
    declare phone_number: string;
}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Contact',
        tableName: 'contacts',
        freezeTableName: true
    }
);

export default Contact;