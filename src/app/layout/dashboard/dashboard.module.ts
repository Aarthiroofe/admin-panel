import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ViewReportComponent } from './view-report/view-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrguserComponent } from './orguser/orguser.component';
import { NormaluserComponent } from './normaluser/normaluser.component';
import { PptComponent } from './ppt/ppt.component';

@NgModule({
  imports: [
  CommonModule,
    DashboardRoutingModule,
    DataTablesModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [DashboardComponent, ViewReportComponent, OrguserComponent, NormaluserComponent, PptComponent]
})
export class DashboardModule { }
