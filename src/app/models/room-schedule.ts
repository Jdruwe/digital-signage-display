import {Talk} from './talk';
import {Room} from './room';

export class RoomSchedule {
  date: Date;
  day: string;
  room: Room;
  talks: Talk[];
}
