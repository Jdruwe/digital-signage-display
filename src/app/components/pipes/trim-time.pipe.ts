import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trimTime'
})
export class TrimTimePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0) === '0' ? value.substr(1) : value;
  }
}
