import {browser, by, element} from 'protractor';

export class SettingsPage {
  navigateTo() {
    return browser.get('/admin/settings');
  }

  saveSettings() {
    const firstForm = element.all(by.tagName('form')).get(0);
    firstForm.all(by.tagName('button')).get(0).click();
  }

  saveNotifications() {
    const secondForm = element.all(by.tagName('form')).get(1);
    secondForm.all(by.tagName('button')).get(0).click();
  }

  getMessage() {
    return element(by.css('.message'));
  }
}
