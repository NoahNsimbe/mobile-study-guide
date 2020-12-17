import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {SetArticles} from "../state/app.actions";
import {LoadingController} from "@ionic/angular";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Article} from "../models/Article";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

  articles: boolean = false;
  skeleton: Article[] = new Array(6);
  @Select(AppState.getArticles) articles$: Observable<Article[]>;

  constructor(private appStore: Store,
              public loadingCtrl: LoadingController,) {
    this.articles = false;
  }

  async ngOnInit() {
    await this.initialize(false);
  }

  async initialize(force: boolean) {

    this.articles = false;

    await this.appStore.dispatch(new SetArticles(force));

    await this.articles$.subscribe((data: Article[]) => {
      if(data.length > 0){
        this.articles = true;
      }
    });
  }

    doRefresh($event: CustomEvent) {
        
    }
}