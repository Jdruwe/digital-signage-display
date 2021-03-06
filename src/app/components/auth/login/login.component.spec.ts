import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {By} from '@angular/platform-browser';
import {NavbarComponent} from '../../shared/navbar/navbar.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let debugElement: DebugElement;
  let loginSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        NavbarComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    loginSpy = spyOn(authService, 'login').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be loading', () => {
    expect(fixture.componentInstance.isLoading).toBeFalsy();
  });

  it('should change isLoading on submitting the form', () => {
    const testForm = <NgForm>{
      value: {
        username: 'Hello',
        email: 'World',
        password: 'Test123!'
      }
    };
    const comp = fixture.componentInstance;
    comp.onLogin(testForm);
    expect(fixture.componentInstance.isLoading).toBeTruthy();
  });

  it('should call onLogin method', fakeAsync(() => {
    spyOn(component, 'onLogin');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    expect(component.onLogin).toHaveBeenCalled();
  }));

  it('should call AuthService.login', () => {
    const testForm = <NgForm>{
      value: {
        username: 'Hello',
        email: 'World',
        password: 'Test123!'
      }
    };
    const comp = fixture.componentInstance;
    comp.onLogin(testForm);
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should stop loading when form is invalid', () => {
    const testForm = <NgForm>{
      invalid: true
    };
    const comp = fixture.componentInstance;
    comp.onLogin(testForm);
    expect(fixture.componentInstance.isLoading).toBeFalsy();
  });
});
