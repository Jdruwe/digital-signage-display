import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
export class TalkComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() talk: Talk;
  @Input() time: Date;

  @ViewChild('speakers') speakers;
  enableMarquee = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#summary-text').textfill({
        maxFontPixels: 32
      });
    });
  }

  // Update marquee effect and scale text when using the time travel feature
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.time && this.speakers) {
      this.cd.detectChanges();
      this.enableMarquee = this.checkOverflow(this.speakers.nativeElement);
    }

    // todo aint working yet
    if (changes.talk) {
      this.cd.detectChanges();
      this.scaleSummaryText();
    }
  }

  ngAfterViewInit(): void {
    this.enableMarquee = this.checkOverflow(this.speakers.nativeElement);
    // Detect changes to prevent expression changed after it was checked exception
    this.cd.detectChanges();
  }

  isNow() {
    if (this.talk) {
      return moment(this.time).isBetween(this.talk.startTime, this.talk.endTime);
    } else {
      return false;
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key.toUpperCase()) {
      case 'Q':
        this.scaleSummaryText();
        break;
    }
  }

  private checkOverflow(element) {
    return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
  }

  private scaleSummaryText() {
    // $(document).ready(function () {
    console.log('kek');
    $('#summary-text').textfill({
      maxFontPixels: 32
    });
    // });
  }
}
