import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../state/app.state';
import {Observable} from 'rxjs';
import {Uace, UaceGrades} from '../models/uace';
import {Uce, UceGrades} from '../models/uce';
import {Career} from '../models/Career';
import {Combination, Elective, Recommendation, UserResults, UserSubmissions} from '../models/Recommendation';
import {SetCareers, SetPrograms, SetSubjects} from '../state/app.actions';
import {LoadingController, ModalController} from '@ionic/angular';
import {ServerService} from '../services/server.service';
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';
import {ElectivesModalPage} from '../modals/electives-modal/electives-modal.page';

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
    this.recommendation =  '';
    this.submissions = {
        career: '', uaceResults:  [], uceResults: []

    };
    this.uceElectives = [];

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
  recommendation: string;
  submissions: UserSubmissions;
  uceElectives: Elective[];
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
      await this.appStore.dispatch(new SetPrograms());
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


        const data = {
            results: [],
            flag: ''
        };

        switch (this.recommendation) {
            case 'UCE':
                await this.serverService.getCombinations(this.submissions, false)
                    .subscribe((results: Combination[]) => {
                        data.results = results;
                        data.flag = 'UCE';
                    }, error => {
                        console.log(error);
                    }

                );
                break;
            case 'UACE':
                break;
            case 'COMBINATION':
                await this.serverService.getCombinations(this.submissions, true)
                    .subscribe((results: Combination[]) => {
                        data.results = results;
                        data.flag = 'UCE';
                        }, error => {
                            console.log(error);
                        }

                    );
                break;
            case 'COURSE':
                break;
            default:
                this.recommendation =  this.recommendations[0].value;
                console.log('error');
        }



        await loading.dismiss();

        console.log(data);
        await this.presentModal(data);



  }

  async presentModal(data: any) {
        const modal = await this.modalCtrl.create({
            component: ResultsModalPage,
            componentProps: {
                results: data.results,
                flag: data.flag
            }
        });
        return await modal.present();
    }

  uceChanged(element: string, e: CustomEvent) {
      this.submissions.uceResults[element] = e.detail.value;
    }

  async addElective(category: string) {

      const modal = await this.modalCtrl.create({
              component: ElectivesModalPage,
              componentProps: {category}
          });

      await modal.present();

      modal.onDidDismiss().then((response: any) => {
          const data: UserResults = response.data;
          if (category.toUpperCase() === 'UCE') {
              this.submissions.uceResults[data.code] = data.value;
          }

          if (category.toUpperCase() === 'UACE') {
              this.submissions.uaceResults[data.code] = data.value;
          }
          console.log(this.submissions);
      });
  }

  uaceChanged(element: string, e: CustomEvent) {
        this.submissions.uaceResults[element] = e.detail.value;
    }

}
