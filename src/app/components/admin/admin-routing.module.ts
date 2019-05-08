import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../guards/auth-guard';
import {SettingsComponent} from './settings/settings.component';
import {ClientsComponent} from './clients/clients.component';

const routes: Routes = [
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
