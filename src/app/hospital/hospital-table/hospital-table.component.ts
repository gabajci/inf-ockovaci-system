import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/Core/delete-dialog/delete-dialog.component';
import { Hospital } from '../../Core/hospital';
import { HospitalService } from '../../Core/hospital-service';

@Component({
  selector: 'hospital-table',
  templateUrl: './hospital-table.component.html',
  styleUrls: ['./hospital-table.component.scss']
})

export class HospitalTableComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'postCode','director','contact','dailyVaccinatedCapacity','breathSupportCapacity', 'actions'];

  constructor(
    private hospitalService: HospitalService,
    private dialog: MatDialog,
  ) { }

  dataSource!: MatTableDataSource<Hospital>;

  ngOnInit(): void {
    // if (this.hospitalService.hospitals != null) {
    //   this.dataSource = new MatTableDataSource(this.hospitalService.hospitals);
    // } else {
    //   this.hospitalService.getAllHospitals().subscribe(hospital => {
    //     this.dataSource = new MatTableDataSource(hospital);
    //     this.hospitalService.hospitals = hospital;
    //   });
    // }
    this.hospitalService.getAllHospitals().subscribe(hospital => {
      this.dataSource = new MatTableDataSource(hospital);
      this.hospitalService.hospitals = hospital;
    });

  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deleteVersion(id);
      }
    });
  }

  deleteVersion(versionId: number) {
    this.hospitalService.deleteHospital(versionId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter(version => version.id !== versionId);
        this.hospitalService.hospitals = this.dataSource.filteredData;
      });
  }

}
