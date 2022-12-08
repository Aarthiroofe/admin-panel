import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule ,NgbDropdownModule,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule }   from '@angular/forms';
import { NgbDateCustomParserFormatter } from './../date-format';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        NgbModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent,HeaderComponent, SidebarComponent,FooterComponent],
    providers: [
        {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
       ]
})
export class LayoutModule {}
