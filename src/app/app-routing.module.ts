import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './service/AuthGuard';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AppComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
