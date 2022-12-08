import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { FormsModule }   from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { HpScoreComponent } from './hp-score/hp-score.component';
import { OpmComponent } from './opm/opm.component';
import { FourBeingStatesComponent } from './four-being-states/four-being-states.component';
import { EightAttitudesComponent } from './eight-attitudes/eight-attitudes.component';
import { TeamMeasuresComponent } from './team-measures/team-measures.component';
import { MaturityComponent } from './maturity/maturity.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DimensionsComponent } from './dimensions/dimensions.component';
import { InviterComponent } from './inviter/inviter.component';
import { HeartMeasuresComponent } from './heart-measures/heart-measures.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgbModule,
    ChartsModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [HpScoreComponent, OpmComponent, FourBeingStatesComponent, EightAttitudesComponent, TeamMeasuresComponent, MaturityComponent, DimensionsComponent,InviterComponent, HeartMeasuresComponent]
})
export class ReportsModule { }
