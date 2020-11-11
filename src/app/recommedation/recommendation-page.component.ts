import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { Uace, UaceGrades } from '../models/uace';
import { Uce, UceGrades } from '../models/uce';
import {Career} from '../models/Career';
import {Recommendation} from '../models/Recommendation';
import {SetCareers} from '../state/app.actions';

export interface Subjects {
  code: string;
  name: string;
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.scss'],
})
export class RecommendationPage implements OnInit {

  constructor(private appStore: Store) {
    this.recommendations = [
      {  name: 'Combination, provided results', value: 'UCE'},
      {  name: 'Course, provided results', value: 'UACE'},
      {  name: 'Combination, without results', value: 'COMBINATION'},
      {  name: 'Course, without results', value: 'COURSE'}
    ];
  }

  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;
  @Select(AppState.getUceSubjects) uceSubjects$: Observable<Uce[]>;
  @Select(AppState.getCareers) careers$: Observable<Career[]>;

  @Select(AppState.getUceCompSubjects) compUceSubjects$: Observable<Uce[]>;

  @Select(state => state.subjects.uceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(state => state.subjects.uaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  @Select() subjects$;

  compareWith = this.compareWithFn;

  olevelSubjects: Subjects[] = [
    {code: 'UCE_MATH', name: 'Mathematics'},
    {code: 'UCE_ENG', name: 'English'},
    {code: 'UCE_CHEM', name: 'Chemistry'},
    {code: 'UCE_GEOG', name: 'Geography'},
    {code: 'UCE_BIO', name: 'Biology'},
    {code: 'UCE_HIST', name: 'History'},
    {code: 'UCE_COMP', name: 'Computer'},
    {code: 'UCE_SPA', name: 'Spanish'},
    {code: 'UCE_FRE', name: 'French'},
    {code: 'UCE_LIT', name: 'Literature'}
  ];

  alevelSubjects: Subjects[] = [
    {code: 'UACE_MATH', name: 'Mathematics'},
    {code: 'UACE_ENG', name: 'English'},
    {code: 'UACE_CHEM', name: 'Chemistry'},
    {code: 'UACE_GEOG', name: 'Geography'},
    {code: 'UACE_BIO', name: 'Biology'},
    {code: 'UACE_HIST', name: 'History'},
    {code: 'UACE_COMP', name: 'Computer'},
    {code: 'UACE_SPA', name: 'Spanish'},
    {code: 'UACE_FRE', name: 'French'},
    {code: 'UACE_LIT', name: 'Literature'}
  ];

  recommendations: Recommendation[];
  recommendation: Recommendation;

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  ngOnInit() {

  }

  initialize() {
    // this.educLevel.careers = true;
    // this.educLevel.uce = false;
    // this.educLevel.uace = false;
    // this.educLevel.course = false;
    // this.educLevel.combination = false;
    // this.operationSuccess = false;
  }

  getRecommendation() {
    this.initialize();
    this.appStore.dispatch(new SetCareers());

    this.careers$.subscribe((value => {
      console.log(value);
    }));

  }
}
