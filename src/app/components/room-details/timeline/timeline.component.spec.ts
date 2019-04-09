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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
