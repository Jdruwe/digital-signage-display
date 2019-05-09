import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../services/client.service';
import * as moment from 'moment';
import {ClientDetails} from '../../../models/client/client-details';
import {environment} from '../../../../environments/environment';
import {ClientWithId} from '../../../models/client/client-with-id';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: ClientWithId[];
  clientsWithDetails: ClientDetails[];

  amountOfClients = 0;
  amountOfOnlineClients = 0;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.updateClients();
  }

  UnregisterClient(clientDetails: ClientDetails) {
    this.clientService.unRegisterRoomManually(clientDetails.client.id).subscribe(() => {
      this.clientsWithDetails.splice(this.clientsWithDetails.indexOf(clientDetails), 1);
      this.updateClients();
    });
  }

  private updateClients() {
    this.clients = [];
    this.clientsWithDetails = [];
    this.amountOfClients = 0;
    this.amountOfOnlineClients = 0;
    this.clientService.getAllClients().subscribe((data: ClientWithId[]) => {
      this.clients = data;
      this.amountOfClients = data.length;
      this.clients.forEach(client => {
        const duration = moment.duration(moment(new Date()).diff(client.lastConnected));
        const minutes = duration.asMinutes();
        const status = (environment.heartbeat * 2) > minutes;
        this.clientsWithDetails.push(new ClientDetails(client, client.lastConnected, status));
      });
      this.clientsWithDetails.forEach(client => {
        if (client.isAlive) {
          this.amountOfOnlineClients++;
        }
      });
    });
  }
}
