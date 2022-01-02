import { NgModule } from '@angular/core';
import { SharedModule } from '../shared-module';
import { AddVaccinatedComponent } from './add-vaccinated/add-vaccinated.component';
import { VaccinatedTableComponent } from './vaccinated-table/vaccinated-table.component';
import { VaccinatedsRoutingModule } from './vaccinateds-routing.module';



@NgModule({
  declarations: [
    VaccinatedTableComponent,
    AddVaccinatedComponent,  
  ],
  imports: [
    VaccinatedsRoutingModule,
    SharedModule
  ]
})
export class VaccinatedsModule { }
