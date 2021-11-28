import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { PersonalComponent } from './personal/personal.component';
import { VaccinatedComponent } from './vaccinated/vaccinated.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared-module';
import { DeleteDialogComponent } from './Core/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    PersonalComponent,
    VaccinatedComponent,
    RegisterComponent,
    LoginComponent,
    DeleteDialogComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
