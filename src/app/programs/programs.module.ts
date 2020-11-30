import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramsPageRoutingModule } from './programs-routing.module';

import { ProgramsPage } from './programs.page';
import {ResultsModalPage} from '../modals/results-modal/results-modal.page';
import {ElectivesModalPage} from '../modals/electives-modal/electives-modal.page';
import {ProgramComponent} from '../modals/program/program.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramsPageRoutingModule
  ],
  entryComponents: [ProgramComponent],
  declarations: [ProgramsPage, ProgramComponent]
})
export class ProgramsPageModule {}
