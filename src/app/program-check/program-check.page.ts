import {Component, OnInit, ViewChild} from '@angular/core';
import {Program} from "../models/Program";
import {Select, Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Uace, UaceGrades} from "../models/uace";
import {Uce, UceGrades} from "../models/uce";
import {SetPrograms} from "../state/app.actions";
import {Combination, ProgramCheck, ProgramCheckResults, UserResults, UserSubmissions} from "../models/Recommendation";
import {UceComponent} from "../components/uce/uce.component";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
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
  programName: string;

  @Select(AppState.getPrograms) programs$: Observable<Program[]>;
  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;

  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;

  constructor(private appStore: Store,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private serverService: ServerService,
              public alertCtrl: AlertController) {

    this.admissionType = "PRIVATE";
    this.gender = "FEMALE";
    this.program = "";
    this.programName = "";
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
    this.programName = program.name;
    this.display = Array<Program>();
  }

  async submit(){

    if( this.program !== null && this.program !== "" && this.uceComponent.checkResultsValidity() && this.uaceComponent.checkResultsValidity()){

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

      await this.serverService.checkProgram(submissions).then(async (results: ProgramCheckResults) => {

                console.log(results);

                if(results.check.trim().toUpperCase() === "PASSED"){
                  await loading.dismiss();
                  const alert = await this.alertCtrl.create({
                    header: 'Congratulations',
                    message: 'You meet all the requirements for the program',
                    buttons: ['OK'],
                  });
                  await alert.present();
                }
                else{
                  await loading.dismiss();
                  const alert = await this.alertCtrl.create({
                    header: 'Oops',
                    message: 'You dont meet all the requirements for that program based on the previous year cutoff points and program subjects, checkout the program details for more information about it',
                    buttons: ['OK'],
                  });
                  await alert.present();
                }
              }, async error => {
                  await loading.dismiss();
                  const alert = await this.alertCtrl.create({
                    header: 'Oops',
                    message: error,
                    buttons: ['OK'],
                  });
                  await alert.present();
              }
          );



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
