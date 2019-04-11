import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RoomScheduleService} from '../../../services/room-schedule.service';
import {RoomSchedule} from '../../../models/room-schedule';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;
  talkToShow: Talk;
  nextTalks: Talk[];
  schedule: RoomSchedule;
  timeBeforeSwitch: number;
  showTimeTravel = false;

  private clockSub: Subscription;
  private roomId: string;

  constructor(private timeService: TimeService,
              private scheduleService: RoomScheduleService,
              private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.clockSub = this.timeService.getClock()
      .subscribe(response => {
        if (this.currentTime) {
          if (!this.checkSameDay(response, this.currentTime)) {
            if (this.roomId) {
              this.getSchedule(response, this.roomId);
            }
          }
        }
        this.currentTime = response;
        if (this.schedule) {
          this.setTalks();
        }
      });

    this.settingsService.currentTimeBefore.subscribe(time => this.timeBeforeSwitch = time);
    this.settingsService.getSettings()
      .subscribe(data => {
        this.settingsService.changeTimeBefore(data.minutesBeforeNextSession);
      });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          const id = paramMap.get('id');
          this.roomId = id;
          const date = this.currentTime;
          this.getSchedule(date, id);
        }
      });
  }

  ngOnDestroy(): void {
    this.clockSub.unsubscribe();
  }

  private checkSameDay(date1: Date, date2: Date): boolean {
    const sameYear = moment(date1).isSame(date2, 'year');
    const sameMonth = moment(date1).isSame(date2, 'month');
    const sameDay = moment(date1).isSame(date2, 'day');
    return sameYear && sameMonth && sameDay;
  }

  private getSchedule(date: Date, id: string) {
    this.scheduleService.getSchedule(date, id)
      .subscribe(response => {
        this.schedule = response;
        if (this.schedule) {
          this.setTalks();
        }
      });
  }

  private setTalks() {
    const talks = this.sortAndFilterTalks();
    this.talkToShow = talks.shift();
    this.nextTalks = talks;
  }

  private sortAndFilterTalks(): Talk[] {
    let talks = this.sortByDate(this.schedule.talks);
    // Removes talks that are not on the same day
    talks = talks.filter(t => this.checkSameDay(t.startTime, this.currentTime));
    // Removes talks that have already passed
    talks = talks.filter(t => moment(t.endTime).subtract(this.timeBeforeSwitch, 'm').toDate() > new Date(this.currentTime));
    return talks;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key.toUpperCase()) {
      case 'H':
        this.timeService.resetTime();
        this.router.navigate(['']);
        break;
      case'X':
        this.toggleTimeTravel();
        break;
    }
  }

  private toggleTimeTravel() {
    this.showTimeTravel = !this.showTimeTravel;
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
