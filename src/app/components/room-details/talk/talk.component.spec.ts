import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TalkComponent} from './talk.component';
import {TrimTimePipe} from '../../../pipes/trim-time.pipe';
import {SpeakerComponent} from '../speaker/speaker.component';

describe('TalkComponent', () => {
  let component: TalkComponent;
  let fixture: ComponentFixture<TalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TalkComponent,
        SpeakerComponent,
        TrimTimePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
