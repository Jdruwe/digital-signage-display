import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {fromEvent, Subscription} from 'rxjs';
import {bufferWhen, debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {

  rooms: Room[];

  private keySub: Subscription;

  constructor(private roomService: RoomService,
              private router: Router,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.registerKeyListener();
    this.roomService.getRooms()
      .subscribe((response: Room[]) => {
        this.rooms = response;
      });
  }

  ngOnDestroy(): void {
    this.keySub.unsubscribe();
  }

  private registerKeyListener() {
    const single$ = fromEvent(window, 'keypress');
    this.keySub = single$
      .pipe(
        bufferWhen(() => single$
          .pipe(debounceTime(environment.keyPressBufferTime))),
      ).subscribe((events: KeyboardEvent[]) => {
        const registeredKeys = events.map(e => e.key).join('');
        this.handleRoomChange(+registeredKeys);
      });
  }

  private handleRoomChange(index: number) {
    console.log(index);
    if (!isNaN(index)) {
      const room = new Room(this.rooms[index].id, this.rooms[index].name);
      this.clientService.registerRoom(room, new Date());
      this.router.navigate(['room', this.rooms[index].id]);
    }
  }

  getIndexOf(room: Room) {
    return this.rooms.indexOf(room);
  }
}
