import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {SetPrograms} from "../state/app.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private appStore: Store, private route: Router) { }

  ngOnInit() {
  }

  async navigateTo(path) {
    switch (path) {
      case 'recommend':
        await this.appStore.dispatch(new SetPrograms());
    }

    await this.route.navigate([`/${path}`]);
  }

}
