import { DataTypes } from "sequelize";

export function createModel(database){
    database.define('Question', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        answerText1: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        answerText2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        answerText3: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        answerText4: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        correctAnswer: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        
    });
}