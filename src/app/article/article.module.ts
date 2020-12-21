import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';

import { ArticlePage } from './article.page';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CKEditorModule,
    ArticlePageRoutingModule
  ],
  declarations: [ArticlePage]
})
export class ArticlePageModule {}
