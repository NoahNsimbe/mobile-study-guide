import {Component, OnInit, ViewChild} from '@angular/core';
import {Program} from "../models/Program";
import {Select, Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Uace, UaceGrades} from "../models/uace";
import {Uce, UceGrades} from "../models/uce";
import {SetPrograms} from "../state/app.actions";
import {Combination, ProgramCheck, UserResults, UserSubmissions} from "../models/Recommendation";
import {UceComponent} from "../components/uce/uce.component";
import {LoadingController, ToastController} from "@ionic/angular";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {UaceComponent} from "../components/uace/uace.component";
import {ServerService} from "../services/server.service";

@Component({
  selector: 'app-program-check',
  templateUrl: './program-check.page.html',
  styleUrls: ['./program-check.page.scss'],
})
export class ProgramCheckPage implements OnInit {

  @ViewChild(UceComponent, {static: false}) uceComponent !: UceComponent;
  @ViewChild(UaceComponent, {static: false}) uaceComponent !: UaceComponent;

  programs: Program[];
  display: Program[];
  admissionType: string;
  program: string;
  gender: string;

  @Select(AppState.getPrograms) programs$: Observable<Program[]>;
  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;

  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  constructor(private appStore: Store,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private serverService: ServerService) {

    this.admissionType = "PRIVATE";
    this.gender = "FEMALE";
    this.program = "";
  }

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

    await this.appStore.dispatch(new SetPrograms());
    this.programs$.subscribe((data: Program[]) => {
      this.programs = data;
    });

    await loading.dismiss();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();

    this.display = Array<Program>();

    if(query.trim() === ""){
      return;
    }

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
    this.program = program.code;
    this.display = Array<Program>();
  }

  async submit(){

    if(this.uceComponent.checkResultsValidity() && this.uaceComponent.checkResultsValidity()){

      let uceResults : UserResults[] = this.uceComponent.formatResults();
      let uaceResults : UserResults[] = this.uaceComponent.formatResults();

      let submissions : ProgramCheck = {
        admission_type: this.admissionType,
        program_code: this.program,
        gender: this.gender,
        uace_results: uaceResults,
        uce_results: uceResults

      };

      console.log(submissions);
      const loading = await this.loadingCtrl.create({
        message: 'loading...',
        animated: true,
        spinner: 'lines'
      });

      await loading.present();

      await this.serverService.checkProgram(submissions)
          .subscribe((results: any) => {
                console.log(results)
              }, error => {
                console.log(error);
              }
          );

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
