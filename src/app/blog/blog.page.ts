import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {SetArticles} from "../state/app.actions";
import {AlertController, LoadingController} from "@ionic/angular";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
import {Article} from "../models/Article";
import {Router} from "@angular/router";

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
              private router: Router,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,) {
    this.articles = false;
  }

  async ngOnInit() {
    await this.initialize(false);
  }

  async initialize(force: boolean) {

    this.articles = false;

    await this.appStore.dispatch(new SetArticles(force));

    await this.articles$.subscribe(async (data: Article[]) => {
      if(data.length > 0){
        this.articles = true;
      }
      else {
        const alert = await this.alertCtrl.create({
          header: 'Oops',
          message: "No articles yet, click the refresh button at your the bottom right to retrieve any written articles if they exist",
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }

    async doRefresh() {

      const loading = await this.loadingCtrl.create({
        message: 'loading...',
        animated: true,
        spinner: 'lines'
      });

      await loading.present();

      await this.appStore.dispatch(new SetArticles(true));

      await this.articles$.subscribe(async (data: Article[]) => {
        if (data.length <= 0) {
          const alert = await this.alertCtrl.create({
            header: 'Oops',
            message: "No articles",
            buttons: ['OK'],
          });
          await alert.present();
        }
      });

      await loading.dismiss();
    }

    viewArticle(isCreating: boolean, id?: number) {
      if(isCreating){
        this.router.navigate(["/article", "create"])
      }
      else if (id !== null){
        this.router.navigate(["/article", id])
      }
      else {
        return;
      }
    }
}
