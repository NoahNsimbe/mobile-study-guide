import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms';
import {Select, Store} from "@ngxs/store";
import {AppState} from "../../state/app.state";
import {Observable} from "rxjs";
import {Uce, UceGrades} from "../../models/uce";
import {ModalController} from "@ionic/angular";
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

  @Select(AppState.getCompulsoryUceSubjects) uceCompulsorySubjects$: Observable<Uce[]>;
  @Select(AppState.getElectiveUceSubjects) uceElectiveSubjects$: Observable<Uce[]>;

  @Select(AppState.getUceGrades) uceGrades$: Observable<UceGrades[]>;

  uceElectives: Uce[];
  uceGrades: UceGrades[];

  constructor(private formBuilder: FormBuilder,
              private appStore: Store,
              public modalCtrl: ModalController,) {
    this.selectedElectives = [];
    this.selectedCompulsory = [];
  }

  async ngOnInit() {
    await this.initialize();
  }

  async initialize(){
    await this.appStore.dispatch(new SetUceSubjects());

    await this.uceCompulsorySubjects$.subscribe((uceSubjects: Uce[]) => {
      uceSubjects.forEach(value => {
        this.uceResults.addControl(value.name, new FormControl());
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

    const modal = await this.modalCtrl.create({
      component: AddSubjectComponent,
      componentProps: {
        uceElectives: this.uceElectives,
        uceGrades: this.uceGrades,
        category: "UCE"
      }
    });

    await modal.present();

    modal.onDidDismiss().then((response: any) => {
      const data: UserResults = response.data;
      if (data !== null) {
        let subject = new FormControl(data.value);

        this.electivesArray.addControl(data.code, subject);

        this.uceElectives.forEach(value => {
          if(value.code.trim().toUpperCase() === data.code){
            let userResult = new class implements UserResults {
              code: string = value.name;
              value: string = data.value;
            };
            this.selectedElectives.push(userResult);
          }
        })

      }

      console.log(this.uceResults.value);

    });

  }

  removeElective(name:string) {

    let keepLooping : boolean = true;
    this.uceElectives.forEach(value => {
      if(keepLooping){
        if(value.name.trim().toUpperCase() === name.trim().toUpperCase()){
          this.electivesArray.removeControl(value.code);
          console.log(this.uceResults.value);

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

}
