import {Component, OnInit} from '@angular/core';
import {Settings} from '../../models/Settings';
import {SettingsService} from '../../services/settings.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();
  timeBeforeSwitch: number;

  constructor(private settingsService: SettingsService,
              private router: Router) {
  }

  ngOnInit() {
    this.settingsService.getSettings()
      .subscribe(data => {
        this.settings = data;
        this.newTime(this.settings.minutesBeforeNextSession);
      });
    this.settingsService.currentTimeBefore.subscribe(time => this.timeBeforeSwitch = time);
  }

  newTime(time: number) {
    this.settingsService.changeTimeBefore(time);
  }

  updateSettings(form: NgForm) {
    this.settingsService.changeSettings(form.value.minutesBeforeNextSession, form.value.showOccupancyCounter).subscribe();
    this.newTime(form.value.minutesBeforeNextSession);
    this.router.navigate(['']);
  }
}
