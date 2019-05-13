import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientService} from './client.service';

describe('ClientService', () => {
  let httpTestingController: HttpTestingController;
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientService,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ClientService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
