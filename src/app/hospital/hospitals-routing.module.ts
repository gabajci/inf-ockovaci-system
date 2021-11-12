import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { HospitalTableComponent } from './hospital-table/hospital-table.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalTableComponent
  },
  {
    path: 'add',
    component: AddHospitalComponent
  },
  {
    path: 'edit/:id',
    component: AddHospitalComponent
  },
  {
    path: 'copy/:hospitalId',
    component: AddHospitalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
