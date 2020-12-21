import {Component, Input, OnInit} from '@angular/core';
import {Program, ProgramDetails} from '../../models/Program';
import {ModalController} from '@ionic/angular';
import {Combination} from "../../models/Recommendation";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {

  @Input() program: ProgramDetails;
  @Input() combinations: Combination[];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss().then(r => {
      console.log(r);
    });
  }

  findCombinations() {
    this.modalCtrl.dismiss(this.program).then(r => {
      console.log(r);
    });
  }
}
