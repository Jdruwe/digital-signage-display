import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {By} from '@angular/platform-browser';
import {NavbarComponent} from '../../shared/navbar/navbar.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let debugElement: DebugElement;
  let registerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        NavbarComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    registerSpy = spyOn(authService, 'register').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
    comp.onRegister(testForm);
    expect(fixture.componentInstance.isLoading).toBeTruthy();
  });

  it('should call onRegister method', fakeAsync(() => {
    spyOn(component, 'onRegister');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    expect(component.onRegister).toHaveBeenCalled();
  }));

  it('should call AuthService.register', () => {
    const testForm = <NgForm>{
      value: {
        username: 'Hello',
        email: 'World',
        password: 'Test123!'
      }
    };
    const comp = fixture.componentInstance;
    comp.onRegister(testForm);
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should stop loading when form is invalid', () => {
    const testForm = <NgForm>{
      value: {
        username: 'test'
      },
      invalid: true
    };
    const comp = fixture.componentInstance;
    comp.onRegister(testForm);
    expect(fixture.componentInstance.isLoading).toBeFalsy();
  });
});
