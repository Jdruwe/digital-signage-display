import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Settings} from '../models/Settings';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) {
  }

  getSettings() {
    return this.http.get<Settings>(environment.apiUrl + environment.settingsEndPoint);
  }

  changeSettings( minutesBeforeNextSession: number, isRoomOccupancyOn: boolean) {
    const settings: Settings = {
      isRoomOccupancyOn: isRoomOccupancyOn,
      minutesBeforeNextSession: minutesBeforeNextSession
    };
    return this.http.put<Settings>(environment.apiUrl + environment.settingsEndPoint, settings);
  }

}
