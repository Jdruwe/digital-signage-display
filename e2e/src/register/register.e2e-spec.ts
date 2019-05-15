import {RegisterPage} from './register.po';
import {RoomListPage} from '../room-list/room-list.po';
import {browser, by} from 'protractor';
import {LoginPage} from '../login/login.po';

describe('Register page', () => {
  let page: RegisterPage;

  const loginCredentials = {
    username: 'xploreAdmin',
    password: 'admin123!'
  };

  const correctCredentials = {
    username: 'testRegister',
    email: 'test@test.com',
    password: 'testRegister'
  };

  const wrongCredentials = {
    username: 'wrongname',
    email: 'wrongEmail',
    password: 'wrongpassword'
  };

  beforeEach(() => {
    const loginPage = new LoginPage();
    loginPage.navigateTo();
    loginPage.fillCredentials(loginCredentials);

    browser.waitForAngular();
    page = new RegisterPage();
    page.navigateTo();
  });

  it('Should give an error message when credentials are wrong', () => {
    page.fillCredentials(wrongCredentials);
    expect(page.getErrorMessage()).toBeDefined();
  });

  it('Should redirect to room-list page when credentials are correct', () => {
    const roomListPage = new RoomListPage();
    page.fillCredentials(correctCredentials);

    expect(browser.driver.getCurrentUrl()).toContain('/');
    expect(roomListPage.getRoomCards()).toBeDefined();
  });

  it('Should redirect to room-list page when not authenticated', () => {
    const roomListPage = new RoomListPage();
    roomListPage.navigateTo();
    roomListPage.getNavBar().all(by.css('nav ul li a')).get(4).click();

    page.navigateTo();
    expect(browser.driver.getCurrentUrl()).toContain('/');
    expect(roomListPage.getRoomCards()).toBeDefined();
  });
});
