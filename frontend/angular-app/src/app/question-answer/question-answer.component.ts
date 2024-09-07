import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgFor],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.scss'
})
export class QuestionAnswerComponent {
  questionItem: any;
  router = inject(Router);
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  isMultipleChoice = true;
  questionNumber = 0;
  quizLink = "";
  selectedOption = -1;
  answer = "";
  score = 0;
  questionForm = new FormGroup({
    textarea: new FormControl('')
  });
  noQuestionOnInit = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.questionNumber = this.activatedRoute.snapshot.params["number"]
    this.quizLink = this.activatedRoute.snapshot.params["link"]
    this.restService.getQuestion(this.quizLink,this.questionNumber).subscribe({
      next: (data) => {
        this.questionItem = data;
      },
      error: (err) => {
        this.toastr.error("Impossibile caricare la domanda","Qualcosa e' andato storto")
      },
      complete: () => {
        if(this.questionItem === null){
          this.noQuestionOnInit = true;
        }
        else{
          this.isMultipleChoice = [
            this.questionItem.answerText1,
            this.questionItem.answerText2,
            this.questionItem.answerText3,
            this.questionItem.answerText4
          ].every(text => text);
        }
      }
    }) 
  }

  nextQuestion(){
    if(this.isMultipleChoice){
      if (this.selectedOption >= 0 && this.selectedOption <= 3) {
        this.answer = this.questionItem[`answerText${this.selectedOption + 1}`];
      } else {
        this.toastr.error("Seleziona una risposta", "Errore");
      }
    }else{
      this.answer = this.questionForm.value.textarea?.toLowerCase() as string
    }
    this.restService.checkCorrectAnswer({
      text: this.questionItem.text,
      number: this.questionItem.number,
      QuizLink: this.questionItem.QuizLink,
      correctAnswer: this.answer
    }).pipe(
      concatMap((data) => {
        if(data){
          this.score = this.score + 1;
        }
        this.questionNumber = Number(this.questionNumber) + 1;
        this.selectedOption = -1;
        this.questionForm.reset();
    
        return this.restService.getQuestion(this.quizLink, this.questionNumber);
      }),
      concatMap((data) => {
        this.questionItem = data;
    
        if (this.questionItem !== null) {
          this.isMultipleChoice = [
            this.questionItem.answerText1,
            this.questionItem.answerText2,
            this.questionItem.answerText3,
            this.questionItem.answerText4
          ].every(text => text);

          return of(null);
        } else {
          return this.restService.createScore({ score: this.score, QuizLink: this.quizLink });
        }
      })
    ).subscribe({
      next: (data) => {
      },
      error: (err) => {
        this.toastr.error("Impossibile completare l'operazione", "Qualcosa e' andato storto")
      },
      complete: () => {
        if (this.questionItem === null) {
          this.router.navigate(['/score', this.quizLink, this.score]);
        } else {
          this.router.navigate(['/quiz', this.quizLink, 'question', this.questionNumber]);
        }
      }
    });    
  }

  returnToHomepage(){
    this.router.navigateByUrl("/homepage")
  }
}
