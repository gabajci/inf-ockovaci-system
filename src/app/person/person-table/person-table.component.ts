import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/Core/account-service';
import { DeleteDialogComponent } from 'src/app/Core/delete-dialog/delete-dialog.component';
import { FilterService } from 'src/app/Core/filter-service';
import { ParamedicService } from 'src/app/Core/paramedic-service';
import { Person } from 'src/app/Core/person';
import { PersonService } from 'src/app/Core/person-service';
import { ScrollRestorationService } from 'src/app/Core/table/scroll-restoration.service';
import { TableService } from 'src/app/Core/table/table.service';
import { ToasterService } from 'src/app/Core/toaster/toaster-service';

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss']
})

export class PersonTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'surname', 'lastName', 'phoneNumber', 'mail'];

  constructor(
    private paramedicService: ParamedicService,
    private accountService: AccountService,
    private personService: PersonService,
    private filterService: FilterService,
    private dialog: MatDialog,
    private toasterService: ToasterService,    
    private tableService: TableService,    
    private scrollRestorationService: ScrollRestorationService,
  ) { }

  get filter() {
    return this.tableService.person.filter;
  }

  set filter(value: string) {
    this.tableService.person.filter = value;
    this.dataSource.filter = this.tableService.person.filter;
  }

  dataSource!: MatTableDataSource<Person>;
  isAdmin: boolean = false;
  filteredValues = { id: '', surname: '', lastName: '', phoneNumber:'',mail:''};
  filterFormGroup: FormGroup;

  ngOnInit(): void {
    this.filterFormGroup = this.filterService.getPersonFilterForm();
    this.onFilterFormGroupChanges();

    this.personService.getAllPersons().subscribe(persons => {      
      this.dataSource = new MatTableDataSource(persons);      
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.setFilteredValues(this.filterFormGroup.getRawValue());
      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => {
          this.tableService.person.sortActive = this.sort.active;
          this.tableService.person.sortDirection = this.sort.direction as 'asc' | 'desc';
        });
        if (this.tableService.person.sortActive) {
          this.sort.sort({
            id: this.tableService.person.sortActive,
            start: this.tableService.person.sortDirection,
            disableClear: false
          });
        }
      }
      this.scrollRestorationService.restoreScrollPosition();
      this.personService.persons = persons;
    });

    if (this.accountService.account != null) {
      this.displayedColumns = ['id', 'surname', 'lastName', 'phoneNumber', 'mail', 'actions'];
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deletePerson(id);
      }
    });
  }



  onFilterFormGroupChanges() {
    this.filterFormGroup.valueChanges.subscribe(persons => {
      this.setFilteredValues(persons);
      this.filterService.updatePersonFilterForm(this.filterFormGroup);
    });
  }

  setFilteredValues(person: any) {
    this.filteredValues['id'] = person.id;
    this.filteredValues['surname'] = person.surname;
    this.filteredValues['lastName'] = person.lastName;    
    this.filteredValues['phoneNumber'] = person.phoneNumber;
    this.filteredValues['mail'] = person.mail;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  clearFilterFormGroup() {
    this.filterFormGroup.controls['id'].setValue('');
    this.filterFormGroup.controls['surname'].setValue('');
    this.filterFormGroup.controls['lastName'].setValue('');
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Person, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      return this.prepareStringToFilter(data.id).indexOf(this.prepareStringToFilter(searchString.id)) !== -1 &&
        this.prepareStringToFilter(data.surname).indexOf(this.prepareStringToFilter(searchString.surname)) !== -1 &&
        this.prepareStringToFilter(data.lastName).indexOf(this.prepareStringToFilter(searchString.lastName)) !== -1;
    };
    return myFilterPredicate;
  }

  private prepareStringToFilter(str: any): string {
    return str.toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }


  deletePerson(personId: number) {
    if (this.accountService.account != null) {
      if (this.accountService.account.id == personId) {
        this.toasterService.showToast('Nemôžete vymazať svôj účet.', 'top-center', false);
        return;
      }
    }

    this.paramedicService.getParamedic(personId).subscribe(paramedic => {
      if (paramedic != null) {
        this.toasterService.showToast('Nemôžete vymazať zdravotníka.', 'top-center', false);
        return;
      } else {
        this.personService.deletePerson(personId)
          .subscribe(() => {
            this.dataSource.data = this.dataSource.data
              .filter(person => person.id !== personId);
            this.personService.persons = this.dataSource.filteredData;
            this.toasterService.showToast('Osoba bola úspešne vymazaná', 'top-right', true);
          });
      }
    })
  }

}
