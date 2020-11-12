import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.page.html',
  styleUrls: ['./results-modal.page.scss'],
})
export class ResultsModalPage implements OnInit{


  @Input() results: any;
  @Input() flag: string;

  constructor(public modalCtrl: ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss().then(r => {
      console.log(r);
    });
  }

  ngOnInit(): void {
    console.log(this.results);
  }

}
