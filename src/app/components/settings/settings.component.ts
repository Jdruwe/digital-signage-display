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
      });
  }

  updateSettings(form: NgForm) {
    this.settingsService.changeSettings(form.value.roomOccupancyCounter, form.value.showOccupancyCounter).subscribe();
  }
}
