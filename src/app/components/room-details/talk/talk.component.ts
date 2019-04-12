import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})
export class TalkComponent implements AfterViewInit, OnChanges {

  @Input() talk: Talk;
  @Input() time: Date;

  @ViewChild('speakers') speakers;
  enableMarquee = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  // Updatex marquee effect when using the time travel feature
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.time && this.speakers) {
      this.cd.detectChanges();
      this.enableMarquee = this.checkOverflow(this.speakers.nativeElement);
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

  private checkOverflow(element) {
    return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
  }

}
