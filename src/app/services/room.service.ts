import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Room} from '../models/room';
import {ConnectionService} from './connection.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private isConnected = false;

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
  }

  getRooms(): Observable<Room[]> {
    if (this.isConnected) {
      return this.http.get<Room[]>(`${environment.apiUrl}${environment.roomEndPoint}`)
        .pipe(
          map((response: Room[]) => {
            this.clearLocalStorage();
            this.saveToLocalStorage(response);
            return response;
          }),
          catchError(err => {
            return of(this.getFromLocalStorage());
          }));
    } else {
      return of(this.getFromLocalStorage());
    }
  }

  private saveToLocalStorage(rooms: Room[]) {
    localStorage.setItem('room', JSON.stringify(rooms));
  }

  private getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('room'));
  }

  private clearLocalStorage() {
    return localStorage.removeItem('room');
  }

}
