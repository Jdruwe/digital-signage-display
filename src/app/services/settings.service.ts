import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Settings} from '../models/settings/settings';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {MainSettings} from '../models/settings/main-settings';
import {NotificationSettings} from '../models/settings/notification-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private timeBeforeSwitch = new BehaviorSubject<number>(5);
  currentTimeBefore = this.timeBeforeSwitch.asObservable();

  constructor(private http: HttpClient) {
  }

  getSettings() {
    return this.http.get<Settings>(environment.apiUrl + environment.settingsEndPoint);
  }

  changeSettings(minutesBeforeNextSession: number, isRoomOccupancyOn: boolean) {
    const settings: MainSettings = {
      minutesBeforeNextSession: minutesBeforeNextSession,
      roomOccupancyOn: isRoomOccupancyOn,
    };
    return this.http.put<MainSettings>(environment.apiUrl + environment.settingsEndPoint, settings);
  }

  changeNotificationSettings(message: string, showMessage: boolean) {
    const notifications: NotificationSettings = {
      message: message,
      showMessage: showMessage
    };
    return this.http.put(environment.apiUrl + environment.settingsEndPoint + environment.notificationsEndPoint, notifications);
  }

  changeTimeBefore(time: number) {
    this.timeBeforeSwitch.next(time);
  }
}
