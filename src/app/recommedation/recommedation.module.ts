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
import {UceComponent} from "../components/uce/uce.component";
import {AddSubjectComponent} from "../components/add-subject/add-subject.component";
import {UaceComponent} from "../components/uace/uace.component";
import {UceComponentModule} from "../components/uce/uce.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationPageRoutingModule,
    ResultsModalPageModule,
    ElectivesModalPageModule,
    UceComponentModule

  ],
  declarations: [RecommendationPage, UceComponent],
  entryComponents: [ResultsModalPage, ElectivesModalPage],

})
export class RecommendationPageModule {}
