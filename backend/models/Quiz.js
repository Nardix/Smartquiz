import { DataTypes } from "sequelize";

export function createModel(database){
    database.define('Quiz', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        maxErrors: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        link: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    }, {
        
    });
}