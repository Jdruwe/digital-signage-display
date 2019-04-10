import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from '../../services/time.service';

@Component({
  selector: 'app-time-travel',
  templateUrl: './time-travel.component.html',
  styleUrls: ['./time-travel.component.scss']
})
export class TimeTravelComponent implements OnInit {

  @Input() time: Date;

  constructor(private timeService: TimeService) {
  }

  ngOnInit() {
  }

}
