import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TimeService} from '../../../services/time.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RoomService} from '../../../services/room.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentTime: Date;

  private clockSub: Subscription;
  private room;

  constructor(private timeService: TimeService,
              private roomService: RoomService,
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
          this.room = this.roomService.getRoom(id);
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
