import { Component, inject } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { QuizItem } from '../_services/rest-backend/quiz-item.type';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss'
})
export class QuizPageComponent {
  quizItems: QuizItem[] = [];
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit(){
    this.restService.getQuizzesForCurrentUser().subscribe({
      next: (data) => {
        this.quizItems = data;
      },
      error: (err) => {
        this.toastr.error("Errore nel caricamento dei quiz")
      }
    })
  }

  viewDetails(quiz: QuizItem){
    this.router.navigate(['/quiz', quiz.link, 'scores']);
  }
}
