import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomComponent} from './room.component';
import {RoomHeaderComponent} from '../room-header/room-header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RoomService} from '../../../services/room.service';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let roomService: RoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        RoomComponent,
        RoomHeaderComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    roomService = TestBed.get(RoomService);
    // spyOn(roomService, 'getRoom').and.returnValue({id: 1, name: 'Room 1'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
