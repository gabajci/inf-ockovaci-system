import { NgModule } from '@angular/core';
import { SharedModule } from '../shared-module';
import { AddPersonalComponent } from './add-personal/add-personal.component';
import { PersonalTableComponent } from './personal-table/personal-table.component';
import { PersonalsRoutingModule } from './personals-routing.module';



@NgModule({
  declarations: [
    PersonalTableComponent,
    AddPersonalComponent,  
  ],
  imports: [
    PersonalsRoutingModule,
    SharedModule
  ]
})
export class PersonalsModule { }
