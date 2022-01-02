import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonTableComponent } from './person-table/person-table.component';

const routes: Routes = [
  {
    path: '',
    component: PersonTableComponent
  },
  {
    path: 'add',
    component: AddPersonComponent
  },
  {
    path: 'edit/:id',
    component: AddPersonComponent
  },
  {
    path: 'copy/:personId',
    component: AddPersonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
