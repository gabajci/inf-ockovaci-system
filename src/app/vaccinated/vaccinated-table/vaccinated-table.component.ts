import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/Core/account-service';
import { DeleteDialogComponent } from 'src/app/Core/delete-dialog/delete-dialog.component';
import { FilterService } from 'src/app/Core/filter-service';
import { Paramedic } from 'src/app/Core/paramedic';
import { ScrollRestorationService } from 'src/app/Core/table/scroll-restoration.service';
import { TableService } from 'src/app/Core/table/table.service';
import { Vaccinated } from 'src/app/Core/vaccinated';
import { VaccinatedService } from 'src/app/Core/vaccinated-service';

@Component({
  selector: 'vaccinated-table',
  templateUrl: './vaccinated-table.component.html',
  styleUrls: ['./vaccinated-table.component.scss']
})

export class VaccinatedTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['personId', 'hospitalId', 'vaccineName', 'vaccineNumber', 'date'];

  constructor(
    private accountService: AccountService,
    private vaccinatedService: VaccinatedService,    
    private tableService: TableService,        
    private filterService: FilterService,
    private dialog: MatDialog,      
    private scrollRestorationService: ScrollRestorationService,
  ) { }

  dataSource!: MatTableDataSource<Vaccinated>;
  isAdmin: boolean = false;
  filterFormGroup: FormGroup;
  filteredValues = { id: '', personId: '', hospitalId: '', vaccineName:'',date:''};

  get filter() {
    return this.tableService.vaccinated.filter;
  }

  set filter(value: string) {
    this.tableService.vaccinated.filter = value;
    this.dataSource.filter = this.tableService.vaccinated.filter;
  }

  ngOnInit(): void {
    this.filterFormGroup = this.filterService.getVaccinatedFilterForm();
    this.onFilterFormGroupChanges();

    this.vaccinatedService.getAllVaccinateds().subscribe(vaccinateds => {
      this.dataSource = new MatTableDataSource(vaccinateds);
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.setFilteredValues(this.filterFormGroup.getRawValue());
      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => {
          this.tableService.vaccinated.sortActive = this.sort.active;
          this.tableService.vaccinated.sortDirection = this.sort.direction as 'asc' | 'desc';
        });
        if (this.tableService.vaccinated.sortActive) {
          this.sort.sort({
            id: this.tableService.vaccinated.sortActive,
            start: this.tableService.vaccinated.sortDirection,
            disableClear: false
          });
        }
      }
      this.scrollRestorationService.restoreScrollPosition();
      this.vaccinatedService.vaccinateds = vaccinateds;
    });

    if (this.accountService.account != null) {
      this.displayedColumns = ['personId', 'hospitalId', 'vaccineName', 'vaccineNumber', 'date', 'actions'];
    }
  }

   //xx

   onFilterFormGroupChanges() {
    this.filterFormGroup.valueChanges.subscribe(vaccinateds => {
      this.setFilteredValues(vaccinateds);
      this.filterService.updatePersonFilterForm(this.filterFormGroup);
    });
  }

  setFilteredValues(vaccinated: any) {
    this.filteredValues['id'] = vaccinated.id;
    this.filteredValues['personId'] = vaccinated.personId;
    this.filteredValues['hospitalId'] = vaccinated.hospitalId;    
    this.filteredValues['vaccineName'] = vaccinated.vaccineName;
    this.filteredValues['date'] = vaccinated.date;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  clearFilterFormGroup() {
    this.filterFormGroup.controls['id'].setValue('');
    this.filterFormGroup.controls['personId'].setValue('');
    this.filterFormGroup.controls['hospitalId'].setValue('');
    this.filterFormGroup.controls['vaccineName'].setValue('');
    this.filterFormGroup.controls['date'].setValue('');
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Vaccinated, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      return this.prepareStringToFilter(data.id).indexOf(this.prepareStringToFilter(searchString.id)) !== -1 &&
        this.prepareStringToFilter(data.personId).indexOf(this.prepareStringToFilter(searchString.personId)) !== -1 &&
        this.prepareStringToFilter(data.hospitalId).indexOf(this.prepareStringToFilter(searchString.hospitalId)) !== -1 &&
        this.prepareStringToFilter(data.vaccineName).indexOf(this.prepareStringToFilter(searchString.vaccineName)) !== -1 && 
        this.prepareStringToFilter(data.date).indexOf(this.prepareStringToFilter(searchString.date)) !== -1;
    };
    return myFilterPredicate;
  }

  private prepareStringToFilter(str: any): string {
    return str.toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //ddd

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deleteVaccinated(id);
      }
    });
  }

  deleteVaccinated(vaccinatedId: number) {
    this.vaccinatedService.deleteVaccinated(vaccinatedId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter(account => account.id !== vaccinatedId);
        this.vaccinatedService.vaccinateds = this.dataSource.filteredData;
      });
  }

}
