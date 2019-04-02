import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;

  private clockSub;

  constructor(private timeService: TimeService) {
  }

  ngOnInit() {
    this.clockSub = this.timeService.getClock().subscribe(response => {
      this.currentTime = response;
    });
  }

  ngOnDestroy(): void {
    this.clockSub.unsubscribe();
  }
}
