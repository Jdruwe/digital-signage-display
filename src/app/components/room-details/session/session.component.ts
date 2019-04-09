import {Component, Input} from '@angular/core';
import {Talk} from '../../../models/talk';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  @Input() talk: Talk;

  getSpeakerNames(): string {
    return this.talk.speakers.map(s => `${s.firstName} ${s.lastName}`).join(', ');
  }
}
