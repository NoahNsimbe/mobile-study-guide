import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {UceComponent} from "./uce.component";
import {AddSubjectComponent} from "../add-subject/add-subject.component";
import {AddSubjectComponentModule} from "../add-subject/add-subject.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        AddSubjectComponentModule
    ],
    entryComponents: [AddSubjectComponent],
    declarations: [UceComponent],
    exports: [UceComponent]
})
export class UceComponentModule {}
