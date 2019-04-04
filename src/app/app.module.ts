import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomHeaderComponent} from './components/room-details/room-header/room-header.component';
import {HttpClientModule} from '@angular/common/http';
import {RoomListComponent} from './components/room-list/room-list.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TalkComponent} from './components/room-details/talk/talk.component';
import {SpeakerComponent} from './components/room-details/speaker/speaker.component';
import {TrimTimePipe} from './components/pipes/trim-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomHeaderComponent,
    RoomListComponent,
    NavbarComponent,
    TalkComponent,
    SpeakerComponent,
    TrimTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
