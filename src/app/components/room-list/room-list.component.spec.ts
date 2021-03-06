import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomListComponent} from './room-list.component';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RoomService} from '../../services/room.service';

describe('RoomListComponent', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;
  let roomService: RoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        RoomListComponent,
        NavbarComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;
    roomService = TestBed.get(RoomService);
    spyOn(roomService, 'getRooms').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the room', function () {
    component.ngOnInit();
    expect(roomService.getRooms).toHaveBeenCalled();
  });

  it('should render 0 cards', function () {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.card').length).toBe(0);
  });

  it('should return the right index', function () {
    fixture.detectChanges();
    const room = {
      id: 'Room6',
      name: 'Room 6'
    };

    component.rooms = [{
      id: 'Room8',
      name: 'Room 8'
    }, room];
    expect(component.getIndexOf(room)).toEqual(1);
  });
});
