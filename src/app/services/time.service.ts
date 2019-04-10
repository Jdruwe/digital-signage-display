import {Injectable} from '@angular/core';

import * as moment from 'moment';
import {Moment} from 'moment';
import {interval, Observable} from 'rxjs';
import {map, share, startWith} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private readonly time: Moment;
  private clock: Observable<Date>;

  constructor() {
    // todo change
    this.time = moment('2018-11-12 10:10', 'YYYY-MM-DD HH:mm');
    this.initClock();
  }

  initClock() {
    this.clock = interval(1000 * 30)
      .pipe(
        startWith(0),
        map(tick => this.time.add('30', 's').toDate(), share())
      );
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
