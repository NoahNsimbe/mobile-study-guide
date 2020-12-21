import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subjectCode'
})
export class SubjectCodePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    return null;
  }

}
