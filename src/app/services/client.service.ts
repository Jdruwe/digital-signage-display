import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client/client';
import {environment} from '../../environments/environment.prod';
import {Room} from '../models/room';
import {ClientWithId} from '../models/client/client-with-id';
import {ConnectionService} from './connection.service';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private room: Room;
  private heartbeatTimer: any;
  private offlineTimer: any;
  private offlineCounter: number;

  constructor(private http: HttpClient,
              private connectionService: ConnectionService) {
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
    const client = new Client(room, this.convertToBrusselsTimezone(lastConnected));
    this.room = room;
    this.startHeartbeatInterval();
    return this.http.post(environment.apiUrl + environment.clientEndPoint, client)
      .subscribe((response: ClientWithId) => {
        this.clearLocalStorage();
        this.saveToLocalStorage(response.id);
      });
  }

  unRegisterRoom() {
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
    return this.http.patch(environment.apiUrl + environment.clientEndPoint, {
      clientId: this.getFromLocalStorage(),
      newDate: this.convertToBrusselsTimezone(new Date())
    }).subscribe();
  }

  private startHeartbeatInterval() {
    this.heartbeatTimer = setInterval(() => {
      this.updateLastConnectedTime();
    }, environment.heartbeat * 60000);
  }

  private stopHeartbeatInterval() {
    clearInterval(this.heartbeatTimer);
  }

  private startOfflineInterval() {
    const startTime = Date.now() - (this.offlineTimer || 0);
    this.offlineTimer = setInterval(() => {
      this.offlineCounter = Date.now() - startTime;
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

  private convertToBrusselsTimezone(date: Date) {
    return moment.tz(date, 'Europe/Brussels').format();
  }
}
