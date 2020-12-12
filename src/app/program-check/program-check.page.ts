import {Component, OnInit, ViewChild} from '@angular/core';
import {Program} from "../models/Program";
import {Select, Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Uace, UaceGrades} from "../models/uace";
import {Uce, UceGrades} from "../models/uce";
import {SetPrograms} from "../state/app.actions";
import {ProgramCheck, UserResults} from "../models/Recommendation";
import {UceComponent} from "../components/uce/uce.component";
import {LoadingController, ToastController} from "@ionic/angular";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-program-check',
  templateUrl: './program-check.page.html',
  styleUrls: ['./program-check.page.scss'],
})
export class ProgramCheckPage implements OnInit {

  @ViewChild(UceComponent, {static: false}) uceComponent !: UceComponent;

  programs: Program[];
  display: Program[];
  submission: ProgramCheck;

  @Select(AppState.getPrograms) programs$: Observable<Program[]>;
  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;

  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  constructor(private appStore: Store,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.submission = new class implements ProgramCheck {
      admission_type: string;
      gender: string;
      program_code: string;
      uace_results: string;
      uce_results: string;

      constructor() {
        this.program_code = '';
      }
    }

  }

  async ngOnInit() {
    await this.initialize();
  }

  async initialize() {
    await this.appStore.dispatch(new SetPrograms());
    this.programs$.subscribe((data: Program[]) => {
      this.programs = data;
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.display = Array<Program>();

    requestAnimationFrame(() => {
      this.programs.forEach(program => {
        const shouldShow = program.name.toLowerCase().indexOf(query) > -1;
        if (shouldShow) {
          this.display.push(program);
        }
      });
    });
  }

  selectProgram(program: Program) {
    this.submission.program_code = program.code;
    this.display = Array<Program>();
  }

  async submit(){

    let uceResults : UserResults[] = this.uceComponent.formatResults();

    if(this.uceComponent.checkResultsValidity()){

      console.log(uceResults)

      const loading = await this.loadingCtrl.create({
        message: 'loading...',
        animated: true,
        spinner: 'lines'
      });

      await loading.present();

      await loading.dismiss();

    }

    else {
      const toast = await this.toastCtrl.create({
        message: 'Please provide all fields.',
        duration: 2000
      });

      await toast.present();
    }

  }

}
