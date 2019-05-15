import {RoomPage} from './room-details.po';
import {browser} from 'protractor';

describe('Room details page', () => {
  let page: RoomPage;

  const room = {
    id: 'Room8',
    name: 'Room 8'
  };

  beforeEach(() => {
    page = new RoomPage();
    page.navigateTo(room.id);
  });

  it('Should locate the header', () => {
    expect(page.getHeader()).toBeDefined();
  });

  it('Should have a title with the room name', () => {
    browser.waitForAngularEnabled(false);
    expect(page.getTitle().getText()).toEqual(room.name);
    browser.waitForAngularEnabled(true);
  });
});
