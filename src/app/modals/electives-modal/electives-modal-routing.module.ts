import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectivesModalPage } from './electives-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ElectivesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectivesModalPageRoutingModule {}
