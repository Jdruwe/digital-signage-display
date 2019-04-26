import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {environment} from '../../environments/environment.prod';
import {Room} from '../models/room';
import {ClientWithId} from '../models/client-with-id';
import {ConnectionService} from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private room: Room;
  private heartbeatTimer: any;
  private offlineTimer: any;
  private offlineCounter: number;

  constructor(private http: HttpClient, private connectionService: ConnectionService) {
    this.connectionService.getConnectionStatus()
      .subscribe(response => {
        if (!response) {
          this.startOfflineInterval();
        } else {
          this.stopOfflineInterval();
          if (this.offlineCounter > (environment.connectionTimer * 60000)) {
            this.updateLastConnectedTime();
          }
        }
      });
  }

  registerRoom(room: Room, lastConnected: Date) {
    console.log('register');
    const client = new Client(room, lastConnected);
    this.room = room;
    this.startHeartbeatInterval();
    return this.http.post(environment.apiUrl + environment.clientEndPoint, client).subscribe((response: ClientWithId) => {
      this.clearLocalStorage();
      this.saveToLocalStorage(response.id);
    });
  }

  unRegisterRoom() {
    console.log('Unregister room');
    this.http.request('delete', environment.apiUrl + environment.clientEndPoint, {
      params: {
        id: this.getFromLocalStorage()
      }
    }).subscribe(() => {
      this.clearLocalStorage();
    });
    this.stopHeartbeatInterval();
  }

  unRegisterRoomManually(clientId: number) {
    this.http.request('delete', environment.apiUrl + environment.clientEndPoint, {
      params: {
        id: clientId.toString()
      }
    }).subscribe();
  }

  getAllClients() {
    return this.http.get(environment.apiUrl + environment.clientEndPoint);
  }

  updateLastConnectedTime() {
    console.log('Updated heartbeat');
    return this.http.patch(environment.apiUrl + environment.clientEndPoint, {
      clientId: this.getFromLocalStorage(),
      newDate: new Date()
    }).subscribe();
  }

  private startHeartbeatInterval() {
    console.log('Interval started.');
    this.heartbeatTimer = setInterval(() => {
      this.updateLastConnectedTime();
    }, environment.heartbeat * 60000);
  }

  private stopHeartbeatInterval() {
    console.log('Interval stopped.');
    clearInterval(this.heartbeatTimer);
  }

  private startOfflineInterval() {
    const startTime = Date.now() - (this.offlineTimer || 0);
    this.offlineTimer = setInterval(() => {
      this.offlineCounter = Date.now() - startTime;
      console.log(this.offlineCounter);
    });
  }

  private stopOfflineInterval() {
    clearInterval(this.offlineTimer);
  }

  private saveToLocalStorage(clientId: number) {
    localStorage.setItem('clientId', JSON.stringify(clientId));
  }

  private getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('clientId'));
  }

  private clearLocalStorage() {
    return localStorage.removeItem('clientId');
  }
}
