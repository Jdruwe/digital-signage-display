import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client';
import * as moment from 'moment';
import {ClientDetails} from '../../models/client-details';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  test: ClientDetails[] = [];

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.clients.forEach(client => {
        const days = this.getDaysSince(client);
        const hours = this.getHoursSince(client);
        const minutes = this.getMinutesSince(client);
        this.test.push(new ClientDetails(client, days, hours - (Math.floor(days) * 24), minutes - (Math.floor(hours) * 60)));
      });
    });
  }

  private getDaysSince(test: Client): number {
    const now = moment(new Date()); // todays date
    const end = moment(test.lastConnected); // another date
    const duration = moment.duration(now.diff(end));
    return duration.asDays();
  }

  private getHoursSince(test: Client): number {
    const now = moment(new Date()); // todays date
    const end = moment(test.lastConnected); // another date
    const duration = moment.duration(now.diff(end));
    return duration.asHours();
  }

  private getMinutesSince(test: Client): number {
    const now = moment(new Date()); // todays date
    const end = moment(test.lastConnected); // another date
    const duration = moment.duration(now.diff(end));
    return duration.asMinutes();
  }
}
