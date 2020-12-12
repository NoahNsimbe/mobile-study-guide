import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {UceComponent} from "./uce.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    entryComponents: [],
    declarations: [UceComponent],
    exports: [UceComponent]
})
export class UceComponentModule {}
