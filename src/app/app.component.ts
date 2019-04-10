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

  constructor(private authService: AuthService,
              private roomScheduleService: RoomScheduleService,
              private router: Router,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    const room = this.roomScheduleService.autoInitRoom();
    if (room.id) {
      this.clientService.registerRoom(room, new Date()).subscribe();
      this.router.navigate(['room', room.id]);
    }
  }
}
