import {Component, Input} from '@angular/core';
import {Talk} from '../../../models/talk';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  // todo fix splice for 3 in html, maybe wait for timeline to be implemented tho?
  @Input() talks: Talk[];

}
