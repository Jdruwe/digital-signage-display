import {ClientWithId} from './client-with-id';

export class ClientDetails {
  client: ClientWithId;
  date: Date
  isAlive: boolean;


  constructor(client: ClientWithId, date: Date, isAlive: boolean) {
    this.client = client;
    this.date = date;
    this.isAlive = isAlive;
  }
}
