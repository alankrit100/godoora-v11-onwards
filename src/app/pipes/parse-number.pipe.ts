import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseNumber'
})
export class ParseNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.includes('_')) {
      return value.substring(0, value.indexOf('_'));
    }
    return value;
  }

}
