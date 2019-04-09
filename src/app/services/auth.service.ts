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
  private adminName: string;
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
    return this.http.post(environment.apiUrl + environment.authEndPoint + '/register', admin);
  }

  login(name: string, password: string) {
    const user: Login = {
      adminNameOrEmail: name,
      password: password
    };
    return this.http.post<{ token: string }>(environment.apiUrl + environment.authEndPoint + '/login', user)
      .pipe(map((response: { token: string, adminName: string }) => {
        this.token = response.token;
        this.adminName = response.adminName;
        if (response.token) {
          this.authUser = user;
          this.isAuthenticated = true;
          this.saveAuthToken(this.token, this.adminName);
        }
      }));

  }

  private saveAuthToken(token: string, adminName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('adminName', adminName);
  }

  logout() {
    this.token = null;
    this.adminName = null;
    this.isAuthenticated = false;
    this.authUser = null;

    this.clearAuthUser();
    this.router.navigate(['']);
  }

  private clearAuthUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
  }

  isAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const storage = this.getAuthUser();
    if (storage.token != null) {
      this.token = storage.token;
      this.adminName = storage.adminName;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

  }

  private getAuthUser() {
    const token = localStorage.getItem('token');
    const adminName = localStorage.getItem('adminName');

    return {
      token: token,
      adminName: adminName
    };
  }

  getToken() {
    return this.token;
  }
}
