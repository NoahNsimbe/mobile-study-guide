import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {Article} from "../models/Article";
import {ServerService} from "../services/server.service";
import {ProgramDetails} from "../models/Program";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

  constructor(private route: ActivatedRoute,
              public loadingCtrl: LoadingController,
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
    if (this.id === null) {
      this.isCreating = true;
    }
    else this.isCreating = this.id.toUpperCase() === "CREATE";

    if (!this.isCreating)
      await this.loadData();
  }

  private async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Getting article...',
      animated: true,
      spinner: 'lines'
    });

    await loading.present();

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

  submit() {
    this.article.body = this.model.editorData.trim();
    console.log(this.article);
  }

  login() {
    // this.auth.signInWithPopUpn(new firebase.auth.GoogleAuthProvider());
  }
}
