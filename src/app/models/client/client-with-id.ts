import {Room} from '../room';

export class ClientWithId {
  id: number;
  room: Room;
  lastConnected: Date;

  constructor(room: Room, lastConnected: Date) {
    this.room = room;
    this.lastConnected = lastConnected;
  }
}
