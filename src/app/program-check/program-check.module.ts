import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramCheckPageRoutingModule } from './program-check-routing.module';

import { ProgramCheckPage } from './program-check.page';
import {UceComponent} from "../components/uce/uce.component";
import {AddSubjectComponent} from "../components/add-subject/add-subject.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramCheckPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProgramCheckPage, UceComponent, AddSubjectComponent],
  entryComponents: [AddSubjectComponent]
})
export class ProgramCheckPageModule {}
