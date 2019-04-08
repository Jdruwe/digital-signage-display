import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RoomScheduleService} from '../../../services/room-schedule.service';
import {RoomSchedule} from '../../../models/room-schedule';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;
  talkToShow: Talk;
  nextTalks: Talk[];

  private schedule: RoomSchedule;
  private clockSub: Subscription;

  constructor(private timeService: TimeService,
              private scheduleService: RoomScheduleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.clockSub = this.timeService.getClock()
      .subscribe(response => {
        this.currentTime = response;
        if (this.schedule) {
          this.setTalks();
        }
      });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          const id = paramMap.get('id');
          const date = this.currentTime;
          this.scheduleService.getSchedule(date, id)
            .subscribe(response => {
              this.schedule = response;
              this.setTalks();
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.clockSub.unsubscribe();
  }

  private setTalks() {
    const talks = this.sortAndFilterTalks();
    this.talkToShow = talks.shift();
    this.nextTalks = talks;
    console.log(this.talkToShow);
    console.log(this.nextTalks);
  }

  private sortAndFilterTalks(): Talk[] {
    console.log(this.schedule.talks);
    let talks = this.sortByDate(this.schedule.talks);
    // todo change 5 to minutes in settings
    talks = talks.filter(t => moment(t.endTime).subtract('5', 'm').toDate() > new Date(this.currentTime));
    return talks;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'H') {
      this.router.navigate(['']);
    }
  }

  private sortByDate(talks: Talk[]): Talk[] {
    return talks.sort((a, b) => {
      const dateA = new Date(a.startTime);
      const dateB = new Date(b.startTime);
      if (dateA > dateB) {
        return 1;
      }
      if (dateA < dateB) {
        return -1;
      }
      return 0;
    });
  }
}
