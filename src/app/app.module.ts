import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomHeaderComponent} from './components/room-details/room-header/room-header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RoomListComponent} from './components/room-list/room-list.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/auth/login/login.component';
import {TokenInterceptor} from './interceptors/token-interceptor';
import {TalkComponent} from './components/room-details/talk/talk.component';
import {SpeakerComponent} from './components/room-details/speaker/speaker.component';
import {TrimTimePipe} from './pipes/trim-time.pipe';
import {TimelineComponent} from './components/room-details/timeline/timeline.component';
import {SessionComponent} from './components/room-details/session/session.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ClientsComponent} from './components/clients/clients.component';
import {TimeTravelComponent} from './components/time-travel/time-travel.component';
import {EllipsisModule} from 'ngx-ellipsis';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NguCarouselModule} from '@ngu/carousel';

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
    SessionComponent,
    SettingsComponent,
    ClientsComponent,
    SettingsComponent,
    TimeTravelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EllipsisModule,
    NguCarouselModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
