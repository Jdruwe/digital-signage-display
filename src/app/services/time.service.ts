import {Injectable} from '@angular/core';

import * as moment from 'moment';
import {Moment} from 'moment';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {map, share, startWith} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private time: Moment;
  private clock: Subscription;
  private clockSubject: BehaviorSubject<Date>;

  constructor() {
    this.time = moment();
    // todo remove
    // this.time = moment('2018-11-16 11:54', 'YYYY-MM-DD HH:mm');
    this.clockSubject = new BehaviorSubject(this.time.toDate());
    this.initClock();
  }

  initClock() {
    this.clock = interval(1000 * 30)
      .pipe(
        startWith(0),
        map(tick => this.time.add('30', 's').toDate(), share())
      ).subscribe(response => {
        this.clockSubject.next(response);
      });
  }

  getClock(): Observable<Date> {
    return this.clockSubject.asObservable();
  }

  changeTime(time: Date) {
    if (moment(time).isValid()) {
      this.time = moment(time);
      this.clockSubject.next(this.time.toDate());
    }
  }

  resetTime() {
    this.time = moment();
    this.clockSubject.next(this.time.toDate());
  }
}
