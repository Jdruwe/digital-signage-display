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
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/auth/login/login.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AuthGuardService} from './services/auth-guard.service';
import {TokenInterceptor} from './Interceptor/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    RoomHeaderComponent,
    RoomListComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
