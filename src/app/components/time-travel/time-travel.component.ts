import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TimeService} from '../../services/time.service';

import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-time-travel',
  templateUrl: './time-travel.component.html',
  styleUrls: ['./time-travel.component.scss']
})
export class TimeTravelComponent implements OnInit, OnChanges {

  @Input() time: Date;

  timeForm: FormGroup;

  constructor(private timeService: TimeService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.timeForm = this.formBuilder.group({
      day: [this.time.getDate(), [Validators.min(1), Validators.max(31), Validators.required]],
      month: [this.getMonthName(this.time), [Validators.required]],
      year: [this.time.getFullYear(), [Validators.min(1), Validators.required]],
      hour: [this.time.getHours(), [Validators.min(0), Validators.max(24), Validators.required]],
      minute: [this.getMinutes(this.time), [Validators.min(0), Validators.max(60), Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.time && this.timeForm) {
      this.updateForm();
    }
  }

  handleDayChange(amount: number) {
    this.updateTime(moment(this.time).add(amount, 'd').toDate());
  }

  handleHourChange(amount: number) {
    this.updateTime(moment(this.time).add(amount, 'h').toDate());
  }

  handleMinuteChange(amount: number) {
    this.updateTime(moment(this.time).add(amount, 'm').toDate());
  }

  handleFormChange(form: FormGroup) {
    const dateString = `${form.controls.day.value}
    ${form.controls.month.value}
    ${form.controls.year.value}
    ${form.controls.hour.value}:${form.controls.minute.value}`;

    const newDate = moment(dateString, 'D MMM YYYY H:mm').toDate();
    this.updateTime(newDate);

  }

  handleReset() {
    this.timeService.resetTime();
    this.updateForm();
  }

  private updateTime(time: Date) {
    if (moment(time).isValid()) {
      this.time = time;
      this.timeService.changeTime(time);
    }
    this.updateForm();
  }

  private updateForm() {
    this.timeForm.controls.day.setValue(this.time.getDate());
    this.timeForm.controls.month.setValue(this.getMonthName(this.time));
    this.timeForm.controls.year.setValue(this.time.getFullYear());
    this.timeForm.controls.hour.setValue(this.time.getHours());
    this.timeForm.controls.minute.setValue(this.getMinutes(this.time));
  }

  private getMonthName(date: Date): string {
    return moment(date).format('MMM');
  }

  private getMinutes(date: Date): string {
    return moment(date).format('mm');
  }
}
