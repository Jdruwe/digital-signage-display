import {Component, Input, OnInit} from '@angular/core';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';

declare var $: JQuery;

declare global {
  interface JQuery {
    (selector: any): any;

    textfill(a): any;
  }
}

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent implements OnInit {

  @Input() talk: Talk;
  @Input() time: Date;

  ngOnInit(): void {
    $(document).ready(function () {
      $('#summary-text').textfill({
        debug: true,
        maxFontPixels: 32
      });
    });
  }

  isNow() {
    if (this.talk) {
      return moment(this.time).isBetween(this.talk.startTime, this.talk.endTime);
    } else {
      return false;
    }
  }

  checkOverflow(element) {
    return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
  }

}
