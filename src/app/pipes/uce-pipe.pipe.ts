import { Pipe, PipeTransform } from '@angular/core';
import {Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Uce} from "../models/uce";

@Pipe({
  name: 'uce'
})
export class UcePipe implements PipeTransform {

  constructor(private store: Store) {
  }

  transform(code: string, ...args: any[]): string {

    const subjects : Uce[] = this.store.selectSnapshot(AppState.getUceSubjects);

    let subject : Uce = subjects.find(value => {
      return value.code.trim().toUpperCase() === code.trim().toUpperCase()
    });

    if(subject != null && subject.name !== "")
      return subject.name;

    return code;
  }

}
