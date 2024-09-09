import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './auth-request.type';
import { QuizItem } from './quiz-item.type';
import { QuestionItem } from './question-item.type';
import { ScoreItem } from './score-item.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {
  url = "http://localhost:3000"
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(loginRequest: AuthRequest){
    const url = `${this.url}/auth`; 
    return this.http.post<string>(url, loginRequest, this.httpOptions);
  }

  signup(signupRequest: AuthRequest){
    const url = `${this.url}/signup`; 
    return this.http.post(url, signupRequest, this.httpOptions);
  }

  //-------- quizRouter

  getQuizzesForCurrentUser(){
    const url = `${this.url}/quizzes`;
    return this.http.get<QuizItem[]>(url, this.httpOptions)
  } //GET /quizzes
  
  saveQuiz(quiz: QuizItem){
    const url = `${this.url}/creazione_quiz`
    return this.http.post<QuizItem>(url, quiz, this.httpOptions)
  } //POST /creazione_quiz

  getQuizFromLink(link: string){
    const url = `${this.url}/quiz/${link}`
    return this.http.get<QuizItem>(url, this.httpOptions)
  } //GET /quiz/:link

  //-------- questionRouter

  createQuestion(question: QuestionItem){
    const url = `${this.url}/creazione_quiz/${question.QuizLink}/question/${question.number}`
    return this.http.post<QuestionItem>(url, question, this.httpOptions)
  } //POST /creazione_quiz/:link/question/:number

  getQuestion(link: string,number: number){
    const url = `${this.url}/quiz/${link}/question/${number}`
    return this.http.get<QuestionItem>(url, this.httpOptions)
  } //GET /quiz/:link/question/:number

  checkCorrectAnswer(question: QuestionItem){
    const url = `${this.url}/quiz/${question.QuizLink}/answer/${question.number}`
    return this.http.post(url, question, this.httpOptions)
  } //POST /quiz/:link/answer/:number

  getNumberOfQuestionsFromQuiz(link: string){
    const url = `${this.url}/quiz/${link}/questions`
    return this.http.get<number>(url, this.httpOptions)
  } //GET /quiz/:link/questions

  //-------- scoreRouter

  getScoresFromQuiz(link: string){
    const url = `${this.url}/quiz/${link}/scores`
    return this.http.get<ScoreItem[]>(url, this.httpOptions)
  } //GET /quiz/:link/scores

  createScore(score: ScoreItem){
    const url = `${this.url}/quiz/${score.QuizLink}/score`
    return this.http.post<ScoreItem>(url, score, this.httpOptions)
  } //POST /quiz/:link/score
}
