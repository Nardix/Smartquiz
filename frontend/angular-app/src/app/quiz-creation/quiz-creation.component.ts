import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent {
  isMaxErrorsEnabled: boolean = false;
  router = inject(Router)
  toastr = inject(ToastrService)
  restService = inject(RestBackendService);
  submitted = false
  link = ''
  quizCreationForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    max_errors: new FormControl(),
    description: new FormControl('',[Validators.required]),
  })

  ngOnInit(){
    this.quizCreationForm.controls.max_errors.disable()
  }

  toggleMaxErrors(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isMaxErrorsEnabled = checkbox.checked;
    if(this.isMaxErrorsEnabled){
      this.quizCreationForm.controls.max_errors.enable()
      this.quizCreationForm.controls.max_errors.setValue(1)
    } else {
      this.quizCreationForm.controls.max_errors.disable()
      this.quizCreationForm.controls.max_errors.setValue(null)
    }
  }

  generateLink(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      this.link += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  createQuiz(){
    this.submitted = true
    this.generateLink()
    if(this.quizCreationForm.invalid){
      this.toastr.error("Inserire correttamente i dati")
    } else {
      const title = this.quizCreationForm.value.title
      let max_errors: number | null | undefined
      if(this.isMaxErrorsEnabled){
        max_errors = this.quizCreationForm.value.max_errors
      }
      const description = this.quizCreationForm.value.description
      
      if(max_errors === null || max_errors === undefined){
        this.restService.saveQuiz({
          title: title as string,
          description: description as string,
          link: this.link as string
        }).subscribe({
          next: (data) => {
          },
          error: (err) =>{
            this.toastr.error("Quiz non salvato", "Qualcosa e' andato storto");
          },
          complete: () => {
            this.toastr.success("Quiz salvato con successo");
            this.router.navigate(['/creazione_quiz', this.link, 'question', '1'])
          }
        })
      } else {
        this.restService.saveQuiz({
          title: title as string,
          description: description as string,
          maxErrors: max_errors,
          link: this.link as string
        }).subscribe({
          next: (data) => {
          },
          error: (err) =>{
            this.toastr.error("Quiz non salvato", "Qualcosa e' andato storto");
          },
          complete: () => {
            this.toastr.success("Quiz salvato con successo");
            this.router.navigate(['/creazione_quiz', this.link, 'question', '1'])
          }
        })
      }
    }
  }
}
