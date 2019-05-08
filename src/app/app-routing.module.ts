import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {AuthGuard as AuthGuard} from './guards/auth-guard';

const routes: Routes = [
  {path: '', component: RoomListComponent},
  {path: 'room/:id', component: RoomComponent},
  {path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'},
  {path: 'admin', loadChildren: './components/admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  {path: '**', component: RoomListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
