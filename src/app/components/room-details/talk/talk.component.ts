import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Talk} from '../../../models/talk';
import * as moment from 'moment';
import {animate, AnimationBuilder, AnimationPlayer, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(1000, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
        ]))
      ])
    ])
    // trigger('fadeAnimation', [
    //   state('in', style({
    //     opacity: '0', transform: 'translate3d(0, -20%, 0)'
    //   })),
    //   state('on', style({
    //       opacity: '1', transform: 'translate3d(0, 0, 0)'
    //     })
    //   ),
    //   state('out', style({
    //     opacity: '0', transform: 'translate3d(0, 20%, 0)'
    //   })),
    //   transition('* => *', animate('500ms ease-out'))
    //   // transition('inactive => active', animate('500ms ease-in'))
    // ])
    // trigger('listAnimation', [
    //   transition('* => *', [ // each time the binding value changes
    //     query(':leave', [
    //       style({opacity: 1}),
    //       animate('1s', style({opacity: 0}))
    //     ], {optional: true}),
    //     query(':enter', [
    //       style({opacity: 0}),
    //       animate('1s', style({opacity: 1}))
    //     ], {optional: true})
    //   ])
    // ])
    // trigger(
    //   'slideInRight',
    //   [
    //     transition(
    //       ':enter', [
    //         style({transform: 'rotateX(90deg)'}),
    //         animate('1s', style({transform: 'rotateX(0)'}))
    //       ]
    //     ),
    //     transition(
    //       ':leave', [
    //         style({transform: 'rotateX(0)'}),
    //         animate('1s', style({transform: 'rotateX(-90deg)'}))
    //       ]
    //     )
    //   ])
  ]
})
export class TalkComponent implements AfterViewInit, OnChanges {

  @Input() talk: Talk;
  @Input() time: Date;

  @ViewChild('speakers') speakers;
  enableMarquee = false;

  speakersToShow = [];
  splitSpeakersList = [];
  counter = 0;

  frontAnimationState = 'on';
  backAnimationState = 'on';

  speakersFront = [{
    firstName: 'Ivar',
    lastName: 'Grimstad',
    avatarUrl: 'http://www.gravatar.com/avatar/b489790e1a844284d7cd1fa2cd6e021f',
    twitter: '@ivar_grimstad'
  },
    {
      firstName: 'Dimitris',
      lastName: 'Andreadis',
      avatarUrl: 'https://lh5.googleusercontent.com/-839rjiWS0pg/AAAAAAAAAAI/AAAAAAAAA0Q/LbUzNWLqBKc/photo.jpg',
      twitter: '@dandreadis'
    },
    {
      firstName: 'Dmitry',
      lastName: 'Kornilov',
      avatarUrl: 'http://www.gravatar.com/avatar/3206e69e21d213cd672df8f50cdf6607',
      twitter: '@m0mus'
    }
  ];

  speakersBack = [{
    firstName: 'Gaël',
    lastName: 'Blondelle',
    avatarUrl: 'https://pbs.twimg.com/profile_images/777926456890494976/k1B2ahJ2_400x400.jpg',
    twitter: '@gblondelle'
  },
    {
      firstName: 'Kevin',
      lastName: 'Sutter',
      avatarUrl: 'https://lh3.googleusercontent.com/-WE50dOB4RKo/AAAAAAAAAAI/AAAAAAAAAXg/Ycm0Nxt17io/photo.jpg',
      twitter: '@kwsutter'
    },
    {
      firstName: 'Markus',
      lastName: 'Eisele',
      avatarUrl: 'http://www.gravatar.com/avatar/0fb625aef5a5feebdc02614a92e3af5e',
      twitter: '@myfear'
    }
  ];

  constructor(private cd: ChangeDetectorRef,
              private animationBuilder: AnimationBuilder) {
  }

  // Update marquee effect when using the time travel feature
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.talk) {
    //   // this.speakersToShow = this.talk.speakers;
    //   console.log('Kek');
    //   if (this.talk.speakers) {
    //     // setTimeout(() => {
    //     if (this.isOverflow(this.speakers.nativeElement)) {
    //       console.log('Overflow 2');
    //           this.handleSpeakersOverflow();
    //     }
    //     // }, 2000);
    //   }
    // }
  }

  ngAfterViewInit(): void {
    this.splitSpeakers();
    this.animateSpeakers();
    // setT imeout(() => {
    // if (this.isOverflow(this.speakers.nativeElement)) {
    // this.handleSpeakersOverflow();
    // }
    // }, 2000);
  }

  isNow() {
    if (this.talk) {
      return moment(this.time).isBetween(this.talk.startTime, this.talk.endTime);
    } else {
      return false;
    }
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
    // let counter = 0;
    // setInterval(() => {
    // this.speakersFront = this.splitSpeakersList[0];
    // this.speakersBack = this.splitSpeakersList[1];
    //
    // this.frontAnimationState = 'out';
    // this.backAnimationState = 'in';
    //
    // setTimeout(() => {
    // }, 1000);
    //
    // this.speakersFront = this.splitSpeakersList[1];
    // this.speakersBack = this.splitSpeakersList[2];
    //
    // this.frontAnimationState = 'on';
    // this.backAnimationState = 'out';
    //
    // setTimeout(() => {
    // }, 1000);

    // console.log('Cycle');
    // console.log(this.speakersFront);
    // console.log(this.speakersBack);

    this.speakersFront = this.splitSpeakersList[this.counter];
    if (this.counter === this.splitSpeakersList.length - 1) {
      this.speakersBack = this.splitSpeakersList[0];
      this.counter = 0;
    } else {
      this.speakersBack = this.splitSpeakersList[this.counter + 1];
      this.counter++;
    }

    // console.log(this.speakersFront);
    // console.log(this.speakersBack);
    // this.createRotatexAnimation(-90, this.getFrontSpeakersElement()).play();
    // this.createRotatexAnimation(0, this.getBackSpeakersElement()).play();
    // }, 2000);
  }

  private createRotatexAnimation(degree: number, element: ElementRef): AnimationPlayer {
    return this.animationBuilder.build([
      style('*'),
      animate('1s', style({transform: 'rotateX(' + degree + 'deg)'}))
    ]).create(element);
  }

  private getFrontSpeakersElement(): ElementRef {
    return this.speakers.nativeElement.querySelector('.front').nativeElement;
  }

  private getBackSpeakersElement(): ElementRef {
    return this.speakers.nativeElement.querySelector('.back').nativeElement;
  }

  private isOverflow(element): Boolean {
    return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
  }

  private handleSpeakersOverflow() {
    const speakers = [...this.talk.speakers];
    const splitSpeakersList = [];
    const maxNumberOfSpeakers = 3;
    const timesToSplit = Math.floor(speakers.length / maxNumberOfSpeakers);
    for (let i = 0; i < timesToSplit; i++) {
      splitSpeakersList.push(speakers.splice(0, maxNumberOfSpeakers));
    }

    let counter = 0;
    setInterval(() => {
      this.speakersToShow = splitSpeakersList[counter];
      console.log(this.speakersToShow);
      if (counter >= maxNumberOfSpeakers) {
        counter = 0;
      } else {
        counter++;
      }
    }, 2000);

  }

  private kek(rotation: number) {
    const animationFactory = this.animationBuilder.build([
      style('*'),
      animate('500ms', style({transform: 'rotateX(' + rotation + 'deg)'}))
    ]);

    animationFactory.create(this.speakers.nativeElement).play();
  }

  doNext() {
    // this.animateSpeakers();
  }
}
