import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomComponent} from './room.component';
import {RoomHeaderComponent} from '../room-header/room-header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TalkComponent} from '../talk/talk.component';
import {TrimTimePipe} from '../../../pipes/trim-time.pipe';
import {SpeakerComponent} from '../speaker/speaker.component';
import {TimeService} from '../../../services/time.service';
import {TimelineComponent} from '../timeline/timeline.component';
import {SessionComponent} from '../session/session.component';
import {TimeTravelComponent} from '../../time-travel/time-travel.component';
import {EllipsisModule} from 'ngx-ellipsis';
import {ReactiveFormsModule} from '@angular/forms';
import {NguCarouselModule} from '@ngu/carousel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientService} from '../../../services/client.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let timeService: TimeService;
  let clientService: ClientService;
  let settingsService: SettingsService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        EllipsisModule,
        ReactiveFormsModule,
        NguCarouselModule,
        BrowserAnimationsModule
      ],
      declarations: [
        RoomComponent,
        RoomHeaderComponent,
        TalkComponent,
        TrimTimePipe,
        SpeakerComponent,
        TimelineComponent,
        SessionComponent,
        TimeTravelComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    timeService = TestBed.get(TimeService);
    clientService = TestBed.get(ClientService);
    settingsService = TestBed.get(SettingsService);
    router = TestBed.get(Router);
    spyOn(timeService, 'getClock').and.callThrough();
    const app = fixture.debugElement.componentInstance;
    app.message = 'Test message';
    app.showMessage = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the timeBeforeSwitch', function () {
    component.ngOnInit();
    expect(timeService.getClock).toHaveBeenCalled();
  });

  it('should have empty schedule', function () {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.schedule).toBeUndefined();
  });

  it('should render image tag', function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeDefined();
  });

  it(`should render h1 title with 'It's a wrap!'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.empty-state h1').textContent).toContain(`It's a wrap!`);
  });

  it(`should render .message`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.message')).toBeDefined();
  });

  it(`should render .message h2 with 'Test message'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.message h2').textContent).toContain('Test message');
  });

  it(`should call the right services and redirect when 'H' is pressed`, function () {
    fixture.detectChanges();
    const timeSpy = spyOn(timeService, 'resetTime').and.callThrough();
    const clientSpy = spyOn(clientService, 'unRegisterRoom').and.callThrough();
    const routerSpy = spyOn(router, 'navigate');

    const event = new KeyboardEvent('keypress', {
      'key': 'H'
    });
    document.dispatchEvent(event);

    expect(timeSpy).toHaveBeenCalled();
    expect(clientSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  it(`should set showTimeTravel to true when X is pressed`, function () {
    fixture.detectChanges();
    const event = new KeyboardEvent('keypress', {
      'key': 'X'
    });
    document.dispatchEvent(event);

    expect(component.toggleTimeTravel).toBeTruthy();
  });
});
