import { Score } from "../models/Database.js";

export class ScoreController {
    static async getScoresFromQuiz(req){
        return await Score.findAll({
            where: {
                QuizLink: req.params.link
            }
        })
    }

    static async createScore(req){
        if(req.username){
            return await Score.create({
                name: req.username,
                score: req.body.score,
                QuizLink: req.params.link
            })
        }else{
            return await Score.create({
                name: 'Anonymous',
                score: req.body.score,
                QuizLink: req.params.link
            })
        }
    }
}

