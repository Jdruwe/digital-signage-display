import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Admin} from '../models/admin';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private playerName: string;
  private authUser: Login;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  register(adminName: string, email: string, password: string) {
    const admin: Admin = {
      adminName: adminName,
      email: email,
      password: password
    };
    console.log(admin.password);
    return this.http.post(environment.apiUrl + environment.authEndPoint + '/register', admin);
  }

  login(name: string, password: string) {
    const user: Login = {
      adminNameOrEmail: name,
      password: password
    };
    console.log(name);
    return this.http.post<{ token: string }>(environment.apiUrl + environment.authEndPoint + '/login', user)
      .pipe(map((response: { token: string, playerName: string }) => {
        this.token = response.token;
        this.playerName = response.playerName;

        if (response.token) {
          this.authUser = user;
          this.isAuthenticated = true;
          this.saveAuthToken(this.token, this.playerName);
        }
      }));

  }

  private saveAuthToken(token: string, playerName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('playerName', playerName);
  }

  logout() {
    this.token = null;
    this.playerName = null;
    this.isAuthenticated = false;
    this.authUser = null;

    this.clearAuthUser();

    this.router.navigate(['']);
  }

  private clearAuthUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('playerName');
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
