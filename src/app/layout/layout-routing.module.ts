import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path:'',redirectTo:'dashboard',pathMatch:'full'
            },
            {
                path:'dashboard',
                loadChildren:'./dashboard/dashboard.module#DashboardModule'
            },
            {
                path:'report',
                loadChildren:'./reports/reports.module#ReportsModule'
            },
            {
                path:'comparision',
                loadChildren:'./comparision/comparision.module#ComparisionModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
