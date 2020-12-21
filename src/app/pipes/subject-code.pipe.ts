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

    if(code.trim().toUpperCase() === "UACE_ALL")
      return "Any Uace Subject";

    if(code.trim().toUpperCase() === "UACE_ALL_ARTS")
      return "Any Uace Art Subject";

    if(code.trim().toUpperCase() === "UACE_ALL_SCIENCES")
      return "Any Uace Science Subject";

    if(code.trim().toUpperCase() === "UACE_ALL_LANG")
      return "Any Uace Language Subject";

    let subject : Uace = subjects.find(value => {
      return value.code.trim().toUpperCase() === code.trim().toUpperCase()
    });

    if(subject != null && subject.name !== "")
      return subject.name;

    return code;
  }

}
