import {RoomListPage} from './room-list.po';
import {browser} from 'protractor';

describe('Room list page', () => {
  let page: RoomListPage;

  beforeEach(() => {
    page = new RoomListPage();
    page.navigateTo();
  });

  afterEach(function () {
    browser.executeScript('window.localStorage.clear();');
  });

  it('Should locate the navbar', () => {
    expect(page.getNavBar()).toBeDefined();
  });

  it('Should redirect to the login page when login is clicked', () => {
    const login = page.getLoginButton();
    login.click();
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toContain('/auth/login');
  });

  it('Should locate room cards', () => {
    expect(page.getRoomCards()).toBeDefined();
  });

  it('Should redirect to the room page when a room card is clicked', () => {
    const room = page.getRoomCards().get(0);
    room.click();
    expect(browser.driver.getCurrentUrl()).toContain('/room');
  });
});
