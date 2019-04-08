import {Component, Input, OnInit} from '@angular/core';
import {Talk} from '../../../models/talk';
// import * as $ from 'jquery';

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

  ngOnInit(): void {
    $(document).ready(function () {
      $('#summary-text').textfill({
        debug: true,
        maxFontPixels: 32
      });
    });
  }

}
