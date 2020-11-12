import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectivesModalPageRoutingModule } from './electives-modal-routing.module';

import { ElectivesModalPage } from './electives-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ElectivesModalPage]
})
export class ElectivesModalPageModule {}
