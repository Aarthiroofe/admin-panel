import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HpScoreComponent } from './hp-score/hp-score.component';
import { OpmComponent } from './opm/opm.component';
import { FourBeingStatesComponent } from './four-being-states/four-being-states.component';
import { EightAttitudesComponent } from './eight-attitudes/eight-attitudes.component';
import { TeamMeasuresComponent } from './team-measures/team-measures.component';
import { MaturityComponent } from './maturity/maturity.component';
import { DimensionsComponent } from './dimensions/dimensions.component';
import { InviterComponent } from './inviter/inviter.component';
import { HeartMeasuresComponent } from './heart-measures/heart-measures.component';
const routes: Routes = [
  { path:'hp-score',component:HpScoreComponent },
  { path:'opm', component:OpmComponent },
  { path:'four-being-states', component:FourBeingStatesComponent },
  { path: 'eight-attitudes',component: EightAttitudesComponent },
  { path:'team-measures',component:TeamMeasuresComponent},
  { path:'maturity',component:MaturityComponent},
  { path:'dimensions',component:DimensionsComponent},
  { path:'360-report',component:InviterComponent},
  { path:'heart-measure',component:HeartMeasuresComponent },
  { path:'', redirectTo:'hp-score', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ReportsRoutingModule { }
