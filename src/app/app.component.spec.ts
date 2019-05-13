import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from './services/auth.service';
import {RoomScheduleService} from './services/room-schedule.service';
import {ClientService} from './services/client.service';
import {Router} from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let roomScheduleService: RoomScheduleService;
  let clientService: ClientService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    roomScheduleService = TestBed.get(RoomScheduleService);
    clientService = TestBed.get(ClientService);
    router = TestBed.get(Router);
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have called 3 services and redirected to the room', function () {
    const authSpy = spyOn(authService, 'autoAuthUser').and.callThrough();
    const roomScheduleSpy = spyOn(roomScheduleService, 'autoInitRoom').and.returnValue(
      {id: 'Room8', name: 'Room 8'}
    );
    const clientSpy = spyOn(clientService, 'registerRoom').and.callThrough();
    const routerSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(authSpy).toHaveBeenCalled();
    expect(roomScheduleSpy).toHaveBeenCalled();
    expect(clientSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['room', 'Room8']);
  });
});
