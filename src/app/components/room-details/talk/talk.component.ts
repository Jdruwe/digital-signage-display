import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent {

  @Input() title;
  @Input() type;
  @Input() fromTime;
  @Input() toTime;
  @Input() summary;

}
