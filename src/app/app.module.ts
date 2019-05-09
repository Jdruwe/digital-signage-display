import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoomComponent} from './components/room-details/room/room.component';
import {RoomHeaderComponent} from './components/room-details/room-header/room-header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RoomListComponent} from './components/room-list/room-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TalkComponent} from './components/room-details/talk/talk.component';
import {SpeakerComponent} from './components/room-details/speaker/speaker.component';
import {TrimTimePipe} from './pipes/trim-time.pipe';
import {TimelineComponent} from './components/room-details/timeline/timeline.component';
import {SessionComponent} from './components/room-details/session/session.component';
import {TimeTravelComponent} from './components/time-travel/time-travel.component';
import {EllipsisModule} from 'ngx-ellipsis';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NguCarouselModule} from '@ngu/carousel';
import {SharedModule} from './components/shared/shared.module';
import {TokenInterceptor} from './interceptors/token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomHeaderComponent,
    RoomListComponent,
    TalkComponent,
    SpeakerComponent,
    TimelineComponent,
    SessionComponent,
    TimeTravelComponent,
    TrimTimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EllipsisModule,
    NguCarouselModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
