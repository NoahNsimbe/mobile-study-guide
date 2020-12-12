import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ResultsModalData} from "../../models/Recommendation";

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.page.html',
  styleUrls: ['./results-modal.page.scss'],
})
export class ResultsModalPage implements OnInit{

  @Input() results: ResultsModalData;

  constructor(public modalCtrl: ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss().then(r => {

    });
  }

  ngOnInit(): void {
    console.log(this.results);
  }

}
