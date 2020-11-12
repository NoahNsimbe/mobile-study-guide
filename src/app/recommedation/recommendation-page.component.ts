import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { Uace, UaceGrades } from '../models/uace';
import { Uce, UceGrades } from '../models/uce';
import {Career} from '../models/Career';
import {Recommendation} from '../models/Recommendation';
import {SetCareers, SetSubjects} from '../state/app.actions';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {ServerService} from '../services/server.service';

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

  constructor(private appStore: Store, public modalCtrl: ModalController,
              public loadingCtrl: LoadingController, private serverService: ServerService) {

    this.recommendations = [
      {  name: 'Combination, with results', value: 'UCE'},
      {  name: 'Course, with results', value: 'UACE'},
      {  name: 'Combination, without results', value: 'COMBINATION'},
      {  name: 'Course, without results', value: 'COURSE'}
    ];
    this.recommendation =  {  name: '', value: ''};
    // this.careerSearchbar.addEventListener('ionInput', this.handleCareerInput);
  }

  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;
  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;
  @Select(AppState.getCareers) careers$: Observable<Career[]>;


  @Select(state => state.subjects.uceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(state => state.subjects.uaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  @Select() subjects$;

  // compareWith = this.compareWithFn;

  recommendations: Recommendation[];
  recommendation: Recommendation;
  // careerSearchbar = document.querySelector('ion-searchbar');

  // compareWithFn = (o1, o2) => {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }

  ngOnInit() {

  }

  handleCareerInput(event) {
        // const query = event.target.value.toLowerCase();
        // requestAnimationFrame(() => {
        //     this.careers$.subscribe((data: Career[]) => {
        //         data.forEach(item => {
        //             const shouldShow = item.name.toLowerCase().indexOf(query) > -1;
        //         });
        //     });
            // items.forEach(item => {
            //     const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
            //     item.style.display = shouldShow ? 'block' : 'none';
            // });
        // });
    }

  async initialize() {
      await this.appStore.dispatch(new SetCareers());
      await this.appStore.dispatch(new SetSubjects());
  }

  async loadRecommendation() {
        const loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            animated: true,
            spinner: 'lines'
        });
        await loading.present();

        await this.initialize();

        await loading.dismiss();

    }

  async getRecommendation() {
        const loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            animated: true,
            spinner: 'lines'
        });
        await loading.present();

        switch (this.recommendation.value) {
            case 'UCE':
                this.recommendation = {  name: 'Combination, provided results', value: 'UCE'};
                break;
            case 'UACE':
                this.recommendation = {  name: 'Course, provided results', value: 'UACE'};
                break;
            case 'COMBINATION':
                this.recommendation = {  name: 'Combination, without results', value: 'COMBINATION'};
                break;
            case 'COURSE':
                this.recommendation = {  name: 'Course, without results', value: 'COURSE'};
                break;
            default:
                this.recommendation =  this.recommendations[0];
                console.log('error');
        }

        await loading.dismiss();


    // this.careers$.subscribe((value => {
    //   console.log(value);
    // }));

  }

    // olevelSubjects: Subjects[] = [
    //     {code: 'UCE_MATH', name: 'Mathematics'},
    //     {code: 'UCE_ENG', name: 'English'},
    //     {code: 'UCE_CHEM', name: 'Chemistry'},
    //     {code: 'UCE_GEOG', name: 'Geography'},
    //     {code: 'UCE_BIO', name: 'Biology'},
    //     {code: 'UCE_HIST', name: 'History'},
    //     {code: 'UCE_COMP', name: 'Computer'},
    //     {code: 'UCE_SPA', name: 'Spanish'},
    //     {code: 'UCE_FRE', name: 'French'},
    //     {code: 'UCE_LIT', name: 'Literature'}
    // ];
    //
    // alevelSubjects: Subjects[] = [
    //     {code: 'UACE_MATH', name: 'Mathematics'},
    //     {code: 'UACE_ENG', name: 'English'},
    //     {code: 'UACE_CHEM', name: 'Chemistry'},
    //     {code: 'UACE_GEOG', name: 'Geography'},
    //     {code: 'UACE_BIO', name: 'Biology'},
    //     {code: 'UACE_HIST', name: 'History'},
    //     {code: 'UACE_COMP', name: 'Computer'},
    //     {code: 'UACE_SPA', name: 'Spanish'},
    //     {code: 'UACE_FRE', name: 'French'},
    //     {code: 'UACE_LIT', name: 'Literature'}
    // ];
}
