import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-quiz-partecipation',
  standalone: true,
  imports: [],
  templateUrl: './quiz-partecipation.component.html',
  styleUrl: './quiz-partecipation.component.scss'
})
export class QuizPartecipationComponent {
  quizLink = ""
  restService = inject(RestBackendService)
  quizItem: any
  router = inject(Router)

  constructor(private activatedRoute: ActivatedRoute){}
  
  ngOnInit(){
    this.quizLink = this.activatedRoute.snapshot.params["link"];
    this.restService.getQuizFromLink(this.quizLink).subscribe({
      next: (data: any) =>{
        this.quizItem = data;
      }
    })
  }
  
  participate(){
    this.router.navigate(["/quiz", this.quizLink, "question", "1"])
  }
}
