import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TalkComponent} from './talk.component';
import {TrimTimePipe} from '../../../pipes/trim-time.pipe';
import {SpeakerComponent} from '../speaker/speaker.component';
import {EllipsisModule} from 'ngx-ellipsis';

describe('TalkComponent', () => {
  let component: TalkComponent;
  let fixture: ComponentFixture<TalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TalkComponent,
        SpeakerComponent,
        TrimTimePipe
      ],
      imports: [EllipsisModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkComponent);
    component = fixture.componentInstance;
    const app = fixture.debugElement.componentInstance;
    app.talk = {
      startTime: new Date(),
      endTime: new Date(),
      fromTime: '09:30',
      toTime: '10:30',
      title: 'Talk title',
      type: 'Talk type',
      summary: 'Talk summary',
      speakers: [{firstName: 'John', lastName: 'Doe', twitter: '@JohnDoe'}]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a talk with title 'Talk title'`, function () {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.talk.title).toBe('Talk title');
  });

  it(`should render h1 tag with 'Talk title'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.container .header h1').textContent).toContain(`Talk title`);
  });

  it(`should render h3 tag with 'Talk type'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.container .header h3').textContent).toContain(`Talk type`);
  });

  it(`should render 1 speaker'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.container .speakers app-speaker').length).toBe(1);
  });

  it(`should not have marquee class on speakers'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.container .marquee')).toBe(null);
  });
});
