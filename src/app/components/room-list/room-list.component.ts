import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {fromEvent, Subscription} from 'rxjs';
import {bufferWhen, debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {

  rooms: Room[];

  private roomsSub: Subscription;

  constructor(private roomService: RoomService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerKeyListener();
    this.roomService.getRooms();
    this.roomsSub = this.roomService.getRoomsUpdateListener()
      .subscribe((response: Room[]) => {
        this.rooms = response;
      });
  }

  ngOnDestroy(): void {
    this.roomsSub.unsubscribe();
  }

  private registerKeyListener() {
    const single$ = fromEvent(window, 'keypress');
    single$
      .pipe(
        bufferWhen(() => single$.pipe(debounceTime(250))),
      ).subscribe((events: KeyboardEvent[]) => {
      const registeredKeys = events.map(e => e.key).join('');
      this.handleRoomChange(+registeredKeys);
    });
  }

  private handleRoomChange(index: number) {
    this.router.navigate(['room', this.rooms[index].id]);
  }

  getIndexOf(room: Room) {
    return this.rooms.indexOf(room);
  }
}
