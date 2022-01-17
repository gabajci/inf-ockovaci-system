import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AccessGuard } from './Core/access-guard';
import { UserOptionsComponent } from './user-options/user-options.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome-page', pathMatch: 'full' },
  {
    path: 'welcome-page',    
    component: WelcomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'hospital',
    canActivate: [AccessGuard],
    loadChildren: () => import('./hospital/hospitals-module').then(m => m.HospitalsModule)
  },
  {
    path: 'personal',
    canActivate: [AccessGuard],
    loadChildren: () => import('./personal/personals-module').then(m => m.PersonalsModule)
  },
  {
    path: 'vaccinated',
    canActivate: [AccessGuard],
    loadChildren: () => import('./vaccinated/vaccinateds-module').then(m => m.VaccinatedsModule)
  },
  {
    path: 'person',
    canActivate: [AccessGuard],
    loadChildren: () => import('./person/persons-module').then(m => m.PersonsModule)
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'user-options',
    component: UserOptionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
