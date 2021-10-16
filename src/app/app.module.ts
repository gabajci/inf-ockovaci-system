import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HospitalComponent } from './hospital/hospital/hospital.component';
import { PersonalComponent } from './personal/personal/personal.component';
import { VaccinatedComponent } from './vaccinated/vaccinated/vaccinated.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    FooterComponent,
    HospitalComponent,
    PersonalComponent,
    VaccinatedComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
