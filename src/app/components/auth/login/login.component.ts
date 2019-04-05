import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      this.isLoading = false;
      return;
    }
    this.authService.login(form.value.username, form.value.password)
      .subscribe(data => {
        this.router.navigate(['main']);
      }, error => {
        this.isLoading = false;
        switch (error.status) {
          case 401:
          case 404:
            this.errorMessage = error.error;
            break;
          default:
            this.errorMessage = 'Oopsie woopsie, that didn\'t work! Please try again.';
        }
      });
  }

}
