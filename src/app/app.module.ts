import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared-module';
import { DeleteDialogComponent } from './Core/delete-dialog/delete-dialog.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { EventEmitterService } from './Core/event-emiter.service';
import { UserOptionsComponent } from './user-options/user-options.component';
import { BREAKPOINT } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    DeleteDialogComponent,
    AccessDeniedComponent,
    UserOptionsComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],

  providers: [EventEmitterService,
    {
      provide: BREAKPOINT,
      useValue: {
        alias: 'desktop',
        suffix: 'Desktop',
        mediaQuery: 'screen and (min-width: 1025px)',
        overlapping: true
      },
      multi: true
    },
    {
      provide: BREAKPOINT,
      useValue: {
        alias: 'xs.landscape',
        suffix: 'XsLandscape',
        mediaQuery: 'screen and (max-width:1024px)',
        overlapping: true
      },
      multi: true
    }
    ,],
  bootstrap: [AppComponent]
})
export class AppModule { }
