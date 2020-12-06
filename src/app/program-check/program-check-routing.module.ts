import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramCheckPage } from './program-check.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramCheckPageRoutingModule {}
