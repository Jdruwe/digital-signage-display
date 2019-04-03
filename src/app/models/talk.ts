import {Speaker} from './speaker';

export class Talk {
  startTime: Date;
  endTime: Date;
  fromTime: string;
  toTime: string;
  title: string;
  type: string;
  summary: string;
  speakers: Speaker[];
}
