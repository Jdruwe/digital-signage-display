import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {RoomSchedule} from '../models/room-schedule';
import {RoomService} from './room.service';

@Injectable({
  providedIn: 'root'
})
export class RoomScheduleService {

  private isConnected = false;

  constructor(private http: HttpClient,
              private connectionService: ConnectionService,
              private roomService: RoomService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
  }

  getSchedule(date: Date, roomId: string): Observable<RoomSchedule> {
    const formattedDate = this.formatDate(date);
    if (this.isConnected) {
      return this.http.get(`${environment.apiUrl}${environment.scheduleEndPoint}/${formattedDate}/${roomId}`)
        .pipe(
          map(((response: RoomSchedule) => {
              this.clearLocalStorage();
              this.saveToLocalStorage(response);
              return response;
            })
          ),
          catchError(err => {
            // If no schedule was found allow to navigate to room anyway to use time ravel feature
            if (err.status === 404) {
              const roomSchedule = {
                date: new Date(),
                day: '',
                room: {id: roomId, name: this.roomService.getRoomById(roomId).name},
                talks: []
              };
              this.clearLocalStorage();
              this.saveToLocalStorage(roomSchedule);
              return of(roomSchedule);
            }
            return of(this.getFromLocalStorage());
          }));
    } else {
      return of(this.getFromLocalStorage());
    }
  }

  autoInitRoom() {
    const schedule = this.getFromLocalStorage();
    if (schedule) {
      return this.getFromLocalStorage().room;
    }
  }

  private saveToLocalStorage(schedule: RoomSchedule) {
    console.log('kek');
    console.log(schedule);
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }

  private getFromLocalStorage(): RoomSchedule {
    return JSON.parse(localStorage.getItem('schedule'));
  }

  private clearLocalStorage() {
    localStorage.removeItem('schedule');
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
