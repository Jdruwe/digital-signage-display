import {Injectable} from '@angular/core';

import * as moment from 'moment';
import {Moment} from 'moment';
import {interval, Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private readonly time: Moment;
  private clock: Observable<Date>;

  constructor() {
    // todo change
    this.time = moment('2018-11-12 13:00', 'YYYY-MM-DD HH:mm');
    this.initClock();
  }

  initClock() {
    this.clock = interval(1000)
      .pipe(
        map(tick => this.time.toDate(), share())
      );
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
