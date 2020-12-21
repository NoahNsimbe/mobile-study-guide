import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramDetailsPageRoutingModule } from './program-details-routing.module';

import { ProgramDetailsPage } from './program-details.page';
import {ProgramComponent} from "../modals/program/program.component";
import {SubjectCodePipe} from "../pipes/subject-code.pipe";
import {UcePipe} from "../pipes/uce-pipe.pipe";
// import {AppModule} from "../app.module";
// import {SubjectCodePipe} from "../pipes/subject-code.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProgramDetailsPageRoutingModule,
    ],
  declarations: [ProgramDetailsPage, ProgramComponent, SubjectCodePipe, UcePipe],
  entryComponents: [ProgramComponent]
})
export class ProgramDetailsPageModule {}
