import {RoomScheduleService} from './room-schedule.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {RoomService} from './room.service';

describe('RoomScheduleService', () => {
  let httpTestingController: HttpTestingController;
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RoomService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getRooms', async () => {
    it('should return observable that matches the right data', () => {
      const date = moment('2019-11-11').toDate();

      const mockRooms = [
        {
          id: 'Room8',
          name: 'Room 8'
        },
        {
          id: 'Room 6',
          name: 'Room 6'
        }
      ];

      service.getRooms()
        .subscribe(rooms => {
          expect(rooms).toEqual(mockRooms);
        });

      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.roomEndPoint}`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockRooms);
    });

    it('should return the correct room', function () {
      const room = service.getRoomById('Room8');
      expect(room.id).toEqual('Room8');
    });
  });
});
