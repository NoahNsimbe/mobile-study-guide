import { Component, OnInit } from '@angular/core';

import {LoadingController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';
import {Store} from "@ngxs/store";
import {SetCareers, SetPrograms, SetUaceSubjects, SetUceSubjects} from "./state/app.actions";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SRS';
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Articles',
      url: '/blog',
      icon: 'library'
    },
    {
      title: 'Help',
      url: '/home',
      icon: 'help'
    },
    {
      title: 'About',
      url: '/home',
      icon: 'information'
    },
    // {
    //   title: 'Weighting System',
    //   url: '/home',
    //   icon: 'home'
    // },
    // {
    //   title: 'Weighing System',
    //   url: '/folder/Outbox',
    //   icon: 'paper-plane'
    // },
    // {
    //   title: 'Articles',
    //   url: '/folder/Favorites',
    //   icon: 'heart'
    // },
    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private appStore: Store,
    public loadingCtrl: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  ngOnInit() {
  
    
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
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

    await loading.dismiss();

  }
}
