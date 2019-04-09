import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    const isAuth = this.auth.isAuth();
    if (!isAuth) {
      this.router.navigate(['']);
    }
    return isAuth;
  }
}
