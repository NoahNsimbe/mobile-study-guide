import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendationPage } from './recommendation-page.component';

const routes: Routes = [
  {
    path: '',
    component: RecommendationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommedationPageRoutingModule {}
