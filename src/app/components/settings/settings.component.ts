import {Component, OnInit} from '@angular/core';
import {Settings} from '../../models/Settings';
import {SettingsService} from '../../services/settings.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSettings()
      .subscribe(data => {
        this.settings = data;
        this.settings.minutesBeforeNextSession = data.minutesBeforeNextSession;
        this.settings.isRoomOccupancyOn = true;
      });
  }

  updateSettings(form: NgForm) {
    console.log(this.settings);
    console.log(form.value.showOccupancyCounter);
    this.settingsService.changeSettings(form.value.showOccupancyCounter, form.value.roomOccupancyCounter).subscribe();
  }
}
