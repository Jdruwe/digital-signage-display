import {ClientWithId} from './client-with-id';

export class ClientDetails {
  client: ClientWithId;
  days: number;
  hours: number;
  minutes: number;
  isAlive: boolean;


  constructor(client: ClientWithId, days: number, hours: number, minutes: number, isAlive: boolean) {
    this.client = client;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.isAlive = isAlive;
  }
}
