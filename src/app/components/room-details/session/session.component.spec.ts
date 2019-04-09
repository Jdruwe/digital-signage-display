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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
