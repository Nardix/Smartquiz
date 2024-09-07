import { Component, inject } from '@angular/core';
import { ScoreItem } from '../_services/rest-backend/score-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss'
})
export class QuizDetailsComponent {
  scoreItems: ScoreItem[] = [];
  restService = inject(RestBackendService);
  router = inject(Router);
  toastr = inject(ToastrService);
  quizLink = "";
  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.quizLink = this.activatedRoute.snapshot.params["link"];
    this.restService.getScoresFromQuiz(this.quizLink).subscribe({
      next: (data) => {
        this.scoreItems = data;
      },
      error: (err) => {
        this.toastr.error("Errore nel caricamento dei punteggi")
      }
    })
  }

  goToQuizzes(){
    this.router.navigateByUrl("/quizzes");
  }
}
