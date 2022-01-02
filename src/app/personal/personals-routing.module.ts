import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonalComponent } from './add-personal/add-personal.component';
import { PersonalTableComponent } from './personal-table/personal-table.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalTableComponent
  },
  {
    path: 'add',
    component: AddPersonalComponent
  },
  {
    path: 'edit/:id',
    component: AddPersonalComponent
  },
  {
    path: 'copy/:paramedicId',
    component: AddPersonalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalsRoutingModule { }
