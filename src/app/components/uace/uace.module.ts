import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {UaceComponent} from "./uace.component";
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
    declarations: [UaceComponent],
    exports: [UaceComponent]
})
export class UaceComponentModule {}
