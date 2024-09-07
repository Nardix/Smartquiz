import { DataTypes } from "sequelize";

export function createModel(database){
    database.define('Score', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        
    });
}