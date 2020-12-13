import {Component, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../state/app.state';
import {Observable} from 'rxjs';
import {Career} from '../models/Career';
import {Combination, Recommendation, ResultsModalData, UserResults, UserSubmissions} from '../models/Recommendation';
import {SetCareers} from '../state/app.actions';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ServerService} from '../services/server.service';
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';
import {UceComponent} from "../components/uce/uce.component";
import {UaceComponent} from "../components/uace/uace.component";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.scss'],
})
export class RecommendationPage implements OnInit {
    // preferences = [
    //     { val: 'My Uce Results', isChecked: false },
    //     { val: 'My Uace Results', isChecked: false },
    // ];

    @ViewChild(UceComponent, {static: false}) uceComponent !: UceComponent;
    @ViewChild(UaceComponent, {static: false}) uaceComponent !: UaceComponent;

    includeResults : boolean = false;
    includeUceResults : boolean = false;
    includeUaceResults : boolean = false;
    careers: Career[];
    display: Career[];
    career: string;
    admissionType: string;
    gender: string;
    recommendation: string;


  @Select(AppState.getCareers) careers$: Observable<Career[]>;

    constructor(private appStore: Store, public modalCtrl: ModalController,
                public loadingCtrl: LoadingController, private toastCtrl: ToastController,
                private serverService: ServerService, public alertCtrl: AlertController) {

        this.admissionType = "PUBLIC";
        this.gender = "FEMALE";
        this.career = "";
        this.recommendations = [
            {  name: 'Combinations for a particular career', value: 'COMBINATION'},
            {  name: 'Courses for a particular career', value: 'COURSE'}
        ];
        this.recommendation =  'COMBINATION';

        // this.uceElectives = [];

        // this.careerSearchbar.addEventListener('ionInput', this.handleCareerInput);
    }

  recommendations: Recommendation[];

  // submissions: UserSubmissions;
  // uceElectives: Elective[];
  // careerSearchbar = document.querySelector('ion-searchbar');

  async ngOnInit() {
      await this.initialize();
  }

  async initialize() {

        const loading = await this.loadingCtrl.create({
            message: 'loading...',
            animated: true,
            spinner: 'lines'
        });

        await loading.present();

        await this.appStore.dispatch(new SetCareers());
        this.careers$.subscribe((data: Career[]) => {
            this.careers = data;
        });

        await loading.dismiss();
    }

  selectCareer(career: Career) {
    this.career = career.name;
    this.display = Array<Career>();
  }

  recommendationChanged(action:string){
      if(action.trim().toUpperCase() === "RECOMMENDATION"){
          this.includeResults = false;
          this.includeUaceResults = false;
          this.includeUceResults = false;
      }
      else if(action.trim().toUpperCase() === "INCLUDE"){
          if(this.includeResults){
              if(this.recommendation.trim().toUpperCase() === "COMBINATION"){
                  this.includeUceResults = true;
                  this.includeUaceResults = false;
              }
              else {
                  this.includeUaceResults = true;
                  this.includeUceResults = true;
              }
          }
          else{
              this.includeUceResults = false;
              this.includeUaceResults = false;
          }

      }
      else{
          return;
      }
  }

  handleInput(event) {
        const query = event.target.value.toLowerCase();

        this.display = Array<Career>();

        if(query.trim() === ""){
            return;
        }

        requestAnimationFrame(() => {
            this.careers.forEach(program => {
                const shouldShow = program.name.toLowerCase().indexOf(query) > -1;
                if (shouldShow) {
                    this.display.push(program);
                }
            });
        });
    }

  async submit(){

      let valid : boolean = true;

      if(this.career === ""){
          valid = false;
      }

      if(this.includeResults && this.includeUaceResults && (this.uaceComponent.checkResultsValidity() === false )){
          valid = false;
      }


      if(this.includeResults && this.includeUceResults && (this.uceComponent.checkResultsValidity() === false )){
          valid = false;
      }

        if(valid){


            let uceResults : UserResults[] = this.includeUceResults ? this.uceComponent.formatResults() : [];

            let uaceResults : UserResults[] = this.includeUaceResults ?  this.uaceComponent.formatResults() : [];

            let submissions : UserSubmissions = {
                admissionType: this.admissionType,
                career: this.career,
                gender: this.gender,
                uaceResults: uaceResults,
                uceResults: uceResults
            };

            const loading = await this.loadingCtrl.create({
                message: 'Please wait...',
                animated: true,
                spinner: 'lines'
            });
            await loading.present();

            const data : ResultsModalData = {
                flag: '',
                uceRecommendations: [],
                uaceRecommendations: []
            };

            switch (this.recommendation.trim().toUpperCase()) {
                case 'COMBINATION':
                    await this.serverService.getCombinations(submissions, this.includeResults)
                        .subscribe(async (results: any) => {
                                data.uceRecommendations = results;
                                data.flag = 'UCE';
                                await this.presentModal(data);
                            }, async error => {
                                console.log(error);
                                const alert = await this.alertCtrl.create({
                                    header: 'Oops',
                                    message: error["Message"],
                                    buttons: ['OK'],
                                });
                                await alert.present();
                            }

                        );
                    break;
                case 'COURSE':
                    await this.serverService.getCourses(submissions, this.includeResults)
                        .subscribe(async (results: any) => {
                                data.uaceRecommendations = results;
                                data.flag = 'UACE';
                                await this.presentModal(data);
                            }, async error => {
                                console.log(error);
                                const alert = await this.alertCtrl.create({
                                    header: 'Oops',
                                    message: error["Message"],
                                    buttons: ['OK'],
                                });

                                await alert.present();
                            }

                        );
                    break;

                default:
                    this.recommendation =  this.recommendations[0].value;
                    console.log('error');
            }

            await loading.dismiss();

            // if (!errors){
            //     await this.presentModal(data);
            // }
            // else {
            //
            //     const alert = await this.alertCtrl.create({
            //         cssClass: 'my-custom-class',
            //         header: 'Oops',
            //         message: 'An error occurred, please try again later',
            //         buttons: ['OK'],
            //     });
            //
            //     await alert.present();
            // }


        }

        else {
            const toast = await this.toastCtrl.create({
                message: 'Please provide all fields.',
                duration: 2000
            });

            await toast.present();
        }

    }

  async presentModal(data: ResultsModalData) {
        const modal = await this.modalCtrl.create({
            component: ResultsModalPage,
            componentProps: {
                results: data
            }
        });
        return await modal.present();
    }

}
