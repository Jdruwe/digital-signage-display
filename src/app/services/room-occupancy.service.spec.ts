import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {RoomOccupancyService} from './room-occupancy.service';

describe('RoomOccupancyService', () => {
  let httpTestingController: HttpTestingController;
  let service: RoomOccupancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomOccupancyService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RoomOccupancyService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getRoomOccupancy', async () => {
    it('should return observable that matches the right data', () => {
      const date = moment('2019-11-11').toDate();

      const mockRoomOccupancy = {
        id: 'Room8',
        name: 'Room 8',
        occupancy: 100,
        capacity: 200
      };

      service.getRoomOccupancy('Room8')
        .subscribe(roomScheduleData => {
          expect(roomScheduleData).toEqual(mockRoomOccupancy);
        });

      const req = httpTestingController.expectOne(`${environment.roomOccupancyApiUrl}/Room8`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockRoomOccupancy);
    });
  });
});
