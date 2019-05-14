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
import {ConnectionService} from '../../../services/connection.service';
import {Settings} from '../../../models/settings/settings';
import {environment} from '../../../../environments/environment';
import {animate, style, transition, trigger} from '@angular/animations';
import {RoomOccupancyService} from '../../../services/room-occupancy.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [
    trigger(
      'SlideInOut', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;
  talkToShow: Talk;
  nextTalks: Talk[];
  schedule: RoomSchedule;
  timeBeforeSwitch: number;
  showTimeTravel = false;
  id: string;

  showRoomOccupancy = false;
  currentOccupancy: number;
  maxOccupancy: number;

  message = '';
  showMessage = true;

  private clockSub: Subscription;
  private connectionSub: Subscription;
  private roomId: string;
  private settingsInterval;
  private occupancyInterval;

  constructor(private timeService: TimeService,
              private scheduleService: RoomScheduleService,
              private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService,
              private clientService: ClientService,
              private connectionService: ConnectionService,
              private roomOccupancyService: RoomOccupancyService) {
  }

  ngOnInit() {
    this.subscribeToTimeService();

    this.settingsService.currentTimeBefore
      .subscribe(time => this.timeBeforeSwitch = time);
    this.retrieveSettings();
    this.startSettingsInterval();

    this.subscribeToRoute();
    this.subscribeToConnectionService();
  }

  ngOnDestroy(): void {
    this.clientService.unRegisterRoom();
    this.clockSub.unsubscribe();
    this.connectionSub.unsubscribe();
    clearInterval(this.settingsInterval);
    clearInterval(this.occupancyInterval);
  }

  private retrieveSettings() {
    this.settingsService.getSettings()
      .subscribe((data: Settings) => {
        this.settingsService.changeTimeBefore(data.minutesBeforeNextSession);
        this.showRoomOccupancy = data.roomOccupancyOn;
        this.message = data.message;
        this.showMessage = data.showMessage;

        this.getRoomOccupancy();
      });
  }

  private getRoomOccupancy() {
    clearInterval(this.occupancyInterval);

    if (this.showRoomOccupancy && this.talkToShow) {
      this.occupancyInterval = setInterval(() => {
        if (!this.talkToShow) {
          clearInterval(this.occupancyInterval);
        }
        this.roomOccupancyService.getRoomOccupancy(this.roomId)
          .subscribe(response => {
            this.currentOccupancy = response.occupancy;
            this.maxOccupancy = response.capacity;
          });
      }, environment.retrieveRoomOccupancyIntervalInSeconds * 1000);
    }
  }

  private startSettingsInterval() {
    this.settingsInterval = setInterval(() => {
      this.retrieveSettings();
    }, environment.retrieveMessageIntervalInMinutes * 1000 * 60);
  }

  private subscribeToTimeService() {
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
  }

  private subscribeToRoute() {
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

  private subscribeToConnectionService() {
    this.connectionSub = this.connectionService.getConnectionStatus()
      .subscribe((response: Boolean) => {
        if (this.roomId && response) {
          this.getSchedule(this.currentTime, this.roomId);
        }
      });
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
    this.getRoomOccupancy();
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
        this.clientService.unRegisterRoom();
        this.router.navigate(['']);
        break;
      case'X':
        this.toggleTimeTravel();
        break;
    }
  }

  toggleTimeTravel() {
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

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    this.clientService.unRegisterRoom();
  }
}
