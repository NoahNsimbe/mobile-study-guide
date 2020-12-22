import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {SetArticles, SetCareers, SetPrograms, SetUaceSubjects, SetUceSubjects} from "../state/app.actions";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private appStore: Store,
              private route: Router,
              public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async navigateTo(path) {
    switch (path) {
      case 'recommend':
        await this.appStore.dispatch(new SetPrograms());
    }

    await this.route.navigate([`/${path}`]);
  }

  async refresh() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait as we perform a refresh...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

    await this.appStore.dispatch(new SetPrograms(true));
    await this.appStore.dispatch(new SetUceSubjects(true));
    await this.appStore.dispatch(new SetUaceSubjects(true));
    await this.appStore.dispatch(new SetCareers(true));
    await this.appStore.dispatch(new SetArticles(true));
    await loading.dismiss();

  }

}
