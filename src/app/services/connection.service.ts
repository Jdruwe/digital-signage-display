import {Injectable} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private readonly isConnected: Observable<boolean>;

  constructor() {
    this.isConnected = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
  }

  getConnectionStatus(): Observable<boolean> {
    return this.isConnected;
  }
}
