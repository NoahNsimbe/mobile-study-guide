import {Component, Input, OnInit} from '@angular/core';
import {Program} from '../../models/Program';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {

  @Input() program: Program;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

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
