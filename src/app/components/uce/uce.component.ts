import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, FormArray, Validators} from '@angular/forms';
import {Select, Store} from "@ngxs/store";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";
import {Uce, UceGrades} from "../../models/uce";
import {ModalController, ToastController} from "@ionic/angular";
import {AddSubjectComponent} from "../add-subject/add-subject.component";
import {UserResults} from "../../models/Recommendation";
import {SetUceSubjects} from "../../state/app.actions";


@Component({
  selector: 'app-uce',
  templateUrl: './uce.component.html',
  styleUrls: ['./uce.component.scss'],
})
export class UceComponent implements OnInit {

  electivesArray = new FormGroup({});
  selectedElectives: UserResults[];
  selectedCompulsory: UserResults[];
  uceResults = new FormGroup({
    electives: this.electivesArray
  });
  uceElectives: Uce[];
  uaceCompulsory: Uce[];
  uceGrades: UceGrades[];

  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;
  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;


  constructor(private formBuilder: FormBuilder,
              private appStore: Store,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    this.selectedElectives = [];
    this.selectedCompulsory = [];
  }

  async ngOnInit() {
    await this.initialize();
  }

  async initialize(){
    await this.appStore.dispatch(new SetUceSubjects());

    await this.uceCompulsorySubjects$.subscribe((uceSubjects: Uce[]) => {
      this.uaceCompulsory = uceSubjects;
      this.selectedCompulsory = [];

      uceSubjects.forEach(value => {
        this.uceResults.addControl(value.name, new FormControl("", [
          Validators.required, Validators.minLength(2)]));
        let userResult = new class implements UserResults {
          code: string = value.name;
          value: string = "";
        };
        this.selectedCompulsory.push(userResult);
      });
    });

    await this.uceElectiveSubjects$.subscribe((uceSubjects: Uce[]) => {
      this.uceElectives = uceSubjects;
    });

    await this.uceGrades$.subscribe((uceGrades: UceGrades[]) => {
      this.uceGrades = uceGrades;
    });
  }

  async addElective() {

    if(this.selectedElectives.length === 3 ){
      const toast = await this.toastCtrl.create({
        message: 'You can provide a maximum of 3 subjects',
        duration: 2000
      });

      await toast.present();

      return;
    }

    let popElectives: Uce[] = [];

    this.uceElectives.filter(elective => {
      let present = this.selectedElectives.find(value => {
        return value.code.trim().toUpperCase() === elective.name.trim().toUpperCase();
      });

      if(!present){
        popElectives.push(elective);
      }
    });

    const modal = await this.modalCtrl.create({
      component: AddSubjectComponent,
      componentProps: {
        uceElectives: popElectives,
        uceGrades: this.uceGrades,
        category: "UCE"
      }
    });

    await modal.present();

    modal.onDidDismiss().then((response: any) => {
      const data: UserResults = response.data;
      if (data !== null && data !== undefined) {
        let subject = new FormControl(data.value);

        this.electivesArray.addControl(data.code, subject);

        this.uceElectives.forEach(value => {
          if(value.code.trim().toUpperCase() === data.code.trim().toUpperCase()){
            let userResult = new class implements UserResults {
              code: string = value.name;
              value: string = data.value;
            };
            this.selectedElectives.push(userResult);
          }
        });

      }

    });

  }

  removeElective(name:string) {

    let keepLooping : boolean = true;
    this.uceElectives.forEach(value => {
      if(keepLooping){
        if(value.name.trim().toUpperCase() === name.trim().toUpperCase()){
          this.electivesArray.removeControl(value.code);

          this.selectedElectives = this.selectedElectives.filter(value1 => value1.code !== name)
          keepLooping = false;
        }
      }

    })

  }

  updateGrade(event, subject:string){

    const grade = event.target.value;
    let keepLooping : boolean = true;

    this.selectedCompulsory.forEach(value => {
      if(keepLooping) {
        if (value.code.trim().toUpperCase() === subject.trim().toUpperCase()) {

          this.uceResults.removeControl(value.code);
          this.uceResults.addControl(value.code, new FormControl(grade));

          keepLooping = false;
        }
      }
    })

  }

  formatResults(): UserResults[] {
    let uceCombinedResults : any = this.uceResults.value;

    let electives : {UserResults} = uceCombinedResults["electives"]
    delete uceCombinedResults["electives"]

    let compulsory : {UserResults} = uceCombinedResults

    let uceResults : UserResults[] = [];

    for (let subject in electives) {

      let result = new class implements UserResults {
        code: string = subject;
        value: string = electives[subject];
      };
      uceResults.push(result)
    }

    for(let subject in compulsory){
      let grade = compulsory[subject];

      this.uaceCompulsory.forEach(value => {
        if(value.name.trim().toUpperCase() === subject.trim().toUpperCase()){
          let result = new class implements UserResults {
            code: string = value.code;
            value: string =   grade + "";
          };
          uceResults.push(result)
        }
      });

    }

    return uceResults;
  }

  checkResultsValidity(): boolean{
    return this.uceResults.status === "VALID";
  }
}
