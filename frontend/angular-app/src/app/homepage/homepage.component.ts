import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  authService = inject(AuthService);
  router = inject(Router)
  toastr = inject(ToastrService);
  restService = inject(RestBackendService);
  submitted = false;
  homepageForm = new FormGroup({
    link: new FormControl('', [Validators.required])
  })

  redirectToLogin(){
    this.router.navigateByUrl("/login");
  }

  redirectToQuizCreation(){
    this.router.navigateByUrl("/creazione_quiz");
  }

  redirectToQuiz(){
    this.submitted = true;
    if(this.homepageForm.invalid){
      this.toastr.error("Devi inserire il codice del quiz");
    } else{
      const link = this.homepageForm.value.link as string;
      this.restService.getQuizFromLink(link).subscribe({
        next: (quiz) => {
          if(quiz === null){
            this.toastr.error("Quiz non trovato");
          }else{
            this.router.navigate(['/quiz', link]);
          }
        },
        error: (err) => {
          this.toastr.error("Errore nel caricamento del quiz");
        }
      })
    }
  }
}
