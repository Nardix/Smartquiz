import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('User', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        
    });
}

