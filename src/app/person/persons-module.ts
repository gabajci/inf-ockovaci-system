import { NgModule } from '@angular/core';
import { SharedModule } from '../shared-module';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonTableComponent } from './person-table/person-table.component';
import { PersonsRoutingModule } from './persons-routing.module';



@NgModule({
  declarations: [
    PersonTableComponent,
    AddPersonComponent,  
  ],
  imports: [
    PersonsRoutingModule,
    SharedModule
  ]
})
export class PersonsModule { }
