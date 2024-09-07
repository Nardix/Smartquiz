import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  restService = inject(RestBackendService);
  submitted = false;
  signupForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(16)])
  })
  
  handleSignup() {
    this.submitted = true;
    if(this.signupForm.invalid){
      this.toastr.error("I dati inseriti non sono validi!", "Dati non validi!");
    } else {
      this.restService.signup({
        usr: this.signupForm.value.user as string,
        pwd: this.signupForm.value.pass as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Il nome utente scelto è già stato preso", "Oops! Impossibile creare un nuovo utente");
        },
        complete: () => {
          this.toastr.success(`Ora puoi effettuare il login con il tuo nuovo account`,`Complimenti ${this.signupForm.value.user}!`);
          this.router.navigateByUrl("/login");
        }
      })
    }
  }
}
