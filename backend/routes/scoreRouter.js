import express from "express";
import { ScoreController } from "../controllers/ScoreController.js"; 
import { enforceAuthentication, anonymousUser } from "../middleware/authorization.js";

export const scoreRouter = new express.Router();

//utente loggato clicca sul proprio quiz creato per vedere i dettagli
scoreRouter.get("/quiz/:link/scores", enforceAuthentication, (req, res, next) => {
    ScoreController.getScoresFromQuiz(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err);
    })
})

//alla fine del quiz viene creato il punteggio da salvare
scoreRouter.post("/quiz/:link/score", anonymousUser, (req, res, next) => {
    ScoreController.createScore(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err)
    })
})