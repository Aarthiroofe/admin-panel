import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ViewReportComponent } from './view-report/view-report.component';
const routes: Routes = [
  { path:'', component:DashboardComponent },
  { path:'view-report/:id',component:ViewReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
