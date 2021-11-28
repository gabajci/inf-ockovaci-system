import { NgModule } from '@angular/core';
import { HospitalTableComponent } from './hospital-table/hospital-table.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { HospitalsRoutingModule } from './hospitals-routing.module';
import { SharedModule } from '../shared-module';



@NgModule({
  declarations: [
    HospitalTableComponent,
    AddHospitalComponent,  
  ],
  imports: [
    HospitalsRoutingModule,
    SharedModule
  ]
})
export class HospitalsModule { }
