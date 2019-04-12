import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {environment} from '../../environments/environment.prod';
import {Room} from '../models/room';

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
    return this.http.post(environment.apiUrl + environment.clientEndPoint, client);
  }

  unRegisterRoom(id: string) {
    console.log('unregister');
    this.http.request('delete', environment.apiUrl + environment.clientEndPoint, {
      params: {
        id: id
      }
    }).subscribe();
    this.stopInterval();
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
    }, 3000);
  }

  private stopInterval() {
    clearInterval(this.timer);
  }
}
