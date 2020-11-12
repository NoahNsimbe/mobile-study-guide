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
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';

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

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  // @Select(state => state.subjects.uceGrades) uceGrades$: Observable<UceGrades[]>;
  // @Select(state => state.subjects.uaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  @Select() subjects$;

  recommendations: Recommendation[];
  recommendation: Recommendation;
  // careerSearchbar = document.querySelector('ion-searchbar');

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

        // switch (this.recommendation.value) {
        //     case 'UCE':
        //         this.recommendation = {  name: 'Combination, provided results', value: 'UCE'};
        //         break;
        //     case 'UACE':
        //         this.recommendation = {  name: 'Course, provided results', value: 'UACE'};
        //         break;
        //     case 'COMBINATION':
        //         this.recommendation = {  name: 'Combination, without results', value: 'COMBINATION'};
        //         break;
        //     case 'COURSE':
        //         this.recommendation = {  name: 'Course, without results', value: 'COURSE'};
        //         break;
        //     default:
        //         this.recommendation =  this.recommendations[0];
        //         console.log('error');
        // }
        //


        await loading.dismiss();

        const data = {
            firstName: 'Douglas',
            lastName: 'Adams',
            middleInitial: 'N'
        };

        await this.presentModal(data);

  }

    async presentModal(data: any) {
        const modal = await this.modalCtrl.create({
            component: ResultsModalPage,
            componentProps: data
        });
        return await modal.present();
    }

}
