import express from "express";
import { QuizController } from "../controllers/QuizController.js";
import { enforceAuthentication } from "../middleware/authorization.js";

export const quizRouter = new express.Router();

//utente loggato visualizza i suoi quiz creati
quizRouter.get("/quizzes", enforceAuthentication, (req, res, next) => {
    QuizController.getQuizzesForCurrentUser(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err);
    });
});

//utente previa auth crea quiz
quizRouter.post("/creazione_quiz", enforceAuthentication, (req, res, next) => {
    QuizController.saveQuiz(req).then((result) => {
        res.json(result)
    }).catch(err => {
        next(err);
    });
});

//utente partecipa ad un quiz tramite link o qr code
quizRouter.get("/quiz/:link", (req, res, next) => {
    QuizController.getQuizFromLink(req).then(result => {
        res.json(result)
    }).catch(err => {
        next(err);
    });
});