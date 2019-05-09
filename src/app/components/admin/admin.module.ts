import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ClientsComponent} from './clients/clients.component';
import {SettingsComponent} from './settings/settings.component';
import {AdminRoutingModule} from './admin-routing.module';
import {DateAgoPipe} from '../../pipes/date-ago.pipe';

@NgModule({
  declarations: [
    ClientsComponent,
    SettingsComponent,
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule {
}
