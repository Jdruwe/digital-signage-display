import {browser, by, element} from 'protractor';

export class RoomListPage {
  navigateTo() {
    return browser.get('');
  }

  getNavBar() {
    return element(by.css('app-navbar'));
  }

  getLoginButton() {
    return this.getNavBar().all(by.css('nav ul li a')).get(1);
  }

  getRoomCards() {
    return element.all(by.css('.container .card'));
  }
}
