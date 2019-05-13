import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {SettingsComponent} from './settings.component';
import {FormsModule, NgForm} from '@angular/forms';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {SettingsService} from '../../../services/settings.service';
import {DebugElement} from '@angular/core';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingsService: SettingsService;
  let debugElement: DebugElement;
  let settingsSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent,
        NavbarComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SettingsComponent);
    debugElement = fixture.debugElement;
    settingsService = debugElement.injector.get(SettingsService);
    settingsSpy = spyOn(settingsService, 'changeSettings').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render first h1 with title 'Settings'`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h1')[0].textContent).toContain('Settings');
  });

  it(`should render second h1 with title 'Notifications'`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h1')[1].textContent).toContain('Notifications');
  });

  it('should render 4 input fields ', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('input').length).toBe(4);
  });

  it(`should render 2 buttons`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button').length).toBe(2);
  });

  it('should not render a message', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.message')).toBeNull();
  }));

  describe('settingsForm', () => {
    it('should call updateSettings()', fakeAsync(() => {
      spyOn(component, 'updateSettings');
      fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
      expect(component.updateSettings).toHaveBeenCalled();
    }));

    it('should call settingsService.changeSettings()', () => {
      const testForm = <NgForm>{
        value: {
          minutesBeforeNextSession: 5,
          showOccupancyCounter: false,
        },
        valid: true
      };
      const comp = fixture.componentInstance;
      comp.updateSettings(testForm);
      expect(settingsSpy).toHaveBeenCalled();
    });

    it('should not call settingsService.changeSettings()', () => {
      const testForm = <NgForm>{
        valid: false
      };
      const comp = fixture.componentInstance;
      comp.updateSettings(testForm);
      expect(settingsSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('notificationsForm', () => {
    it('should call updateNotifications()', fakeAsync(() => {
      spyOn(component, 'updateNotifications');
      fixture.debugElement.queryAll(By.css('form'))[1].triggerEventHandler('submit', null);
      expect(component.updateNotifications).toHaveBeenCalled();
    }));

    it('should call settingsService.changeNotificationSettings()', () => {
      settingsSpy = spyOn(settingsService, 'changeNotificationSettings').and.callThrough();
      const testForm = <NgForm>{
        value: {
          message: 'Test message',
          showMessage: false,
        },
        valid: true
      };
      const comp = fixture.componentInstance;
      comp.updateNotifications(testForm);
      expect(settingsSpy).toHaveBeenCalled();
    });

    it('should not call settingsService.changeNotificationSettings()', () => {
      settingsSpy = spyOn(settingsService, 'changeNotificationSettings').and.callThrough();
      const testForm = <NgForm>{
        valid: false
      };
      const comp = fixture.componentInstance;
      comp.updateNotifications(testForm);
      expect(settingsSpy).toHaveBeenCalledTimes(0);
    });
  });
});
