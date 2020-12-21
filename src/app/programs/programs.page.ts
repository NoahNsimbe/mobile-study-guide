import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
// import {AppState, AppStateModel} from '../state/app.state';
import {Observable} from 'rxjs';
import {Career} from '../models/Career';
import {Program, ProgramDetails} from '../models/Program';
import {SetCareers, SetPrograms, SetSubjects, SetUaceSubjects, SetUceSubjects} from '../state/app.actions';
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
// import {ProgramComponent} from '../modals/program/program.component';
import {AppState} from '../state/app.state';
import {Combination, UserResults} from "../models/Recommendation";
import {FormControl} from "@angular/forms";
import {ServerService} from "../services/server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  searchbar;
  programs: Program[];
  display: Program[];
  displayPrograms: boolean = true;
  displayCombinations: boolean = false;
  combinations: Combination[] = [];
  program: Program;
  @Select(AppState.getPrograms) programs$: Observable<Program[]>;

  constructor(private appStore: Store,
              private router: Router,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private serverService: ServerService,) {
    // this.searchbar = document.querySelector('ion-searchbar');
    // this.searchbar.addEventListener('ionInput', this.handleInput);
  }

  async ngOnInit() {

    // this.programs = Array.from(document.querySelector('ion-list').children);
    await this.initialize(false);
  }

  async initialize(force: boolean) {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

    await this.appStore.dispatch(new SetPrograms(force));
    // this.programs = this.appStore.selectSnapshot<Program[]>((state: AppState) => state.app.programs);
    // this.display = this.appStore.selectSnapshot<Program[]>((state: AppState) => state.app.programs);
    //
    await this.programs$.subscribe((data: Program[]) => {
      this.programs = data;
      this.display = data;
    });

    await loading.dismiss();


  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.display = Array<Program>();

    requestAnimationFrame(() => {
      this.programs.forEach(program => {
        const shouldShow = program.name.toLowerCase().indexOf(query) > -1;
        if (shouldShow) {
          this.display.push(program);
          // program.style.display = shouldShow ? 'block' : 'none';
        }
      });
    });
  }

  presentModal(data: Program) {

    this.router.navigate(["/programs", data.code])

    // let programDetails: ProgramDetails = null;
    //
    // const loading = await this.loadingCtrl.create({
    //   message: 'Getting program details...',
    //   animated: true,
    //   spinner: 'lines'
    // });
    //
    // await loading.present();
    //
    // await this.serverService.getProgramDetails(data.code.trim().toUpperCase())
    //     .then(async (results: ProgramDetails) => {
    //           programDetails = results;
    //           await loading.dismiss();
    //
    //         },
    //         async error => {
    //           console.log(error);
    //           programDetails = null;
    //           await loading.dismiss();
    //
    //           const alert = await this.alertCtrl.create({
    //             header: 'Oops',
    //             message: error,
    //             buttons: ['OK'],
    //           });
    //           await alert.present();
    //         }
    //     );
    //
    //
    // if(programDetails !== null){
    //
    //
    //
    //   const modal = await this.modalCtrl.create({
    //     component: ProgramComponent,
    //     componentProps: {
    //       program: data,
    //     }
    //   });
    //   await modal.present();
    //
    //   modal.onDidDismiss().then(async (response: any) => {
    //     const program: Program = response.data;
    //
    //     if (program !== null && program !== undefined) {
    //
    //       this.combinations = [];
    //       this.program = null;
    //
    //       const loading = await this.loadingCtrl.create({
    //         message: 'Getting combinations...',
    //         animated: true,
    //         spinner: 'lines'
    //       });
    //
    //       await loading.present();
    //
    //       await this.serverService.recommendCombinations(program.code.trim().toUpperCase())
    //           .then(async (results: any) => {
    //
    //                 console.log(results);
    //
    //                 this.combinations = results
    //                 this.program = program;
    //                 this.displayPrograms = false;
    //                 this.displayCombinations = true;
    //
    //               },
    //               async error => {
    //
    //                 this.displayPrograms = true;
    //                 this.displayCombinations = false;
    //
    //                 const alert = await this.alertCtrl.create({
    //                   header: 'Oops',
    //                   message: error["Message"],
    //                   buttons: ['OK'],
    //                 });
    //
    //                 await alert.present();
    //               }
    //
    //           );
    //
    //       await loading.dismiss();
    //     }
    //
    //   });
    //
    //
    // }

  }

  // async refresh() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Please wait...',
  //     animated: true,
  //     spinner: 'lines'
  //   });
  //
  //   await loading.present();
  //
  //   await this.appStore.dispatch(new SetPrograms(true));
  //
  //   await this.programs$.subscribe((data: Program[]) => {
  //     this.programs = data;
  //     this.display = data;
  //   });
  //
  //   await loading.dismiss();
  //
  // }

  async closeRecommendations() {
    this.displayCombinations = false;
    this.displayPrograms = true;

    await this.initialize(false);
  }
}
