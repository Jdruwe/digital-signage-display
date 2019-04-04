import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ScheduleService} from '../../../services/schedule.service';
import {Schedule} from '../../../models/schedule';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;
  schedule: Schedule;

  private clockSub: Subscription;

  constructor(private timeService: TimeService,
              private scheduleService: ScheduleService,
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

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'H') {
      this.router.navigate(['']);
    }
  }
}
