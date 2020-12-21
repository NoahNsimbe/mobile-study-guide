import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CutOffPoints, OLevelConstraints, ProgramConstraints, ProgramDetails, ProgramSubjects} from "../models/Program";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {ServerService} from "../services/server.service";
import {ProgramComponent} from "../modals/program/program.component";
import {Combination, Program} from "../models/Recommendation";

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.page.html',
  styleUrls: ['./program-details.page.scss'],
})
export class ProgramDetailsPage implements OnInit {

  code: string = null;
  programDetails: ProgramDetails;

  constructor(private route: ActivatedRoute,
              public loadingCtrl: LoadingController,
              private router: Router,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private serverService: ServerService) {
    this.code = null;
    this.programDetails = null;

  }

  async ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("code");
    if (this.code === null) {
      this.router.navigate(["/programs"]);
      return;
    }

    await this.loadData();

    if (this.programDetails === null) {
      this.router.navigate(["/programs"]);
    }


  }

  async loadData() {

    const loading = await this.loadingCtrl.create({
      message: 'Getting program details...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

    await this.serverService.getProgramDetails(this.code.trim().toUpperCase())
        .then(async (results: ProgramDetails) => {
              this.programDetails = results;
              await loading.dismiss();

            },
            async error => {
              console.log(error);
              this.programDetails = null;
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

  async loadCombinations() {

    let combinations = [];

    const loading = await this.loadingCtrl.create({
      message: 'Getting combinations...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

    await this.serverService.recommendCombinations(this.code.trim().toUpperCase())
        .then(async (results: Combination[]) => {
              combinations = results
            },
            async error => {
              combinations = []
              const alert = await this.alertCtrl.create({
                header: 'Oops',
                message: error,
                buttons: ['OK'],
              });

              await alert.present();
            }
        );

    await loading.dismiss();

    if(combinations !== []){
      const modal = await this.modalCtrl.create({
        component: ProgramComponent,
        componentProps: {
          combinations: combinations,
          program: this.programDetails
        }
      });

      await modal.present();
    }

  }

}
