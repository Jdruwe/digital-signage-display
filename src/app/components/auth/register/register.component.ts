import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoading = false;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onRegister(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService.register(form.value.username, form.value.email, form.value.password)
      .subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['']);
      }, error => {
        this.isLoading = false;
        this.errorMessage = 'Failed, please try again.';
      });
  }

}
