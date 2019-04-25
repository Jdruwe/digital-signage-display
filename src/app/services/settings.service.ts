import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Settings} from '../models/Settings';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

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
    const settings: Settings = {
      minutesBeforeNextSession: minutesBeforeNextSession,
      roomOccupancyOn: isRoomOccupancyOn,
    };
    return this.http.put<Settings>(environment.apiUrl + environment.settingsEndPoint, settings);
  }

  changeTimeBefore(time: number) {
    this.timeBeforeSwitch.next(time);
  }
}
