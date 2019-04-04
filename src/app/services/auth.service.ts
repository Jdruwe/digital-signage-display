import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Admin} from '../models/admin';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
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
}
