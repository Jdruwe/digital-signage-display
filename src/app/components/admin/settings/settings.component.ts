import {Component, OnDestroy, OnInit} from '@angular/core';
import {Settings} from '../../../models/settings/settings';
import {SettingsService} from '../../../services/settings.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NotificationSettings} from '../../../models/settings/notification-settings';
import {MainSettings} from '../../../models/settings/main-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: Settings = new Settings();
  timeBeforeSwitch: number;
  message = '';

  private messageTimer;
  private timeSub: Subscription;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSettings()
      .subscribe(data => {
        this.settings = data;
        console.log(this.settings);
        this.newTime(this.settings.minutesBeforeNextSession);
      });
    this.timeSub = this.settingsService.currentTimeBefore
      .subscribe(time => this.timeBeforeSwitch = time);
  }

  newTime(time: number) {
    this.settingsService.changeTimeBefore(time);
  }

  ngOnDestroy(): void {
    this.message = '';
    if (this.timeSub) {
      this.timeSub.unsubscribe();
    }
    clearTimeout(this.messageTimer);
  }

  updateSettings(form: NgForm) {
    if (form.valid) {
      this.settingsService.changeSettings(
        form.value.minutesBeforeNextSession,
        form.value.mailDelayForConnectionIssues,
        form.value.showOccupancyCounter)
        .subscribe((response: MainSettings) => {
          this.newTime(form.value.minutesBeforeNextSession);
          this.showMessage('Settings saved!');
          this.settings.minutesBeforeNextSession = response.minutesBeforeNextSession;
          this.settings.roomOccupancyOn = response.roomOccupancyOn;
          this.settings.mailDelayForConnectionIssues = response.mailDelayForConnectionIssues;
        }, error => {
          this.showMessage('Failed, please try again.');
        });
    }
  }

  updateNotifications(form: NgForm) {
    if (form.valid) {
      const message = form.value.message;
      const showMessage = form.value.showMessage;
      this.settingsService.changeNotificationSettings(message, showMessage)
        .subscribe((response: NotificationSettings) => {
          this.showMessage('Settings saved!');
          this.settings.message = response.message;
          this.settings.showMessage = response.showMessage;
        }, error => {
          this.showMessage('Failed, please try again.');
        });
    }
  }

  showMessage(content: string) {
    clearTimeout(this.messageTimer);
    this.message = content;
    this.messageTimer = setTimeout(() => {
      this.message = '';
    }, 3000);
  }

}
