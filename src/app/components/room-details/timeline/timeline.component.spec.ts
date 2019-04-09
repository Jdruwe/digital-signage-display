import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineComponent} from './timeline.component';
import {SessionComponent} from '../session/session.component';
import {TrimTimePipe} from '../../../pipes/trim-time.pipe';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimelineComponent,
        SessionComponent,
        TrimTimePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    const app = fixture.debugElement.componentInstance;
    app.talks = [{
      startTime: new Date(),
      endTime: new Date(),
      fromTime: '09:30',
      toTime: '10:30',
      title: 'Talk title 1',
      type: 'Talk type 1',
      summary: 'Talk summary 1',
      speakers: [{firstName: 'John 1', lastName: 'Doe 1', twitter: '@JohnDoe1'}]
    },
      {
        startTime: new Date(),
        endTime: new Date(),
        fromTime: '10:30',
        toTime: '11:30',
        title: 'Talk title 2',
        type: 'Talk type 2',
        summary: 'Talk summary 2',
        speakers: [{firstName: 'John2', lastName: 'Doe2', twitter: '@JohnDoe2'}]
      }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 app-session tags', function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.container app-session').length).toBe(2);
  });

  it(`should not render h1 with 'No more sessions!'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.empty-state h1')).toBe(null);
  });
});
