import {Component, Input, OnInit} from '@angular/core';
import {Uace, UaceGrades} from '../../models/uace';
import {Uce, UceGrades} from '../../models/uce';
import {ModalController} from '@ionic/angular';
import {Select} from '@ngxs/store';
import {AppState} from '../../state/app.state';
import {Observable} from 'rxjs';
import {UserResults} from '../../models/Recommendation';

@Component({
  selector: 'app-electives-modal',
  templateUrl: './electives-modal.page.html',
  styleUrls: ['./electives-modal.page.scss'],
})
export class ElectivesModalPage {

  @Input() category: string;

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;

  selectedSubjects: UserResults;

  constructor(public modalCtrl: ModalController) {
    // this.selectedSubjects = {
    //   code: '',
    //   value: ''
    // };
  }

  dismissModal() {
    this.modalCtrl.dismiss().then(r => {
      console.log(r);
    });
  }

  addElective() {
    this.modalCtrl.dismiss(this.selectedSubjects).then(r => {
      console.log(r);
    });
  }

}
