import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramCheckPageRoutingModule } from './program-check-routing.module';

import { ProgramCheckPage } from './program-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramCheckPageRoutingModule
  ],
  declarations: [ProgramCheckPage]
})
export class ProgramCheckPageModule {}
