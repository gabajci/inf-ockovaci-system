import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HospitalComponent } from './hospital/hospital/hospital.component';
import { PersonalComponent } from './personal/personal/personal.component';
import { VaccinatedComponent } from './vaccinated/vaccinated/vaccinated.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';

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
    component: HospitalComponent
  },
  {
    path: 'personal',
    component: PersonalComponent
  },
  {
    path: 'vaccinated',
    component: VaccinatedComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
