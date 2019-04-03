import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Schedule} from '../models/schedule';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private isConnected = false;
  private scheduleUpdated = new Subject<Schedule>();

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
  }

  getSchedule(date: Date, roomId: string): Schedule {
    if (this.isConnected) {
      // todo use real date
      // const formattedDate = this.formatDate(date);
      const formattedDate = '2018-11-12';
      this.http.get(`${environment.apiUrl}${environment.scheduleEndPoint}/${formattedDate}/${roomId}`)
        .subscribe((response: Schedule) => {
          console.log(response);
          this.scheduleUpdated.next(response);
        });
    } // todo if offline?
    return null;
  }

  getScheduleUpdateListener() {
    return this.scheduleUpdated.asObservable();
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
