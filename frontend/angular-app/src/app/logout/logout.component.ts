import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit() {
    if(! this.authService.isAuthenticated()){
      this.toastr.warning("Non hai effettuato il login");
      this.router.navigateByUrl("/homepage");
    } else {
      this.toastr.warning(`A presto, ${this.authService.user()}!`, "hai effettuato il log out");
      this.authService.logout();
      this.router.navigateByUrl("/homepage");
    }
  }
}
