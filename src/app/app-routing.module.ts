import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: RoomListComponent},
  {path: 'room/:id', component: RoomComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: RoomListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
