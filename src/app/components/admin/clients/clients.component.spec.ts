import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientsComponent} from './clients.component';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ClientService} from '../../../services/client.service';
import {By} from '@angular/platform-browser';
import {DateAgoPipe} from '../../../pipes/date-ago.pipe';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: ClientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientsComponent,
        NavbarComponent,
        DateAgoPipe
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    clientService = TestBed.get(ClientService);
    spyOn(clientService, 'getAllClients').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined clients before ngOnInit', () => {
    expect(component.clients).toBeDefined();
  });

  it('should not have undefined clients after ngOnInit', () => {
    component.ngOnInit();
    expect(component.clients !== undefined);
  });

  it('should render 0 clients', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.card').length).toBe(0);
  });

  it('should have the .container class', () => {
    fixture.detectChanges();
    const classes = fixture.debugElement.query(By.css('.container'));
    expect(classes).toBeTruthy();
  });
});
