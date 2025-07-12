import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrimunitPipe } from '../pipes/trimunit.pipe';
import { StringToArrayPipe } from '../pipes/string-to-array.pipe';
import { ParseNumberPipe } from '../pipes/parse-number.pipe';
import { DepartmentsPage } from '../pages/departments/departments.page';
import { ServicesPage } from '../pages/services/services.page';

@NgModule({
    declarations: [ParseNumberPipe, StringToArrayPipe, ServicesPage],
    exports: [TrimunitPipe, ParseNumberPipe, StringToArrayPipe, DepartmentsPage, ServicesPage],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        IonicModule,
        TrimunitPipe,
        DepartmentsPage
    ],
    providers: [],
})
export class ComponentsModule { }
