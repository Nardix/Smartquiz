import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { authGuard } from './_guards/auth/auth.guard';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizCreationComponent } from './quiz-creation/quiz-creation.component';
import { QuestionCreationComponent } from './question-creation/question-creation.component';
import { QuizRecapComponent } from './quiz-recap/quiz-recap.component';
import { QuizPartecipationComponent } from './quiz-partecipation/quiz-partecipation.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { QuizScoreComponent } from './quiz-score/quiz-score.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';

export const routes: Routes = [
    {
        path: "homepage",
        component: HomepageComponent,
        title: "Quiz App"
    }, {
        path: "login",
        component: LoginComponent,
        title: "SmartQuiz - Login"
    }, {
        path: "signup",
        component: SignupComponent,
        title: "SmartQuiz - Sign up"
    }, {
        path: "logout",
        component: LogoutComponent,
        title: "SmartQuiz - Log out"
    }, {
        path: "quizzes",
        component: QuizPageComponent,
        title: "SmartQuiz - Quizzes",
        canActivate: [authGuard]
    },
    {
        path: "creazione_quiz",
        component: QuizCreationComponent,
        title: "SmartQuiz - Creazione del quiz",
        canActivate: [authGuard]
    },
    {
        path: "creazione_quiz/:link/question/:number",
        component: QuestionCreationComponent,
        title: "SmartQuiz - Creazione della domanda",
        canActivate: [authGuard]
    },
    {
        path: "resoconto_quiz/:link",
        component: QuizRecapComponent,
        title: "SmartQuiz - Resoconto",
        canActivate: [authGuard]
    },
    {
        path: "quiz/:link",
        component: QuizPartecipationComponent,
        title: "SmartQuiz - Quiz",
    },
    {
        path: "quiz/:link/question/:number",
        component: QuestionAnswerComponent,
        title: "SmartQuiz - Domanda",
    },
    {
        path: "score/:link/:finalscore",
        component: QuizScoreComponent,
        title: "SmartQuiz - Risultato",
    },
    {
        path: "quiz/:link/scores",
        component: QuizDetailsComponent,
        title: "SmartQuiz - Dettagli",
        canActivate: [authGuard]
    },
    {
        path: "",
        redirectTo: "/homepage",
        pathMatch: 'full'
    }
];