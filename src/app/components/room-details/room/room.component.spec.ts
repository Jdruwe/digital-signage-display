import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomComponent} from './room.component';
import {RoomHeaderComponent} from '../room-header/room-header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TalkComponent} from '../talk/talk.component';
import {TrimTimePipe} from '../../../pipes/trim-time.pipe';
import {SpeakerComponent} from '../speaker/speaker.component';
import {TimeService} from '../../../services/time.service';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let timeService: TimeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        RoomComponent,
        RoomHeaderComponent,
        TalkComponent,
        TrimTimePipe,
        SpeakerComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    timeService = TestBed.get(TimeService);
    spyOn(timeService, 'getClock').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the time', function () {
    component.ngOnInit();
    expect(timeService.getClock).toHaveBeenCalled();
  });

  it('should have empty schedule', function () {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.schedule).toBeUndefined();
  });

  it('should render image tag', function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeDefined();
  });
  it(`should render h1 title with 'It's a wrap!'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.empty-state h1').textContent).toContain(`It's a wrap!`);
  });
});
