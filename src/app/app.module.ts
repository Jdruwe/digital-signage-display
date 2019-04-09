import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomHeaderComponent} from './components/room-details/room-header/room-header.component';
import {HttpClientModule} from '@angular/common/http';
import {RoomListComponent} from './components/room-list/room-list.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/auth/login/login.component';
import {TalkComponent} from './components/room-details/talk/talk.component';
import {SpeakerComponent} from './components/room-details/speaker/speaker.component';
import {TrimTimePipe} from './pipes/trim-time.pipe';
import { TimelineComponent } from './components/room-details/timeline/timeline.component';
import { SessionComponent } from './components/room-details/session/session.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomHeaderComponent,
    RoomListComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    TalkComponent,
    SpeakerComponent,
    TrimTimePipe,
    TimelineComponent,
    SessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
