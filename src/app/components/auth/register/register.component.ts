import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      this.isLoading = false;
      return;
    }
    console.log(form.value.username);
    console.log(form.value.email);
    console.log(form.value.password);
    this.authService.register(form.value.username, form.value.email, form.value.password)
      .subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['']);

      }, error => {
        this.isLoading = false;
        console.log(error.error);
        switch (error.status) {
          case 409:
            this.errorMessage = error.error;
            break;
          default:
            this.errorMessage = 'Oopsie woopsie, that didn\'t work! Please try again.';
        }
      });
  }

}
