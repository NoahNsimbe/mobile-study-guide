import { Pipe, PipeTransform } from '@angular/core';
import {Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Uace} from "../models/uace";

@Pipe({
  name: 'subjectCode'
})
export class SubjectCodePipe implements PipeTransform  {

  constructor(private store: Store) {
  }

  transform(code: string, ...args: any[]): string {

    const subjects : Uace[] = this.store.selectSnapshot(AppState.getUaceSubjects);

    let subject : Uace = subjects.find(value => {
      return value.code.trim().toUpperCase() === code.trim().toUpperCase()
    });

    if(subject != null && subject.name !== "")
      return subject.name;

    return code;
  }

}
