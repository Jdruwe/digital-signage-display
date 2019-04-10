import {Component, Input} from '@angular/core';
import {Talk} from '../../../models/talk';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  @Input() talks: Talk[];

}
