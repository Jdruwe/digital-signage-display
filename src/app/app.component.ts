import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {RoomScheduleService} from './services/room-schedule.service';
import {Router} from '@angular/router';
import {ClientService} from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  room: any;

  constructor(private authService: AuthService,
              private roomScheduleService: RoomScheduleService,
              private router: Router,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.room = this.roomScheduleService.autoInitRoom();
    if (this.room.id) {
      this.clientService.registerRoom(this.room, new Date()).subscribe(() => {
        this.router.navigate(['room', this.room.id]);
      }, error => {
        this.router.navigate(['']);
      });
    }

    // TODO: unregister room when window or tab is closed
  }
}
