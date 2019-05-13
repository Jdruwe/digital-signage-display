import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ClientService} from './client.service';
import {environment} from '../../environments/environment';

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

  describe('registerRoom', async () => {
    it('should call the right URL', () => {
      const mockRoom = {
        id: 'Room8',
        name: 'Room 8'
      };

      service.registerRoom(mockRoom, new Date());
      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.clientEndPoint}`);

      expect(req.request.method).toEqual('POST');
    });
  });

  describe('unregisterRoom', async () => {
    it('should call the right URL', () => {
      service.unRegisterRoom();
      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.clientEndPoint}?id=null`);

      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('unregisterRoomManually', async () => {
    it('should call the right URL', () => {
      service.unRegisterRoom();
      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.clientEndPoint}?id=null`);

      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('getAllClients', async () => {
    it('should return observable that matches the right data', () => {
      const date = new Date(2019, 5, 13);

      const mockClients = [{
        id: 1,
        room: null,
        lastConnected: date
      },
        {
          id: 1,
          room: null,
          lastConnected: date
        }
      ];

      service.getAllClients()
        .subscribe(clients => {
          expect(clients).toEqual(mockClients);
        });

      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.clientEndPoint}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockClients);
    });
  });

  describe('updateLastConnectedTime', async () => {
    it('should call the right URL', () => {
      service.updateLastConnectedTime();
      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.clientEndPoint}`);

      expect(req.request.method).toEqual('PATCH');
    });
  });
});
