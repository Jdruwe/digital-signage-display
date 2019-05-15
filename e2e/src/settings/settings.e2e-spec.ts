import {SettingsPage} from './settings.po';
import {RoomListPage} from '../room-list/room-list.po';
import {browser} from 'protractor';
import {LoginPage} from '../login/login.po';

describe('Settings page', () => {
  let page: SettingsPage;

  const credentials = {
    username: 'xploreAdmin',
    password: 'admin123!'
  };

  beforeEach(() => {
    page = new SettingsPage();
    page.navigateTo();
  });

  it('Should redirect to room list page when not authenticated', () => {
    const roomListPage = new RoomListPage();

    expect(browser.driver.getCurrentUrl()).toContain('/');
    expect(roomListPage.getRoomCards()).toBeDefined();
  });

  it('Should redirect to settings page when user is authenticated', () => {
    const loginPage = new LoginPage();
    loginPage.navigateTo();
    loginPage.fillCredentials(credentials);

    browser.waitForAngular();
    page.navigateTo();
    expect(browser.driver.getCurrentUrl()).toContain('/admin/settings');
  });

  it('Should show message when saving settings', () => {
    page.saveSettings();
    expect(page.getMessage()).toBeDefined();
  });

  it('Should show message when saving notifications', () => {
    page.saveNotifications();
    expect(page.getMessage()).toBeDefined();
  });
});
