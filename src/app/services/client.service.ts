import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {environment} from '../../environments/environment.prod';
import {Room} from '../models/room';
import {ClientWithId} from '../models/client-with-id';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private room: Room;
  private timer: any;

  constructor(private http: HttpClient) {
  }

  registerRoom(room: Room, lastConnected: Date) {
    console.log('register');
    const client = new Client(room, lastConnected);
    this.room = room;
    this.startInterval();
    return this.http.post(environment.apiUrl + environment.clientEndPoint, client).subscribe((response: ClientWithId) => {
      this.clearLocalStorage();
      this.saveToLocalStorage(response.id);
    });
  }

  unRegisterRoom() {
    console.log('unregister');
    this.http.request('delete', environment.apiUrl + environment.clientEndPoint, {
      params: {
        id: this.getFromLocalStorage()
      }
    }).subscribe(() => {
      this.clearLocalStorage();
    });
    this.stopInterval();
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
    console.log('sending...');
    return this.http.patch(environment.apiUrl + environment.clientEndPoint, {
      roomId: this.room.id,
      newDate: new Date()
    }).subscribe();
  }

  private startInterval() {
    this.timer = setInterval(() => {
      this.updateLastConnectedTime();
    }, environment.heartbeat * 60000);
  }

  private stopInterval() {
    clearInterval(this.timer);
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
