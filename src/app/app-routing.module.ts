import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomListComponent} from './components/room-list/room-list.component';

const routes: Routes = [
  {path: '', component: RoomListComponent},
  {path: 'room/:id', component: RoomComponent},
  {path: '**', component: RoomListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
