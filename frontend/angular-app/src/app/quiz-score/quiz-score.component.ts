import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-quiz-score',
  standalone: true,
  imports: [],
  templateUrl: './quiz-score.component.html',
  styleUrl: './quiz-score.component.scss'
})
export class QuizScoreComponent {
  router = inject(Router);
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  success: boolean = false;
  quizLink = "";
  quizItem: any;
  score = 0;
  numberOfQuestions = 0;

  constructor(private activatedRoute: ActivatedRoute){}
  
  ngOnInit(){
    this.quizLink = this.activatedRoute.snapshot.params["link"]
    this.score = this.activatedRoute.snapshot.params["finalscore"]

    this.restService.getQuizFromLink(this.quizLink).pipe(
      concatMap((quizData) => {
        this.quizItem = quizData;
        return this.restService.getNumberOfQuestionsFromQuiz(this.quizLink);
      })
    ).subscribe({
      next: (numberOfQuestions) => {
        this.numberOfQuestions = numberOfQuestions as number;
        
        if(this.quizItem?.maxErrors == null || this.quizItem?.maxErrors == undefined){
          this.success = true;
        } else if(this.score >= this.numberOfQuestions - this.quizItem.maxErrors){
          this.success = true;
        }
      },
      error: (err) => {
        this.toastr.error("Errore nel caricamento dei dati del quiz");
      }
    });
  }
  
  goToHomepage(){
    this.router.navigateByUrl("/homepage")
  }
}
