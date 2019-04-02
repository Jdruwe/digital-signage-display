import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './components/room-details/room/room.component';
import { RoomHeaderComponent } from './components/room-details/room-header/room-header.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
