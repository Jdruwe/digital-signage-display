import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  private adminName: string;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.checkAuth();
  }

  private checkAuth() {
    if (this.authService.isAuth()) {
      this.isAuth = true;
      this.adminName = localStorage.getItem('adminName');
    } else {
      this.isAuth = false;
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    this.checkAuth();
    this.router.navigate(['']);
  }

  register() {
    this.router.navigate(['register']);
  }

  settings() {
    this.router.navigate(['settings']);
  }

  heartbeat() {
    this.router.navigate(['clients']);
  }

  home() {
    this.router.navigate(['']);
  }
}
