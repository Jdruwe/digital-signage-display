import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeTravelComponent} from './time-travel.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('TimeTravelComponent', () => {
  let component: TimeTravelComponent;
  let fixture: ComponentFixture<TimeTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTravelComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTravelComponent);
    component = fixture.componentInstance;
    const app = fixture.debugElement.componentInstance;
    app.time = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 previous buttons', function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.time-travel .prev-buttons button').length).toBe(3);
  });

  it('should render 3 next buttons', function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.time-travel .next-buttons button').length).toBe(3);
  });

  it('should render a reset button', function () {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.time-travel .reset button').length).toBe(1);
  });

  it('should render 5 input fields', function () {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.time-travel form input').length).toBe(5);
  });
});
