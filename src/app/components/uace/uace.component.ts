import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";
import {Uace, UaceGrades} from "../../models/uace";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController, ToastController} from "@ionic/angular";
import {SetUaceSubjects} from "../../state/app.actions";
import {UserResults} from "../../models/Recommendation";
import {AddSubjectComponent} from "../add-subject/add-subject.component";
import {UceGrades} from "../../models/uce";

@Component({
  selector: 'app-uace',
  templateUrl: './uace.component.html',
  styleUrls: ['./uace.component.scss'],
})
export class UaceComponent implements OnInit {

  @Select(AppState.getUaceSubjects) uaceSubjects$: Observable<Uace[]>;
  @Select(AppState.getUaceGrades) uaceGrades$: Observable<UaceGrades[]>;
  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;

  uaceElectives: Uace[];
  uaceCompulsory: Uace[];
  uaceSubsidiaries: Uace[];
  uaceGrades: UaceGrades[];
  uceGrades: UceGrades[];
  electivesArray = new FormGroup({});
  selectedElectives: UserResults[];
  selectedSubsidiary: UserResults;
  uaceResults = new FormGroup({
  });

  constructor(private formBuilder: FormBuilder,
              private appStore: Store,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    this.selectedElectives = [];
    this.selectedSubsidiary = {
      code: "",
      value: ""
    }

  }

  async ngOnInit() {
    await this.initialize();
  }

  async initialize(){
    await this.appStore.dispatch(new SetUaceSubjects());

    await this.uaceSubjects$.subscribe((uaceSubjects: Uace[]) => {
      this.uaceCompulsory = uaceSubjects.filter(value => {
        return value.general_subject === true
      });

      this.uaceSubsidiaries = uaceSubjects.filter(value => {
        return value.name.trim().toUpperCase().includes("SUBSIDIARY")
      });

      this.uaceElectives = uaceSubjects.filter(value => {
        return value.general_subject === false &&
            !value.name.trim().toUpperCase().includes("SUBSIDIARY") &&
            !value.name.trim().toUpperCase().includes("ALL")
      });

      this.uaceCompulsory.forEach(value => {
        this.uaceResults.addControl(value.code, new FormControl("", [
          Validators.required, Validators.minLength(2)]));
        // let userResult = new class implements UserResults {
        //   code: string = value.name;
        //   value: string = "";
        // };
        // this.selectedCompulsory.push(userResult);
      });
    });

    // await this.uceElectiveSubjects$.subscribe((uceSubjects: Uce[]) => {
    //   this.uceElectives = uceSubjects;
    // });
    //
    await this.uaceGrades$.subscribe((uaceGrades: UaceGrades[]) => {
      this.uaceGrades = uaceGrades;
    });

    await this.uceGrades$.subscribe((uceGrades: UceGrades[]) => {
      this.uceGrades = uceGrades;
    });
  }

  async updateGrade(event, code: string, subsidiary: boolean) {

    if (subsidiary &&  code === "") {
      const toast = await this.toastCtrl.create({
        message: 'Please select a subsidiary.',
        duration: 2000
      });

      await toast.present();
      return
    }

    const grade = event.target.value + "";

    this.uaceResults.removeControl(code);
    this.uaceResults.addControl(code, new FormControl(grade));

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

    let popElectives: Uace[] = [];

    this.uaceElectives.filter(elective => {
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
        uaceElectives: popElectives,
        uaceGrades: this.uaceGrades,
        category: "UACE"
      }
    });

    await modal.present();

    modal.onDidDismiss().then((response: any) => {
      const data: UserResults = response.data;
      if (data !== null && data !== undefined) {

        this.uaceResults.removeControl(data.code);
        this.uaceResults.addControl(data.code, new FormControl(data.value));

        this.electivesArray.addControl(data.code, new FormControl(data.value));

        this.uaceElectives.forEach(value => {
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
    this.uaceElectives.forEach(value => {
      if(keepLooping){
        if(value.name.trim().toUpperCase() === name.trim().toUpperCase()){
          this.electivesArray.removeControl(value.code);

          this.selectedElectives = this.selectedElectives.filter(value1 => value1.code !== name)
          keepLooping = false;
        }
      }

    })

  }

  checkResultsValidity(): boolean {
    return this.uaceResults.status === "VALID";
  }

  formatResults(): UserResults[] {
    let uaceCombinedResults : any = this.uaceResults.value;

    // let electives : {UserResults} = uceCombinedResults["electives"]
    // delete uceCombinedResults["electives"]
    //
    // let compulsory : {UserResults} = uceCombinedResults
    //
    let uceResults : UserResults[] = [];

    for (let subject in uaceCombinedResults) {

      let result = new class implements UserResults {
        code: string =  subject + "";
        value: string = uaceCombinedResults[subject + ""];
      };
      uceResults.push(result)
    }

    // for(let subject in compulsory){
    //   let grade = compulsory[subject];
    //
    //   this.uaceCompulsory.forEach(value => {
    //     if(value.name.trim().toUpperCase() === subject.trim().toUpperCase()){
    //       let result = new class implements UserResults {
    //         code: string = value.code;
    //         value: string =   grade + "";
    //       };
    //       uceResults.push(result)
    //     }
    //   });
    //
    // }

    return uceResults;
  }
}
