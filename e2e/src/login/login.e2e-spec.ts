import {LoginPage} from './login.po';
import {browser, by} from 'protractor';
import {RoomListPage} from '../room-list/room-list.po';

describe('Login page', () => {
  let page: LoginPage;

  const correctCredentials = {
    username: 'xploreAdmin',
    password: 'admin123!'
  };

  const wrongCredentials = {
    username: 'wrongname',
    password: 'wrongpassword'
  };

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('Should give an error message when credentials are wrong', () => {
    page.fillCredentials(wrongCredentials);
    expect(page.getErrorMessage()).toBeDefined();
  });

  it('Should redirect to room-list page and show username in navbar when credentials are correct', () => {
    const roomListPage = new RoomListPage();
    page.fillCredentials(correctCredentials);

    expect(browser.driver.getCurrentUrl()).toContain('/');
    expect(roomListPage.getRoomCards()).toBeDefined();

    const firstSpan = roomListPage.getNavBar().all(by.css('span')).get(0);
    expect(firstSpan.getText()).toEqual(correctCredentials.username);
  });
});
