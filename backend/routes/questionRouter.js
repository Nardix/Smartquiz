import express from "express";
import { QuestionController } from "../controllers/QuestionController.js";
import { enforceAuthentication } from "../middleware/authorization.js";

export const questionRouter = new express.Router();

//utente loggato ha creato il quiz e sta creando la domanda con le/la risposte/a
questionRouter.post("/creazione_quiz/:link/question/:number", enforceAuthentication, (req, res, next) => {
    QuestionController.createQuestion(req).then((result) => {
        if(result)
            res.json(result)
        else
            next({status: 404, message: "Domanda non creata"});
    }).catch(err => {
        next(err)
    })
})

//utente che ha incominciato il quiz tramite il link ottiene la domanda
questionRouter.get("/quiz/:link/question/:number", (req, res, next) => {
    QuestionController.getQuestion(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err)
    })
})

//utente mette la risposta e vede se e' corretta
questionRouter.post("/quiz/:link/answer/:number", (req, res, next) => {
    QuestionController.checkCorrectAnswer(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err)
    })
})

//viene usato per effettuare il calcolo del punteggio finale del quiz
questionRouter.get("/quiz/:link/questions", (req, res, next) => {
    QuestionController.getNumberOfQuestionsFromQuiz(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err)
    })
})

