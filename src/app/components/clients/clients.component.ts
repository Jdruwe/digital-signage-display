import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client/client';
import * as moment from 'moment';
import {ClientDetails} from '../../models/client/client-details';
import {environment} from '../../../environments/environment';
import {ClientWithId} from '../../models/client/client-with-id';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: ClientWithId[];
  clientsWithDetails: ClientDetails[] = [];

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getAllClients()
      .subscribe((data: ClientWithId[]) => {
        this.clients = data;
        this.clients.forEach(client => {
          const days = this.getDaysSince(client);
          const hours = this.getHoursSince(client);
          const minutes = this.getMinutesSince(client);
          const status = (environment.heartbeat * 2) > minutes;
          this.clientsWithDetails.push(
            new ClientDetails(client, days, hours - (Math.floor(days) * 24), minutes - (Math.floor(hours) * 60), status)
          );
        });
      });
  }

  UnregisterClient(clientDetails: ClientDetails) {
    this.clientService.unRegisterRoomManually(clientDetails.client.id);
    this.clientsWithDetails.splice(this.clientsWithDetails.indexOf(clientDetails), 1);
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
