import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RoomScheduleService} from '../../../services/room-schedule.service';
import {RoomSchedule} from '../../../models/room-schedule';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';
import {SettingsService} from '../../../services/settings.service';
import {ClientService} from '../../../services/client.service';
import {$} from 'protractor';

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
  id: string;

  private clockSub: Subscription;

  constructor(private timeService: TimeService,
              private scheduleService: RoomScheduleService,
              private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.clockSub = this.timeService.getClock()
      .subscribe(response => {
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
          this.id = paramMap.get('id');
          const date = this.currentTime;
          this.scheduleService.getSchedule(date, this.id)
            .subscribe(response => {
              this.schedule = response;
              if (this.schedule) {
                this.setTalks();
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.clientService.unRegisterRoom(this.id);
    this.clockSub.unsubscribe();
  }

  private setTalks() {
    const talks = this.sortAndFilterTalks();
    this.talkToShow = talks.shift();
    this.nextTalks = talks;
  }

  private sortAndFilterTalks(): Talk[] {
    let talks = this.sortByDate(this.schedule.talks);
    // todo change 5 to minutes in settings
    talks = talks.filter(t => moment(t.endTime).subtract(this.timeBeforeSwitch, 'm').toDate() > new Date(this.currentTime));
    return talks;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'H') {
      this.clientService.unRegisterRoom(this.id);
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
