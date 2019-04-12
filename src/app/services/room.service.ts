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
  private rooms: Room[];

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
    this.rooms = this.getFromLocalStorage();
  }

  getRooms(): Observable<Room[]> {
    if (this.isConnected) {
      return this.http.get<Room[]>(`${environment.apiUrl}${environment.roomEndPoint}`)
        .pipe(
          map((response: Room[]) => {
            this.rooms = response;
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

  getRoomById(roomId: string) {
    return this.rooms.find(r => r.id === roomId);
  }

  private saveToLocalStorage(rooms: Room[]) {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }

  private getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('rooms'));
  }

  private clearLocalStorage() {
    return localStorage.removeItem('rooms');
  }

}
