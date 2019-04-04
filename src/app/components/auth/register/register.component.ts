import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService) {
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
      }, error => {
        this.isLoading = false;
      });
  }

}
