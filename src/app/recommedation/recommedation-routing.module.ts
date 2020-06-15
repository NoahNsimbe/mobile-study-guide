import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommedationPage } from './recommedation.page';

const routes: Routes = [
  {
    path: '',
    component: RecommedationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommedationPageRoutingModule {}
