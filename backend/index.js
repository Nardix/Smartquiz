import express from "express";
import morgan from "morgan";
import cors from "cors";

import { authenticationRouter } from "./routes/authenticationRouter.js";
import { quizRouter } from "./routes/quizRouter.js";
import { scoreRouter } from "./routes/scoreRouter.js";
import { questionRouter } from "./routes/questionRouter.js";

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred"
    });
});

app.use(authenticationRouter);
app.use(questionRouter);
app.use(quizRouter);
app.use(scoreRouter);

app.listen(PORT);