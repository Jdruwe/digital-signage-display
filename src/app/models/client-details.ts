import {Client} from './client';

export class ClientDetails {
  client: Client;
  days: number;
  hours: number;
  minutes: number;
  isAlive: boolean;


  constructor(client: Client, days: number, hours: number, minutes: number, isAlive: boolean) {
    this.client = client;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.isAlive = isAlive;
  }
}
