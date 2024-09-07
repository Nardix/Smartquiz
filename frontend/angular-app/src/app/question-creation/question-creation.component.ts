import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-creation',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgFor],
  templateUrl: './question-creation.component.html',
  styleUrl: './question-creation.component.scss'
})
export class QuestionCreationComponent {
  submitted = false
  router = inject(Router)
  restService = inject(RestBackendService);
  toastr = inject(ToastrService)
  questionNumber = 0;
  quizLink=""
  isMultipleChoice = true;
  options: string[] = ['', '', '', '']; 
  selectedOption = -1;
  questionCreationForm = new FormGroup({
    question: new FormControl('',[Validators.required]),
    openResponse: new FormControl(''),
    answerText1: new FormControl(''),
    answerText2: new FormControl(''),
    answerText3: new FormControl(''),
    answerText4: new FormControl('')
  })

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.questionNumber = this.activatedRoute.snapshot.params["number"]
    this.quizLink = this.activatedRoute.snapshot.params["link"]
  }

  handleQuestionCreation(){
    this.submitted = true
    if(this.isMultipleChoice){
      this.options = [this.questionCreationForm.value.answerText1 as string,
        this.questionCreationForm.value.answerText2 as string,
        this.questionCreationForm.value.answerText3 as string,
        this.questionCreationForm.value.answerText4 as string]
    }
    const allNotEmpty = this.options.every(element => element !== '');
    if(this.questionCreationForm.invalid){
      this.toastr.error("Inserire la domanda")
    } else if(allNotEmpty && this.isMultipleChoice && this.selectedOption >= 0){
      this.restService.createQuestion({
        text: this.questionCreationForm.value.question as string,
        number: this.questionNumber,
        QuizLink: this.quizLink,
        answerText1: this.options[0] as string,
        answerText2: this.options[1] as string,
        answerText3: this.options[2] as string,
        answerText4: this.options[3] as string,
        correctAnswer: this.options[this.selectedOption] as string
      }).subscribe({
        next: (question) => {
          this.toastr.success(`Domanda ${question.number}`,"Domanda creata con successo")
        },
        error: (err) => {
          this.toastr.error("Non e' stato possibile salvare la domanda a risposta multipla", "Qualcosa e' andato storto");
        },
        complete: () => {
          this.submitted = false
          this.options = ['', '', '', ''];
          this.selectedOption = -1
          this.questionCreationForm.reset()
          this.questionNumber = Number(this.questionNumber) + 1
          this.router.navigate(['/creazione_quiz',this.quizLink,'question',this.questionNumber])
        }
      })
    }else if(!allNotEmpty && this.isMultipleChoice){
      this.toastr.error("Riempire tutti e 4 i campi delle risposte multiple")
    }else if(!this.isMultipleChoice && this.questionCreationForm.value.openResponse !== ''){
      this.restService.createQuestion({
        text: this.questionCreationForm.value.question as string,
        number: this.questionNumber,
        QuizLink: this.quizLink,
        correctAnswer: this.questionCreationForm.value.openResponse?.toLowerCase() as string
      }).subscribe({
        next: (question) => {
          this.toastr.success(`Domanda ${question.number}`,"Domanda creata con successo")
        },
        error: (err) => {
          this.toastr.error("Non e' stato possibile salvare la domanda a risposta aperta", "Qualcosa e' andato storto");
        },
        complete: () => {
          this.submitted = false
          this.options = ['', '', '', ''];
          this.selectedOption = -1
          this.questionCreationForm.reset()
          this.questionNumber = Number(this.questionNumber) + 1
          this.router.navigate(['/creazione_quiz',this.quizLink,'question',this.questionNumber])
        }
      })
    }else if(!this.isMultipleChoice && this.questionCreationForm.value.openResponse === ''){
      this.toastr.error("Riempire il campo della risposta aperta")
    }else if(this.selectedOption == -1){
      this.toastr.error("Selezionare almeno una risposta come corretta")
    }
  }
  
  onClickQuizConclusion(){
    this.router.navigate(['/resoconto_quiz',this.quizLink])
  }

  setMultipleChoice(isMultiple: boolean) {
    this.isMultipleChoice = isMultiple;
  }
}
