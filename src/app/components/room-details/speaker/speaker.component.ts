import {Component, Input} from '@angular/core';
import {Speaker} from '../../../models/speaker';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent {

  @Input() speaker: Speaker;

  constructor() {
  }

}
