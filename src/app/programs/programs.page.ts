import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
// import {AppState, AppStateModel} from '../state/app.state';
import {Observable} from 'rxjs';
import {Career} from '../models/Career';
import {Program} from '../models/Program';
import {SetCareers, SetPrograms, SetSubjects, SetUaceSubjects, SetUceSubjects} from '../state/app.actions';
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';
import {LoadingController, ModalController} from '@ionic/angular';
import {ProgramComponent} from '../modals/program/program.component';
import {AppState} from '../state/app.state';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  searchbar;
  programs: Program[];
  display: Program[];
  @Select(AppState.getPrograms) programs$: Observable<Program[]>;

  constructor(private appStore: Store,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
    // this.searchbar = document.querySelector('ion-searchbar');
    // this.searchbar.addEventListener('ionInput', this.handleInput);
  }

  async ngOnInit() {

    // this.programs = Array.from(document.querySelector('ion-list').children);
    await this.initialize(true);
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

  async presentModal(data: Program) {
    const modal = await this.modalCtrl.create({
      component: ProgramComponent,
      componentProps: {
        program: data,
      }
    });
    return await modal.present();
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

}
