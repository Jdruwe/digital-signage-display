import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {environment} from '../../environments/environment.prod';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  registerRoom(room: Room, lastConnected: Date) {
    const client = new Client(room, lastConnected);
    return this.http.post(environment.apiUrl + environment.clientEndPoint, client);
  }

  unRegisterRoom(id: string) {
    this.http.request('delete', environment.apiUrl + environment.clientEndPoint, {
      params: {
        id: id
      }
    }).subscribe();
  }

  getAllClients() {
    return this.http.get(environment.apiUrl + environment.clientEndPoint);
  }


}
