import {Component, OnInit} from '@angular/core';
import {Settings} from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();

  constructor() {
  }

  ngOnInit() {
  }

  updateSettings() {
    console.log('changed');
  }

}
