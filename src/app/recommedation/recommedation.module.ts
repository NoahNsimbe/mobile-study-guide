import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationPageRoutingModule } from './recommedation-routing.module';

import { RecommendationPage } from './recommendation-page.component';
import {ResultsModalPageModule} from '../modals/results-modal/results-modal.module';
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';
import {ElectivesModalPage} from '../modals/electives-modal/electives-modal.page';
import {ElectivesModalPageModule} from '../modals/electives-modal/electives-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationPageRoutingModule,
    ResultsModalPageModule,
    ElectivesModalPageModule
  ],
  entryComponents: [ResultsModalPage, ElectivesModalPage],
  declarations: [RecommendationPage]
})
export class RecommendationPageModule {}
