import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';
import {environment} from '../../../../environments/environment';
import {Speaker} from '../../../models/speaker';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent implements AfterViewInit, OnChanges {

  @Input() talk: Talk;
  @Input() time: Date;

  @Input() showRoomOccupancy = false;
  // todo implement
  @Input() currentOccupancy: number;
  @Input() maxOccupancy: number;

  @ViewChild('carousel') carousel: NguCarousel<Speaker>;

  carouselTileConfig: NguCarouselConfig = {
    grid: {xs: 3, sm: 3, md: 3, lg: 3, all: 0},
    point: {
      visible: false
    },
    touch: false,
    loop: true,
    speed: environment.carouselAnimationSpeed,
    interval: {timing: environment.carouselInterval},
    animation: 'lazy'
  };

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    // Correctly update speakers when using time travel
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Correctly update speakers when using time travel
    if (changes.talk && this.carousel) {
      this.carousel.moveTo(0);
      this.cd.detectChanges();
    }
  }

  isNow() {
    if (this.talk) {
      return moment(this.time).isBetween(this.talk.startTime, this.talk.endTime);
    } else {
      return false;
    }
  }

}
