import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalTableComponent } from './hospital-table/hospital-table.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { HospitalsRoutingModule } from './hospitals-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
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
