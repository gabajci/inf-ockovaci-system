import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/Core/account-service';
import { DeleteDialogComponent } from 'src/app/Core/delete-dialog/delete-dialog.component';
import { Paramedic } from 'src/app/Core/paramedic';
import { ParamedicService } from 'src/app/Core/paramedic-service';
import { PersonService } from 'src/app/Core/person-service';
import { ToasterService } from 'src/app/Core/toaster/toaster-service';

@Component({
  selector: 'personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.scss']
})

export class PersonalTableComponent implements OnInit {


  displayedColumns: string[] = ['id', 'hospitalId', 'role', 'yearsInPractise'];

  constructor(
    private paramedicService: ParamedicService,
    private accountService: AccountService,
    private personService: PersonService,
    private dialog: MatDialog,
    private toasterService: ToasterService,
    public media: MediaObserver,
  ) { }

  dataSource!: MatTableDataSource<Paramedic>;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe(persons => {

    });

    this.paramedicService.getAllParamedics().subscribe(paramedics => {
      this.dataSource = new MatTableDataSource(paramedics);
      this.paramedicService.paramedics = paramedics;
    });

    if (this.accountService.account != null) {
      if (this.accountService.account.admin == 1) {
        this.displayedColumns = ['id', 'hospitalId', 'role', 'yearsInPractise', 'actions'];
      }
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deletePersonal(id);
      }
    });
  }

  deletePersonal(accountId: number) {
    if (this.accountService.account != null) {
      if (this.accountService.account.id == accountId) {
        this.toasterService.showToast('Nemôžete vymazať svôj účet.', 'top-right', false);
        return;
      }
    }
    this.accountService.getAccount(accountId).subscribe(account => {
      if (account != null) {
        this.toasterService.showToast('Vymazávam zdravotníkov účet.', 'top-right', true);
        this.accountService.deleteAccount(accountId).subscribe(x => {
          this.paramedicService.deleteAccount(accountId)
            .subscribe(() => {
              this.dataSource.data = this.dataSource.data
                .filter(account => account.id !== accountId);
              this.paramedicService.paramedics = this.dataSource.filteredData;
              this.toasterService.showToast('Zdravotník bol úspešne vymazaní.', 'top-right', true);
            });
        });
      } else {
        this.paramedicService.deleteAccount(accountId)
          .subscribe(() => {
            this.dataSource.data = this.dataSource.data
              .filter(account => account.id !== accountId);
            this.paramedicService.paramedics = this.dataSource.filteredData;            
            this.toasterService.showToast('Zdravotník bol úspešne vymazaní.', 'top-right', true);
          });
      }
    });

  }

}
