import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {Article} from "../models/Article";
import {ServerService} from "../services/server.service";
import {Program, ProgramDetails} from "../models/Program";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ProgramCheckResults} from "../models/Recommendation";
import {Select, Store} from "@ngxs/store";
import {AppState} from "../state/app.state";
import {Observable} from "rxjs";
// import {AngularFireAuth} from "@angular/fire/auth";
// import firebase from 'firebase/app';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  id: string = null;
  article: Article = null;
  isCreating: boolean = false;
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Enter body!</p>'
  };
  @Select(AppState.getArticles) articles$: Observable<Article[]>;

  constructor(private route: ActivatedRoute,
              public loadingCtrl: LoadingController,
              private store: Store,
              private router: Router,
              public alertCtrl: AlertController,
              private serverService: ServerService) {

    this.article = new class implements Article {
      articleImage: "";
      article_image: "";
      article_image_alt: "";
      author: "";
      authorImage: "";
      author_image: "";
      author_image_alt: "";
      bait: "";
      body: "";
      claps: number;
      created_on: "";
      date: "";
      id: number;
      read_time: "";
      tags: "";
      title: "";
      updated_on: "";
    }
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    let creating : boolean = false;
    if (this.id === undefined || this.id === null) {
      this.isCreating = true;
    }
    else{
      creating = this.id.toUpperCase() === "CREATE";
      if (!creating){
        await this.loadData();
        this.isCreating = false;
      }
      else{
        this.isCreating = true;
      }
    }





  }

  private async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Getting article...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

    await this.articles$.subscribe((data: Article[]) => {
      this.article = data.find(value => {
        return value.id === +this.id
      });
    });

    if(this.article.id !== null && this.article.title !== ""){
      await loading.dismiss();
      return;
    }

    await this.serverService.getArticle(+this.id)
        .then(async (results: Article) => {
              this.article = results;
              await loading.dismiss();
            },
            async error => {
              console.log(error);
              this.article = null;
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

  async submit() {
    this.article.body = this.model.editorData.trim();

    const loading = await this.loadingCtrl.create({
      message: 'creating article...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

    await this.serverService.createArticle(this.article).then(async (results: Article) => {

      this.article = results;

      await loading.dismiss();

      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Your article has been saved',
        buttons: ['OK'],
      });
      await alert.present();

      this.isCreating = false;

      }, async error => {
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

  login() {
    // this.auth.signInWithPopUp(new firebase.auth.GoogleAuthProvider());
  }
}
