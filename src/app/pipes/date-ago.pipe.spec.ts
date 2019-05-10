import {DateAgoPipe} from './date-ago.pipe';
import * as moment from 'moment';

describe('DateAgoPipe', () => {
  let pipe: DateAgoPipe;

  beforeEach(() => {
    pipe = new DateAgoPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should return 'Just now'`, function () {
    const date = new Date();
    expect(pipe.transform(date)).toEqual('Just now');
  });

  it(`should return '1 hour ago'`, function () {
    const d = moment().subtract(1, 'h').toDate();
    expect(pipe.transform(d)).toEqual('1 hour ago');
  });

  it(`should return '15 minutes ago'`, function () {
    const d = moment().subtract(15, 'm').toDate();
    expect(pipe.transform(d)).toEqual('15 minutes ago');
  });
});
