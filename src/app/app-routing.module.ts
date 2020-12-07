import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
// const routes: Routes = [];
 const routes: Routes = [
  {
    path: '',  component: AuthComponent,
    
  },
  {
    path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
