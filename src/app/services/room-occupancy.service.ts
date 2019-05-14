import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RoomOccupancy} from '../models/room-occupancy';
import {ConnectionService} from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class RoomOccupancyService {

  private isConnected = false;

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        this.isConnected = response;
      });
  }

  getRoomOccupancy(roomId: string) {
    if (this.isConnected) {
      return this.http.get<RoomOccupancy>(`${environment.roomOccupancyApiUrl}/${roomId}`);
    }
  }
}
