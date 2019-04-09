import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SessionComponent} from './session.component';
import {TrimTimePipe} from '../../../pipes/trim-time.pipe';

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SessionComponent,
        TrimTimePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionComponent);
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
      speakers: [
        {firstName: 'John1', lastName: 'Doe1', twitter: '@JohnDoe1'},
        {firstName: 'John2', lastName: 'Doe2', twitter: '@JohnDoe2'}
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render h3 tag with 'Talk title'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(`Talk title`);
  });

  it(`should render p tag with 'by John1 Doe1, John2 Doe2'`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(`by John1 Doe1, John2 Doe2`);
  });
});
