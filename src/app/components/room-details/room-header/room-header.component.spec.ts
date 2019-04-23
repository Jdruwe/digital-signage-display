import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomHeaderComponent} from './room-header.component';
import {TimeTravelComponent} from '../../time-travel/time-travel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('RoomHeaderComponent', () => {
  let component: RoomHeaderComponent;
  let fixture: ComponentFixture<RoomHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoomHeaderComponent,
        TimeTravelComponent
      ],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeDefined();
  });

  it(`should have as room name 'Exhibition hall'`, function () {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.roomName).toEqual('Exhibition hall');
  });

  it(`should render room name in a h1 tag`, function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Exhibition hall');
  });
});
