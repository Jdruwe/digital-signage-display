import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RoomScheduleService} from '../../../services/room-schedule.service';
import {RoomSchedule} from '../../../models/room-schedule';
import {Talk} from '../../../models/talk';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;
  schedule: RoomSchedule;

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
      });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          const id = paramMap.get('id');
          const date = new Date();
          this.scheduleService.getSchedule(date, id)
            .subscribe(response => {
              this.schedule = response;
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.clockSub.unsubscribe();
  }

  getTalkToShow() {
    const talks = this.sortTalksByDate(this.schedule.talks);
    // todo remove comment
    // talks = talks.filter(t => new Date(t.endTime) > this.currentTime);
    return talks[0];
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'H') {
      this.router.navigate(['']);
    }
  }

  private sortTalksByDate(talks: Talk[]): Talk[] {
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
