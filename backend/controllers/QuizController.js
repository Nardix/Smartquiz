import { Quiz } from "../models/Database.js";

export class QuizController {
    static async getQuizzesForCurrentUser(req){
        return await Quiz.findAll({
            where: {
                UserUserName: req.username
            }
        });
    }

    static async saveQuiz(req){
        return await Quiz.create({
            title: req.body.title,
            description: req.body.description,
            maxErrors: req.body.maxErrors,
            link: req.body.link,
            UserUserName: req.username
        });
    }

    static async getQuizFromLink(req){
        return await Quiz.findOne({
            where: {
                link: req.params.link
            }
        })
    }
}