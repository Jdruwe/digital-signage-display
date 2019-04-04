import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent implements OnInit {

  @Input() roomName = 'Exhibition hall';
  @Input() time;

  constructor() {
  }

  ngOnInit() {
  }

}
