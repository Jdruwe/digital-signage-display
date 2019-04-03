import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {fromEvent, merge, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly isConnected: Observable<boolean>;

  private roomsUpdated = new Subject<Room[]>();

  constructor(private http: HttpClient) {
    this.isConnected = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
  }

  getRooms() {
    if (this.isConnected) {
      this.http.get(`${environment.apiUrl}${environment.roomEndPoint}`)
        .subscribe((response: Room[]) => {
          this.roomsUpdated.next(response);
        });
    } // todo if offline?
  }

  // todo do more stuff n' things
  // todo add day to get schedule
  getRoom(id: string) {
    this.http.get(`${environment.apiUrl}${environment.roomEndPoint}/${id}`)
      .subscribe(response => {
        console.log(response);
      });
  }

  getConnectionStatus(): Observable<boolean> {
    return this.isConnected;
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
}
