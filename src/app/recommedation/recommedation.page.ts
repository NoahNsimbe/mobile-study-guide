import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { SubjectsState } from './subjects.state'
import { Observable } from 'rxjs';
import { Uace, UaceGrades } from './models/uace';
import { Uce, UceGrades } from './models/uce';

export interface Level{
  id : number;
  name: string;
}

export interface Subjects{
  code : string;
  name: string;
}

@Component({
  selector: 'app-recommedation',
  templateUrl: './recommedation.page.html',
  styleUrls: ['./recommedation.page.scss'],
})
export class RecommedationPage implements OnInit {

  @Select(SubjectsState.getUaceSubjects) uaceSubjects$ : Observable<Uace[]>;
  @Select(SubjectsState.getUceSubjects) uceSubjects$ : Observable<Uce[]>;
  @Select(SubjectsState.getUceCompSubjects) compUceSubjects$ : Observable<Uce[]>;
  @Select(state => state.subjects.uceGrades) uceGrades$ : Observable<UceGrades[]>;
  @Select(state => state.subjects.uaceGrades) uaceGrades$ : Observable<UaceGrades[]>;
  @Select() subjects$;

  levels: Level[] = [
    {
      id: 1,
      name: "Still pursuing O'level",
    },
    {
      id: 2,
      name: "Finished O'level",
    },
    {
      id: 3,
      name: "Finished A'level",
    }
  ];
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

  olevelSubjects: Subjects[] = [
    {code: "UCE_MATH", name: "Mathematics"},
    {code: "UCE_ENG", name: "English"},
    {code: "UCE_CHEM", name: "Chemistry"},
    {code: "UCE_GEOG", name: "Geography"},
    {code: "UCE_BIO", name: "Biology"},
    {code: "UCE_HIST", name: "History"},
    {code: "UCE_COMP", name: "Computer"},
    {code: "UCE_SPA", name: "Spanish"},
    {code: "UCE_FRE", name: "French"},
    {code: "UCE_LIT", name: "Literature"}
  ]

  alevelSubjects: Subjects[] = [
    {code: "UACE_MATH", name: "Mathematics"},
    {code: "UACE_ENG", name: "English"},
    {code: "UACE_CHEM", name: "Chemistry"},
    {code: "UACE_GEOG", name: "Geography"},
    {code: "UACE_BIO", name: "Biology"},
    {code: "UACE_HIST", name: "History"},
    {code: "UACE_COMP", name: "Computer"},
    {code: "UACE_SPA", name: "Spanish"},
    {code: "UACE_FRE", name: "French"},
    {code: "UACE_LIT", name: "Literature"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
