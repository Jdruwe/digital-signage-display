import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
  animations: [
    trigger(
      'RotateInAndOut',
      [
        transition(
          ':enter', [
            style({opacity: 0, transform: 'rotateX(90deg)'}),
            animate('500ms', style({opacity: 1, transform: 'rotateX(0)'}))
          ]
        ),
        transition(
          ':leave', [
            style({opacity: 1, transform: 'rotateX(0)'}),
            animate('500ms', style({opacity: 0, transform: 'rotateX(-90deg)'}))
          ]
        )
      ])
  ]
})
export class TalkComponent implements AfterViewInit, OnChanges, OnInit {

  @Input() talk: Talk;
  @Input() time: Date;

  @ViewChild('speakers') speakers;

  speakersToShow = [];

  private counter = 0;
  private splitSpeakersList = [];
  private animationInterval;
  private animationDelay;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.speakersToShow = this.talk.speakers;
  }

  // Correctly update speakers when using time travel
  ngOnChanges(changes: SimpleChanges): void {
    clearInterval(this.animationInterval);
    clearTimeout(this.animationDelay);
    if (changes.talk) {
      this.counter = 0;
      this.speakersToShow = this.talk.speakers;
      if (this.isOverflow(this.speakers.nativeElement)) {
        this.handleOverflow();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.isOverflow(this.speakers.nativeElement)) {
      this.handleOverflow();
    }
  }

  isNow() {
    if (this.talk) {
      return moment(this.time).isBetween(this.talk.startTime, this.talk.endTime);
    } else {
      return false;
    }
  }

  private isOverflow(element): Boolean {
    return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
  }

  private handleOverflow() {
    this.splitSpeakers();
    this.speakersToShow = this.splitSpeakersList[this.counter++];
    this.animateSpeakers();
    this.cd.detectChanges();
  }

  private splitSpeakers() {
    const speakers = [...this.talk.speakers];
    const maxNumberOfSpeakers = 3;
    const timesToSplit = Math.floor(speakers.length / maxNumberOfSpeakers);
    for (let i = 0; i <= timesToSplit; i++) {
      this.splitSpeakersList.push(speakers.splice(0, maxNumberOfSpeakers));
    }
  }

  private animateSpeakers() {
    this.animationInterval = setInterval(() => {
      this.speakersToShow = [];
      this.animationDelay = setTimeout(() => {
        this.speakersToShow = this.splitSpeakersList[this.counter];
        this.incrementCounter();
      }, 501);
    }, 5000);
  }

  private incrementCounter() {
    if (this.counter === this.splitSpeakersList.length - 1) {
      this.counter = 0;
    } else {
      this.counter++;
    }
  }
}
