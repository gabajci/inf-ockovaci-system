import { Injectable } from '@angular/core';
import { Table } from './table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  person: Table = {
    filter: '',
    sortActive: null,
    sortDirection: null
  };

  vaccinated: Table = {
    filter: '',
    sortActive: null,
    sortDirection: null
  };
  
}
