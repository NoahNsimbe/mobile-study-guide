import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramCheckPageRoutingModule } from './program-check-routing.module';

import { ProgramCheckPage } from './program-check.page';
import {AddSubjectComponent} from "../components/add-subject/add-subject.component";
import {UceComponentModule} from "../components/uce/uce.module";
import {UaceComponentModule} from "../components/uace/uace.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramCheckPageRoutingModule,
    // ReactiveFormsModule,
    UceComponentModule,
    UaceComponentModule
  ],
  declarations: [ProgramCheckPage],
  entryComponents: []
})
export class ProgramCheckPageModule {}
