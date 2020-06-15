import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommedationPageRoutingModule } from './recommedation-routing.module';

import { RecommedationPage } from './recommedation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommedationPageRoutingModule
  ],
  declarations: [RecommedationPage]
})
export class RecommedationPageModule {}
