import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Uce, UceGrades} from "../../models/uce";
import {Uace} from "../../models/uace";
import {UserResults} from "../../models/Recommendation";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {

  @Input() uceElectives: Uce[];
  @Input() uaceElectives: Uace[];
  @Input() category: string;
  @Input() uceGrades: UceGrades[];
  @Input() uaceGrades: UceGrades[];

  selectedSubject: UserResults;

  constructor(public modalCtrl: ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss().then(r => {
      console.log(r);
    });
  }

  ngOnInit(): void {
    this.selectedSubject = new class implements UserResults {
      code: string = "";
      value: string = "";
    };
  }

  addSubject() {
    this.modalCtrl.dismiss(this.selectedSubject).then(r => {
      console.log(r);
    });
  }
}
