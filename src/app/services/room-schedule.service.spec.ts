import {RoomScheduleService} from './room-schedule.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

describe('RoomScheduleService', () => {
  let httpTestingController: HttpTestingController;
  let service: RoomScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomScheduleService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RoomScheduleService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getSchedule', async () => {
    it('should return observable that matches the right data', () => {
      const date = moment('2019-11-11').toDate();

      const mockRoomSchedule = {
        date: date,
        day: 'Monday',
        room: {
          id: 'Room8',
          name: 'Room 8'
        }
      };

      service.getSchedule(date, 'Room8')
        .subscribe(roomScheduleData => {
          expect(roomScheduleData.date).toEqual(date);
          expect(roomScheduleData.room.id).toEqual('Room8');
        });

      const req = httpTestingController.expectOne(`${environment.apiUrl}${environment.scheduleEndPoint}/2019-11-11/Room8`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockRoomSchedule);
    });

    it('should auto initialize room 8', function () {
      const room = service.autoInitRoom();
      expect(room.id).toEqual('Room8');
    });
  });
});
