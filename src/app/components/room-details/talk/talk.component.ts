import {Component, Input} from '@angular/core';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';
import {NguCarouselConfig} from '@ngu/carousel';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent {

  @Input() talk: Talk;
  @Input() time: Date;

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

  isNow() {
    if (this.talk) {
      return moment(this.time).isBetween(this.talk.startTime, this.talk.endTime);
    } else {
      return false;
    }
  }
}
