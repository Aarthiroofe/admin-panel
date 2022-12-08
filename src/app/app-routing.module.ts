import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LoginredirectGuard } from './shared/guard/loginredirect.guard';

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [LoginredirectGuard]
  },
  {
    path: 'error',
    loadChildren: './server-error/server-error.module#ServerErrorModule'
  },
  {
    path: 'not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
