import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {Admin} from '../models/admin';
import {RouterTestingModule} from '@angular/router/testing';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: Router, useValue: router}
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated', function () {
    expect(service.isAuth()).toBeFalsy();
  });

  describe('register', async () => {
    it('should return observable that matches the right data', () => {

      const mockAdmin = {
        adminName: 'Joske',
        email: 'joske@joske.be',
        password: '123'
      };

      service.register(mockAdmin.adminName, mockAdmin.email, mockAdmin.password)
        .subscribe((admin: Admin) => {
          expect(admin.adminName).toEqual(mockAdmin.adminName);
        });

      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.authEndPoint}/register`);

      expect(req.request.method).toEqual('POST');

      req.flush(mockAdmin);
    });
  });

  describe('login', async () => {
    it('should return observable that matches the right data', () => {

      const mockLogin = {
        adminNameOrEmail: 'Joske',
        password: '123'
      };

      service.login(mockLogin.adminNameOrEmail, mockLogin.password)
        .subscribe(login => {
          expect(mockLogin.adminNameOrEmail).toEqual(mockLogin.adminNameOrEmail);
        });

      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.authEndPoint}/login`);

      expect(req.request.method).toEqual('POST');
      req.flush(mockLogin);
    });
  });

  describe('logout', async () => {
    it('should redirect to home', () => {
      service.logout();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
