import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {AddSubjectComponent} from "./add-subject.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    entryComponents: [],
    declarations: [AddSubjectComponent],
    exports: [AddSubjectComponent]
})
export class AddSubjectComponentModule {}
