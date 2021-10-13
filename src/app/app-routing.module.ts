import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-welcome-page', pathMatch: 'full' },
  {
    path: 'app-welcome-page',
    component: WelcomePageComponent
  },
  {
    path: 'app-login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
