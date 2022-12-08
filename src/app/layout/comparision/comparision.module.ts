import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComparisionRoutingModule } from './comparision-routing.module';
import { ComparisionComponent } from './comparision.component';
import { FormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    ComparisionRoutingModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [ComparisionComponent]
})
export class ComparisionModule { }
