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
    this.time = moment();
    this.initClock();
    console.log(this.time);
  }

  initClock() {
    this.clock = interval(1000)
      .pipe(
        map(tick => moment().toDate(), share())
      );
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
