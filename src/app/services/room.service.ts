import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {Room} from '../models/room';
import {ConnectionService} from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private isConnected = false;
  private roomsUpdated = new Subject<Room[]>();

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
  }

  getRooms() {
    if (this.isConnected) {
      this.http.get(`${environment.apiUrl}${environment.roomEndPoint}`)
        .subscribe((response: Room[]) => {
          this.roomsUpdated.next(response);
        });
    } // todo if offline?
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
}
