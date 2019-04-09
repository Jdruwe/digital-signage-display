import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {RoomScheduleService} from './services/room-schedule.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private roomScheduleService: RoomScheduleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.router.navigate(['room', this.roomScheduleService.autoInitRoom()]);
  }
}
