import { Question } from "../models/Database.js";

export class QuestionController{
    static async createQuestion(req){
        return await Question.create({
            text: req.body.text,
            number: req.params.number,
            QuizLink: req.params.link,
            answerText1: req.body.answerText1,
            answerText2: req.body.answerText2,
            answerText3: req.body.answerText3,
            answerText4: req.body.answerText4,
            correctAnswer: req.body.correctAnswer
        })
    }

    static async getQuestion(req){
        return await Question.findOne({
            where: {
                number: req.params.number,
                QuizLink: req.params.link
            }
        })
    }

    static async getNumberOfQuestionsFromQuiz(req){
        const questions = await Question.findAll({
            where: {
                QuizLink: req.params.link
            }
        });
        
        return questions.length
    }

    static async checkCorrectAnswer(req){
        return await Question.findOne({
            where:{
                text: req.body.text,
                number: req.params.number,
                QuizLink: req.params.link,
                correctAnswer: req.body.correctAnswer
            }
        })
    }
}