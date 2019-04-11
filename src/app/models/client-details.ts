import {Client} from './client';

export class ClientDetails {
  client: Client;
  days: number;
  hours: number;
  minutes: number;


  constructor(client: Client, days: number, hours: number, minutes: number) {
    this.client = client;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
  }
}
