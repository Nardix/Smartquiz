import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import * as QRCode from 'qrcode'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz-recap',
  standalone: true,
  imports: [],
  templateUrl: './quiz-recap.component.html',
  styleUrl: './quiz-recap.component.scss'
})
export class QuizRecapComponent {
  router = inject(Router);
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  quizLink = "";
  quizItem: any;
  qrCodeUrl = "";
  
  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(){
    this.quizLink = this.activatedRoute.snapshot.params["link"];
    this.restService.getQuizFromLink(this.quizLink).subscribe({
      next: (data: any) =>{
        this.quizItem = data;
      },
      error: (err) => {
        this.toastr.error("Errore nel caricamento del quiz")
      }
    })
    this.generateQRCode("http://localhost:4200/quiz/" + this.quizLink)
  }

  goToHomepage(){
    this.router.navigateByUrl("/homepage");
  }

  generateQRCode(link: string): void {
    QRCode.toDataURL(link)
      .then(url => {
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(url) as string;
      })
      .catch(err => {
        this.toastr.error("Errore nella generazione del QR code")
      });
  }
}
