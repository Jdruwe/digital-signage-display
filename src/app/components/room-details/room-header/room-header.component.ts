import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-room-header',
  templateUrl: './room-header.component.html',
  styleUrls: ['./room-header.component.scss']
})
export class RoomHeaderComponent {

  @Input() roomName = 'Exhibition hall';
  @Input() time;
  @Input() showTimeTravel = false;
  @Output() hideTimeTravel = new EventEmitter();
}
