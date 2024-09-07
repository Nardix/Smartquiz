import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createQuizModel } from "./Quiz.js";
import { createModel as createQuestionModel } from "./Question.js";
import { createModel as createScoreModel } from "./Score.js";

import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createUserModel(database)
createQuizModel(database)
createQuestionModel(database)
createScoreModel(database)

export const {User, Quiz, Question, Score} = database.models

User.hasMany(Quiz)
Quiz.belongsTo(User)

Quiz.hasMany(Question)
Question.belongsTo(Quiz)

Quiz.hasMany(Score)
Score.belongsTo(Quiz)

database.sync().then( () => {
    console.log("Database synced correctly");
}).catch( err => {
    console.err("Error with database synchronization: " + err.message);
});