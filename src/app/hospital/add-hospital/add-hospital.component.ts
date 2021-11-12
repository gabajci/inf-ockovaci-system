import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/Core/hospital';
import { HospitalService } from 'src/app/Core/hospital-service';
import { Location } from '@angular/common';

@Component({
  selector: 'add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    //private toasterService: ToasterService,
    private location: Location,

  ) { }

  data: Array<Hospital>;
  hospitalForm: FormGroup;
  hospitalId: number = 0;
  edit: boolean = false;
  copy: boolean = false;
  hospital=<Hospital>{ }

  ngOnInit(): void {
    this.createHospitalForm();
    if (this.hospitalService.hospitals != null) {
      this.data = this.hospitalService.hospitals;
    } else {
      this.hospitalService.getAllHospitals().subscribe(hospitals => {
        this.data = hospitals;
      });
    }


    if (this.route.snapshot.paramMap.has('id')) {
      this.edit = true;
      this.hospitalId = Number.parseInt(this.route.snapshot.paramMap.get('id'));

      this.hospitalService.getHospital(this.hospitalId).subscribe(hospital => {
        this.updateHospitalForm(hospital);
      })
    }
    if (this.route.snapshot.paramMap.has('hospitalId')) {
      this.copy = true;

      this.hospitalId = Number.parseInt(this.route.snapshot.paramMap.get('hospitalId'));
      this.hospitalService.getHospital(this.hospitalId).subscribe(hospital => {
        this.updateHospitalForm(hospital);
      })
    }

  }

  createHospitalForm(): void {
    this.hospitalForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      postCode: [0, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    });
  }

  updateHospitalForm(hospital: Hospital) {
    this.hospitalForm = this.fb.group({
      id: [hospital.id, [Validators.required, Validators.maxLength(3)]],
      name: [hospital.name, Validators.required],
      postCode: [hospital.postCode, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]]
    });
  }

  onSubmit() {

    if (!this.edit) {
      this.hospital.id = this.hospitalForm.controls['id'].value;
    } else {
      this.hospital.id = this.hospitalId;
    }
    this.hospital.name = this.hospitalForm.controls['name'].value;
    this.hospital.postCode = this.hospitalForm.controls['postCode'].value;

    if (this.edit) {
      //overenie, ci je original id nezmenene
      this.hospitalService.putHospital(this.hospitalId,this.hospital).subscribe(
        _ => this.location.back());
    } else if (this.copy) {
      //overenie, ci je original id ine
      this.hospitalService.postHospital(this.hospital).subscribe(
        _ => this.location.back());
    } else {
      this.hospitalService.postHospital(this.hospital).subscribe(
        _ => this.location.back());
    }

  }
}

