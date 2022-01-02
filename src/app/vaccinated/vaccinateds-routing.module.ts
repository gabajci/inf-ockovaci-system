import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVaccinatedComponent } from './add-vaccinated/add-vaccinated.component';
import { VaccinatedTableComponent } from './vaccinated-table/vaccinated-table.component';

const routes: Routes = [
  {
    path: '',
    component: VaccinatedTableComponent
  },
  {
    path: 'add',
    component: AddVaccinatedComponent
  },
  {
    path: 'edit/:id',
    component: AddVaccinatedComponent
  },
  {
    path: 'copy/:vaccinatedId',
    component: AddVaccinatedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinatedsRoutingModule { }
