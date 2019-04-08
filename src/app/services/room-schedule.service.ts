import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {RoomSchedule} from '../models/room-schedule';

@Injectable({
  providedIn: 'root'
})
export class RoomScheduleService {

  private isConnected = false;

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
  }

  getSchedule(date: Date, roomId: string): Observable<RoomSchedule> {
    // todo use real date
    // const formattedDate = this.formatDate(date);
    const formattedDate = '2018-11-15';
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
            return of(this.getFromLocalStorage());
          }));
    } else {
      return of(this.getFromLocalStorage());
    }
  }

  private saveToLocalStorage(schedule: RoomSchedule) {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }

  private getFromLocalStorage() {
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
