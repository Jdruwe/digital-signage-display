import {browser, by, element} from 'protractor';

export class RoomPage {
  navigateTo(id: string) {
    return browser.get(`/room/${id}`);
  }

  getHeader() {
    return element(by.css('app-room-header'));
  }

  getTitle() {
    return element(by.css('app-room-header')).all(by.tagName('h1')).get(0);
  }
}
